<template>
  <div class="forget_box">
    <h1>重置密码</h1>
    <div class="title">请输入注册时的手机号码</div>
    <input type="number" placeholder="请输入手机号码" v-model="phone">
    <div class="cell-line2">
      <div class="cell-fromline fl">
        <input type="number" max-length="8" v-model="code" placeholder="请输入验证码">
      </div>
      <div class="fr yzm-btn" @click="getCode">{{codeText}}</div>
    </div>
    <div class="next" @click="toForget1">下一步</div>
    <p class='back' @click="toHome">返回首页</p>
  </div>
</template>

<script>
  import axios from 'axios'
  import { MessageBox} from 'mint-ui';
  import initUser from 'core/firstLoad';
  import userInfo from 'core/userInfo';

	export default {
    data(){
			return{
        phone : '',
        code : '',
        codeText : '获取验证码',
      }
    },
    methods : {
      toForget1(){

        const { phone,code} = this
         gameApi.checkUserPwdCode.send({phone,code}).then(result=>{
            let {status,msg,data} = result;
            if(status == 200){
              toPage.forget1.push(phone)
            }else{
              this.alert(msg)
            }
         })
        
      },
      toHome(){
        toPage.tabbar.push()
      },
      //倒计时
      runTime(num){
        this.$options.timer = setTimeout(()=>{
          num--;
          if(num<=0){
            this.codeText = '获取验证码';
          }else{
            this.codeText = `${num > 10 ? num : '0' + num}s`;
            this.runTime(num);
            this.$options.run = false;
          }
        },1000)
      },
      //获取验证码
      getCode(){
        if(this.$options.run)return;
        let tips;
        let {phone} = this;
        phone = phone.trim();
        if(!phone)tips = '请输入手机号码';
        if(!phone.isPhone())tips = '请输入正确的手机号码';
        if(tips){
          this.alert(tips);
          return;
        }
        //发送验证码
        gameApi.updatePwdCode.send({phone}).then(result=>{
          let {status,msg,data} = result;
          if(status == 200){
            //如果返回的的是数字   那么进入倒计时
            let num = parseInt(data);
            if(num){
              this.runTime(num);
              this.$options.run = true;
              this.alert('验证码已发送')
            }
          }else{
            this.alert(msg)
          }
        })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" src='./index.scss'></style>
