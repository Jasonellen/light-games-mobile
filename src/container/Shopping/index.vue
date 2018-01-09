<template>
 	<div class='Shopping pd-head'>

	  	<my-header title="购物车">
	    	<div slot="right" @click='rightTextClick'>{{rightText?'完成':'编辑'}}</div>
	   	</my-header>
		<mt-navbar v-model="selected">
		  <mt-tab-item id="1">租赁</mt-tab-item>
		  <mt-tab-item id="2">购买</mt-tab-item>
		</mt-navbar>

		<!-- tab-container -->

		<mt-tab-container v-model="selected" >
		    <mt-tab-container-item id="1">
				<div class='rent'>
					<ul v-for='(item,i) in rentItems'>
						<li class='clearfix'>
							<label class="mint-checklist-label fl" >
								<span class="mint-checkbox">
									<input  type="checkbox"
											class="mint-checkbox-input"
											:checked="item.checked"
											@click="rentToggleChecked(i)">
									<span class="mint-checkbox-core"></span>
								</span>
							</label>
							<div class='fl right clearfix'>
								<img :src="item.goods_url" alt="" class='fl'>
								<div class="fr">
									<h3>{{item.goods_name}}<small>({{item.goods_des}})</small></h3>
									<span>版本：{{item.edition==0 ? '港行':item.edition==1 ?'国行' :item.edition==2?'美版':'日版' }}</span>
									<p v-if="rightText" class='bujinqi'>
										<span class='count fl' @click="rentCountMinus(i)">-</span>
										<input type="number" :value="item.rent_day" @change='rentChangeValue(i,$event)'>
										<span class='count fr' @click="rentCountPlus(i)">+</span>
									</p>
									<p v-else>租赁价:￥{{item.goods_rent_price}}
										<small>市场价:{{item.market_price}}元</small>
										<span v-if='item.goods_rent_count>0'>x{{item.rent_day}}天</span>
										<span v-else>无货</span>
									</p>
								</div>
							</div>
						</li>
					</ul>
					<ul>
						<li class='clearfix' @click='goToGame'>
							<div class='fl right clearfix'>
								<span id='add'>+</span>
								<span class="addText">
									添加游戏
								</span>
							</div>
						</li>
					</ul>

					<div class='line'>
						<span>更多推荐</span>
					</div>
					<ul class='recommend'>
						<li v-for='item in recommend'>
              <div :style="{background:`url(${item.goods_url})`}" @click="goGameDetail(item.goods_id)"></div>
						</li>
					</ul>
					<div class="bottom">
						<label class="mint-checklist-label fl">
							<span class="mint-checkbox">
								<input
									type="checkbox"
									class="mint-checkbox-input"
									:checked="!allCheckedFalse"
									@change="allCheckedClick"
									>
								<span class="mint-checkbox-core"></span>
							</span>
							<span class='all'>全选</span>
						</label>
						<div class="right">
							<div class='btn_right' v-if='rightText'>
								<span @click="todoAction('add')">移到想玩</span>
								<span class='del' @click="todoAction('del')">删除</span>
							</div>
							<div v-else>
								<span class="total">合计：￥{{totalPrice}}</span>
								<span class='btn' @click="todoAction('submit')">结算({{totalPrice}})</span>
							</div>
						</div>
					</div>
				</div>
		    </mt-tab-container-item>
		    <mt-tab-container-item id="2">
				<div class='rent'>
				 <ul>
					 <li class='clearfix' v-for='(item,i) in buyItems'>
						 <label class="mint-checklist-label fl">
							 <span class="mint-checkbox">
								 <input
								 	type="checkbox"
								 	class="mint-checkbox-input"
									:checked="item.checked"
									@click="buyToggleChecked(i)">
								 <span class="mint-checkbox-core"></span>
							 </span>
						 </label>
						 <div class='fl right clearfix'>
							<img :src="item.goods_url" alt="" class='fl'>
							<div class="fr">
								<h3>{{item.goods_name}}<small>({{item.goods_des}})</small></h3>
								<span>版本：{{item.edition==0 ? '港行':item.edition==1 ?'国行' :item.edition==2?'美版':'日版' }}</span>
								<p v-if="rightText" class='bujinqi'>
									<span class='count fl' @click="buyCountMinus(i)">-</span>
									<input type="number" :value="item.amount" @change='buyChangeValue(i,$event)'>
									<span class='count fr' @click="buyCountPlus(i)">+</span>
								</p>
								<p v-else>购买价:￥{{item.goods_price}}
									<small>市场价:{{item.market_price}}元</small>
									<span v-if='item.goods_buy_count>0'>x{{item.amount}}</span>
									<span v-else>无货</span>
								</p>

							</div>
						</div>
					</li>
				</ul>
				<div class='line'>
					<span>更多推荐</span>
				</div>
				<ul class='recommend'>
					<li v-for='item in recommend'>
            <div :style="{background:`url(${item.goods_url})`}" @click="goGameDetail(item.goods_id)"></div>
						<!--<img :src="item.goods_url" alt="" @click="goGameDetail(item.game_id)">-->
					</li>
				</ul>
				 <div class="bottom">
					 <label class="mint-checklist-label fl">
						 <span class="mint-checkbox">
							 <input
							 	type="checkbox"
							 	class="mint-checkbox-input"
							 	:checked="!allCheckedFalse"
							 	@change="allCheckedClick">
							 <span class="mint-checkbox-core"></span>
						 </span>
						 <span class='all'>全选</span>
					 </label>
					 <div class="right">
						<div class='btn_right' v-if='rightText'>
							<span @click="todoAction('add')">移到想玩</span>
							<span class='del' @click="todoAction('del')">删除</span>
						</div>
						<div v-else>
							<span class="total">合计：￥{{totalPrice}}</span>
							<span class='btn' @click="todoAction('submit')">结算({{totalPrice}})</span>
						</div>
					</div>
				 </div>
			 </div>
		    </mt-tab-container-item>
		</mt-tab-container>
  	</div>
</template>

<script>

	import { Header, Navbar, TabItem, TabContainer, TabContainerItem, Checklist, Toast } from 'mint-ui';
	import pageCache from 'core/pageCache';
	export default {
		data(){
			return{
				selected:'1',
				rightText: false,
				rentItems:[],
				buyItems:[],
				recommend:[],
			}
		},
		methods: {
			rentToggleChecked(i){
				this.rentItems.map((item,index)=>{
					if(index == i){
						item.checked = !item.checked
					}
				})
			},
			rentCountPlus(i){
				this.rentItems.map((item,index)=>{
					if(index == i){
						item.rent_day ++
					}
				})
			},
			rentCountMinus(i){
				this.rentItems.map((item,index)=>{
					if(index == i){
						if(item.rent_day > 10){
							item.rent_day --
						}
					}
				})
			},
			rentChangeValue(i,e){
				this.rentItems.map((item,index)=>{
					if(index == i && e.target.value>9){
						if(e.target.value < item.goods_rent_count){
							item.amount  = e.target.value
						}else{
							item.amount  = item.goods_rent_count
						}
					}else{
						item.rent_day = 10
					}
				})
			},

			// 租赁添加想玩，结算，删除
			todoAction(type){
				let goodsIdListArr = []
				let amountListArr = []
				let cartListArr = []
				let _null = false
				this.rentItems.map(function(item){
					if(item.checked == true){
						goodsIdListArr.push(item.goods_id)
						amountListArr.push(item.amount)
						cartListArr.push(item.cart_id)
						if(!item.amount || item.amount==0){
							_null =true
						}
					}
				})
				this.buyItems.map(function(item){
					if(item.checked == true){
						goodsIdListArr.push(item.goods_id)
						amountListArr.push(item.amount)
						cartListArr.push(item.cart_id)
						if(!item.amount || item.amount==0){
							_null =true
						}
					}
				})
				if(goodsIdListArr.length>0){
					let goodsId = goodsIdListArr.join(',')
					let cartId = cartListArr.join(',')
					if(type == 'add'){
						gameApi.saveUserPlay.send({goodsId})
							.then(data=>{
								if(data.msg == 'success'){
									Toast('添加成功');
								}else{
									Toast(data.msg);
								}
							})
					}else if(type == 'del'){
						gameApi.deleteShopping.send({cartId})
							.then(data=>{
								if(data.msg == 'success'){
									Toast('删除成功');
									this.getData()
								}else{
									Toast(data.msg);
								}
							})
					}else if(type == 'submit' && !_null){
						local.set('ordercomefrom','shop')
						gameApi.generateOrder.send({goodsIdList:goodsId})
							.then(data=>{
								if(data.msg == 'success'){
									//这里跳转到 确认订单页
									toPage.submitOrder.push(data.data)
								}else{
									Toast(data.msg);
								}
							})
					}else{
						Toast('无库存！请从新选择');
					}
				}else{
					Toast('请先选择商品');
				}
			},
			rightTextClick(){
				let parameter = []
				this.rentItems.map(function(item){
					if(item.checked == true){
						parameter.push({goodsId:item.goods_id, amount:item.rent_day, orderGoodsType:2})
					}
				})
				this.buyItems.map(function(item){
					if(item.checked == true){
						parameter.push({goodsId:item.goods_id, amount:item.amount, orderGoodsType:1})
					}
				})
				//修改商品数量
				if(this.rightText){
					gameApi.updateShoppingCartGoodsCount.send({
						parameter:JSON.stringify(parameter),
					})
				}
				this.rightText = !this.rightText

			},
			buyToggleChecked(i){
				this.buyItems.map((item,index)=>{
					if(index == i){
						item.checked = !item.checked
					}
				})
			},
			allCheckedClick(e){
				this.rentItems.map((item,index)=>{
					item.checked = e.target.checked
				})
				this.buyItems.map((item,index)=>{
					item.checked = e.target.checked
				})
			},
			buyCountPlus(i){
				this.buyItems.map((item,index)=>{
					if(index == i){
						if(item.amount<item.goods_buy_count){
							item.amount ++
						}else{
							item.amount = item.goods_buy_count
						}
						
					}
				})
			},
			buyCountMinus(i){
				this.buyItems.map((item,index)=>{
					if(index == i){
						if(item.amount > 1){
							item.amount --
						}
					}
				})
			},
			buyChangeValue(i,e){
				this.buyItems.map((item,index)=>{
					if(index == i && e.target.value>0){
						if(e.target.value < item.goods_buy_count){
							item.amount  = e.target.value
						}else{
							item.amount  = item.goods_buy_count
						}
					}else{
						item.amount =1
					}
				})
			},
			goToGame(){
				pageCache.homePageIndex=1
				toPage.tabbar.push()
			},
			goGameDetail(id){
				if(id != undefined){
				  toPage.GameDetail.push(id);
				}
			},
		},
		computed:{
			totalPrice(){
				let arr1 = this.rentItems.filter(function(item){
					return item.checked == true
				})
				let price1 = arr1.reduce(function(prev, next){
					return prev +  Number(next.goods_rent_price * next.rent_day)
				},0)
				let arr2 = this.buyItems.filter(function(item){
					return item.checked == true
				})
				let price2 = arr2.reduce(function(prev, next){
					return prev +  Number(next.goods_price * next.amount)
				},0)
				return price1 + price2
			},
			allCheckedFalse(){
				let rent = this.rentItems.find((item)=>{
					return item.checked == false
				})
				let buy = this.buyItems.find((item)=>{
					return item.checked == false
				})
				return rent || buy
			}
		},
		mounted(){

			this.getData = ()=>{
				gameApi.findShoppingCartByUserId.send({curIndex:1,pageSize:1000})
				.then(data=>{
					if(data.msg == 'success'){
						let newData = data.data.result
						newData.map(function(item){
							item.checked = false
						})
						this.rentItems = newData.filter((item)=>{
							return item.order_goods_type == 2
						})
						this.buyItems = newData.filter((item)=>{
							return item.order_goods_type == 1
						})
					}
				})
			}
			this.getData()

			//获取推荐数据
			gameApi.findDownRecommend.send({ curIndex:1, pageSize:2})
				.then(data=>{
					this.recommend = data.data.result
				})
			reuslt:[
				{orderId:111, data:[{},{}]},
				{orderId:222, data:[{},{}]}
			]
    	},
	}
</script>


<style src='./index.scss' lang="scss"></style>
