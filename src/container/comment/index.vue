<template>
	<div class="my-game-tab-page pd-head">
   <my-header title="评论"></my-header>
    <textarea placeholder="请输入您的评论" @change='changeText'></textarea>
    <button class="submit" @click='handleSubmit'>发表评论</button>
	</div>
</template>

<script>
import { Toast } from 'mint-ui';
  export default {
    data(){
      return{
        commentText:'',
        type:'',
      }
    },
    methods:{
      changeText(e){
        this.commentText = e.target.value
      },
      handleSubmit(){
        const {commentText, articleId,type} = this
        gameApi.insertComment.send({commentText, articleId, articleType:type || 0})
          .then(data=>{
            if(data.msg == 'success'){
              Toast('评论成功')
              toPage.TransactionRecord.push(3)
            }else{
               Toast('评论失败，请稍后再试')
            }
          })
      }
    },
    components:{
    },
    created(){
      this.articleId = this.$route.params.articleId   //this.$route  和 this.$router
      let id = this.$route.params.articleId
      if(id.indexOf('*')>0){
        this.articleId = id.slice(0,-2)
        this.type = 6
      }else{
        this.articleId = id
      }
    },
  }
</script>

<style lang="scss" scoped>
textarea{
  background: #fff;
  padding: 35px;
  height: 630px;
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
