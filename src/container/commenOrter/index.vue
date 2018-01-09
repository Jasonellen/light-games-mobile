<template>
  <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
    <div class="my-game-tab-page pd-head">
      <my-header title="回复"></my-header>
      <ul>
        <PingLun
          v-if="item"
          :item="item"
          :hidePre="true"
        >
          <p class="commenOrter" v-for="item in list">{{item.user_nicekname}}：{{item.comment_text}}</p>

        </PingLun>
      </ul>

      <div class="clearix goCommen">
      <span class="fl s1">
        <input type="text" v-model="commentVal" placeholder="回复Ta">
      </span>
        <span class="fr s2" @click="comment">发送</span>
      </div>
    </div>
  </mt-loadmore>
</template>
<!--findCommentById-->
<!--findChildrenComment-->
<script>

  import Paging from 'core/Paging'
  export default {
    data(){
      return{
        commentVal :'',
        item : null,
        allLoaded : true,
        list : [],
      }
    },
    methods:{
      comment(){
        alertBox.checkLogin(isLogin=>{
          if(!isLogin)return;
          let {commentVal:commentText} = this;
          if(!commentText){
            this.alert('请输入回复内容');
            return;
          }
          let {flag:parentId} = this.$route.params;
          let {article_id:articleId,article_type:articleType} = this.item;
          gameApi.insertComment.send({parentId,articleId,articleType,commentText}).then(result=>{
            let {msg,status} = result;
            if(status == 200){
              this.alert('回复成功');
              this.requires();
              this.commentVal = '';
            }else{
              this.alert(msg)
            }
          })
        })

      },

      send(){
        this.pApi.send().then(result=>{
          let {status,msg} = result;
          if(status === 200){
            let {result:list,totalRow,pageSize,curIndex} = result.data;
            if(curIndex === 1){this.list = []}
            this.list.push(...list);
            this.allLoaded = curIndex >= Math.ceil(totalRow/pageSize);
            this.$refs.loadmore.onBottomLoaded();
          }else{
            this.alert(msg)
          }
        })
      },
      loadBottom(){
        if(this.allLoaded)return;
        this.pApi.curIndex++;
        this.send();
      },
      requires(){
        let {flag:commentId} = this.$route.params;
        this.pApi = new Paging({commentId,pageSize : 20,},gameApi.findChildrenComment.send);
        this.send();
      }
    },
    created(){
      let {flag:commentId} = this.$route.params;
      gameApi.findCommentById.send({commentId}).then(result=>{
        this.item = result.data;
      })
      this.requires();
    },
  }
</script>

<style lang="scss" scoped>
  .orterBox{
    background: #fff;
    height: 180px;
    padding-top: 20px;
  }
  .orter{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    height: 160px;
    margin: 0 24px ;
    background: #f7f7f7;
    width: 700px;
    font-size: 30px;
    color: #999;
    line-height: 45px;
    padding: 15px;
  }
  textarea{
    background: #fff;
    padding: 35px;
    height: 540px;
    width: 100%;
    color: #333;
    font-size:30px;
    line-height: 40px;
  }

  textarea::-webkit-input-placeholder{
    font-size: 30px;
    color: #999;
  }

  .submit{
    height: 98px;
    background: #26a2ff;
    font-size: 30px;
    color: #fff;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
  }
</style>
