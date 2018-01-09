
<template>
	<!-- <transition name="router-fade" mode="out-in"></transition> -->
	<router-view></router-view>
</template>

<style src='./less/common.scss' lang="scss"></style>
<style lang="scss" scoped>
	.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .2s;
	}
	.router-fade-enter, .router-fade-leave-active {
	  	opacity: 0;
	}
</style>
