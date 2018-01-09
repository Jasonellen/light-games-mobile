<template>
  <div class="vip-type-page pd-head">
    <my-header :title="vipTitle"></my-header>
    <div class="vip-top">
      <div class="vip-swipe">
        <swiper :options="swiperOption" ref="xxxx">
          <swiper-slide v-for="(url,i) in banners" :key="i">
            <img :src="url" alt="">
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <div class="vip-info-list">
      <ul>
        <li v-for="({label,value,key},index) in vipInfoList" key="{{index}}" @click='quanClick(label)'>
          <span class="fl">{{label}}</span>
          <span class="fr" v-if="label == '优惠劵'" >&yen;{{couponValue || 0}}</span>
          <span v-else class="fr">&yen;{{filterVal(value,key)}} </span>
        </li>
      </ul>
    </div>
    <div class="vip-day" v-if="isVip && day !=undefined">
      您的{{vipType}}剩余: {{day}}天
    </div>
    <div class="foot-box" @click="submit" v-show="!isHideSubmit">
      <span class="fl">{{submitText}}</span>
    </div>
    <mt-picker :slots="slots" :showToolbar='true' :slot="1" @change="onValuesChange" v-if='pickerShow'>
      <div name='slot' @click='hidePicker'>
        <span>取消</span>
        <span :style="{float:'right'}">确定</span>
      </div>
    </mt-picker>
  </div>
</template>

<script>
  const silver = require('@/assets/silver.png');
  const gold = require('@/assets/gold.png');
  const diamond = require('@/assets/diamond.png');
  import userInfo from 'core/userInfo'
  import {MessageBox, Picker} from 'mint-ui'
  export default {
    name : 'vip-type-page',
    data(){
      let {vipStatus} = userInfo;
      let isVip = vipStatus ? true : false;
      let level = isVip ? vipStatus - 1 : 1;
      return{
        pickerShow:false,
        vipType : ['黄金会员','白金会员','钻石会员'][level],
        isVip,
        vipTitle : isVip ? '会员中心' : '会员类别',
        banners: [ gold,silver, diamond ],
        vipInfoList : [
          {label : '会员费',value : [],key : 'recharge'},
          {label : '押金',value : [],key : 'deposit'},
          {label : '往返邮费',value : [],key : 'charges'},
          {label : '优惠劵',value : [],key : 'coupon'},
          {label : '总价',value : [],key : 'total'},
        ],
        couponId:'',
        couponValue:'',
        day : '',
        level,
        swiperOption: {
          setWrapperSize :true,
          observeParents:true,
          spaceBetween : 30,
          initialSlide : level,
          onSlideChangeEnd: swiper => {
            this.level = swiper.realIndex;
          },
        },
        slots: [
          {
            flex: 1,
            values: [1,12,13,14],
            className: 'slot',
            textAlign: 'center'
          }
        ]
      }
    },
    computed : {
      isHideSubmit(){
        let {isVip,level} = this;
        return isVip && (level+1 < userInfo.vipStatus);
      },
      submitText(){
        let {isVip,level} = this;
        if(!isVip)return '去支付';
        return level+1 > userInfo.vipStatus ? '去升级' : '去续费';
      }
    },
    methods : {
      filterVal(val,type){
        let oldVal = val;
        let {level,isVip} = this;
        val = val[level];
        try {
          if(type === 'coupon'){
            val = val || [];
            val = (val[0] || {}).couponValue;
          }
          if(type === 'total' && this.isVip){
            val = val - this.vipInfoList.filter(({key})=>(key === 'deposit'))[0].value[this.level];
          }
          if(type === 'total'){
            val = val - (this.couponValue || 0);
            if(isVip){
              val = val - this.vipInfoList[1].value[userInfo.vipStatus - 1]
            }
          }
          if(type === 'deposit' && this.isVip){
            val += `(已交￥${oldVal[userInfo.vipStatus - 1]})`
          }
        }catch (e){
          val = 0;
        }
        return val || 0;
      },
      toPay(memberMonth,couponId,userMemberLevel,apiName){
        gameApi[apiName].send({memberMonth,couponId,userMemberLevel})
        .then(({status,data})=>{
          if(status != 200)return;
          log('memberMonth',memberMonth)
          toPage.Pay.push(`${data}/${this.vipInfoList[this.vipInfoList.length-1].value[this.level * memberMonth]}`)
        })
      },
      //支付按钮
      submit(){
        let {isVip,level} = this;//couponId
        if(isVip){
          if(userInfo.vipStatus > level + 1){

          }else if(userInfo.vipStatus == level + 1){
            MessageBox.prompt('请输入续租月数',{
              inputType : 'number',
              confirmButtonText : '续费',
            }).then(({ value, action }) => {
              value = value.trim();
              if(action === 'confirm'){
                this.toPay(value,this.couponId,level + 1,'generateRenewMemberOrder')
              }
            }).catch(result=>{})
          }else{
            this.toPay(1,this.couponId,level + 1,'generateMemberUpdateOrder')
          }

        }else{
          this.toPay(1,this.couponId,level + 1,'generateMemberOrder')
        }

      },
      onValuesChange(picker,values){

        if(values[0]){
          if(this.vipInfoList[3].value[0].length>0){
            this.couponId = this.vipInfoList[3].value[0].map(function(item){
              return item.couponValue == values[0] ? item.couponId : ''
            })[0]
            this.couponValue = values[0]
          }
        }

      },
      hidePicker(value){
        this.pickerShow = false
      },
      quanClick(label){
        if(label == '优惠劵' && this.vipInfoList[3].value[0].length>0){
          this.couponId = this.vipInfoList[3].value[0][0].couponId
          this.couponValue = this.vipInfoList[3].value[0][0].couponValue
          this.pickerShow = true
        }
      }
    },
    created(){
      gameApi.findMemberInfo.send().then(({status,data}) => {
        this.day = (data.filter(({day})=>day !== undefined)[0] || {}).day;
        data = data.sort((n1,n2)=> n1.memberType - n2.memberType);
        this.vipInfoList = this.vipInfoList.map((item,index)=>{
          let arr = data.map((item2)=>(item2[item.key]))
          return {...item,...{value : arr}}
        })
        let arr =['','']
        this.vipInfoList[3].value[0].map(function(item){
          arr.push(item.couponValue)
        })
        this.slots[0].values = arr
      })
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" src="./index.scss">

</style>
