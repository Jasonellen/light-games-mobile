<template>
	<div class="my-game-tab-page pd-head">
   <my-header title="交易记录">
     <img src="../../assets/back1111.svg" slot='left' alt="" @click='toMineHome' class='back'>
   </my-header>
    <div class="tab-nav">
      <div :class="{cur:select == 1}" @click='changeSelect(1)'>正在交易</div>
      <div :class="{cur:select == 2}" @click='changeSelect(2)'>完成交易</div>
      <div :class="{cur:select == 3}" @click='changeSelect(3)'>交易评价</div>
    </div>
     <div class="play-list-warp">
      <ul class="play-list" v-show='select == 1'>
        <li>
          <common :type= '1'></common>
        </li>
      </ul>
      <ul class="play-list" v-show='select == 2'>
        <li>
          <common :type= '2'></common>
        </li>
      </ul>
      <ul class="play-list" v-show='select == 3'>
        <li>
          <common :type= '3'></common>
        </li>
      </ul>
    </div>
	</div>
</template>

<script>
import common  from './common.vue'
 import pageCache from 'core/pageCache';

	export default {
    data(){
        return{
          open:false,
          select:1,
          going:[],
          over:[],
          comments:[]
        }
    },
    methods:{
        openFn(){
          this.open=!this.open;
        },
        changeSelect(id){
          this.select = id
        },
        toMineHome(){
          pageCache.homePageIndex = 2;
          toPage.tabbar.push();
        },
    },
    components:{
      common,
		},
    created(){
      this.select = this.$route.params.id
    },
  }
</script>

<style lang="scss" src="./index.scss" rel="stylesheet/scss"></style>
