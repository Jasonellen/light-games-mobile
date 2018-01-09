/*
 * 首次加载页面需要请求的信息
 * **/

import userInfo from './userInfo';



export default function initUser(){
  //查询会员等级
  gameApi.findUserMemberLevel.send({},{isSearchVip : true}).then(result=>{
    let {status,data} = result;
    if(status === 200){
      userInfo.vipStatus = data.userMemberLevel;
      userInfo.userLevel = data.userIdentity;
      // userInfo.userLevel = '';
    }
  })
}


