<template>
  <div ref="scrollBox" class="mt-loadmore-1" @scroll="scroll">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name : 'mt-loadmore',
    props : {
      'bottomMethod' : {
        type : Function,
      },
      'bottomAllLoaded' : {
        type : Boolean,
      },
      'bottomRange' : {
        type : Number,
        default : 40,
      }
    },
    data(){
      return {
        isLoad : false,
      }
    },
    mounted(){
      this.$scrollBox = this.$refs.scrollBox;
    },
    methods : {
      onBottomLoaded(){
        this.isLoad = true;
        let scrollBox = this.$scrollBox;
        let {scrollHeight,offsetHeight} = scrollBox;
        if(scrollHeight < offsetHeight){
          this.toLoad();
        }
      },
      toLoad(){
        if(!this.bottomAllLoaded && this.isLoad){
          this.isLoad = false;
          this.bottomMethod && this.bottomMethod();
        }
      },
      scroll(){
        let scrollBox = this.$refs.scrollBox;
        let {scrollTop,scrollHeight,offsetHeight} = scrollBox;
        if(scrollTop + offsetHeight > scrollHeight - this.bottomRange){
          log('ssssssssss')
          this.toLoad();
        }
      }
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  .mt-loadmore-1{
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
