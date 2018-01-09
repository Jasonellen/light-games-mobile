<template>
  <div class="forget_box">
    <h1>重置密码</h1>
    <div class="title">请重设您的账号密码</div>
    <input type="password" placeholder="请输入新密码" v-model="newPwd">
    <input type="password" placeholder="请输入确认密码" v-model="cNewPwd">
    <div class="next" @click="handleSubmit">提交</div>
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
        phone:this.$route.params.id,
        newPwd : '',
        cNewPwd : '',
      }
    },
    methods : {
      handleSubmit(){
        const { phone,newPwd,cNewPwd } = this
        if(newPwd !== cNewPwd){
          this.alert('两次输入的密码不一致！')
          return
        }
        gameApi.updateUserPwd.send({phone,newPwd,cNewPwd}).then(result=>{
            let {status,msg,data} = result;
            if(status == 200){
              toPage.ForgetResult.push()
            }else{
              this.alert(msg)
            }
         })
      },
      toHome(){
        toPage.tabbar.push()
      }
    },
    mounted(){
      console.log(this,111)
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" src='./index.scss'></style>
