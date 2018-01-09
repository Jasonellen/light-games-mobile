<template>
  <li>
    <div class="clearfix top">
      <div class="fl name clearfix">
        <img class="fl" :src="item.user_photo" alt="">
        <span class="fl">{{item.user_nicekname}}</span>
      </div>
      <div class="time fr"><span>{{item.create_date}}</span></div>
    </div>
    <div class="commenBody">
      <p class="commen">{{item.comment_text}}</p>
      <p @click="huifu(item)" class="commenOrter" v-for="children in item.children">{{children.user_nicekname}}：{{children.comment_text}}</p>
      <slot></slot>
      <div class="clearfix bottom" v-if="!hidePre">
        <span class="fl jubao" @click="jubao(item)">举报</span>
        <span class="fr huifu" @click="huifu(item)">回复</span>
        <span class="fr zan" @click="dianzan(item)"  v-if='item.comment_status == 0'>
                <img src="../../assets/zan.svg" alt="">赞
              </span>
        <span class="fr zan active" @click="dianzan(item)" v-else>
                <img src="../../assets/zan1.svg" alt="" >赞
          </span>
      </div>
    </div>
  </li>
</template>

<script>
  import pageCache from 'core/pageCache';
  export default {
    name : 'PingLun',
    props : {
      item : {type : Object,},
      hidePre : {default : false}
    },
    methods : {
      //举报
      jubao(item){
      	let {comment_id : id} = item;
        alertBox.checkLogin(isLogin=>{
        	if(isLogin){
            pageCache.jubao = {...item};
            toPage.Report.push(id);
          }
        })
      },
      //点赞
      dianzan({comment_grade:commentGrade,comment_id:commentId,comment_status}){
        alertBox.checkLogin(isLogin=>{
          if(!isLogin)return;
          if(comment_status == 1){
            this.alert('已经点赞过');
            return;
          }
          gameApi.udpateUserCommentGrade.send({
            commentGrade,commentId
          }).then(({status})=>{
            if(status == 200){
              this.item.comment_status = 1;
            }
          })
        })

      },
      huifu({comment_id}){
        alertBox.checkLogin(isLogin=>{
          isLogin && toPage.commenOrter.push(comment_id);
        })
      }

    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  li {
    background: #fff;
    .top {
      padding: 40px 32px 38px 28px;
      .name {
        img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin-right: 28px;
        }
        span {
          font-size: 30px;
          color: #333;
          line-height: 60px;
        }
      }
      .time {
        line-height: 60px;
        font-size: 24px;
        color: #999;
        span {
          margin-left: 10px;
        }
      }
    }
    .commenBody {
      padding-left: 116px;
      padding-right: 32px;
      p {
        font-size: 26px;
        color: #333;
        line-height: 45px;
        margin-bottom: 20px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
      .commenOrter {
        background: #f7f7f7;
        // height: 155px;
        width: 100%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        padding: 15px;
      }
      .bottom {
        border-bottom: 1px solid #d2d2d2;
        padding-bottom: 20px;
        font-size: 24px;
        color: #999;
        .zan {
          margin-right: 20px;
          padding-left: 36px;
          // background: url(../../assets/zan.svg) no-repeat left center;
          background-size: 30px 28px;
          width: 85px;
          display: inline-block;
          img{
            width: 24px;
            vertical-align: text-top;
          }
        }
        .zan.active{
          color:#146ef5
        }
        .huifu {
          padding-left: 31px;
          background: url(../../assets/huifu.png) no-repeat left center;
          background-size: 25px 25px;
        }
        .jubao {
          padding-left: 36px;
          background: url(../../assets/jubao.svg) no-repeat left center;
          background-size: 30px 28px;
        }
      }
    }
  }
</style>
