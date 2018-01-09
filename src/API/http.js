// http://119.23.104.119:8181

/*
{
    use:'',
    url:'',
    params : [``],
    result :[` `],
    des :[``]
  },
*/
export default [
  
  {
    use:'修改密码发送验证码',
    url:'/phoneController/updatePwdCode',
    params : [`Var param={phone:xxxxxxxxxxx}`],
    des :[`无`]
  },
  {
    use:'修改密码验证码是否正确',
    url:'/phoneController/checkUserPwdCode',
    params : [`Var param={phone:xxxxxxxxxxx,code:xxxx}`],
    des :[`无`]
  },
  {
    use:'修改密码设置密码',
    url:'/mxUserController/updateUserPwd',
    params : [`phoneController/updateUserPwd`],
    des :[`无`]
  },
  {
    use:'微信外H5支付',
    url:'/mxPayController/weChatOutH5Pay',
    params : [`Var param = {orderId：xx}`],
    des :[`无`]
  },
  {
    use:'获取openid',
    url:'/mxPayController/getOpenId',
    params : [`Var param = {code=}`],
    des :[`无`]
  },
  {
    use:'微信支付',
    url:'/mxPayController/weChatPublicSignalPay',
    params : [`Var param = { ordered:订单号,code=}`],
    result :[`失败:{code:500,data:null}成功:{200,data:[]`],
    des :[`无`]
  },
    {
    use:'支付宝支付',
    url:'/alipayController/alipayWapPay',
    params : [`Var param = { ordered:订单号}`],
    result :[`失败:{code:500,data:null}成功:{200,data:[]`],
    des :[`无`]
  },
  {
    use:'G币转换成人名币',
    url:'/zzb-dream/mxOrderController/gCoinToRmb',
    params : [`Var param = {money:转换的G币数量}`],
    result :[`失败:{code:500,data:null}成功:{200,data:人名币}`],
    des :[`POST请求方式`]
  },
  {
    use:'人名币转换成G币',
    url:'/zzb-dream/mxOrderController/rmbToGCoin',
    params : [`Var param = {money:转换的人名币数量}`],
    result :[`失败:{code:500,data:null}成功:{200,data:[ G币数]`],
    des :[`POST请求方式`]
  },
  {
    use:'查询邀请好友成功赠送的优惠券面值',
    url:'/mxUserController/getCouponValue',
    params : [`无`],
    result :[` 返回 "成功邀请好友可获得优惠券50元"`],
    des :[`无`]
  },
  {
    use:'查询单个评论方法',
    url:'/userComment/findCommentById',
    params : [`Var param = {commented:”当前评论的ID”}`],
    result :[`失败:{code:500,data:null}成功:{200,data:[{ user_linkman:用户昵称, comment_text:评论内容, create_date:评论时间article_id: 文章id，article_type：评论类型,}] `],
    des :[`POST请求方式`]
  },
  {
    use:'邀请好友',
    url:'/mxUserController/inviteFriends',
    params : [`Var param={inviteCode:732371}`],
    result :[` 失败:情况1.{code:500,msg:您已经被邀请过了,无法再次被邀请!,data:null}
 情况2.{code:500,msg:您已经邀请了666用户,无法被666用户邀请了!,data:null}
成功:{code:200,data:true}
`],
    des :[`输入参数：inviteCode:好友的邀请码
输出参数：返回ture
当失败的时候：返回情况1被邀请过的用户无法再次被邀请
              返回情况2 ：用户不能互相邀请,比如你已经邀请过666用户了，666用户就无法邀请你了。
成功返回true
`]
  },
  {
    use:'生成升级会员订单',
    url:'/mxOrderController/generateMemberUpdateOrder',
    params : [`Var param={userMemberLevel:2或者3}`],
    result :[`失败:1.{status:500,msg:”您还不是会员,无法续租!”,data:null}
2{status:500,msg:”您是黄金会员,只能升级为白金或钻石会员!”,data:null}
3{status:500,msg:”您是白金会员,只能升级为钻石会员!”,data:null}
4.{status:500,msg:”您已经是钻石会员了,无法升级!”,data:null}

成功:{status:200,data:orderId:xxxxx}
 `],
    des :[`输入参数：1.uesrMemberLevel.为2，3
为2时表示黄金会员升级白金会员
为3事表示白金会员升级钻石会员
黄金会员可以直接升级钻石会员
输出参数：返回orderId 订单id
`]
  },
  {
    use:'退出登录',
    url:'/mxUserController/outUser',
    params : [`无`],
    result :[`失败:{code:500,data:null}成功:{200,data:[{true:false }]`],
    des :[`POST请求`]
  },
  {
    use:'余额提现',
    url:'/mxWithdrawController/withdrawMoney',
    params : [`withdrawMoney:提现金额,bankName:到账银行,bankCard:提现卡号,withdrawName:卡主姓名`],
    result :[`申请提现成功,请等待到账! `],
    des :[``]
  },
  {
    use:'查询钱包明细',
    url:'/mxTradeRecortController/queryWalletRecord',
    params : [`param: curIndex 页数  ;pageSize 每页大小`],
    result :[` result{trade_id,
trade_type ,交易类型( 1 余额充值,2 g币充值,3 用户提现,4 退还押金,5 购买商品,6 租赁商品 ,7充值押金)
trade_money, 交易金额
g_money ,
create_by ,
surplus_money,剩余金额
 	create_date,
 	play_type, 支付类型:0支付宝;1微信 2其他
order_type, 
coupon_money ,
waybill_id, 
user_id,
curIndex 页数 
pageSize 每页大小
totalRow:总数}`],
    des :[`无`]
  },
  {
    use:'查询用户正在交易，交易完成，交易评价--总数',
    url:'/mxUserController/findUserTransaction',
    params : [`无`],
    result :[`失败:{code:500,data:null}成功:{200,data:[总数]  `],
    des :[`POST请求方式`]
  },
  {
    use:'添加到购物车',
    url:'/mxOrderGoodsController/putInShoppingCart',
    params : [`Var param={goodsId:xxx,orderGoodsType:1或者2,amount:10,rentDay:10}`],
    result :[`失败:情况1:{status:500,msg:此商品不存在,请重新添加!,data:null}
     情况2:{status:500,msg:请选择商品的模式,租赁或者购买!,data:null}
     情况3：{status:500,msg:您已经租赁过该商品了!,data:null}
成功:{code:200,data:true}
 `],
    des :[`输入参数：1.orderId.商品id 必传
          2.orderGoodsType 商品的类型租赁为1 购买为2 必传
          3.amount:数量 必传 默认传1 
          3.rentDay:租赁天数 必传 购买默认传1 租赁传用户选择的天数
输出参数：返回orderId 订单id
`]
  },
  {
    use:'生成续租订单',
    url:'/mxOrderController/generateReletOrder',
    params : [`Var param={orderId:xxx,goodsId:xxx,rentDay:10}`],
    result :[`失败:{status:500,msg:”您还不是会员,无法续租!”,data:null}
成功:{code:200,data:orderId:xxxxx}
`],
    des :[`输入参数：1.orderId.订单Id必传
          2.goodsId：商品Id必传
          3.rentDay:租赁天数 必传
输出参数：返回orderId 订单id
`]
  },
  {
    use:'开通会员前查询各种会员类型信息以及是会员查询当前会员信息',
    url:'/mxUserController/findMemberInfo',
    params : [`无`],
    result :[`返回参数 三个值(区别为memberType )
{
deposit:押金
charges:邮费
recharge:充值金额
total:总价
isopen:是否开通 0未开通 ,1开通
memberType:会员类型 1表示黄金会员 2表示白金会员 3表示钻石会员

coupon:{优惠卷类型
	 userId:用户id
	 couponValue:卷值
	 couponType:是否使用 1 未使用 2已使用
	 couponPassword:优惠卷密码
	 couponDay:使用天数
	 couponCondition:满足多少金额可以使用
	 couponDescription:描述
	 couponStartDate:有效开始时间
	 couponEndDate:有效结束时间
	}} `],
    des :[`返回已开通的会员类型和其他的会员类型`]
  },
  {
    use:'查询用户正在交易，交易完成，交易评价',
    url:'/mxUserController/findUserTransactionList',
    params : [`var param = {type:'类型', curIndex:'1', pageSize:’5’}`],
    result :[`失败:{code:500,data:null}
    成功:{200,data:[{ order_id:’订单Id’，
     trade_id：‘交易记录Id’,
      game_name_en:’中文名’, 
      game_name_cn:’英文名’, 
      order_goods_type:’购买或者租凭，1购买，2租赁’ , 
      edition:’版本信息’, 
      amount:’购买总数’, 
      goods_price:’商品总价’}]  `],
    des :[`处理逻辑 POST请求方式，Type:1：查询正在交易,2:查询交易完成,3:查询交易评价`]
  },
  {
    use:'查询物流',
    url:'/mxUserController/fingWaybill',
    params : [`var param = {orderId:'订单ID',goodsId:'商品ID'}`],
    result :[` 失败:{code:500,data:null}成功:{200,data:[{waybill_number :’运单单号’, waybill_platform :’物流公司’}]`],
    des :[`POST请求方式`]
  },
    {
    use:'查询用户在玩的游戏',
    url:'/mxUserController/findUserNowPlay',
    params : [`Var param={curIndex:1,pageSize:2}`],
    result :[`失败:{code:500,data:{}}

成功:{code:200,data:{{curIndex:1,pageSize:2,totalRow:10
,result:[{goodsId:1, 
					 goodsName:2,
					goodsDes:3,
					goodsPrice:4,
					 goodsPosition:6,
					mgt.goodsFormat:7,
					mgt.goodsCount:8,
					 mgt.goodsColor:9
					mgt.goodsConfigure:10
					}]}
 `],
    des :[`输入参数 
currIndex:当前页数
pageSize:每页显示条数
返回用户想玩的游戏
成功：
goodsId:商品id, 
		    goodsName:商品名称,
			goodsDes:商品描述,
			goodsPrice:商品价格,
			 goodsPosition:商品位置,
			mgt.goodsFormat:商品规格
			mgt.goodsCount:商品数量,
			 mgt.goodsColor:商品颜色,
			mgt.goodsConfigure：商品颜色
`]
  },
    {
    use:'生成开通会员订单',
    url:'/mxOrderController/generateMemberOrder',
    params : [`Var param={memberMonth:3,couponId:73,userMemberLevel:3}`],
    result :[`失败:{code:500,data:null}
成功:{code:200,data:orderId:xxxxx}
 `],
    des :[`输入参数：1.memberMonth.会员充值月数
          2.couponId:优惠券id，不是必传
          3.userMemberLevel:用户会员等级 
输出参数：返回orderId 订单id
`]
  },
    {
    use:'生成续费会员订单',
    url:'/mxOrderController/generateRenewMemberOrder',
    params : [`Var param={memberMonth:3,couponId:73}`],
    result :[`失败:{code:500,data:null}
成功:{code:200,data:orderId:xxxxx}
 `],
    des :[`输入参数：1.memberMonth.会员充值月数
          2.couponId:优惠券id，不是必传
输出参数：返回orderId 订单id
`]
  },
    {
    use:'查询用户想玩的游戏',
    url:'/mxUserController/findUserPlay',
    params : [`Var param={curIndex:1,pageSize:2}`],
    result :[`失败:{code:500,data:{}}

成功:{code:200,data:{{curIndex:1,pageSize:2,totalRow:10
,result:[{goodsId:1, 
					 goodsName:2,
					goodsDes:3,
					goodsPrice:4,
					 goodsPosition:6,
					mgt.goodsFormat:7,
					mgt.goodsCount:8,
					 mgt.goodsColor:9
					mgt.goodsConfigure:10
					}]}
    `],
    des :[`输入参数 
currIndex:当前页数
pageSize:每页显示条数
返回用户想玩的游戏
成功：
goodsId:商品id, 
		    goodsName:商品名称,
			goodsDes:商品描述,
			goodsPrice:商品价格,
			 goodsPosition:商品位置,
			mgt.goodsFormat:商品规格
			mgt.goodsCount:商品数量,
			 mgt.goodsColor:商品颜色,
			mgt.goodsConfigure：商品颜色
`]
  },
    {
    use:'添加平台交易记录，用户交易记录，G币支付',
    url:'/mxUserController/updateGCoin',
    params : [`var param ={ordered:’订单Id’}`],
    result :[`失败:{code:500,data:null}成功:{200,data:true:false] `],
    des :[`涉及操作 添加平台交易记录，用户交易记录，G币支付 
处理逻辑 POST请求方式`]
  },
    {
    use:'根据平台，人气，游戏类别，多选查询',
    url:'/gameBaseInfoController/findCheckBoxGame',
    params : [`var param = {curIndex:'1',pageSize:'5',buzzType:"人气排行",platformType:’平台查询’,gameType:’游戏类别’} 
`],
    result :[`输出 失败:{code:500,data:null}成功:{200,data:[{ game_name_cn: 游戏中文名称game_name_en: 游戏英文名称game_logo: 游戏封面market_time: 上市时间 时间格式 2016-02-07platform: 平台game_type: 游戏属性、类型score: 评分is_support_CN: 是否支持中文，1-支持、0-不支持game_summary: 游戏简介
created_by: 创建人
created_date: 创建时间
updated_by:
updated_date:
sales_volume:Host:主机
goods_id: 商品idLanguage: 语言,中文zh_CN,英语en_US,日语xrb_JP}] `],
    des :[`处理逻辑 POST请求方式，提示用户每个类别勾选多个用“，”分开var param = {curIndex:'1',pageSize:'5',buzzType:"最新发售,想玩最多"} `]
  },
    {
    use:'提交订单',
    url:'/mxOrderController/commitOrder',
    params : [`Var param={orderId:xxxx,locationId:xxx,couponId:xxx}`],
    result :[`失败:{code:500,data:null}

成功:{code:200,data:orderId:xxxx}
 `],
    des :[`输入参数orderId:订单Id,locationId:地址Id,couponId:优惠券Id
成功返回订单id data对应订单id
`]
  },
  {
    use:'查询订单信息功能--王云',
      url:'/mxOrderController/queryOrderMessage',
    params : [`Var param={orderId:xxxx}`],
    result :[`失败:{code:500,data:null}

成功:{code:200,data:[{orderId:xxxx,
goodsName:渔业,
goodsDes:xxx,
goodsPrice:1000,
goodsFormat:111,
goodsCount:100,
goodsColor:黄色,
goodsConfigure:xxx,
goodsRentPrice:1000
edition:国行,
url:http://xxxxx
orderGoodsType:1}]}
deposit:押金
mailMoney:邮费
`],
    des :[`输入参数orderId:订单Id
输出参数:goodsId:商品编号 
goodsName：商品名称
goodsDes：商品描述
goodsPrice：商品购买价格
goodsPosition：商品位置
 goodsFormat：商品规格
goodsCount：商品数量
goodsColor：商品颜色
goodsConfigure：商品配置
goodsRentPrice：商品租赁价格
edition：国行或者港行
url:商品封面
 orderGoodsType:订单商品类型 1为购买 2为租赁
 deposit:押金
mailMoney:邮费
`]
  },
  {
    use:'余额充值--生成余额订单',
    url:'/mxOrderController/generateBalanceOrder',
    params : [`Var param={balance:500}`],
    result :[` 失败:{code:500,data:null}
成功:{code:200,data:time+uuid}`],
    des :[`输入参数:balance 充值余额数值
输出参数：订单Id
`]
  },
  {
    use:'G币充值--生成G币订单',
    url:'/mxOrderController/generateGCoinOrder',
    params : [`Var param={gCoin:500}`],
    result :[`失败:{code:500,data:null}
成功:{code:200,data:time+uuid}
 `],
    des :[`输入参数:gCoin G币数量
输出参数：订单Id
`]
  },
  {
    use:'查询会员的押金，原价和可用的优惠券',
    url:'/mxUserController/queryDiamondMemberMessage',
    params : [`Var param={userMemberLevel,1,2,3,curIndex:1,pageSize:2}`],
    result :[`失败:{code:500,data:null}
成功:{code:200,data:[{couponId,"
		    			 couponValue,
		    			 couponType,
		    			 couponCondition,
		    			 couponDescription,
		    			couponStartDate,
		    			couponEndDate"
}]}
 `],
    des :[`输入参数 userMemberLevel 为1 2 3 
1充值黄金会员
2充值白金会员
3充值钻石会员
currIndex:当前页数
pageSize:每页显示的条数
输出参数
curIndex:当前页数
pageSize:每页显示条数
totalRow:总共的数量
couponId,优惠券Id
 couponValue,优惠券价值
 couponType,优惠券类型 1为未使用 2为使用
couponCondition,优惠券使用雕件
couponDescription,优惠券描述
couponStartDate,优惠券开始时间
couponEndDate优惠券结束时间
`]
  },
  {
    use:'查询所有优惠券或者可用优惠券',
    url:'/mxUserController/queryAllOrUseConpon',
    params : [`Var param={orderId:1}`],
    result :[`失败:{code:500,data:null}

成功:{code:200,data:[{couponId,"
		    			 couponValue,
		    			 couponType,
		    			 couponCondition,
		    			 couponDescription,
		    			couponStartDate,
		    			couponEndDate"
}]}
 `],
    des :[`输入参数 orderId 订单Id
输出参数
couponId,优惠券Id
 couponValue,优惠券价值
 couponType,优惠券类型 1为未使用 2为使用
couponCondition,优惠券使用雕件
couponDescription,优惠券秒速
couponStartDate,优惠券开始时间
couponEndDate优惠券结束时间
`]
  },
  {
    use:'修改订单优惠券',
    url:'/mxUserController/updateOrderCoupon',
    params : [`Var param={orderId:1,couponId}`],
    result :[`失败:{code:500,data:null}成功:{code:200,data:true} `],
    des :[`输入参数:orderId,订单Id couponId 优惠券Id`]
  },
  {
    use:'查询当前游戏的图片信息',
    url:'/mxUnLoadImgController/fndMxLoadImgByGoodsIdPage',
    params : [`var param = {goodsId:’商品id’,curIndex:1,pageSize:5};`],
    result :[` 失败:{code:500,data:null}成功:{200,data:[{ goods_id:’商品Id’,url:’图片URL’,des:’图片描述’,img_name:’图片名称’}]]`],
    des :[`查询当前游戏的图片信息`]
  },
  {
    use:'修改用户购物车物品数量',
    url:'/mxOrderGoodsController/updateShoppingCartGoodsCount',
    params : [`var param={parameter:[{goodsId:1,amount:20,orderGoodsType:1},
{goodsId:2,amount:2,orderGoodsType:2}]}
`],
    result :[` 失败:{code:500,data:null}
成功:{code:200,data:true}
`],
    des :[`输入参数:goodsId.商品Id 
        amount:修改的数量
orderGoodsType:修改的商品的类型1为购买2为租赁
当orderGoodsType为1时表示将商品id为1的商品数量修改为20
当orderGoodsType为2时表示将商品id为1的商品租赁天数改为2天
`]
  },
  {
    use:'购物车查询下方更多推荐',
    url:'/mxGoodsController/findDownRecommend',
    params : [` var param = { curIndex:”1”, pageSize:”5”}`],
    result :[`失败:{code:500,data:null}
    成功:{200,data:[{ game_name_cn: 游戏中文名称
    game_name_en: 游戏英文名称
    game_logo: 游戏封面
    market_time: 上市时间 时间格式 2016-02-07
    platform: 平台
    game_type: 游戏属性、类型
    score: 评分
    is_support_CN: 是否支持中文，1-支持、0-不支持
    game_summary: 游戏简介
    created_by: 创建人
    created_date: 创建时间
    updated_by:
    updated_date:
    sales_volume:Host:主机
    goods_id: 商品idLanguage: 语言,中文zh_CN,英语en_US,日语xrb_JP}]`],
    des :[`POST请求方式，直接调用查询即可`]
  },
  {
    url:'/ userComment/udpateUserCommentGrade',
    use:'点赞',
    params : [`var param = { commentGrade:”当前的点赞数量”,commentId:’当前父评论的主键ID’}`],
    result :[`失败:{code:500,data:null}成功:{200,data:[true,false] `],
    des :[`post,修改`]
  },
  {
    url:'/mxUserLocationController/setDefaultLocation',
    use:'设置默认收货地址',
    params : [`var param={locationId:123}`],
    result :[`失败:{code:500,data:null}
成功:{code:200,data:true}
`],
    des :[`输入参数:locationId:收货地址Id
输出参数:失败返回null,成功返回true
`]
    },
  {
    url : '/mxUserLocationController/queryUserLocation',
    use : '查询用户所有收货地址',
    result : [
      ` 失败:{code:500,data:null}
成功:{200, data:{[ pid:省Id,
pname:省名称,
cid:区Id,
cname:区名称,
aid:市Id,
aname:市名称,
details:详细地址
name:收货人姓名,
phone:收货人电话,
defaultLocation:是否默认]}
,}]
    `
    ],
    des : [
      ``
    ],
    params : [
      ``
    ]
  },
  {
    url : '/mxUserLocationController/deleteUserLocation',
    use : '删除收货地址',
    result : [
      ` 失败:{code:500,data:null}
成功:{code:200,data:true}
    `
    ],
    des : [
      `输入参数:locationId:收货地址Id
输出参数:失败返回null,成功返回true
`
    ],
    params : [
      `var param={locationId:123}`
    ]
  },
  {
    url : '/mxUserLocationController/updateUserLocation',
    use : '修改收货地址',
    result : [
      ` 失败:{code:500,data:null}
成功:{code:200,data:true}
    `
    ],
    des : [
      `输入参数:userLocation:用户收货地址中文，locationId:收货地址Id
输出参数:失败返回null,成功返回true
`
    ],
    params : [
      `var param={locationId:123,userLocation:深圳市xxx}`
    ]
  },
  {
    url : '/mxUserLocationController/addUserLocation',
    use : '添加收货地址',
    result : [
      ` 失败:{code:500,data:null}
成功:{200, data:true:false
,}]

    `
    ],
    des : [
      `POST请求方式，
参数示例
var param = {pid:'1',pname:'广东',cid:'1',cname:'深圳',aid:'1',aname:'宝安',details:'事实上事实上',name:'张四',phone:'2222',defaultLocation:'2'}

`
    ],
    params : [
      `var param = {
pid:省Id,
pname:省名称,
cid:区Id,
cname:区名称,
aid:市Id,
aname:市名称,
details:详细地址
name:收货人姓名,
phone:收货人电话,
defaultLocation:是否默认}
`
    ]
  },
  {
    url : '/mxUserController/updateUserAddress',
    use : '修改订单收货地址',
    result : [
      ` 失败:{code:500,data:null}
成功:{200, data:true:false
,}]

    `
    ],
    des : [
      `POST请求方式，
参数示例
var param = {pid:'1',pname:'广东',cid:'1',cname:'深圳',aid:'1',aname:'宝安',details:'事实上事实上',name:'张四',phone:'2222',defaultLocation:'2'}
修改那个字段的值就传那个字段即可，

`
    ],
    params : [
      `var param = {
pid:省Id,
pname:省名称,
cid:区Id,
cname:区名称,
aid:市Id,
aname:市名称,
details:详细地址
name:收货人姓名,
phone:收货人电话,
defaultLocation:是否默认}
`
    ]
  },
  {
    url : '/mxReportTController/insertReport',
    use : '举报评论',
    result : [
      ` 成功{code:200,msg:success,data:true}
失败{code:500,msg:fail,data:null}
    `
    ],
    des : [
      `post请求方式`
    ],
    params : [
      `参数: reportText=举报信息 commentId=被举报评论id`
    ]
  },
  {
    url : '/userComment/findChildrenComment',
    use : ' 查询子评论 ',
    result : [
      ` 失败:{code:500,data:null}成功:{200,data:[{ comment_id:’评论Id’,
       user_id:’用户Id’,
        comment_text:“评论内容”, 
        comment_grade: ‘点赞数’,
         article_type:” 文章类型0-游戏详情页;1-资讯;2-攻略;3-专题;4-专栏;5-活动;6-交易评论”，
          user_nickname：“用户名称”}]
    `
    ],
    des : [
      `查询`
    ],
    params : [
      `var param = {curIndex:'1',pageSize:'5',commentId:’当前父评论的主键ID’};`
    ]
  },
  {
    url : '/mxUserController/userUploadPhoto',
    use : '上传头像 ',
    result : [
      ` fail{code:500,data:null}
        success{code:200,data:图片地址(http格式)}
    `
    ],
    des : [
      ` 涉及操作 上传图片,更新数据库`
    ],
    params : [
      `传参: imgFile`
    ]
  },
  {
    url : '/mxHotWordController/findHotWord',
    use : '查询热词 ',
    result : [
      ` 输出 失败:{code:500,data:null}
      成功:{200,data:[{hot_id:’热词ID’,hot_word:’热词名称’}]
    `
    ],
    des : [
      ` post请求方式,直接调用 `
    ],
    params : [
      ``
    ]
  },
  {
    url : '/mxContentController/findGameDetalsById',
    use : '查询单个资讯 ',
    result : [
      ` 失败:{code:500,data:null}
      成功:{200,data:[{ name:’ 节点名称’,
       parent_id: 父类id
      parent_name:’ 父类名称’
      sort: 排序, 
      id: 节点
      idtitle: 标题,
      sub_title: 子标题,
      title_desc: 标题描述,
      content: 内容,
      url: 地址,
      time: 时间,
      commentCount:评论总数}]
    `
    ],
    des : [
      ` post请求方式,直接调用 `
    ],
    params : [
      `Var param={id:’’}`
    ]
  },
  /*{
    url : '/MxContentController/findGameDetals',
    use : '咨询接口文档',
    result : [
      `失败:{code:500,data:null}
      成功:{200,data:[{ name:’ 节点名称’,
       parent_id: 父类id
      parent_name:’ 父类名称’
      sort: 排序,
      id: 节点id
      title: 标题,
      sub_title: 子标题,
      title_desc: 标题描述,
      content: 内容,url: 地址,
      time: 时间,
      commentCount:评论总数}] 
    `
    ],
    des : [
      ` 查询资讯和评论总数 `
    ],
    params : [
      `Var param={name:’资讯标题’,type:’3’, totalPage :1, pageSize :5}`
    ]
  },*/
  {
    url : '/gameBaseInfoController/findGameHotSale',
    use : '热卖',
    result : [
      `失败:{code:500,data:null}
      成功:{200,data:[{ game_name_cn: 游戏中文名称
      game_name_en: 游戏英文名称
      game_logo: 游戏封面
      market_time: 上市时间 时间格式 2016-02-07
      platform: 平台
      game_type: 游戏属性、类型
      score: 评分
      is_support_CN: 是否支持中文，1-支持、0-不支持
      game_summary: 游戏简介
      created_by: 创建人
      created_date: 创建时间
      updated_by:
      updated_date:
      sales_volume:Host:主机
      goods_id: 商品id
      Language: 语言,中文zh_CN,英语en_US,日语xrb_JP
      }] 
    `
    ],
    des : [
      ` 查询 `
    ],
    params : [
      `无`
    ]
  },
  {
    url : '/mxShoppingCartController/deleteShopping',
    use : '删除购物车',
    result : [
      `失败:{code:500,data:null}
      成功:{code:200,data:””}]
    `
    ],
    des : [
      `删除购物车`
    ],
    params : [
      `Var param={cartId:’购物车ID’ } `
    ]
  },
  {
    url : '/gameBaseInfoController/findGameMethodById',
    use : '查询单个详情',
    result : [
      `失败:{code:500,data:null}
      成功:{200,data:[{ game_name_cn: 游戏中文名称
      game_name_en: 游戏英文名称
      game_logo: 游戏封面
      market_time: 上市时间 时间格式 2016-02-07
      platform: 平台
      game_type: 游戏属性、类型
      score: 评分
      is_support_CN: 是否支持中文，1-支持、0-不支持
      game_summary: 游戏简介
      created_by: 创建人
      created_date: 创建时间
      updated_by: 
      updated_date:
      sales_volume: Host:主机
      goods_id: 商品idLanguage: 语言,中文zh_CN,英语en_US,日语xrb_JP}] 
    `
    ],
    des : [
      `查询单个详情`
    ],
    params : [
      `Var param={goodsId:’游戏ID’ } `
    ]
  },
  {
    url : '/mxContentController/findGameDetals',
    use : '资讯接口',
    result : [
      `失败:{code:500,data:null}
      成功:{200,data:[{ name:’ 节点名称’, parent_id: 父类id,parent_name:’父类名称’,
       sort: 排序, id: 节点idtitle: 标题,sub_title: 子标题,
       title_desc: 标题描述,content: 内容,url: 地址,time: 时间,commentCount:评论总数}] 
    `
    ],
    des : [
      `查询资讯和评论总数`
    ],
    params : [
      `Var param={name:’资讯标题’,type:’3’, curIndex :1, pageSize :5} `
    ]
  },
{
    url : '/phoneController/checkIdentifyingCode',
    use : '校验用户输入的验证码',
    result : [
      `无
    `
    ],
    des : [
      `发送短信验证码,输入参数:1.Phone用户的电话号码
         2.code 用户输入的验证码
根据用户的电话号码和输入的验证码判断是否和发送的验证码一致，如果一致就通过，否则不通过
 POST请求方式，直接调用即可`
    ],
    params : [
      `Var param={Phone:18822221111,code:5293}`
    ]
  },
   {
    url : '/phoneController/sendRegisterMessage',
    use : '用户注册发送验证码',
    result : [
      `无
    `
    ],
    des : [
      `发送短信验证码,根据用户的电话号码发送验证码给用户 POST请求方式，直接调用即可`
    ],
    params : [
      `Var param={phone:18822221111}`
    ]
  },
  {
    url : '/mxShoppingCartController/findShoppingCartByUserId',
    use : '查询购物车',
    result : [
      `失败:{code:500,data:null}
        成功:{200,data:[{result: 
    goods_id:商品ID, 
    order_goods_type :订单商品类型 1为购买 2为租赁,
    goods_price :价格, 
    amount :商品购买或者租赁数量,
    goods_name :商品名称, 
    goods_position :商品位置, 
    goods_stock :商品库存,}]
    `
    ],
    des : [
      `涉及操作 查询 POST请求方式，直接调用即可`
    ],
    params : [
      `Var param={[ curIndex:1,pageSize:5]}`
    ]
  },
  {
    url : '/mxUnLoadImgController/findUnLoadImg',
    use : '首页banner',
    result : [
      `失败:{code:500,data:null}
      成功:{200,data:[{ img_name:图片名称, goods_id:商品ID
      url:图片链接路径, des:描述, url_type: 地址类型
      `
    ],
    des : [
      `涉及操作 查询`
    ]
  },
  {
    url : '/mxUserController/isMember',
    use : '验证用户是否是会员',
    result : [
      `失败:{code:500,data:null}
        成功:{code:200,data:{user_identity,1,user_member_level:2}}
      `
    ],
    des : [
      `POST请求方式，直接查询即可
成功：1.user_identity:用户身份 1表示会员，2表示商家，3表示普通用户
       2.user_member_level.用户会员等级 1表示黄金会员 2表示白金会员 3表示钻石会员
`
    ]
  },
  {
    url : '/gameBaseInfoController/findNewGame',
    use : '新品上线',
    result : [
      `失败:{code:500,data:null}
        成功:{200,data:[{ game_name_cn: 游戏中文名称
        game_name_en: 游戏英文名称
        game_logo: 游戏封面
        market_time: 上市时间 时间格式 2016-02-07
        platform: 平台
        game_type: 游戏属性、类型
        score: 评分
        is_support_CN: 是否支持中文，1-支持、0-不支持
        game_summary: 游戏简介 created_by: 创建人 created_date: 创建时间 updated_by: updated_date: sales_volume:
        Host:主机 goods_id: 商品id
        Language: 语言,中文zh_CN,英语en_US,日语xrb_JP}]
      `
    ],
    des : [
      `涉及操作 查询 处理逻辑 GET请求方式，直接调用查询即可`
    ],
    params : [
      `Var param={ gameType:’NewGame’ curIndex :1, PageSize :5}`
    ]
  },
  {
    url : '/gameBaseInfoController/findNewGame',
    use : '人气单品',
    result : [
      `失败:{code:500,data:null}
    成功:{200,data:[{ game_name_cn: 游戏中文名称
    game_name_en: 游戏英文名称
    game_logo: 游戏封面
    market_time: 上市时间 时间格式 2016-02-07
    platform: 平台
    game_type: 游戏属性、类型
    score: 评分
    is_support_CN: 是否支持中文，1-支持、0-不支持
    game_summary: 游戏简介 created_by: 创建人 created_date: 创建时间 updated_by: updated_date: sales_volume:
    Host:主机 goods_id: 商品id
    Language: 语言,中文zh_CN,英语en_US,日语xrb_JP}]
      `
    ],
    des : [
      `涉及操作 查询 处理逻辑 GET请求方式，直接调用查询即可`
    ],
    params : [
      `Var param={ gameType:’ buzz’ curIndex :1, PageSize :5}`
    ]
  },
  {
    url : '/gameBaseInfoController/findNewGame',
    use : '主机租凭',
    result : [
      `失败:{code:500,data:null}
        成功:{200,data:[{ game_name_cn: 游戏中文名称
        game_name_en: 游戏英文名称
        game_logo: 游戏封面
        market_time: 上市时间 时间格式 2016-02-07
        platform: 平台
        game_type: 游戏属性、类型
        score: 评分
        is_support_CN: 是否支持中文，1-支持、0-不支持
        game_summary: 游戏简介 created_by: 创建人 created_date: 创建时间 updated_by: updated_date: sales_volume:
        Host:主机 goods_id: 商品id
        Language: 语言,中文zh_CN,英语en_US,日语xrb_JP}]
      `
    ],
    des : [
      `涉及操作 查询 处理逻辑 GET请求方式，直接调用查询即可`
    ],
    params : [
      `Var param={ gameType:’ hostLease’ curIndex :1, PageSize :5}`
    ]
  },
  {
    url : '/gameBaseInfoController/findNewGame',
    use : '游戏名称模糊查询',
    result : [
      `失败:{code:500,data:null}
      成功:{200,data:[{ game_name_cn: 游戏中文名称
      game_name_en: 游戏英文名称
      game_logo: 游戏封面
      market_time: 上市时间 时间格式 2016-02-07
      platform: 平台
      game_type: 游戏属性、类型
      score: 评分
      is_support_CN: 是否支持中文，1-支持、0-不支持
      game_summary: 游戏简介 created_by: 创建人 created_date: 创建时间 updated_by: updated_date: sales_volume:
      Host:主机 goods_id: 商品id
      Language: 语言,中文zh_CN,英语en_US,日语xrb_JP}]
      `
    ],
    des : [
      `涉及操作 查询 处理逻辑 GET请求方式，直接调用查询即可`
    ],
    params : [
      `Var param={ gameType:’gameName’,gameName:游戏名称”,curIndex :1, PageSize :5}`
    ]
  },
  {
    url : '/gameBaseInfoController/findNewGame',
    use : '查询单个游戏，咨询，攻略',
    result : [
      `失败:{code:500,data:null}
      成功:{200,data:[{ game_name_cn: 游戏中文名称
      game_name_en: 游戏英文名称
      game_logo: 游戏封面
      market_time: 上市时间 时间格式 2016-02-07
      platform: 平台
      game_type: 游戏属性、类型
      score: 评分
      is_support_CN: 是否支持中文，1-支持、0-不支持
      game_summary: 游戏简介 created_by: 创建人 created_date: 创建时间 updated_by: updated_date: sales_volume:
      Host:主机 goods_id: 商品id
      Language: 语言,中文zh_CN,英语en_US,日语xrb_JP}]
      `
    ],
    des : [
      `涉及操作 查询 处理逻辑 GET请求方式，直接调用查询即可`
    ],
    params : [
      `Var param={ gameType:’ gameNameId’, gameNameId:”游戏Id”,curIndex :1, PageSize :5}`
    ]
  },
  {
    url : '/gameBaseInfoController/findNewGame',
    use : '平台查询',
    result : [
      `失败:{code:500,data:null}
      成功:{200,data:[{ game_name_cn: 游戏中文名称
      game_name_en: 游戏英文名称
      game_logo: 游戏封面
      market_time: 上市时间 时间格式 2016-02-07
      platform: 平台
      game_type: 游戏属性、类型
      score: 评分
      is_support_CN: 是否支持中文，1-支持、0-不支持
      game_summary: 游戏简介 created_by: 创建人 created_date: 创建时间 updated_by: updated_date: sales_volume:
      Host:主机 goods_id: 商品id
      Language: 语言,中文zh_CN,英语en_US,日语xrb_JP}]
      `
    ],
    des : [
      `涉及操作 查询 处理逻辑 GET请求方式，直接调用查询即可`
    ],
    params : [
      `Var param={ gameType:’ platform’, gameName:”平台名称”,curIndex :1, PageSize :5}`
    ]
  },
  {
    url : '/gameBaseInfoController/findNewGame',
    use : '游戏类别',
    result : [
      `失败:{code:500,data:null}
      成功:{200,data:[{ game_name_cn: 游戏中文名称
      game_name_en: 游戏英文名称
      game_logo: 游戏封面
      market_time: 上市时间 时间格式 2016-02-07
      platform: 平台
      game_type: 游戏属性、类型
      score: 评分
      is_support_CN: 是否支持中文，1-支持、0-不支持
      game_summary: 游戏简介 created_by: 创建人 created_date: 创建时间 updated_by: updated_date: sales_volume:
      Host:主机 goods_id: 商品id
      Language: 语言,中文zh_CN,英语en_US,日语xrb_JP}]
      `
    ],
    des : [
      `涉及操作 查询 处理逻辑 GET请求方式，直接调用查询即可`
    ],
    params : [
      `Var param={ gameType:’ gameType’, gameName:”类别名称”,curIndex :1, PageSize :5}`
    ]
  },
  {
    url : '/gameBaseInfoController/findNewGame',
    use : '语言查询',
    result : [
      `失败:{code:500,data:null}
      成功:{200,data:[{ game_name_cn: 游戏中文名称
      game_name_en: 游戏英文名称
      game_logo: 游戏封面
      market_time: 上市时间 时间格式 2016-02-07
      platform: 平台
      game_type: 游戏属性、类型
      score: 评分
      is_support_CN: 是否支持中文，1-支持、0-不支持
      game_summary: 游戏简介 created_by: 创建人 created_date: 创建时间 updated_by: updated_date: sales_volume:
      Host:主机 goods_id: 商品id
      Language: 语言,中文zh_CN,英语en_US,日语xrb_JP}]
      `
    ],
    des : [
      `涉及操作 查询 处理逻辑 GET请求方式，直接调用查询即可
        如果用户勾选多个平台传参如下
        Var param={ gameType:’ language’, gameName:”A,B,C”,curIndex :1, PageSize :5}`
    ],
    params : [
      `Var param={ gameType:’ language’, gameName:”语言”,curIndex :1, PageSize :5}`
    ]
  },
  {
    url : '/mxUserPlayController/saveUserPlay',
    use : '添加想玩',
    result : [
      `失败:{code:500,data:null}
      成功:{200,data:[{result:true(false)}]
      `
    ],
    des : [
      `处理逻辑 POST请求方式，直接调用即可`
    ],
    params : [
      `Var params=[{goodsId:”游戏Id”}]`
    ]
  },
  {
    url : '/mxUserController/findUserPower',
    use : '查询用户租凭的权限',
    result : [
      `失败:{code:500,data:null}
成功:{200,data:[{result:true(false)}]
      `
    ],
    des : [
      `处理逻辑 POST请求方式，直接调用即可
      True:可以租凭
      If(false&&message!=null) 用户租碟未还
      If (false&&message==null) 用户权限不够`
    ],
    params : [
      `Var params=[{goods_id:”游戏Id”}]`
    ]
  },
  {
    url : '/userComment/findLikeGoods',
    use : '查询相关游戏',
    result : [
      `失败:{code:500,data:null}
成功:{code:200,data:[list:{ game_name_cn: 游戏中文名称
game_name_en: 游戏英文名称
game_logo: 游戏封面
market_time: 上市时间 时间格式 2016-02-07
platform: 平台
game_type: 游戏属性、类型
score: 评分
is_support_CN: 是否支持中文，1-支持、0-不支持
game_summary: 游戏简介 created_by: 创建人 created_date: 创建时间 updated_by: updated_date: sales_volume:
Host:主机 goods_id: 商品id
Language: 语言,中文zh_CN,英语en_US,日语xrb_JP}]
      `
    ],
    des : [
      `POST请求方式，直接调用即可`
    ],
    params : [
      `Var params=[{gameType:”A,B,C”}]`
    ]
  },
  {
    url : '/userComment/findComment',
    use : '查看评论',
    result : [
      `失败:{code:500,data:null}
成功:{200,data:[list:{ article_id:”文章ID”, create_date:”创建时间”, 
comment_text:”评论类容”, comment_grade:”点赞数”, article_type:”文章类型”, parent_id:”父类Id” }]
      `
    ],
    des : [
      `POST请求方式，直接调用即可`
    ],
    params : [
      `Var params=[{pageNumber:1,pageSize:5, article_id:’文章Id’}]`
    ]
  },
  {
    url : '/userComment/insertComment',
    use : '回复或者评论',
    result : [
      `失败:{code:500,data:null}
成功:{200,data:[{result:true(false)}]
      `
    ],
    des : [
      `POST请求方式，直接调用即可
回复parent_id必填
评论parent_id可以为空   涉及操作  添加`
    ],
    params : [
      `Var params=[{ article_id :”文章Id”, comment_text :”文章类容”, comment_grade:”点赞数”, article_type: “文章类型”, parent_id:”父类ID” }]`
    ]
  },
  {
    url : '/mxCouponController/queryConponCount',
    use : '查询用户购物券',
    result : [
      `失败:{code:500,data:null}
      成功:{200,data:[{coupon_type:1,coupon_condition:1,coupon_description:1,
      Coupon_start_date:xxx,coupon_end_date:xxx},
      {coupon_type:2,coupon_condition:2,coupon_description:2,
      Coupon_start_date:xxx,coupon_end_date:xxx}]}
      `
    ],
    des : [
      `处理逻辑 POST请求方式，直接调用查询即可
        1.couponCondition:用户优惠券使用条件,
        2.couponDescription:用户优惠券描述,
        3.couponStartDate:用户优惠券开始时间,
        4.couponEndDate:用户优惠券结束时间
        `
    ],
    params : []
  },
  {
    url : '/mxUserBookingController/memberBookingGames',
    use : '钻石会员预定游戏',
    result : [
      `失败:结果1.{code:500,data:您已经预定过该游戏了，无法再次预定!} 
结果2：{code:500,data:您没有租赁的游戏还剩余三天时间，无法预定游戏!}
结果3：{code:500,data:预定失败!}

成功:{code:200,data:预定成功!}
      `
    ],
    des : [
      `处理逻辑 POST请求方式 goodsId:商品id
根据商品id查询此用户是否已经预定过商品，如果预定了商品就不能再次预定，如果没有预定就保存此会员预定的商品和用户的id`
    ],
    params : [`Var param={goodsId:xxx}`]
  },

  {
    url : '/mxUserController/saveUser',
    use : '保存或者修改用户',
    result : [
      `失败:结果1{code:500,data:此账户名以存在}
          结果2{code:500,data:执行出现异常}
          成功:{code:200,data:true}
      `
    ],
    des : [
      `POST请求方式，
        type:save或者update
        userAccount:用户账户
        userPwd:用户密码
        userRealName:用户真实姓名
        userNickname:用户昵称
        userEmail:用户电子邮件
        userAddress:用户地址
        userPhone:用户电话号码
        userLinkMan:用户紧急联系人
        userBirthday:用户生日
        userPlatform:用户属于的平台
        
        当type为save时就是保存用户，为update时就是修改用户 `
    ],
    params : [`Var param={
      userAccount:xxx,
      userPwd:xxx,
      userRealName:xxx,
      userNickname:xxx,
      userEmail:xxx,
      userAddress:xxx,
      userPhone:xxx,
      userLinkMan:xxx,
      userBirthday:xxx,
      userPlatform:xxx,
      type:save,update
      }`]
  },
  {
    url : '/mxUserController/deleteUser',
    use : '删除用户',
    result : [
      `失败:{code:500,data:null}
成功:{code:200,data:true}
      `
    ],
    des : [
      `POST请求方式，直接查询即可 `
    ],
    params : [`userAccount:"用户名"`]
  },
  /*{
    url : '/mxUserController/joinMember',
    use : '加入会员',
    result : [
      `失败:{code:500,data:执行出现异常}
        成功:{code:200,data:true}
      `
    ],
    des : [
      `POST请求方式，
        userMemberLevel:1,2,3
        1:黄金会员
        2:白金会员
        3:钻石会员 `
    ],
    params : [`Var param={userMemberLevel:xxx}`]
  },*/
  {
    url : '/mxUserController/findUserMessage',
    use : '查询用户资料',
    result : [
      `失败:{code:500,data:null}
        成功:{code:200,data:{
                    user_head_sculpture:用户头像路径,			
        user_real_name:用户真实姓名,
              user_synopsis:用户简介,
              user_label:用户标签,
                user_sex:用户性别,
              user_city:用户城市,
              user_birthday:用户生日
              userBuyCount:用户购买的游戏数量
              userRentCount:用户租赁的游戏数量
        }}
      `
    ],
    des : [

    ],
    params : [``]
  },
  {
    url : '/mxUserController/findUserGCoin',
    use : '查询用户g币',
    result : [
      `失败:{code:500,data:null}
成功:{code:200,data:{userGCoin:100}}
      `
    ],
    des : [
      `POST请求方式，直接查询即可userGCoin.用户的g币`
    ],
    params : [``]
  },
  {
    url : '/mxUserController/findUserBalance',
    use : '查询用户余额',
    result : [
      `失败:{code:500,data:null}
成功:{code:200,data:{userBalance:100}}
      `
    ],
    des : [
      `POST请求方式，直接查询即可啦,userBalance.用户余额`
    ],
    params : [``]
  },
  {
    url : '/mxUserController/findUserDeposit',
    use : '查询用户押金',
    result : [
      `失败:{code:500,data:null}

成功:{code:200,data:{userDeposit:100}}
      `
    ],
    des : [
      `POST请求方式，直接查询即可,userDeposit.用户押金`
    ],
    params : [``]
  },
  {
    url : '/mxUserController/findUserBuyOrRent',
    use : '查询用户购买或者租赁的商品',
    result : [
      `失败:{code:500,data:null}
成功:{code:200,data:{goodsId:1, 
					 goodsName:2,
					goodsDes:3,
					goodsPrice:4,
					 goodsPosition:6,
					goodsFormat:7,
					goodsCount:8,
					 goodsColor:9,
					goodsConfigure：xxx
    }}
      `
    ],
    des : [
      `type:buy,rent
buy:查询购买的产品
rent:查询租赁的产品
            goodsId:商品id, 
		    goodsName:商品名称,
			goodsDes:商品描述,
			goodsPrice:商品价格,
			 goodsPosition:商品位置,
			goodsFormat:商品规格
			goodsCount:商品数量,
			 goodsColor:商品颜色,
			goodsConfigure：商品颜色
             Goods_rent_price:商品租赁价格

`
    ],
    params : [` Var param={type:buy或者rent}`]
  },
  {
    url : '/mxUserController/getRandomStr',
    use : '随机生成邀请码',
    result : [
      `失败:{code:500,data:null}

成功:{code:200,data:123HSNXZZHE}
      `
    ],
    des : [
      `处理逻辑
length:生成验证码的长度`
    ],
    params : [``]
  },
  {
    url : '/mxUserController/findUserMemberLevel',
    use : '查询会员等级',
    result : [
      `失败:{code:500,data:null}
成功:{code:200,data:{userMemberLevel:3}}
      `
    ],
    des : [
      `返回用户会员等级:userMemberLevel`
    ],
    params : [``]
  },
  {
    url : '/mxUserController/getGCoinByThumbOrComment',
    use : '用户通过点赞或者评论获取G币',
    result : [
      `失败:{code:500,data:null}
成功:{code:200,data:{userGCoin:100}}
      `
    ],
    des : [
      `Type:thumb或者comment表示点赞还是租赁`
    ],
    params : [`Var param={type:thumb或者comment}`]
  },

  {
    url : '/mxUserController/getGCoinByAdvert',
    use : '用户通过广告获取G币',
    result : [
      `失败:{code:500,data:null}
成功:{code:200,data:true}
      `
    ],
    des : [
      `leafletId:11表示传递过来的广告id`
    ],
    params : [`var param={leafletId:111}  `]
  },

  {
    url : '/mxUserPlayController/saveUserPlay',
    use : '保存用户想玩的游戏',
    result : [
      `失败:{code:500,data:null}
        成功:{code:200,data:添加成功！}
      `
    ],
    des : [
      `goodsId:11表示传递过来的商品id`
    ],
    params : [`var param={goodsId:111}`]
  },

  {
    url : '/mxUserPwdController/changePwd',
    use : '修改用户密码',
    result : [
      `失败:{code:500,data:null}
成功:{code:200,data:true}
      `
    ],
    des : [
      `userPwd:用户的新密码`
    ],
    params : [`var param={userPwd:111}`]
  },

  {
    url : '/mxUserReturnController/returnGoods',
    use : '用户退还商品',
    result : [
      `成功 :status:200 ,msg:success,data:true,
失败 :status:500 ,msg:fail,data:null,
      `
    ],
    des : [
      `goodsId 商品Id  recordId用户交易表id 物流单号logisticsNumber logisticsPlatformd物流平台`
    ],
    params : [`param: goodsId 商品Id  recordId用户交易表id 物流单号logisticsNumber logisticsPlatformd物流平台`]
  },

  {
    url : '/mxUserReturnController/returnGoodsSuccess',
    use : '用户退还商品成功',
    result : [
      `失败:{code:500,data:null}
成功:{code:200,data:true}
      `
    ],
    des : [
      `userReturnId:用户退还的记录的id`
    ],
    params : [`var param={userReturnId:111}`]
  },

  {
    url : '/mxOrderController/balanceShoppingCart',
    use : '结算总价',
    result : [
      `失败:{code:500,data:null}
成功:{code:200,data:12345566}
      `
    ],
    des : [
      `输入参数:orderId 订单号
输出参数:失败返回null,成功返回订单总金额
`
    ],
    params : [`var param={goodsIds:111,22,333}`]
  },

  {
    url : '/mxOrderController/generateOrder',
    use : '生成订单',
    result : [
      `失败:{code:500,data:null}
成功:{code:200,data:xxxxx}
      `
    ],
    des : [
      `成功:data.返回订单ID`
    ],
    params : [`var param={goodsIdList:111,22,333,}`]
  },
  {
    url : '/mxOrderGoodsController/generatePriceMessage',
    use : '生成续租价格详情',
    result : [
      `失败:{code:500,data:null}
成功:{code:200,data:12345566}
      `
    ],
    des : [
      `输入参数:goodsIds:订单的id字符串
输出参数:失败返回null,成功返回产品续租的总金额`
    ],
    params : [`var param={goodsId:111,}`]
  },
  {
    url : '/mxOrderGoodsController/reletGames',
    use : '续租游戏',
    result : [
      `失败:{code:500,data:null}
成功:{code:200,data:12345566}
      `
    ],
    des : [
      `输入参数:1.orderId:订单Id字符串，
2.goodsIds:商品的id字符串
输出参数:失败返回null,成功返回true
`
    ],
    params : [`var param={goodsId:111,}`]
  },
  {
    url : '/mxUserController/saveUser',
    use : '保存或者修改用户',
    result : [
      `失败:结果1{code:500,data:此账户名以存在}
    结果2{code:500,data:执行出现异常}
成功:{code:200,data:true}
      `
    ],
    des : [
      `POST请求方式，
type:save或者update
userAccount:用户账户
userPwd:用户密码
userRealName:用户真实姓名
userNickname:用户昵称
userEmail:用户电子邮件
userAddress:用户地址
userPhone:用户电话号码
userLinkMan:用户紧急联系人
userBirthday:用户生日
userPlatform:用户属于的平台

当type为save时就是保存用户，为update时就是修改用户`
    ],
    params : [`Var param={
userAccount:xxx,
userPwd:xxx,
userRealName:xxx,
userNickname:xxx,
userEmail:xxx,
userAddress:xxx,
userPhone:xxx,
userLinkMan:xxx,
userBirthday:xxx,
userPlatform:xxx,
type:save,update
}`]
  },
  {
    url : '/user/login',
    use : '验证用户是否正确',
    result : [
      `成功: {member: {password: "admin", salt: null, id: 1, username: 
      "admin", token: null}, hello: "world",…}1.  hello:"world"2.  member:{
      password: "admin", salt: null, id: 1, username: "admin", 
      token: null}3.  token:"93c0b61c-e364-4afe-b8ca-027284af40fa"msg:"success"status:200
      `
    ],
    des : [
      `处理逻辑 POST请求方式username:用户账户名password:用户密码根据用户输入的账户名和密码判断此用户是否正确，并提示相关信息`
    ],
    params : [`输入 Var param={username:xxx, password:xxx} 
输出 失败:{code:500,data: }`]
  },
]
