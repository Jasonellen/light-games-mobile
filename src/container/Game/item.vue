<template>
  <div>
    <img class='head' :src="item.goods_url" alt="">
    <div class="desc">
      <div class="top">
        <div class="left">
          <img :src="item.platform" alt="">
          <span>{{item.game_name_cn | filddd}}</span>
        </div>
        <div class="right">
          <span v-if='item.goods_rent_count'>租</span>
          <span v-if='item.goods_buy_count'>售</span>
        </div>
      </div>
      <div class="bottom">
        <div class="left">

          <!-- <img src="../../assets/XBOXONE.svg" alt="">
          <img src="../../assets/WII.svg" alt="">
          <img src="../../assets/PS4.svg" alt="">
          <img src="../../assets/SWITCH.png" height="34" width="34" alt=""> -->
          <Evaluation :score="item.score"/>
        </div>
        <div class="right">
          库存：{{item.goods_count}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  let XBOXONE = require('@/assets/XBOXONE.svg');
  let PS4 = require('@/assets/PS4.svg');
  let SWITCH = require('@/assets/SWITCH.png');
  let WII = require('@/assets/WII.svg');
  let VR = require('@/assets/VR.png');

	export default {
		name : 'item',
    props : {
      item : {type : Object}
    },
    mounted(){
      switch (this.item.platform){
        case 'VR':
          this.item.platform = VR;
          return
        case 'XBOXONE':
          this.item.platform = XBOXONE;
          return
        case 'PS4':
          this.item.platform = PS4;
          return
        case 'SWITCH':
          this.item.platform = SWITCH;
          return
        case 'WII':
          this.item.platform = WII;
          return
      }

    },
    filters : {
      filddd(val = ''){
        return val.length < 5 ? val : val.substring(0,5) + '...'
      }
    }
  }
</script>

