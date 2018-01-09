<template>
  <div class="login-type-1 login-box">
    <h3>注册</h3>
    <div class="login-content">
      <div class="cell-fromline">
        <input type="number" max-length="11" v-model="phone" placeholder="请输入手机号">
      </div>
      <div class="cell-line2">
        <div class="cell-fromline fl">
          <input type="number" max-length="8" v-model="code" placeholder="请输入验证码">
        </div>
        <div class="fr yzm-btn" @click="getCode">{{codeText}}</div>
      </div>
    </div>
    <div class="next-btn" @click="nextClick"></div>

    <p class="text-des"><a href="javascript:;" @click="$emit('jumpStep',3);">已有账号？马上登陆</a></p>
  </div>
</template>

<script>
  import stepCache from './stepCache';
  export default {
    name : 'step1',
    data(){
      return {
        phone : '',
        code : '',
        codeText : '获取验证码',
      }
    },
    timer : null,
    run : false,
    beforeDestroy (){
      clearTimeout(this.$options.timer)
    },
    methods: {
      nextClick(){
        let {phone,code} = this;
        phone = phone.trim();
        code = code.trim();
        let tips;
        if(!code)tips = '请输入验证码';
        if(!phone.isPhone())tips = '请输正确的手机号码';
        if(tips){
          this.alert(tips);
          return;
        }
        gameApi.checkIdentifyingCode.send({phone,code}).then(({status,msg})=>{
          if(status === 200){
            this.$emit('jumpStep',2);
          }else{
            this.alert(msg);
          }
        })

        stepCache.step1Cache = {
          phone,code
        }
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
        gameApi.sendRegisterMessage.send({phone}).then(result=>{
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
    },

  }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
