<template>
	<div class="path-tree-page">
    <h1>说明</h1>
    <div>
      这个项目用的是 mint-ui    地址
      <a href="http://mint-ui.github.io/#!/zh-cn" target="_blank">http://mint-ui.github.io/#!/zh-cn</a>
      <br>
      所有的页面写在 container目录里面  方式 目录名/文件名.vue
      <br>
      所有有关页面的组件写在conponents目录里面  方式 目录名/...vue文件名
      <br>
      公用的组件写在template里面 方式  ...vue 文件名  公用组件挂载到vue.component里面
      conponents ->  core/components.js

    </div>
	</div>
</template>

<script>
	export default {
		name : 'pathtree',
    mounted(){
			this.alert(213)
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .path-tree-page{
    font-size: 24px;
  }
</style>
