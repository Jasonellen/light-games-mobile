<template>
  <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
    <div slot="bottom"></div>
  <div class="pd-head imgList-page">
    <my-header title="游戏图片"></my-header>
    <ul class="imgList clearfix">
      <li v-for="({img_name},index) in imgList" :key='index' @click="showBig(index)">
        <img :src="img_name" alt="">
      </li>
    </ul>
    <transition name="router-fade">
    <div class="bg-pic" v-if="bg" @click="bg = null">
      <img :src="bg.img_name" alt="">
      <p>
        {{bg.index + 1}}/{{totalRow}}
      </p>
    </div>
    </transition>
  </div>
  </mt-loadmore>
</template>

<script>
  import Paging from 'core/Paging'
  export default {
    data (){
      return{
        imgList:[],
        allLoaded : true,
        bg : null,
        totalRow : '',
      }
    },
    methods : {
      showBig(index){
        this.bg = {...this.imgList[index],...{index}};
      },
      loadBottom(){
      	this.imgApi.curIndex++;
      	this.send();
      },
      send(){
        this.imgApi.send().then(({status,data})=>{
          if(status == 200){
          	let {result,totalRow,curIndex,pageSize} = data;
          	this.totalRow = totalRow;
          	this.imgList.push(...result);
            this.allLoaded = curIndex >= Math.ceil(totalRow/pageSize);
            this.$refs.loadmore.onBottomLoaded();
          }
        })
      }
    },
    created(){
      document.body.style.backgroundColor='#fff';
      let {flag:goodsId} = this.$route.params;
      this.imgApi = new Paging({goodsId,pageSize : 30},gameApi.fndMxLoadImgByGoodsIdPage.send);
      this.send();
    },
  }
</script>


<style lang="scss" scoped rel="stylesheet/scss">

  .imgList{
    padding:20px 10px 0;
    width: 100%;
    li{
      width: 223px;
      height: 223px;
      margin: 10px;
      float: left;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .bg-pic{
    height: 100%;
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 66;
    background: rgba(0,0,0,.4);
    line-height: 100vh;
    img{width: 100%;

    }
    p{line-height: 50px;height: 50px;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      color: #fff;
      padding: 0 20px;
    }
  }
  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .2s;
  }
  .router-fade-enter, .router-fade-leave-active {
    opacity: 0;
  }
</style>
