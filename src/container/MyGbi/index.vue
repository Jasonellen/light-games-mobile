<template>
  <div class="pd-head">
	 <my-header title="我的G币"></my-header>
	<div class="header">
		<div class="headImg">
			<img src="../../assets/header.png" alt="">
		</div>
		<p>我的G币：{{userGCoin}}</p>
	</div>
	<ul class="list">
		<li @click='Gclick'>
			<a  class="clearfix">
				<p class="fl" >G币充值</p>
				<i class="icon fr"></i>
			</a>
		</li>
		<li>
			<router-link to='/InvitingFriends' class="clearfix">
				<p class="fl">邀请好友</p>
				<i class="icon fr"></i>
			</router-link>
		</li>
		<!--<li>
			<router-link to='/Detailed' class="clearfix">
				<p class="fl col-999">平台所有支付</p>
			</router-link>
		</li>
		<li>
      <p class="fl col-999">点击广告</p>
		</li>
		<li>
      <p class="fl col-999">点击评论</p>
		</li><li>
    <p class="fl col-999">下载游戏</p>
		</li>-->
	</ul>
    <p class="tisp">G币是什么？</p>
        <p class="tisp">G币是电玩之光平台通用货币，可以通过充值、邀请注册、点击广告等方式获取。</p>
        <p class="tisp">获取G币之后，可以在平台上购买、租赁游戏，可用于抵扣人民币支付。</p>
          <!-- <li>黄金会员、钻石会员充值G币将分别获取9.8折以及9.5折的优惠。</li>-->
        <br/>
        <p class="tisp">如何获取更多G币</p>
          <p class="tisp">1、进行所有平台的支付</p>
          <p class="tisp">2、点击广告</p>
          <p class="tisp">3、点赞评论</p>
          <p class="tisp">4、下载游戏</p>
  </div>
</template>

<script>
import Vue from 'vue';
import { MessageBox } from 'mint-ui';

// Vue.component(Cell.name, Cell);
	export default {
		data (){
			return {
        userGCoin : ''
			}
		},
		methods: {
			Gclick(){
				MessageBox.prompt('请输入充值G币数额',{
		          inputType : 'number'
		        }).then(({ value, action }) => {
		          gameApi.generateGCoinOrder.send({gCoin:value})
		            .then(data=>{
		              if(data.msg == 'success'){
		                toPage.Pay.push(`${data.data}/${value}#GB`)
		              }
		            })
		        }).catch(result=>log(result))
			}
		},
		components:{
		},
		created(){
      //查询用户G币
      gameApi.findUserGCoin.send().then(({data})=>{
        this.userGCoin = data.userGCoin;
      })
    },
	}
</script>
<style src='./index.scss' lang="scss" rel="stylesheet/scss" scoped></style>



