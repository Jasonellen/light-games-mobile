<template>
  <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
  <div
    class="Game Game-page pd-head"
  >
		<home-search :home="true"></home-search>
    <div class="banner">
      <slot></slot>
    </div>
		<div class="all_game">
			<div class="left" @click="gameSelect(0)">
				所有游戏<img src="../../assets/arrowRight.svg" alt="">
			</div>
			<div class="right">
				<span @click="gameSelect(1)">新品大作</span>
				<span class='has_border' @click="gameSelect(2)">中文游戏</span>
        <span style='border-right:1px solid #bfbfbf' @click="gameSelect(3)">PS4独占</span>
				<span @click="gameSelect(4)">二手</span>
			</div>
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
  </div>
  </mt-loadmore>
</template>

<script>
	import HomeSearch from 'pageview/HomeSearch';
	import liItem from './item.vue';
  import Paging from 'core/Paging';
	import preloadimages from 'core/preloadimages';

	let defaultindex = 0;

	const gameSelectType = [
    {gameType:'all'},
    {gameType:'newGame'},
    {gameType:'language', gameName:'zh_CN'},
    {gameType:'PS4独占'},
    {gameType:'secondHand'},
  ]


	export default {
		data(){
			return{
				lefts:[],
				rights:[],
        allLoaded : true
			}
		},
		methods: {
      send(){
        this.findGame.send().then(({data,status})=> {
          if(status === 200 && data){
          	let {totalRow,result,pageSize} = data;
            preloadimages(result).then(list=>{
              let leftHeight = this.$refs.left && this.$refs.left.offsetHeight;
              let rightHeight = this.$refs.right && this.$refs.right.offsetHeight;
              let {lefts,rights} = this;
              let larr = [],rarr = [];
              list.forEach((item)=>{
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
              this.$refs.loadmore.onBottomLoaded();
            })
          }

        })
      },
      //重置选择游戏条件
      resetLoad(obj = {}){
        this.lefts = [];
        this.rights = [];
        this.send();
      },
      //上啦加载更多
      loadBottom(){
        if(this.allLoaded)return;
        this.findGame.curIndex += 1;
        this.send();
      },
      goGameDetail(id){
        if(id != undefined){
          toPage.GameDetail.push(id);
        }
      },
      //选择游戏类别
      gameSelect(index){

      	if(!index){
      		toPage.gameClassify.push();
      		return;
        }

      	if(defaultindex === index)return;
        defaultindex = index;
        this.createFindGame();
        this.resetLoad();
      },
      //创建查找游戏实例
      createFindGame(){
        this.findGame = new Paging(gameSelectType[defaultindex],gameApi.findNewGame.send);
      }
		},
    created(){
      defaultindex = 0;
      this.createFindGame();
      this.send();
      if(localStorage.getItem('youxikuNew')){
        this.gameSelect(1)
      }
    },
    beforeDestroy(){
      localStorage.setItem('youxikuNew','')
    },
		components:{
			HomeSearch,liItem
		},
	}
</script>
<style src='./index.scss' lang="scss" rel="stylesheet/less"></style>
