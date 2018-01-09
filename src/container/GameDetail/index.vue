<template>
  <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="isLoad" ref="loadmore">
    <div slot="bottom"></div>
    <div class='GameDetail GameDetail-page pd-head'>
      <my-header title='游戏详情'><BuyIcon slot="right"/></my-header>
      <div class="head">
        <div class="content clearfix">
          <div class="fl imgCover" :style='{background:`url(${gameData.img})`,backgroundSize:"cover",border:"1px solid #ddd"}' @click='toPlay(gameData.game_name_cn)'>
            <!-- <video src="">
						  您的浏览器不支持 video 标签。
					  </video> -->
            <img src="../../assets/bofang.svg" alt="">
          </div>
          <div class="game-des">
            <h1>{{gameData.game_name_cn}}</h1>
            <p class="en-name">{{gameData.game_name_en}}</p>
            <div class='list'>
              <!-- <i style='color:#33a9fc'>{{gameData.platform}}</i> -->
              <img :src="gameData.platform" alt="">
            </div>
            <div>评分:<Evaluation :score="gameData.score"/></div>
            <p class="line-text">上市时间：{{gameData.create_date && gameData.create_date.slice(0,10)}}</p>
            <p class="line-text">游戏属性：{{gameData.game_type}}</p>
            <p class="line-text">官方中文：{{gameData.is_support_CN | supportCh}}</p>
            <div class='btn'>
              <i  @click="addWantPay(gameData.goods_id,1)">+加入想玩</i>
              <i :class="{disabled : disabled}" @click='addToShop(1)'>立即购买</i>
            </div>
          </div>
        </div>
      </div>
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">简介</mt-tab-item>
        <mt-tab-item id="2">资讯</mt-tab-item>
        <mt-tab-item id="3">攻略</mt-tab-item>
      </mt-navbar>

      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <div class='first'>
            <div class='descrip'>
              <p>{{gameData.game_summary}}</p>
              <!--<div class='more'>展开全部<img src="../../assets/arrowRight.svg" alt=""></div>-->
            </div>
            <h2>游戏精彩截图</h2>
            <div class='cut'>
              <div class="scroll">
                <div class="clearfix"  ref="onlyscroll" >
                  <div class="imgpic" v-for="({img_name},index) in imgList" :key="index"><img :src="img_name" alt=""></div>
                </div>
              </div>
              <div class='more' @click="lookmore">查看更多游戏截图<img src="../../assets/arrowRight.svg" alt=""></div>
            </div>
            <h2>玩家评论</h2>
            <div class='pinglun'>
              <p v-if="wjList.length <= 0">暂无评论</p>
              <ul>
                <PingLun
                  v-for="(item,index) in wjList"
                  :key="index"
                  :item="item"
                />
              </ul>
              <div class="send" @click="toCommentPage">
                <img src="../../assets/fapinglun.svg" alt="">
                <p>发评论</p>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div class='second'>
            <p v-if="zxList.length<=0">暂无咨询</p>
            <ul>
              <ZiXun
                v-for="(item,i) in zxList"
                :key="i"
                :item="item"
                type="1"
              />
            </ul>

          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <div class='second'>
            <p v-if="!glList.length">暂无攻略</p>
            <ul>
              <ZiXun
                v-for="(item,i) in glList"
                :key="i"
                :item="item"
                type="2"
              />
            </ul>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
      <div :class="{disabled : rentdisabled}"  class="rent rent-btn" @click='addToShop(2)'>立即租赁</div>
    </div>
  </mt-loadmore>
</template>

<script>
  import { Navbar, TabItem, TabContainer, TabContainerItem } from 'mint-ui';
  import Paging from 'core/Paging';
  let XBOXONE = require('@/assets/XBOXONE.svg');
  let PS4 = require('@/assets/PS4.svg');
  let SWITCH = require('@/assets/SWITCH.png');
  let WII = require('@/assets/WII.svg');
  let VR = require('@/assets/VR.png');

  export default {
    data(){
      return{
        selected:'1',
        gameData : {},
        zxList : [],//资讯列表
        maxZx : true,
        loadZx : true,//资讯是否已经到了最大值  默认都是最大值
        glList : [],//攻略列表
        maxGl : true,//攻略是否已经到了最大值
        wjList : [],//玩家评论列表
        maxWj : true,//玩家是否已到最大值
        imgList : [],//更多图片
        goodsId:'',
        goodsPrice:'',
        goodsRentPrice:'',
        disabled : true,
        rentdisabled:true,
      }
    },
    methods : {
      toPlay(name){
        toPage.gameVideo.push(name)
      },
      //游戏资讯  //攻略
      createdApi(obj){
        return new Paging(obj,gameApi.findGameDetals.send);
      },
      //资讯请求更多
      sendZx(){
        this.zxApi.send().then(({data,status})=>{
          if(status === 200){
            let {curIndex,totalRow,pageSize,result} = data;
            this.zxList.push(...result);
            this.maxZx = Math.ceil(totalRow/pageSize) <= curIndex;
            this.$refs.loadmore.onBottomLoaded();
          }
        })
      },
      //攻略请求更多
      sendGl(){
        this.glApi.send().then(({data,status})=>{
          if(status === 200){
            let {curIndex,totalRow,pageSize,result} = data;
            this.glList.push(...result);
            this.maxGl = Math.ceil(totalRow/pageSize) <= curIndex;
            this.$refs.loadmore.onBottomLoaded();
          }
        })
      },
      //玩家评论请求
      sendWj(){
        this.wjApi.send().then(({data,status})=>{
          if(status === 200){
            let {curIndex,totalRow,pageSize,result} = data;
            this.wjList.push(...result);
            this.maxWj = Math.ceil(totalRow/pageSize) <= curIndex;
            this.$refs.loadmore.onBottomLoaded();
          }
        })
      },
      //添加想玩
      addWantPay(goodsId,play){
        alertBox.checkLogin(isLogin=>{
          isLogin && gameApi.saveUserPlay.send({goodsId}).then(({msg,status})=>{
            this.alert(status === 200 ? '添加成功' : msg)
          })
        })
      },
      //下拉加载跟多
      loadBottom(){
        try{
          this[['wjApi','zxApi','glApi'][this.selected - 1]].curIndex++;
          this[['sendWj','sendZx','sendGl'][this.selected - 1]]();
        }catch (e){log('错了')}
      },
      addToShop(type){
        if(this.disabled && type == 1)return;
        if(this.rentdisabled && type == 2)return;
        alertBox.checkLogin(isLogin=>{
          isLogin && gameApi.putInShoppingCart.send({
            goodsId:this.goodsId,
            orderGoodsType:type,
            goodsPrice:this.goodsPrice,
            goodsRentPrice:this.goodsRentPrice,
            rentDay:type == 1 ? 0 : 10, amount:1
          })
          .then(data=>{
            if(data.msg == 'success'){
              this.alert('添加购物车成功')
            }else{
              this.alert(data.msg)
            }
          })
        })
      },
      //查看更多图片
      lookmore(){
        let {flag} = this.$route.params;
        toPage.gameImg.push(flag);
      },
      //去评论页
      toCommentPage(){
        let {flag} = this.$route.params;
        toPage.AllComments.push(`${flag}/0`)
      },
    },
    components: {

    },
    computed : {
      isLoad(){
        return [this.maxWj,this.maxZx,this.maxGl][this.selected - 1];
        this.$refs.loadmore.onBottomLoaded();
      }
    },
    mounted(){
      let {flag:gameId} = this.$route.params;
      console.log(gameId,333333)
      gameApi.findGameMethodById.send({gameId}).then(({data})=>{
        this.gameData = data;
        this.disabled = data.goods_buy_count <= 0;
        this.rentdisabled = data.goods_rent_count <= 0;
        let {game_name_cn:name} = data;
        this.zxApi = this.createdApi({name,type : 3});
        this.sendZx();

        this.glApi = this.createdApi({name,type : 14});
        this.sendGl();

        //玩家评论
        this.wjApi = new Paging({
          articleId : gameId,
          articleType : 0,
        },gameApi.findComment.send);
        this.sendWj();
        [this.goodsId,this.goodsPrice,this.goodsRentPrice] = [data.goods_id,data.goods_price,data.goods_rent_price];

        let platform;
        switch (this.gameData.platform){
          case 'VR':
            platform = VR;
            break;
          case 'XBOXONE':
            platform = XBOXONE;
            break;
          case 'PS4':
            platform = PS4;
            break;
          case 'SWITCH':
            platform = SWITCH;
            break;
          case 'WII':
            platform = WII;
            break;
        }
        this.gameData.platform = platform;
      })
      this.imgApi = new Paging({goodsId:gameId},gameApi.fndMxLoadImgByGoodsIdPage.send);
      this.imgApi.send().then(({data,status})=>{
        if(status === 200){
          this.imgList.push(...(data.result || []));
          let maxW = this.$refs.onlyscroll.offsetWidth;
          let len = this.imgList.length;
          this.$refs.onlyscroll.style.width = len < 3 ? '100%' :  Math.ceil(maxW/6 * len) + 20 + 'px';
        }
      })
    }
  }
</script>

<style src='./index.scss' lang="scss" rel="stylesheet/scss"></style>
