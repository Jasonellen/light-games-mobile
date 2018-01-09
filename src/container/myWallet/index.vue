<template>
  <div class="myWalet">
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <div class="my-game-tab-page pd-head">
        <my-header title="我的钱包">
          <div slot='right' class="mx-right" ><router-link  to="/Detailed">明细</router-link></div>
        </my-header>
        <p class="p1">余额</p>
        <p class="p2">{{balance}}<font>（元）</font></p>
        <div class="box text">
          <p class="item" @click="showTiXian">提现</p>
          <p class="item" @click='addBalance'>充值</p>
        </div>
        <div class="div1"></div>
        <p class="p3">优惠劵</p>
        <ul class="juan">
          <li class="box" v-for="item in conponList">
            <div class="left">
              <p class="num"><font>￥</font>{{item.couponValue}}</p>
              <p>使用条件:{{item.couponDescription}}</p>
              <p>使用期限：{{item.couponStartDate | time}}至{{item.couponEndDate | time}}</p>
            </div>
            <div class="right item" :class="{disabled:isInValid(item)}"
                 @click="toGameHome(item)">{{couponText(item)}}</div>

          </li>

        </ul>
      </div>
    </mt-loadmore>
    <div :class="['bankModal',{active:bankModal}]">
      <div class='body'>
        <mt-field label="姓名" placeholder="请输入姓名" v-model="username"></mt-field>
        <mt-field label="银行" placeholder="请输入银行" v-model="bank"></mt-field>
        <mt-field label="卡号" placeholder="请输入卡号" v-model="bankCard"></mt-field>
        <mt-field label="金额" placeholder="请输入金额" type="number" v-model="money"></mt-field>
        <div class='btn'>
          <mt-button type="default" @click='bankModal = false'>取消</mt-button>
          <mt-button type="primary" @click='tiXian'>确定</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Paging from 'core/Paging';
  import pageCache from 'core/pageCache';
  import {MessageBox, Field, Button} from 'mint-ui';
  export default {
    data(){
      return{
        open:false,
        balance:'',
        allLoaded : true,
        conponList : [],

        username:'',
        bank:'',
        bankCard:'',
        money:'',
        bankModal:false
      }
    },
    methods:{
    	//提现金
      showTiXian(){
      	if(!this.balance){
      		this.alert('您的账户目前没有余额');
      		return;
        }
        this.bankModal = true;
      },
      //当有效的实话  返回 null   过期返回1   没到时间返回2
      isInValid({couponStartDate = '',couponEndDate = ''}){
      	let curDate = +new Date();
        let start = (new Date(couponStartDate)).getTime();
        let end = (new Date(couponEndDate)).getTime();

        if(start > curDate)return 2;
        if(end < curDate)return 1;
        return null;
      },
      couponText(item){
        let status = this.isInValid(item);

        return !status ? '立即使用' : (status == 1 ? '已过期' : '未开始');
      },
      loadBottom(){
        this.conponApi.curIndex++;
        this.send();
      },
      openFn(){
        this.open=!this.open;
      },
      send(){
        this.conponApi.send().then(({status,data})=>{
          if(status == 200){
            let {result,totalRow,pageSize,curIndex} = data;
            this.conponList.push(...result);
            this.allLoaded = curIndex >= Math.ceil(totalRow/pageSize);
            this.$refs.loadmore.onBottomLoaded();
          }
        })
      },
      toGameHome(item){
      	if(this.isInValid(item))return;
        pageCache.homePageIndex = 1;
        toPage.Shopping.push();
      },
      addBalance(){
        MessageBox.prompt('请输入充值金额',{
          inputType : 'number'
        }).then(({ value, action }) => {
          gameApi.generateBalanceOrder.send({balance:value})
          .then(data=>{
            if(data.msg == 'success'){
              pageCache.delGbi = true;
              toPage.Pay.push(`${data.data}/${value}`)
            }
          })
        }).catch(result=>log(result))
      },
      tiXian(){
        const {username,bank,bankCard,money,balance} = this
        if(!username || !bank || !bankCard || !money)return;
        let text;
        if(!money){
          text = '请输入提现金额';
        }
        if(money === '0'){
          text = '提现金额必须大于0';
        }
        if(balance > money){
          text = '提现金额不能大于余额';
        }
        if(text){
          this.alert(text);
          return;
        }
        gameApi.withdrawMoney.send({
          withdrawMoney:money,
          bankName:bank,
          bankCard,
          withdrawName:username
        })
        .then(data=>{
          if(data.msg =='success'){
            this.bankModal = false
            MessageBox.alert('申请提现成功')
          }
        })
      }
    },
    filters : {
      time(val){
        val = val || '';
        return val.split(' ').shift();
      }
    },
    components:{
    },
    created(){
      document.body.style.backgroundColor='#fff';
      this.conponApi = new Paging({},gameApi.queryAllOrUseConpon.send);
      this.send();
      gameApi.findUserBalance.send()
      .then(data=>{
        if(data.msg == 'success'){
          this.balance = data.data.result.userBalance
        }
      })



    },
  }
</script>

<style lang="scss" src="./index.scss" rel="stylesheet/scss"></style>
