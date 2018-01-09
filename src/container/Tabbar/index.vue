<template>
  <div>
	<mt-tabbar v-model="selected" :fixed='true'>
	  <mt-tab-item id="0" :class="{'is-selected':selected==0}">
	    <img slot="icon" :src='zhuye'>
	    主页
	  </mt-tab-item>
	  <mt-tab-item id="1" :class="{'is-selected':selected==1}">
	    <img slot="icon" :src="youxiku">
	    游戏库
	  </mt-tab-item>
	  <mt-tab-item id="2" :class="{'is-selected':selected==2}">
	    <img slot="icon" :src='wode'>
	    我的
	  </mt-tab-item>
	</mt-tabbar>
	<div v-if="selected == '0'">
		<Home @toYouXi='homeToGame'><banner :list="imgList" /></Home>
	</div>
	<div v-else-if="selected == '1'">
		<Game><banner :list="imgList" /></Game>
	</div>
	<div v-else><Mine /></div>
  </div>
</template>

<script>
	import { Tabbar, TabItem } from 'mint-ui';
	import Home from 'page/home';
	import Game from 'page/Game';
	import Mine from 'page/Mine';
	import banner from './banner.vue';
	import pageCache from 'core/pageCache';
	import userInfo from 'core/userInfo'

	const zhuye = require('img/zhuye.svg');
	const zhuye1 = require('img/zhuye-xuanzhong.svg');
	const youxiku = require('img/youxiku.svg');
	const youxiku1 = require('img/youxiku-xuanzhong.svg');
	const wode = require('img/wode.svg');
	const wode1 = require('img/wode-xuanzhong.svg');

	export default {
		data(){
			return{
				selected: pageCache.homePageIndex || 0,
        		imgList : [],
			}
		},
		methods: {
			homeToGame(){
				this.selected =1
			}
		},
	    watch : {
	      selected (newVal,oldVal){
	        pageCache.homePageIndex = newVal;

	        if(String(newVal) === '2'){
	            alertBox.checkLogin((userLevel)=>{
	            	if(!userLevel)this.selected = oldVal;
	            })
	          }
	      }
	    },
	    computed:{
	    	zhuye(){
				return this.selected == 0 ? zhuye1 : zhuye
	    	},
    		youxiku(){
				return this.selected == 1 ? youxiku1 : youxiku
    		},
    		wode(){
				return this.selected == 2 ? wode1 : wode
    		},
	    },
		components:{
			Home,
			Game,
	        Mine,
	        banner
		},
		created(){
			localStorage.setItem('orderId','')
			this.selected = pageCache.homePageIndex || 0;
	        gameApi.findUnLoadImg.send().then(result=>{
	            let {status,data} = result;
	            if(status === 200){
	            	this.imgList = data;
	            }
	        })
	    },
	}
</script>
<style lang="scss" rel="stylesheet/scss">
  .banner{
    width: 100%;
    height: 422px;
    overflow:hidden;
    .swiper-slide{
      float: left;
    }
    div{
      // height: 100%;
      img{width: 100%;height: 100%;}
    }
  }
</style>
