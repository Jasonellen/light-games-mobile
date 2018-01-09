const vipIcon = require('img/huiyuanzhongxin.svg');//会员中心
const addressIcon = require('img/shouhuoxinxi.svg');//我的收货信息
const inviteIcon = require('img/yaoqinghaoyou.svg');//邀请好友
const platformIcon = require('img/zulinguize.svg');//平台租赁规则
const issueIcon = require('img/changjianwenti.svg');//常见问题
const contactIcon = require('img/lianxiwomen.svg');//联系我们
const arrowRight = require('img/arrowRight.svg');
const defaultUserImg = require('img/bugbag.png');


import userInfo from 'core/userInfo'

export default {
  name : 'mine',
  data(){
    let vipLevel = '+加入会员';
    if(userInfo.vipStatus){
      vipLevel = ['黄金会员','白金会员','钻石会员'][userInfo.vipStatus - 1] || this.vipLevel;
    }
    return{
      mt : {'margin-top':'30px'},
      list : [
        {icon : vipIcon,label : '会员中心',arrow : arrowRight ,link : '/vipType'},
        {icon : addressIcon,label : '我的收货信息',arrow : arrowRight ,link : '/address'},
        {icon : inviteIcon,label : '邀请好友',arrow : arrowRight ,link : '/InvitingFriends'},
        {icon : platformIcon,label : '平台租赁规则',arrow : arrowRight ,link : '/rule'},
        {icon : issueIcon,label : '常见问题',arrow : arrowRight ,link : '/Question'},
        {icon : contactIcon,label : '联系我们',arrow : arrowRight ,link : '/ContactUs'},
      ],
      userNickname : '',//用户名称
      userGCoin : '',//用户G币
      userBalance : '',//用户余额
      userSynopsis : '',//用户简介
      userHeadSculpture : '',//用户图像路劲
      userRentCount : '',//租数量
      userBuyCount : '',//购买数量
      jyjl : '',//交易记录
      vipLevel,
      dwName : '',
      userId : '',
      phone : '',
    }
  },
  computed : {
    //用户头像图片 如果没有 就用默认的
    userImg(){
      return this.userHeadSculpture || defaultUserImg;
    }
  },
  
  methods : {
    goPage(index){
      let item = this.list[index];
      if(!index){
        alertBox.goVipPage();
        return;
      }
      let {link} = item;
      link && toPage._push(link);
    },
    uploadImg(e){
      let file = e.target.files[0];
      let config = {
        apiType : 'file',
        headers:{'Content-Type':'multipart/form-data'}
      };  //添加请求头
      gameApi.userUploadPhoto.send({
        imgFile : file
      },config).then(({data,status})=>{
        if(status == 200 && data){
          this.userHeadSculpture = data;
        }
        
      })
    },
    myBalance(){
      toPage.myWallet.push();
    },
    toYsf(){
      ysf.config({
          uid:this.userId,
          email:'test@163.com',
          name:this.dwName,
          mobile:this.phone,
          success: function(){     // 成功回调
            console.log('电玩会员咨询客服');
            location.href = ysf.url();
          },
          error: function(){  // 错误回调
            console.log('匿名用户咨询客服');
            location.href = ysf.url();
          }
      });
    },
    toEdit(){
      alertBox.checkLogin(function (isLogin) {
        isLogin && toPage.EditData.push();
      })
    }
  },
  
  created(){
    //查询用户资料
    gameApi.findUserMessage.send().then(({data})=>{
      let {userMemberLevel,userNickname,userSynopsis,
        userPhoto,userRentCount,userBuyCount,userBalance,userId,phone,
        userCount,wantPlayCount
      } = data;
      this.userNickname = userNickname;
      this.userSynopsis = userSynopsis;
      this.userHeadSculpture = userPhoto;
      this.userRentCount = wantPlayCount;
      this.userBuyCount = userCount;
      this.userBalance = userBalance;
      this.dwName = (userMemberLevel ? ['黄金会员','白金会员','钻石会员'][userMemberLevel] : '')+ '-' + userNickname;
      this.userId = userId;
      this.phone = phone;
    })
    //查询用户G币
    gameApi.findUserGCoin.send().then(({data})=>{
      this.userGCoin = data.userGCoin;
    })
    
    //交易记录
    gameApi.findUserTransaction.send().then(result=>{
        this.jyjl = result.data;
    })
    
  }
}
