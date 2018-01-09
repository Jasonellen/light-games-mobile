<template>
  <mt-loadmore :bottom-method="loadBottom" bottomLoadingText="" :bottom-all-loaded="allLoaded" ref="loadmore">
    <span slot="bottom"></span>
    <div class="my-game-tab-page pd-head">
      <my-header title="所有评论">
      </my-header>
      <p class="sum">有{{all}}条评论</p>
      <h2 class="tisp">热门评论</h2>
      <ul>
        <PingLun
          v-for="(item,index) in commentList"
          :key="index"
          :item="item"
        />
      </ul>
      <div class="clearix goCommen">
      <span class="fl s1">
        <input type="text" v-model="commentVal" placeholder="评一下">
      </span>
        <span class="fr s2" @click="comment">发送</span>
      </div>
    </div>
  </mt-loadmore>
</template>

<script>
  import Paging from 'core/Paging';
  export default {
    data(){
      return{
        commentList:[],
        allLoaded : true,
        commentVal : '',
        all : ''
      }
    },
    methods:{
      comment(item){

        alertBox.checkLogin(isLogin=>{
          if(!isLogin)return;
          let {commentVal:commentText} = this;
          if(commentText.trim()){
            let {flag2:articleType,flag:articleId} = this.$route.params;
            gameApi.insertComment.send({articleId,articleType,commentText}).then(({status,msg})=>{
              if(status == 200){
                toPage._back();
              }else{
                this.alert(msg)
              }
            })
          }
        })


      },
      send(){
        this.searchComment.send().then(result=>{
          let {status,data} = result;
          if(status === 200){
            let {totalRow,pageSize,curIndex,result} = data;
            this.commentList.push(...(result || []));
            this.allLoaded = curIndex >= Math.ceil(totalRow/pageSize);
            this.$refs.loadmore.onBottomLoaded();
            this.all = totalRow;
          }
        })
      },
      loadBottom(){
        this.searchComment.curIndex++;
        this.send();
      }
    },
    created(){
      let {flag:articleId,flag2:articleType} = this.$route.params;
      this.searchComment = new Paging({
        articleId,
        articleType,
      },gameApi.findComment.send)
      this.send();
    },
  }
</script>
<style src='./index.scss' lang="scss" rel="stylesheet/scss" scoped></style>

