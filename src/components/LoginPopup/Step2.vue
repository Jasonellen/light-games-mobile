<template>
  <div class="login-type-2 login-box">
    <div class="login-content">
      <div class="cell-fromline">
        <input type="password" placeholder="请输入密码" v-model="psd1">
      </div>
      <div class="cell-fromline">
        <input type="password" placeholder="请再次输入密码" v-model="psd2">
      </div>
      <div class="cell-fromline cell-line-last">
        <input type="text" class="name" placeholder="请输入你的昵称" v-model="name">
      </div>
    </div>
    <div class="next-btn next-btn-2" @click="nextClick">完成注册</div>
  </div>
</template>

<script>

  import stepCache from './stepCache';
  import initUser from 'core/firstLoad';
	export default {
		name : 'step2',
    data(){
      return {
        psd1 : '',
        psd2 : '',
        name : ''
      }
    },
    methods :{
      nextClick() {
        let {psd1:userPwd,psd2:userCheckPwd,name:userNickname} = this;
        let tips;
        if(!userNickname)tips = '请输入昵称';
        if(!userPwd || !userCheckPwd)tips = '请输入密码';
        if(userPwd != userCheckPwd)tips = '两次密码输入不一致';
        if(tips){
        	this.alert(tips);
        	return;
        }
        let {phone:userPhone,code} = stepCache.step1Cache;
        gameApi.saveUser.send({
        	userPhone,userPwd,userNickname,userCheckPwd,
          type : 'save'
        }).then(({status,msg})=>{
          if(status == 200){
            this.$emit('jumpStep',3);
            this.alert('注册成功');
          }else{
          	this.alert(msg);
          }
        })
        //开始完成注册
      }
    },
    created(){
    	if(!stepCache.step1Cache)this.$emit('jumpStep',1);
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
