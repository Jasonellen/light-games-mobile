<template>
  <div class="pd-head ConsultationDetails_page">
    <my-header title="资讯详情"></my-header>
    <div class="ConsultationDetails_title">
      {{info.title}}
    </div>
    <p class="ConsultationDetails_from clearfix">
      <span class="fl">{{info.author}}</span>
      <span class="fr">{{info.time | filterTime}}</span>
    </p>
    <div class="ConsultationDetails_conetent" v-html="info.content">

    </div>
    <div class="ConsultationDetails_footer">
      <div class="fl">
        <img src="../../assets/pinglunfc.svg"/>
        <input v-model="commentVal" type="text" placeholder="评一下"></input>
      </div>
      <div class="fr" v-if="!commentVal.length" @click="goCommentCount">
        <img src="../../assets/pinglunfc1.svg"/>
        <span>{{info.commentCount | commentFilter}}</span>
      </div>
      <div class="fr" v-else @click="comment">
        发送
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name : 'ConsultationDetails_title',
    data(){
      return{
        commentVal : '',//评论文本
        info : {}
      }
    },
    methods : {
      comment(){
        alertBox.checkLogin(isLogin=>{
        	if(!isLogin)return;
          let {commentVal:commentText} = this;
          let {id:articleId,commentCount:commentGrade} = this.info;
          let {flag2:articleType} = this.$route.params;
          gameApi.insertComment.send({articleId,commentGrade,articleType,commentText}).then(({status,msg})=>{
            if(status == 200){
              toPage._back();
            }else{
              this.alert(msg)
            }
          })
        })
      },
      goCommentCount(){
        alertBox.checkLogin((isLogin)=>{
          if(isLogin){
            let {flag:id,flag2} = this.$route.params;
            toPage.AllComments.push(`${id}/${flag2}`);
          }
        })

      }
    },
    created(){

      let {flag:id} = this.$route.params;
      gameApi.findGameDetalsById.send({id}).then(result=>{
        this.info = result.data || {};
      })
    }
  }
</script>


<style src='./index.scss' lang="scss" rel="stylesheet/scss"></style>
