<template>
  <div @click="toDetail(item.game_id)">
    <img class='head' :src="item.goods_url" alt="">
    <div class="desc">
      <div class="top">
        <div class="left">
          <img :src="item.platform" alt="">{{item.game_name_cn}}
        </div>
        <div class="right">
          <span>租</span>
          <span>售</span>
        </div>
      </div>
      <div class="bottom clearfix">
        <div class="left">
          <Evaluation :score="item.score"/></div>
        </div>
        <div class="right fr">
          库存：{{item.goods_count}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	export default {
		name : 'item',
    props : {
      item : {type : Object}
    },
    methods : {
      toDetail(id){
        toPage.GameDetail.push(id);
      }
    }

  }
</script>

