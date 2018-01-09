<template>
  <div class="pd-head">

     <my-header title="收银台">
         <div slot="right"><router-link to='/TransactionRecord/2' class="clearfix">交易记录</router-link></div>
     </my-header>

	 <p class="sum">需要支付：<span>{{showPrice}}</span><font>{{(checked[2] && checked[2].checked) ? 'G币' : '元'}}</font></p>
	 <h2>支付方式</h2>
	 <ul class="sumList">
		 <li class="clearfix" v-for="(item,index) in checked" :key="index">
			 <img :src="item.img"  class="fl">
			 <span class="fl">{{item.label}}</span>
			 <div class="radio fr" @click='select(index,item.checked)'  :class="['radio fr',{'select' : item.checked}]">
				 <input type="radio" :checked='item.checked'/>
			 </div>
		 </li>
	 </ul>
	 <!--<p class="tisp">现充值享受满100送99元活动</p>-->
	 <button type="danger" class="sub" @click="handleSubmit">确认支付（{{showPrice}}{{(checked[2] && checked[2].checked) ? 'G币' : '元'}}）</button>
  </div>
</template>

<script>
	import Vue from 'vue';
	import { MessageBox } from 'mint-ui';
  import pageCache from 'core/pageCache';

  const zhifubao = require('../../assets/zhifubao.svg');
  const weiixn = require('../../assets/weiixn.svg');
  const Gbi = require('../../assets/Gbi.svg');
  import initUser from 'core/firstLoad';
	export default {
		data (){
			let {delGbi} = pageCache;
			return {
				checked:[
					{pay_way:'zfb',checked:false,img : zhifubao,label : '支付宝'},
			        {pay_way:'wx',checked:true,img : weiixn,label : '微信支付'},
			        {pay_way:'gb',checked:false,img : Gbi,label : 'G币支付'}
		        ],
				price:'',
				GBPrice:'',
				orderId:'',
				GB:false
			}
		},
		methods: {
			toGB(){
				gameApi.rmbToGCoin.send({money:this.price})
					.then(data=>{
						if(data.msg == 'success'){
							this.GBPrice = data.data
						}
					})

			},
			select(index,checked){
				this.checked = this.checked.map((item,index1)=>({...item,...{
					checked : index == index1 ? !checked : false}}))
			},
	    paySuccess(n){
        initUser();
        var comefrom = local.get('ordercomefrom')
        if(comefrom == 'shop'){
        	local.del('ordercomefrom')
        	toPage.TransactionRecord.push(n || 1)
        }else{
        	pageCache.homePageIndex = 2
        	toPage.tabbar.push()
        }

		   },
	    onBridgeReady(config){
				WeixinJSBridge.invoke('getBrandWCPayRequest', config,(res)=>{
					console.log('购买数据',res)
					if(res.err_msg == "get_brand_wcpay_request:ok" ) {
						MessageBox.alert('购买成功!').then(() => {
    					this.paySuccess();
						});
					}
				});
			},
			handleSubmit(){
				let pay_way;
				this.checked.map(function(item){
					if(item.checked){
						pay_way = item.pay_way
					}
				})

		        if(!pay_way){
					this.alert('请选择支付方式');
					return;
		        }

				if(pay_way == 'gb'){
					gameApi.updateGCoin.send({orderId:this.orderId})
						.then(data=>{
							if(data.msg == 'success'){
								MessageBox.alert('购买成功!').then(() => {
        					this.paySuccess();
								});
							}else{
								MessageBox.alert(data.msg)
							}
						})
				}

				if(pay_way == 'zfb'){
					gameApi.alipayWapPay.send({
						orderId:this.orderId
					})
						.then(data=>{
							document.body.innerHTML= document.body.innerHTML + data
							var form = document.querySelector('form')
							form.submit()
						})
				}

				if(pay_way == 'wx'){
					var ua = window.navigator.userAgent.toLowerCase();
					if(ua.match(/MicroMessenger/i) == 'micromessenger'){
						let openId = localStorage.getItem('openId')
						gameApi.weChatPublicSignalPay.send({orderId:this.orderId,openId})
							.then(data=>{
								if(data.msg == 'success'){
									let config= {
										appId:data.data.appId,
										timeStamp: String(data.data.timeStamp),
										nonceStr:data.data.nonceStr,
										package:data.data.package,
										signType:"MD5",
										paySign:data.data.paySign
									}
									if (typeof WeixinJSBridge == "undefined"){
										if( document.addEventListener ){
											document.addEventListener('WeixinJSBridgeReady', ()=>this.onBridgeReady(config), false);
										}else if (document.attachEvent){
											document.attachEvent('WeixinJSBridgeReady', ()=>this.onBridgeReady(config));
											document.attachEvent('onWeixinJSBridgeReady', ()=>this.onBridgeReady(config));
										}
									}else{
										this.onBridgeReady(config);
									}
								}
							})
					}else{
						gameApi.weChatOutH5Pay.send({orderId:this.orderId, ip:returnCitySN["cip"]})
							.then(data=>{
								console.log(data)
								if(data.msg == 'success'){
									location.href = data.data.mwebUrl
								}
							})
						// MessageBox.alert('请在微信中打开完成支付')
					}
				}
			}
		},
		components:{
		},
	    created(){
	      let {delGbi} = pageCache;
	      if(delGbi){
	      	this.checked.pop();
	        pageCache.delGbi = null;
	      }
	    },
	    computed:{
			showPrice(){
				return this.checked[2] && this.checked[2].checked ? this.GBPrice : this.price
			}
	    },
		mounted(){
			let params = this.$route.params
			this.GB = location.href.slice(-2) == 'GB'
			this.orderId = params.orderId;
		    gameApi.queryOrderMessage.send({orderId : params.orderId}).then(({status,data})=>{
		        this.price = data.orderMoney || params.price;
		        this.toGB()
		    })

		},
	}
</script>
<style src='./index.scss' lang="scss" rel="stylesheet/scss" scoped></style>



