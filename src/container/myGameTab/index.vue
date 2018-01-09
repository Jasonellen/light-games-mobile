<template>
  <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
	<div class="my-game-tab-page pd-head">
    <my-header title="我的游戏">

    </my-header>
    <div class="tab-nav">
      <div :class="{cur : curIndex === 0}" @click="curIndex=0">在玩</div>
      <div :class="{cur : curIndex === 1}" @click="curIndex=1">想玩</div>
    </div>

    <div class="play-list-warp">
      <ul class="play-list" v-if="curIndex === 0">
        <li v-for="item in inThePlayList">
          <div class="top">
            <div class="top-body">

              <div class="pic-box">
                <img :src="item.url" alt="">
              </div>
              <div class="des">
                <p class="name">{{item.gameNameCn}} <span>({{item.gameNameEn}})</span></p>
                <p class="p2">
                  <span>{{item.inThePlay}}人在玩</span>
                  <span>{{item.wantGame}}人想玩</span>
                </p>
                <p class="p3" v-if="item.order_goods_type == 2">
                  剩余归还时间{{item.day}}天{{item.hour}}小时
                </p>
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="fr" v-if ='item.orderGoodsType == 1'>
              <div class="pay-btn" :class="{disabled:item.goods_buy_count <= 0}" @click="buyOrRent(item,1)">再次购买</div>
            </div>
            <div class="fr" v-else>
              <div class="pay-btn" :class="{disabled:item.goods_buy_count <= 0}" @click="buyOrRent(item,1)">再次购买</div>
              <div class="pay-btn" v-show="item.orderGoodsType != 3" @click="inThePlayGive(item)">归还</div>
              <div class="pay-btn" :class="{disabled:item.goods_rent_count <= 0}" @click="inThePlayRelet(item)">续租</div>
            </div>
          </div>
        </li>
      </ul>
      <ul class="play-list" v-if="curIndex === 1">
        <li v-for="item in wantPayList">
          <div class="top">
            <div class="top-body">

              <div class="pic-box">
                <img :src="item.url" alt="">
              </div>
              <div class="des">
                <p class="name">{{item.gameNameCn}} <span>({{item.gameNameEn}})</span></p>
                <p class="p2">
                  <span>{{item.nowPlayCount}}人在玩</span>
                  <span>{{item.wantPlayCount}}人想玩</span>
                </p>
                <p class="p3" v-if="item.goodsCount > 0">库存 {{item.goodsCount}}件</p>
                <p class="p3" v-else>等待商品反库</p>
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="fr">
              <div class="pay-btn" :class="{disabled:!parseInt(item.goodsBuyCount)}" @click="buyOrRent(item,1)">购买</div>
              <div class="pay-btn" :class="{disabled:!parseInt(item.goodsRentCount)}" @click="buyOrRent(item,2)">立即租</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
	</div>
  </mt-loadmore>
</template>

<script>
  import Paging from 'core/Paging';
  import {MessageBox} from 'mint-ui';
	export default {
		name : 'my-game-tab',
    data(){
			  return{
          wantPayList : [],
          wantPayLoad : true,
          inThePlayList : [],
          inThePayLoad : true,
          curIndex : 0,
        }
    },
    methods : {
    	//请求想玩数据
      wantPlaySend(){
        this.wantPlay.send().then(({status,data})=>{
          if(status === 200){
          	let {result,curIndex,pageSize,totalRow} = data;
          	this.wantPayList.push(...result);
            this.wantPayLoad = curIndex >= Math.ceil(totalRow/pageSize);
            this.$refs.loadmore.onBottomLoaded();
          }
        })
      },
      //请求想玩下一页数据
      wantPayNextPage(){
        this.wantPlay.curIndex++;
        this.wantPlaySend();
      },

      //购买或租
      buyOrRent({goodsId,goodsBuyCount,goodsRentCount},type){
      	if(type == 1){//购买判断库存值
          if(!parseInt(goodsBuyCount))return;
        }else{
      		//租赁判断库存值
          if(!parseInt(goodsRentCount))return;
        }

      	let params = {
          orderGoodsType : type,
          rentDay : type == 1 ? 0 : 30,
          amount : 1,
          goodsId
        }
        gameApi.putInShoppingCart.send(params).then(({status,msg})=>{
          msg = status === 200 ? '成功' : msg;
          this.alert(msg);
        })
      },
      //请求在玩数据
      inThePlaySend(){
        this.inThePlay.send().then(({status,data})=>{
          if(status === 200){
            let {result,curIndex,pageSize,totalRow} = data;
            if(curIndex === 1){this.inThePlayList = [];}
            this.inThePlayList.push(...result);
            this.inThePayLoad = curIndex >= Math.ceil(totalRow/pageSize);
            this.$refs.loadmore.onBottomLoaded();
          }
        })
      },
      //请求在玩下一页数据
      inThePlayNextPage(){
        this.inThePlay.curIndex++;
        this.inThePlaySend();
      },
      //在玩归还
      inThePlayGive({contactName,address,contactMobile,goodsId,tradeId:recordId}){
        MessageBox({
          title: '退还租赁商品',
          message: `
              <p class="text-left text-left-ccc">请退还到以下收货地址</p>
              <p class="text-left text-left-ccc">商家:${contactName}</p>
              <p class="text-left text-left-ccc">地址:${address}</p>
              <p class="text-left text-left-ccc">联系方式:${contactMobile}</p>
              <p class="text-left text-left-pb-10">请填写您的退货物流信息</p>
              <p class="text-left">请输入物流平台</p>
              <input type="number" class="input111" id="input1111">
              <p class="text-left">请输入物流订单号</p>
              <input type="number" class="input111" id="input2222">
          `,
          showCancelButton: true,
          showSureButton : true,
        }).then(action=>{
        	if(action === 'confirm'){
              let logisticsNumber = document.getElementById('input1111').value.trim();
              let logisticsPlatformd = document.getElementById('input2222').value.trim();
              let errText;
              if(!logisticsNumber){
                errText = '请填写物流平台';
              }
              if(!logisticsPlatformd){
                errText = '请填写物流订单号';
              }

              if(errText){
              	this.alert(errText);
              	return;
              }
            gameApi.returnGoods.send({goodsId,logisticsNumber,logisticsPlatformd,recordId}).then(result=>{
              let {status,msg} = result;
              if(status == 200){
                toPage.TransactionRecord.push(1)
              }else{
                this.alert(msg)
              }
            })
          }
        })
      },
      //在玩续租
      inThePlayRelet({goodsId}){
        MessageBox.prompt('请输入续租天数',{
          inputType : 'number',
          inputValue : 10,
        }).then(({ value, action }) => {
            value = value.trim();
            let parameter = [];
            if(value < 10){
            	this.alert('最小续租天数为10');
            	return;
            }
            if(action === 'confirm'){
              parameter.push({goodsId, amount:value, orderGoodsType:2})
              gameApi.updateShoppingCartGoodsCount.send({
                parameter:JSON.stringify(parameter),
              })
                .then(res=>{
                  if(res.msg == 'success'){
                    gameApi.generateOrder.send({goodsIdList:goodsId})
                      .then(data=>{
                        if(data.msg == 'success'){
                          //这里跳转到 确认订单页
                          toPage.submitOrder.push(data.data)
                        }else{
                          Toast('续租失败');
                        }
                      })
                  }
                })
            }

        }).catch(result=>{})
      },
      loadBottom(){
      	if(allLoaded)return;
        this[['inThePlayNextPage','wantPayNextPage'][this.curIndex]]();
      },
      //在玩初始请求数据
      inThePayInit(){
        this.inThePlay = new Paging({},gameApi.findUserNowPlay.send);
        this.inThePlaySend();
      }
    },
    computed : {
      allLoaded(){
      	return this[['inThePayLoad','wantPayLoad'][this.curIndex]]
      }
    },

    created(){

			//想玩
      this.wantPlay = new Paging({},gameApi.findUserPlay.send);
      this.wantPlaySend();
      this.inThePayInit();
    }

  }
</script>

<style lang="scss" src="./index.scss" rel="stylesheet/scss"></style>
