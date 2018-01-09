<template>
  <div class="pd-head" >
    <my-header title="举报" ></my-header>
    <div class="content">
      <p class="p1">我要举报的是‘@{{jubao.user_nicekname}}’发的评论:</p>
      <div class="p2"><p>{{jubao.comment_text}}</p></div>
      <p class="p3">请选择举报类型：</p>
      <ul class="clearfix">
        <li  class="clearfix" v-for="(item,index) in checkedList" :key="index">
          <div  @click='item.checked = !item.checked'  :class="['radio ',{'select' : item.checked}]">
            <input type="checkbox" :checked='item.checked' />
          </div>
          <label for="">{{item.label}}</label>
        </li>
        <li  class="clearfix last">
          <div  @click='textObj.checked = !textObj.checked'  :class="['radio',{'select' : textObj.checked}]">
            <input type="checkbox" :checked='textObj.checked' />
          </div>
          <textarea name="" id="" v-model="textObj.label" placeholder="其他 请输入"></textarea>
        </li>
      </ul>
      <button class="sub" @click="submit">提交</button>
    </div>
    <img src="../../assets/logo.png" alt="" class="logo">
  </div>
</template>

<script>
  import pageCache from 'core/pageCache';
  export default {
    data(){
      return{
        textObj:{
          checked : false,
          label : '',
          jubao : {},
        },
        checkedList : [
          {checked : false,label : '垃圾营销'},
          {checked : false,label : '淫秽色情'},
          {checked : false,label : '有害信息'},
          {checked : false,label : '人身攻击我'},
          {checked : false,label : '违法信息'},
          {checked : false,label : '违法链接'},
        ]
      }
    },
    methods: {
      select(index,checked){
        this.$set(this.checkedList[index],'checked',checked)
      },
      submit(){
        let arr = this.checkedList.filter(({checked})=>checked);

        this.textObj.checked && arr.push(this.textObj)

        if(!arr.length){
          this.alert('请选择一种');
          return;
        }else{
          arr = arr.map(({label})=>label);
        }

        let {flag:commentId} = this.$route.params;
        gameApi.insertReport.send({commentId,reportText : arr.join(',')}).then(({status,msg})=>{
          if(status !== 200){
            this.alert(msg);
          }else{
            toPage._back();
          }
        })
      }
    },
    components:{
    },
    created(){
      let {jubao} = pageCache;
      this.jubao = jubao;
      log(jubao)
    },
  }
</script>
<style src='./index.scss' lang="scss" rel="stylesheet/scss" spoced></style>

