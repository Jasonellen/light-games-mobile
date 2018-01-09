<template>
  <div class="login-type-3 login-box">
    <h3>登陆</h3>
    <div class="login-content">
      <div class="cell-fromline">
        <input type="tel" max-length="11" placeholder="请输入手机号码" v-model="phone">
      </div>
      <div class="cell-fromline">
        <input type="password" placeholder="输入密码" v-model="pwd">
      </div>
      <p class='forget' @click='toForget'>忘记密码？</p>
    </div>
    <div class="h-35"></div>
    <div class="next-btn next-btn-2" @click="nextClick">登陆</div>
    <p class="text-des"><a href="javascript:;" @click="$emit('jumpStep',1)">还没有账号？马上注册</a></p>
  </div>
</template>

<script>
  import axios from 'axios'
  import { MessageBox} from 'mint-ui';
  import initUser from 'core/firstLoad';
  import userInfo from 'core/userInfo';

	export default {
		name : 'step3',
    data(){
			return{
        phone : '',
        pwd : ''
      }
    },
    methods : {
      toForget(){
        this.$emit('jumpStep',0);
        toPage.forget.push()
      },
      nextClick(){
        let {phone:username,pwd:password} = this;
        username = username.trim();
        password = password.trim();
        let tips;
        if(!password)tips = '请输入密码';
        if(!username)tips = '请输入用户名';
        if(tips){
          this.alert(tips);
          return;
        }
        gameApi.login.send({
          userPhone : username,
          password
        }).then((result)=>{
        	let {status,msg,data} = result;
          if(status == 200){
          	let {uid:Hid,token:Htoken} = data;
            userInfo.setHead({Hid,Htoken})//设置头信息
            initUser();//请求会员信息
            this.alert('登录成功');
            this.$emit('jumpStep',0);
          }else{
            this.alert(msg);
          }

        })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
