<template>
	<div class="my-game-tab-page pd-head">
    <my-header title="我的收货信息">
      <BuyIcon slot='right'/>
     </my-header>
     <ul class="addressList">
       <li v-for="(item,index) in addressList" :key="index" >
         <div class="content" @click='toSubmit'>
           <div class="clearfix nameBox">
             <p class="fl">{{item.name}}</p>
             <p class="fr">{{item.phone}}</p>
           </div>
           <p>{{item | filterAddress}}</p>
         </div>
         <div class="bottom clearfix" >
              <div class="fl">
                <!--给 div.radio 加 className->select 为选择样式 -->
                <div @click="selectRadio(index,item.defaultLocation == 1)" class="radio" :class="{select : item.defaultLocation == 1}">
                  <input name="default" type="radio" />
                </div>
                <label for="">默认地址</label>
              </div>
              <div class="fr delete" @click="delAddress(item.locationId)">删除</div>
              <div class="fr edit" @click="editAddress(index)">编辑</div>

         </div>
       </li>
     </ul>
     <div style="height:98px;"></div>
    <router-link class="add" to='/newAddress/add'>添加新地址</router-link>
	</div>
</template>

<script>
  import pageCache from 'core/pageCache';
	export default {
    data(){
      return{
        addressList : []
      }
    },
    methods:{
      selectRadio(index,isActive){
      	if(!isActive){
          this.addressList = this.addressList.map((item,i)=>(
            {...item,...{defaultLocation : index === i ? 1 : 2}}
          ))
          gameApi.setDefaultLocation.send({
            locationId : this.addressList[index].locationId
          })
        }else{
          //this.$set(this.addressList[index],'defaultLocation' ,2)
        }
      },
      //新增地址
      editAddress(index){
        pageCache.address = this.addressList[index];
        toPage.newAddress.push('edit');
      },
      //删除地址
      delAddress(locationId){
        gameApi.deleteUserLocation.send({locationId}).then(({status})=>{
        	if(status === 200){
        		this.reloadData();
          }
        })
      },
      reloadData(){
        //获取地址
        gameApi.queryUserLocation.send().then(({status,data})=>{
          if(status === 200){
            this.addressList = [...data];
          }
        })
      },
      toSubmit(){
        let orderId = localStorage.getItem('orderId')
        if(orderId){
          localStorage.setItem('orderId','')
          toPage.submitOrder.push(orderId)
        }
        
      }
    },
    filters : {
      filterAddress(obj){
      	return (obj.pname || '') + (obj.cname || '') + (obj.aname || '') + obj.details
      }
    },
    components:{
		},
    created(){
      this.reloadData();
    },
  }
</script>

<style lang="scss" src="./index.scss" rel="stylesheet/scss"></style>
