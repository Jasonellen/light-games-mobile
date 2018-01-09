<template>
	<div class='pd-head'>
    <my-header title="编辑我的资料">
      <span slot='left' @click='_back'>取消</span>
      <span slot='right' @click ='toSave'>保存</span>
    </my-header>
    <div class="clearfix div h-150 mt-30">
      <p class="fl">头像</p>
      <div class="img fl" :style="{background:`url(${userPhoto})`}">

      </div>

      <i class="fr back"></i>
       <input class='imgUpload' type="file"  @change="uploadImg">
    </div>
     <div class="clearfix div">
      <label class='label' for="">名字：<input type="text" placeholder="请输入姓名" v-model="userNickname" maxlength="8"></label>
    </div>
     <div class="clearfix div">
      <label for="" class='label'>
        <span>简介: </span><textarea placeholder="请输入简介" v-model="userSynopsis" cols="30" rows="4"></textarea>
      </label>
    </div>
     <div class="clearfix div">
      <label class='label' for="">标签：<input type="text" placeholder="请输入标签" v-model="userLabel"></label>
    </div>
     <div class="clearfix">
      <!-- <p class="fl">性别</p> -->
      <mt-radio
        title="性别"
        v-model="userSex"
        :options="options">
      </mt-radio>
      <!-- <p class="p2 fl">{{userSex == 1 ? '男' : '女'}}</p>
      <i class="fr back"></i> -->
    </div>
     <div class="clearfix div" @click='openCity'>
      <p class="fl">城市</p>
      <p class="p2 fl">{{userCity}}</p>
      <i class="fr back"></i>
    </div>
     <div class="clearfix div" @click='openPicker'>
      <p class="fl">生日</p>
      <p class="p2 fl">{{userBirthday}}</p>
      <i class="fr back"></i>
    </div>
    <template>
    <mt-datetime-picker
      rotate-effect
      ref="picker"
      type="date"
      :startDate="startDate"
      :endDate="endDate"
      v-model="pickerValue"
      @confirm="handleConfirm"
    >
    </mt-datetime-picker>
    <CityPicker
      @on-finish="handleFinish"
      v-model="visible"
      :no_next='true'
     >
    </CityPicker>
    </template>
    <button class="out" @click='logOut'>退出登录</button>


	</div>
</template>

<script>
  import { DatetimePicker, Radio, MessageBox} from 'mint-ui';
  import CityPicker from 'vue-citypicker';//日期选择插件
  import pageCache from 'core/pageCache';
  import userInfo from 'core/userInfo';
	export default {
    data(){

      let _d = new Date();
      let _mind = new Date();
      _mind.setFullYear(1950);
      _mind.setMonth(0);
      _mind.setDate(1);
        return{
          personalData:[],
          userNickname:'',
          userSynopsis:'',
          userPhoto:'',
          userLabel:'',
          userSex:'1',
          userCity:'',
          cityCode:'',
          userBirthday : '1990-01-01',
          pickerValue:'1990-01-01',
          visible:false,
          options:[
            {
              label: '男',
              value: '1'
            },
            {
              label: '女',
              value: '2'
            }
          ],
          startDate : _mind,
          endDate : _d,
        }
    },
    methods:{
      //确定事件
      handleConfirm(date){
        let str = `${date.getFullYear()}-${String(date.getMonth() + 1).fillZero()}-${String(date.getDate()).fillZero()}`;
        this.userBirthday = str;
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
            this.userPhoto = data;
          }

        })
      },
      openPicker() {
        this.$refs.picker.open();
      },
      openCity(){
        this.visible = true
      },
      handleFinish(selected) {
        let {code: cityCode, name: cityName } = selected.province
        let {code: cityCode1, name: cityName1 } = selected.city
        this.userCity = cityName.indexOf('市')>0 ? cityName : cityName1
        this.cityCode = cityName.indexOf('市')>0 ? cityCode : cityCode1
      },
      toSave(){
        const {
          userNickname,
          userSynopsis,
          userLabel,
          userSex,
          userCity,
          cityCode,
          userBirthday,
        } = this
        gameApi.saveUser.send({
          userNickname,
          userSynopsis,
          userLabel,
          userSex,
          userCity,
          cityCode,
          userBirthday,
        })
          .then(data=>{
            if(data.msg =='success'){
              MessageBox.alert('保存成功').then(action => {
                toPage._back()
              });

            }
          })

      },
      logOut(){
        gameApi.outUser.send()
          .then(data=>{
            if(data.msg =='success'){
              MessageBox.alert('退出登陆成功').then(action => {
                userInfo.userLevel=''
                pageCache.homePageIndex = 0
                toPage.tabbar.push()
              });
            }
          })
      },
      _back(){
        toPage._back()
      }

    },
    components:{
      CityPicker,
		},
    mounted(){
      //查询用户资料
      gameApi.findUserMessage.send().then(({data})=>{
        this.userNickname = data.userNickname; //名字
        this.userSynopsis = data.userSynopsis; //简介
        this.userPhoto = data.userPhoto; //头像
        this.userLabel = data.userLabel; //标签
        this.userSex = data.userSex; //性别 1男 2 女
        this.pickerValue = data.userBirthday ? new Date(data.userBirthday) : this.pickerValue; //生日 userCity
        this.userBirthday = data.userBirthday ? data.userBirthday .split(' ').shift() : this.userBirthday; //生日 userCity
        this.userCity = data.userCity; //城市
      })
    },
    created(){
			document.body.style.backgroundColor='#f7f7f7';
    },
  }
</script>
<style src='./index.scss' lang="scss" rel="stylesheet/scss"></style>

