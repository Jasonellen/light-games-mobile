<template>
	<mt-header :title="title">
	  <router-link to="/tabbar" slot="left">
	    <mt-button icon="back"></mt-button>
	  </router-link>
		<router-link to="/tabbar" slot="right">
	 	 <mt-button >{{tips}}</mt-button>
		</router-link>
	</mt-header>
</template>

<script>
	import { Header } from 'mint-ui';
	export default {
		props:['title','tips']
	}
</script>

<style src='./index.scss' lang="scss" rel="stylesheet/scss"></style>
