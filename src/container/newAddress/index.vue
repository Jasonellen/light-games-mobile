<template>
	<div class="home pd-head">
    <my-header :title="title"  >
      <div slot="right" @click="save">保存</div>
    </my-header>
     <div class="clearfix div mt-30">
      <p class="fl">收货人</p>
       <input maxlength="20" placeholder="请填写名字" v-model="name" type="text" class="p2 fl">
    </div>
     <div class="clearfix div">
      <p class="fl" >联系电话</p>
       <input type="text" placeholder="请填写手机号码" maxlength="11" v-model="tel" class="p2 fl">
    </div>
     <div class="clearfix div" @click="visible = !visible">
      <p class="fl">所在地址</p>
      <p class="p2 fl">{{addressText || '请选择'}}</p>
      <i class="fr back"></i>
    </div>
    <CityPicker
      @on-finish="handleFinish"
      v-model="visible"
      :defaultData='defaultData'></CityPicker>
     <div class="clearfix div2">
     <textarea name="" maxlength="100" id=""  v-model="xxdz" placeholder="请填写详细地址，不少于5个字"></textarea>
    </div>

    <div class="clearfix default">
      <p class="fl">设为默认</p>
      <div class="fr"><mt-switch v-model="defaultValue"></mt-switch></div>
    </div>

	</div>
</template>

<script>
import Vue  from 'vue'
import CityPicker from 'vue-citypicker';//日期选择插件
import pageCache from 'core/pageCache';
	export default {
    data() {
      return {
        title : '新增地址',
        visible: false,
        defaultData: [],
        selected: {},
        defaultData222 : [],
        defaultValue : false,//默认地址
        name : '',//用户名称
        tel : '',//联系电话
        xxdz : '',//详细地址
      };
    },
    created (){
    	let {address} = pageCache;
    	if(address){
        this.title = '修改地址';
        let {pid,cid,aid,pname,cname,aname,defaultLocation,details,locationId,phone,name} = address;

        this.defaultData = [pid || undefined,cid || undefined,aid || undefined];
        this.defaultData222 = [pname || undefined,cname || undefined,aname || undefined];
        this.name = name;
        this.tel = phone;
        this.defaultValue = defaultLocation == 1;
        this.xxdz = details;
        this.locationId = locationId;
      }
      pageCache.address = null;
    },
    methods : {
      handleFinish(selected) {
        this.selected = selected;
        this.defaultData222 = [selected.province.name, selected.city.name, selected.area.name];
        this.defaultData = [selected.province.code, selected.city.code, selected.area.code];
        log(this.defaultData222)
      },
      save(){
      	let {name,tel:phone,xxdz:details,defaultValue,defaultData,defaultData222} = this;
        let pid = defaultData[0];
        let pname = defaultData222[0];
        let cid = defaultData[1];
        let cname = defaultData222[1];
        let aid = defaultData[2];
        let aname = defaultData222[2];

        let errTetx;
        if(!name.trim()){
          errTetx = '请填写名字';
        }

        if(!phone.isPhone()){
          errTetx = '请填写正确的手机号码';
        }

        if(!details.trim()){
          errTetx = '请填写详细地址';
        }else{
          if(details.length < 5){
            errTetx = '详细地址不少于5个字';
          }
        }
        if(!pid || !pname || !cid || !cname){
          errTetx = '请填写完整的地址';
        }

        if(errTetx){
        	this.alert(errTetx);
        	return;
        }

        let params = {
          name,details,phone,pid,pname,cid,cname,aid,aname,
          defaultLocation : defaultValue ? 1 : 2
        }
        let {flag} = this.$route.params;
      	if(flag === 'edit' && this.locationId){
          params.locationId = this.locationId;
        }
        let apiName = flag === 'edit' ? 'updateUserLocation' : 'addUserLocation';
        gameApi[apiName].send(params).then(({status})=>{
          if(status === 200){
            toPage._back();
          }
        })
      }
    },
    components : {CityPicker},
    computed : {
        addressText(){
        	return this.defaultData222.join(' ')
        }
    },
  }
</script>
<style src='./index.scss' lang="scss" rel="stylesheet/scss"></style>

