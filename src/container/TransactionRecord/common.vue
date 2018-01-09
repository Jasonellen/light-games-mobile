<template>
  <div v-if='items.length>0' class='items'>
    <div v-for='item in items' class='item'>
      <div v-if='item.data.find(function(i){return i.order_goods_type == 2})'>
        <div class="nav zu" >
           租凭交易
        </div>
        <div v-for='iitem in item.data'>
          <div v-if='iitem.order_goods_type == 2'>
            <div class="top">
              <div class="top-body">
                <div class="pic-box">
                  <img :src="iitem.goods_url" alt="">
                </div>
                <div class="des">
                  <p class="name">{{iitem.game_name_cn}} <span>({{iitem.game_name_en}})</span></p>
                  <p class="p2">
                    <span>版本：{{item.edition==0 ? '港行':item.edition==1 ?'国行' :item.edition==2?'美版':'日版' }}</span>
                  </p>
                  <p class="p3">租赁价：￥{{iitem.goods_rent_price * iitem.rent_day}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom" v-if='type != 3'>
          <div class="fr">
            <div class="pay-btn" v-if='type == 1' @click='getWuLiu(item.orderId)'>查看物流</div>
            <div class="pay-btn" v-if='type == 2' @click='toComment(item.orderId)'>立即评价</div>
          </div>
        </div>
        <!--交易评价  -->
        <div class="evaluateBottom" v-else>
            <p class="myEva " :class="['myEva',{'close':!open}]">
               {{item.commentText}}
            </p>
          <div class="openBtn" @click="openFn()" v-text="open ?'收起' : '展开'">展开</div>
        </div>
      </div>

      <div v-if='item.data.find(function(i){return i.order_goods_type == 1})'>
        <div class="nav gou" >
         购买交易
        </div>
        <div v-for='iitem in item.data'>
          <div v-if='iitem.order_goods_type == 1'>
            <div class="top">
              <div class="top-body">
                <div class="pic-box">
                  <img :src="iitem.goods_url" alt="">
                </div>
                <div class="des">
                  <p class="name">{{iitem.game_name_cn}} <span>({{iitem.game_name_en}})</span></p>
                  <p class="p2">
                    <span>版本：{{item.edition==0 ? '港行':item.edition==1 ?'国行' :item.edition==2?'美版':'日版' }}</span>
                  </p>
                  <p class="p3">购买价：￥{{iitem.goods_price * iitem.amount}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom" v-if='type != 3'>
          <div class="fr">
            <div class="pay-btn" v-if='type == 1' @click='getWuLiu(item.orderId)'>查看物流</div>
            <div class="pay-btn" v-if='type == 2' @click='toComment(item.orderId)'>立即评价</div>
          </div>
        </div>
        <!--交易评价  -->
        <div class="evaluateBottom" v-else>
            <p class="myEva " :class="['myEva',{'close':!open}]">
              {{item.commentText}}
            </p>
          <div class="openBtn" @click="openFn()" v-text="open ?'收起' : '展开'">展开</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
   import { MessageBox } from 'mint-ui';
  export default {

    data(){
        return{
          items:[],
          open:false,
        }
    },
    props : {
      type : {type : Number, default:''}
    },
    methods:{
      getData(type){
        return gameApi.findUserTransactionList.send({
          type,curIndex:1, pageSize:1000
        })
      },
      toComment(articleId){
        toPage.comment.push(articleId+'*6')
      },
      openFn(){
        this.open=!this.open;
      },
      getWuLiu(orderId){
        gameApi.fingWaybill.send({orderId}).then(result=>{
            let {waybill_number,waybill_platform} = result.data;
          MessageBox({
            title : '物流',
            message: `
          <p class="wuliu-text-mbox">物流公司:${waybill_platform}</p>
          <p class="wuliu-text-mbox">运单号:${waybill_number}</p>
  `,
          });
        })

      }
    },
    computed:{

    },
    watch: {
      // 如果 question 发生改变，这个函数就会运行
      type:function (value) {
        this.getData(this.type)
          .then(({data})=>{
            this.items = data.result
          })
      }
    },
    mounted(){
      this.getData(this.type)
        .then(({data})=>{
          this.items = data.result
        })

    },


  }
</script>
