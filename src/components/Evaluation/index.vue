<template>
	<div class="commetsStar">
    <img :src="star" alt="">
    <div :style="{width:activeWith+'px',height:'30px'}">
       <img :src="starActive" alt="">
    </div>
  </div>
</template>

<script>
  const star = require('img/xingxing.svg');
  const starActive = require('img/xingxing1.svg');
	export default {
		name : 'Evaluation',
    data(){
      return{
        star,
        starActive,
      }
    },
		props:{
      score : {type : Number,default : 2},
    	width : {type : Number,default : 0},
    },
    computed:{
      activeWith(){
        return this.score / 5 * 148
      }
    }
	}
</script>

<style  lang="scss" rel="stylesheet/scss">
  .commetsStar{
    position: relative;
    div{
      position:absolute;
      left:0;
      top:0;
      overflow:hidden;
    }
    img{
      width:148px;
    }
  }
</style>
