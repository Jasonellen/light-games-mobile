<template>
	<div class="pd-head">
   <my-header title="邀请好友"></my-header>
    <div class="div1">
      <p class="p1">您的邀请码为</p>
      <p class="code">{{inviteCode}}</p>
      <p>{{text}}</p>
    </div>
    <div class="div2">
      <p class="p2">谁邀请您加入电玩之光？</p>
      <p>输入邀请人的邀请码</p>
      <div class="inputBox">
        <input type="text" v-model='value' >
        <button @click='submit'>提交</button>
      </div>
    </div>
	</div>
</template>

<script>
  import {MessageBox} from 'mint-ui';
	export default {
    data(){
        return{
          inviteCode:'',
          value:'',
          text : '',
        }
    },
    methods:{
      submit(){
        if(this.value == this.inviteCode){
          MessageBox.alert('不要输入自己的邀请码哦')
        }else{
          gameApi.inviteFriends.send({inviteCode:this.value})
            .then(data=>{
              if(data.msg == 'success'){
                MessageBox.alert('邀请码提交成功！')
              }else{
                MessageBox.alert(data.msg)
              }
            })
        }

      }
    },
    components:{
		},
    created(){
			document.body.style.backgroundColor='#f7f7f7';
      gameApi.getRandomStr.send()
        .then(data=>{
          if(data.msg == 'success'){
            this.inviteCode = data.data
          }
        })
      gameApi.getCouponValue.send().then(result=>{
      	this.text = result.data;
      })
    },
  }
</script>
<style src='./index.scss' lang="scss" rel="stylesheet/scss" scoped></style>

