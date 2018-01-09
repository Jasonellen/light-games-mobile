<template>
  <div class="api-page">
    <h1 class="">
      这里是所有请求的API <br>
      <small>一共{{list.length}}个</small>
      <input v-model="val" type="text">
    </h1>
    <div class="api-list">
      <div class="api-item" v-for="(item,index) in filterLists">
				<div style='color:red;fontSize:40px;'>{{item.use}}</div>
        <div class="bt">调用方法 ：window.api.{{item.url.split('/').pop()}}(options)</div>
        <div class="bt bold">调用方法 ：window.gameApi.{{item.url.split('/').pop()}}.send(options)</div>
        <div class="bt">说明 : {{item.use}} ---------  接口{{(index+1 )> 10 ? (index+1) : ('0' + (index+1))}}</div>
        <div class="bt">url : {{item.url}}</div>
        <div>params(请求参数)</div>
        <div class="bt">{{item.params | filterparams}}</div>
        <div>返回值</div>
        <div class="bt">
          {{item.result | filterparams }}
        </div>
        <div>描述</div>
        <div class="bt">
          {{item.des | filterparams }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ApiList from 'api/http';
  export default{
  	name : 'api-page',
    data(){
  		return{
  			list : [],
        val : ''
      }
    },
    filters : {
    	  filterparams(val){
            return val ? val.join('') : '无' ;
        },
      filterList(list,){
          return list
      }
    },
    computed : {
      filterLists(){
      	let {val} = this;
        val = val.trim()
        return this.list.filter(({use,url},index)=>{
        	return ~use.indexOf(val) || ~url.indexOf(val)

        })
      }
    },
    mounted(){
      userLogin.open({
        step : 3,
      })
    },
    created(){
    	this.list = ApiList;

      gameApi.findShoppingCartByUserId.send({},{method:'post'}).then(res=>{
        log(res);
      })

      gameApi.putInShoppingCart.send({
        goodsIds:1,amount:1
      },{method:'post'})
    }
  }
</script>
<style scoped>
  .api-page{
    font-size: 12px;
    text-align: left;
    padding-left: 20px;
  }
  .api-page .api-item{
    padding-bottom: 10px;

  }
  .api-page .api-item > div{padding: 6px 0}
  .api-page input{
    border: 1px solid #ccc;
  }
  .bold{
    font-weight: bold;color: red;
  }
  .api-page .bt{border-bottom: 1px solid #ccc}
</style>
