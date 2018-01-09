<template>
  <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
    <div
      class="Game Game-page pd-head"
    >
      <home-search :home="true"></home-search>
      <div class="inputBox box" @click='_back'>
        <p>{{buzzType}}</p>
        <i class="icon"></i>
      </div>
      <ul
        class='clearfix game-ul'
      >
        <li class='fl' ref='left'>
          <liItem
            v-for="(item,i) in lefts"
            :key="i" :item="item"
            @click.native="goGameDetail(item.goods_id)">
          </liItem>
        </li>
        <li class='fr' ref='right'>
          <liItem
            v-for="(item,i) in rights"
            :key="i" :item="item"
            @click.native="goGameDetail(item.goods_id)">
          </liItem>
        </li>
      </ul>
      <p class="not-good" v-if="!lefts.length && !rights.length">暂无游戏</p>
    </div>
  </mt-loadmore>
</template>

<script>
  import HomeSearch from 'pageview/HomeSearch';
  import liItem from './item.vue';
  import Paging from 'core/Paging';
  import preloadimages from 'core/preloadimages';
  import pageCache from 'core/pageCache'

  let XBOXONE = require('@/assets/XBOXONE.svg');
  let PS4 = require('@/assets/PS4.svg');
  let SWITCH = require('@/assets/SWITCH.png');
  let WII = require('@/assets/WII.svg');
  let VR = require('@/assets/VR.png');

  export default {
    data(){
      return{
        lefts:[],
        rights:[],
        allLoaded : true,
        buzzType:''
      }
    },
    methods: {
      goGameDetail(id){
        if(id != undefined){
          toPage.GameDetail.push(id);
        }
      },
      send(){

        this.findGame.send().then(({data,status})=> {
          if(status === 200 && data){
            let {totalRow,result,pageSize} = data;
            preloadimages(result).then(list=>{
              let leftHeight = this.$refs.left.offsetHeight;
              let rightHeight = this.$refs.right.offsetHeight;
              let {lefts,rights} = this;
              let larr = [],rarr = [];
              list.forEach((item)=>{
                let platform;
                switch (item.platform){
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
                item.platform = platform;

                let {imgHeight,reload} = item;
                if(!reload)return;
                if(leftHeight <= rightHeight){
                  larr.push(item);
                  leftHeight+= imgHeight;
                }else{
                  rarr.push(item);
                  rightHeight += imgHeight;
                }
              })
              this.lefts = [...lefts,...larr];
              this.rights = [...rights,...rarr];
              this.allLoaded = this.findGame.curIndex >= Math.ceil(totalRow/pageSize);
              this.$refs.loadmore && this.$refs.loadmore.onBottomLoaded();
            })

          }

        })
      },
      //上啦加载更多
      loadBottom(){
        if(this.allLoaded)return;
        this.findGame.curIndex += 1;
        this.send();
      },
      _back(){
        toPage._back()
      }
    },
    mounted(){
      let params = pageCache.allGameList;
      let arr = [];
      Object.keys(params).forEach((item,i)=>{
        arr.push(params[item]);
      })
       
      this.buzzType = arr.join(',');
      if(!params){
        toPage._back();
      }

      this.findGame = new Paging({...params,...{pageSize : 15}},gameApi.findCheckBoxGame.send);
      this.send();
    },
    components:{
      HomeSearch,liItem
    },
  }
</script>
<style src='./index.scss' lang="scss" rel="stylesheet/less"></style>
