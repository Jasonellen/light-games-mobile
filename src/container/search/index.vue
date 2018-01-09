<template>
  <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
	<div class="my-game-tab-page search-page pd-head">
     <header class="clearfix search-head">
      <div class="box fl">
        <i class="sousuo" @click="searchClick"></i>
        <input
          type="text"
          v-model="keyWord"
          class="item"
          placeholder="搜索"
          ref="searchIpt"
        />
      </div>
      <i class="fr cancel"  v-if='keyWord' @click="searchClick">搜索</i>
      <i class="fr cancel" @click="back" v-else>取消</i>
    </header>
   <div  v-show="!isShowGameList">
     <div class="history">
       <h2>历史搜索</h2>
       <ul  class="clearfix">
         <li v-for="(item,i) in list" :key="i" @click="searchSeart(item)">{{item}}</li>
       </ul>
     </div>
     <div class="host">
       <h2>热门搜索</h2>
       <ul class="clearfix">
         <li
           v-for="(item,index) in hotSearchList"
           :key="index"
           @click="hotSearch(item)"
         >{{item.hot_word}}</li>
       </ul>
     </div>
   </div>
    <div class="play-list-warp" v-show="isShowGameList">

      <p class="p-search-empty" v-show="!gameList.length">没有搜到商品哦</p>

      <ul class="play-list">
        <li>
          <div class="top">
            <div class="top-body" v-for="item in gameList"  @click="toDetail(item.goods_id)">
              <div class="pic-box">
                <img :src="item.goods_url" alt="">
              </div>
              <div class="des">
                <p class="name">{{ item.game_name_cn }} <span >({{item.game_name_en}})</span></p>
                <p class="p2">
                  <span>版本：港行</span>
                </p>
                <p class="p3">购买价：￥{{ item.goods_price }} <font>市场价：￥{{ item.goods_price }}元</font></p>
              </div>
            </div>
          </div>

        </li>

      </ul>
    </div>
	</div>
    </mt-loadmore>
</template>

<script>

  import Paging from 'core/Paging';
  const hisName = '_SEARCHHIS_TORYNAME_'

	export default {
    data(){
        return{
          keyWord:'',//关键字查询
          list : [] ,//历史搜索列表
          isShowGameList :false,//是否显示游戏列表
          gameList: [],//游戏列表
          allLoaded : true,
          hotSearchList : [],//热门搜索
        }
    },
    methods:{
      toDetail(id){
        toPage.GameDetail.push(id);
      },
      searchClick(){
        let { keyWord } = this;
        if(!keyWord)return;
        this.searchSeart(keyWord);
        this.setHistry(keyWord);
      },
      //开始搜索
      searchSeart(keyWord){
        //创建搜索实例
        this.createdSearchApi({
          gameType:'gameName',
          gameName:keyWord,
        });
        this.keyWord = keyWord;
        this.gameList = [];
        this.send();
      },
      //热门搜索点击
      hotSearch({hot_id : gameId,hot_word : gameName}){
        //创建搜索实例
        this.createdSearchApi({
          gameType:'gameName',
          gameName,
        });
        this.keyWord = gameName;
        this.gameList = [];
        this.send();
      },
      send(){
        this.findGame.send().then(result=>{
          let {status,msg} = result;
          if(status === 200){
            let {result:searchData,totalRow,pageSize} = result.data;
            this.gameList.push(...searchData);
            this.isShowGameList = true;
            this.allLoaded = this.findGame.curIndex >= Math.ceil(totalRow/pageSize);
            this.$refs.loadmore.onBottomLoaded();
          }else{
            this.alert(msg)
          }
        })
      },
      createdSearchApi(params){
      	  this.findGame = new Paging(params,gameApi.findNewGame.send)
      },
      //获取搜索历史记录
      getHistory() {
        let list = local.get(hisName);
        if(list){
          try{
            list = JSON.parse(list)
          }catch (e){}
        }else{
          list = [];
        }
        return list;
      },
      //设置历史记录
      setHistry(val){
        let searHistoryList = this.getHistory();
        searHistoryList.unshift(val);
        while(searHistoryList.length > 20)searHistoryList.pop();
        searHistoryList = _.uniq(searHistoryList);
        local.set(hisName,JSON.stringify(searHistoryList));
        this.list = searHistoryList;
      },
      //返回上一页
      back(){
      	toPage._back();
      },
      //下拉加载
      loadBottom(){
        this.findGame.curIndex++;
        this.send();
      }
    },
    watch:{
      isShowGameList(newVal){
        !newVal && (this.allLoaded = true);
      }
    },
    mounted(){
      let _this = this;
      this.$refs.searchIpt.onfocus = function () {
        _this.isShowGameList = false;
      }
      this.$refs.searchIpt.focus();
      this.list = this.getHistory();

      //热门搜索
      gameApi.findGameHotSale.send().then(({data})=>{
        data = data || [];
        this.hotSearchList.push(...data);
      })
    },

  }
</script>

<style lang="scss" src="./index.scss" rel="stylesheet/scss" scoped></style>
