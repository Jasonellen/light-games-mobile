<template>
  <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
  <div class="pd-head mx-page">
    <my-header title="明细"></my-header>
    <ul>
      <li v-for="(item,index) in list" :key="index">
        <div class="clearfix div1">
          <p class="fl">{{item.trade_type}}</p>
          <p class="fr">{{item.create_date | time}}</p>
        </div>
        <div class="clearfix div2">
          <p class="fl">余额：{{item.surplus_money}}</p>
          <p class="fr">{{item.trade_money}}</p>
        </div>
      </li>
    </ul>
  </div>
  </mt-loadmore>
</template>

<script>
  import Paging from 'core/Paging';
  const arrType = ['','余额充值','g币充值','用户提现','退还押金','购买商品','租赁商品','充值押金'];
  export default {
    data(){
      return{
        allLoaded : true,
        list : []
      }
    },
    methods:{
      send(){
        this.mxApi.send().then(({data,status})=>{
          if(status == 200){
            let {result,totalRow,pageSize,curIndex} = data;
            this.list.push(...result);
            this.allLoaded = curIndex >= Math.ceil(totalRow/pageSize);
            this.$refs.loadmore.onBottomLoaded();
          }
        })
      },
      loadBottom(){
      	if(this.allLoaded)return;
      	this.mxApi.curIndex++;
      	this.send();
      }
    },
    filters : {
    	mxTitle (type){
    		return arrType[type]
      },
      time(val){
    		return (val || '').split(' ').shift();
      }
    },
    components:{

    },
    created(){
      this.mxApi = new Paging({pageSize : 20,},gameApi.queryWalletRecord.send);
      this.send();
    },
  }
</script>
<style  lang="scss" rel="stylesheet/scss" scoped>
  ul{
    margin-top: 10px;
    background: #fff;
    padding: 0 35px 100px;

    li{
      height: 124px;
      border-bottom: 1px solid #eee;
      .div1{
        padding-top: 30px;
        margin-bottom: 12px;
        p{
          font-size:32px;
          color: #333;
        }
        p:last-child{
          font-size: 26px;
          color: #999;
        }
      }
      .div2{
        p{
          font-size: 28px;
          color: #333;
        }
        p:last-child{
          font-size: 26px;
          color: #333;
        }
      }
    }
  }
</style>

