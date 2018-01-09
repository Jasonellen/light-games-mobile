<template>
	<header class="my-head" :title="title" fixed>
    <div class="head-left">
      <img v-if="!$slots.left" class="back-icon" @click="handleClick" src="../../assets/back1111.svg" alt="">
      <slot name="left"></slot>
    </div>
    <div class="head-title">{{title}}</div>
    <div class="head-right">
      <slot name="right"></slot>
    </div>
	</header>
</template>

<script>
	export default {
		name : 'my-header',
		props:{
    	leftText : {type : String,default : ''},
    	title : {type : String},
      hideLeft : {type : Boolean,default : false},
    },
		methods : {
      handleClick(){
      	toPage._back();
      }
    }
	}
</script>

<style src='./index.scss' scoped lang="scss" rel="stylesheet/scss"></style>
