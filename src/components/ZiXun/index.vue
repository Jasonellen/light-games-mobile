<template>
  <li class="box"
      @click="goSingleZx(item.id)"
  >
    <div class="item">
      <h3>
        <i class="iconHot"></i>
        {{item.title}}
      </h3>
      <p>
        {{item.title_desc}}
      </p>
      <div class="listfooter clearfix">
        <span class="fl">{{item.time && item.time.slice(0, 10)}}</span>
        <span @click.stop="goSingleComment(item.id)" class="news fr"><img :src='pinglun' class='newss'>{{item.commentCount | commentFilter}}</span>
      </div>
    </div>
    <img :src="item.img">
  </li>
</template>

<script>
  let pinglun = require('@/assets/pinglun.svg');
  export default {
    name : 'ZiXun',
    data(){
      return{
        pinglun,
      }
    },
    props : {
      item : {type : Object,},
      type : {type : String,}
    },
    methods : {
      //进入单个资讯页面
      goSingleZx(id){
        toPage.ConsultationDetails.push(`${id}/${this.type}`);
      },
      //进入单个资讯评论页面
      goSingleComment(id){
        toPage.AllComments.push(`${id}/${this.type}`);
      },
    }
  }
</script>
<style  lang="scss" rel="stylesheet/less" scoped>
  li{
    background: #fff;
    margin-bottom: 8px;
    padding: 0 40px;
    div{
      margin-right: 24px;

      h3{
        font-size: 30px;
        color: #333;
        margin: 20px 0;
        white-space:nowrap;
        text-overflow:ellipsis;
        overflow:hidden;
        line-height:1.2;
      }
      p{
        font-size: 24px;
        color: #666;
        line-height: 30px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        margin-bottom: 22px
      }
      .listfooter{
        border-top:1px solid #eee;
        height: 58px;
        span{
          line-height: 58px;
          font-size: 22px;
          color: #999;
        }
        .newss{
          width:23px;
          height:22px;
          vertical-align: top;
          margin-right: 5px;
        }

      }
    }
    img{
      margin-top: 20px;
      width:160px;
      height:160px;
    }
  }
</style>
