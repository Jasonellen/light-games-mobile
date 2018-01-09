<template>
	<div class="my-game-tab-page pd-head submitOrder">
    <my-header title="确认订单">
      <span slot="left" @click='_back'>取消</span>
    </my-header>
    <div class="address box">
      <div v-if='address && address.locationId' @click='toAddress'>
        <i class="icon-address"></i>
        <div class="addressCon item">
          <div class="conTop clearfix">
            <p class="fl">收货人：{{address.name}}</p>
            <p class="fr">{{address.phone}}</p>
          </div>
          <p class="conBot">
            收货地址：{{address.pname + address.cname + address.aname + address.details}}
          </p>
        </div>
        <i class="go"></i>
      </div>
      <div v-else @click='toAddress'>
        点击选择默认收货地址 
      </div>
    </div>
    <!--租凭 购买 .zu .gou -->
    <div class="play-list-warp" v-if='rentItems.length>0'>
      <div class="nav zu">
        租凭
      </div>
      <ul class="play-list">
        <li v-for='item in rentItems'>
          <div class="top">
              <div class="top-body">
                <div class="pic-box">
                  <img :src="item.url" alt="">
                </div>
                <div class="des">
                  <p class="name">{{item.goodsName}} <span>({{item.goodsDes}})</span></p>
                  <p class="p2">
                    <span>版本：{{item.edition}}</span>
                  </p>
                  <p class="p3 clearfix"><span class="fl">购买价：￥{{item.goodsRentPrice}}</span><font class="fl">市场价：￥{{item.marketPrice}}元</font><i class="fr">X{{item.rentDay}}</i></p>
                </div>
              </div>
            </div>
        </li>
      </ul>
      <div class="div1 clearfix">
        <p class="fl">已经押金</p>
        <p class="fr mr-56">￥{{this.deposit}}</p>
      </div>
      <div class="div1 clearfix">
        <p class="fl">押金</p>
        <i class="go fr"></i>
        <p class="fr">顺丰: ￥{{this.mailMoney}}</p>
      </div>
      <div class="div1">
        <p class="fr">共1件商品 小计： <font>￥{{this.rentTotal}}</font></p>
      </div>
    </div>

    

    <div class="play-list-warp" v-if='buyItems.length>0'>
      <div class="nav gou">
        购买
      </div>
      <ul class="play-list">
        <li v-for="item in buyItems">
          <div class="top">
              <div class="top-body">
                <div class="pic-box">
                  <img :src="item.url" alt="">
                </div>
                <div class="des">
                  <p class="name">{{item.goodsName}} <span>({{item.goodsDes}})</span></p>
                  <p class="p2">
                    <span>版本：{{item.edition}}</span>
                  </p>
                  <p class="p3 clearfix"><span class="fl">购买价：￥{{item.goodsPrice}}</span><font class="fl">市场价：￥{{item.marketPrice}}元</font><i class="fr">X{{item.amount}}</i></p>
                </div>
              </div>
            </div>
        </li>
      </ul>

      <div class="div1 clearfix">
        <p class="fl">邮费</p>
        <i class="go fr"></i>
        <p class="fr">顺丰: ￥{{this.mailMoney}}</p>
      </div>
      <div class="div1">
        <p class="fr">共1件商品 小计： <font>￥{{this.buyTotal}}</font></p>
      </div>
    </div>
    <div v-if='quanData.length>0'>
      <p class="p3">优惠劵</p>
      <ul class="juan">
        <li :class="['box',{active:couponId == item.couponId}]"  v-for='item in quanData' @click='changeQuan(item.couponId, item.couponValue)'>
          <div class="left" >
            <p class="num"><font>￥</font>{{item.couponValue}}</p>
            <p>使用条件:{{item.couponDescription}}</p>
            <p>使用期限：{{item.couponStartDate.slice(0,10)}}至{{item.couponEndDate.slice(0,10)}}</p>
          </div>
          <div class="right item">立即使用</div>
        </li>
      </ul>
    </div>
    <div class='kong'></div>
    <div class="footer clearfix">
      <p class="fl">实付款：￥{{this.orderMoney}}</p>
      <a class="fr" @click='handleSubmit'>提交订单</a>
    </div>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
	export default {
    data(){
        return{
          open:false,
          address:{},
          rentItems:[],
          buyItems:[],
          item:'',
          deposit:'',
          mailMoney:'',
          orderMoney:'',
          rentTotal:'',
          buyTotal:'',
          couponId:'',
          quanData:[],
          selectQuan:''
        }
    },
    methods:{
        openFn(){
          this.open=!this.open;
        },
        handleSubmit(){
          if(this.address && this.address.locationId){
            gameApi.commitOrder.send({orderId:this.orderId,locationId:this.address.locationId,couponId:this.couponId})
            .then(data=>{
              if(data.msg == 'success'){
               toPage.Pay.push(`${this.orderId}/${this.orderMoney}`)
              }
            })
          }else{
            MessageBox.alert('请先填写默认地址!')
          }
        },
        changeQuan(couponId, money){
          this.couponId = couponId
          let Smoney = localStorage.getItem('orderMoney')
          this.orderMoney = Smoney - money
        },
        toAddress(){
          localStorage.setItem('orderId',this.orderId)
          toPage.address.push()
        },
        _back(){
          toPage._back()
        }
    },
    components:{
		},
    mounted(){
      this.orderId = this.$route.params.orderId;
      gameApi.queryUserLocation.send()
        .then(data=>{
          if(data.msg == 'success'){
            this.address = data.data.find(function(item){
              return item.defaultLocation == '1'
            })
          }
        })
      gameApi.queryOrderMessage.send({
        orderId:this.$route.params.orderId //18000000928716987
      })
        .then(({data})=>{
            this.rentItems = data.message.filter((item)=>{
              return item.orderGoodsType == 2
            })
            this.buyItems = data.message.filter((item)=>{
              return item.orderGoodsType == 1
            })
            this.rentTotal = this.rentItems.reduce(function(prev, next){
                return prev + next.goodsRentPrice * next.rentDay
            }, data.mailMoney)
            this.buyTotal = this.buyItems.reduce(function(prev, next){
                return prev + next.goodsPrice * next.amount
            }, data.mailMoney)

            this.deposit = data.deposit
            this.mailMoney = data.mailMoney
            this.orderMoney = data.orderMoney
            localStorage.setItem('orderMoney', this.orderMoney)
        })
      gameApi.queryAllOrUseConpon.send({orderId:this.$route.params.orderId, curIndex:1,pageSize:10})
        .then(data=>{
          if(data.msg == 'success' && data.data.result.length>0){
            let newData =  data.data.result.filter((item)=>{
              return item.couponCondition <=  this.orderMoney
            })
            this.quanData = newData
          }
        })
    },
    created(){
			document.body.style.backgroundColor='#f7f7f7';
    },
  }
</script>

<style lang="scss" src="./index.scss" rel="stylesheet/scss"></style>
