<template>
  <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
  <div class="home-page pd-head">
		<home-search :home="true"></home-search>
    <div class="banner">
			<slot></slot>
    </div>
    <ul class="classify box" >
      <li
        v-for="({url,label,to},i) in listLayout"
        :key="i"
        @click='handleClick(to,i)'
      >
        <img :src="url"/>
        <p>{{label}}</p>
      </li>
    </ul>
    <h2 class="title">新手必读</h2>
    <div class="novice">
      <ul class="noviceList clearfix">
        <li
          v-for="({title,sub,to},i) in noviceList"
          :key="i"
          @click = 'handleMiddle(to)'
        >
          <h3>{{title}}</h3>
          <p>{{sub}}</p>
        </li>
      </ul>
    </div>
    <h2 class="title">游戏资讯</h2>
    <ul class="gameList">
      <ZiXun
        v-for="(item,i) in zxList"
        :key="i"
        :item="item"
        type="1"
      />
    </ul>
  </div>
  </mt-loadmore>
</template>

<script>

  const img1 = require('img/juhuasuanhuiyuan.svg');
  const img2 = require('img/xinpinshangxian.svg');
  const img3 = require('img/renqidanpin.svg');
  const img4 = require('img/zhujizhunin.svg');


	import HomeSearch from 'pageview/HomeSearch'
  import Paging from 'core/Paging';
	import { Swipe, SwipeItem } from 'mint-ui';
	export default {

		data(){
			return {
        listLayout : [
          {url : img1,label : '聚划算会员', to:'vipType'},
          {url : img2,label : '新品上线', to:'youxiku'},
          {url : img4,label : '主机租赁', to:'youxiku'},
        ],
        //会员计划
        noviceList : [
          {title : '会员计划',sub : '三种会员任你选', to:'vipType'},
          {title : '租赁规则',sub : '熟悉股则方便租凭', to:'rule'},
          {title : 'G币使用',sub : '充值G币更实惠', to:'MyGbi'},
        ],
        //资讯列表
        zxList : [],
        allLoaded : true
      }
    },
		methods: {
      send(){
        this.zxApi.send().then(result=>{
          let {status,data,msg} = result;
          if(status === 200){
            let {totalRow,result,pageSize} = data;
            this.zxList.push(...result)
            this.allLoaded = this.zxApi.curIndex >= Math.ceil(totalRow/pageSize);
            this.$refs.loadmore && this.$refs.loadmore.onBottomLoaded();
          }
        })
      },
      loadBottom(){
      	this.zxApi.curIndex++;
      	this.send();
      },

      handleClick(to,i){
        if(to == 'vipType'){
          alertBox.goVipPage();
        }else if(i==1){
          localStorage.setItem('youxikuNew',true)
          this.$emit('toYouXi')
        }else{
          this.$emit('toYouXi')
        }
      },
      handleMiddle(to){
        if(to == 'vipType'){
          alertBox.goVipPage();
        }else{
          toPage[to].push()
        }

      }
		},
		components:{
			HomeSearch,
		},
		created(){
      this.zxApi = new Paging({
      	type : 3,
        name : ''
      },gameApi.findGameDetals.send);
      this.send();

      var ua = window.navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        if(~location.href.indexOf('code') != 0){
            let index = location.href.indexOf('?')
            let code = location.href.slice(index+1).split('&')[0].split('=')[1]
            gameApi.getOpenId.send({code})
              .then(data=>{
                if(data.msg == 'success'){
                  localStorage.setItem('openId',data.data)
                  log('存的openId=',data.data)
                }
              })
        }else{
          location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx472917457f235065&redirect_uri=${encodeURIComponent("http://m.gloryvg.com")}&response_type=code&scope=snsapi_base&state=#wechat_redirect`
        }
      }

    },
	}
</script>


<style src='./index.less' lang="scss" rel="stylesheet/less" scoped></style>
