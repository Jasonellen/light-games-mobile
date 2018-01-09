/*
 * 这里是路由定义导出的地方
 * */


import Vue from 'vue'
import Router from 'vue-router'
//页面路由
const App = r => require.ensure([], () => r(require('@/App.vue')), 'App')
const Tabbar = r => require.ensure([], () => r(require('page/Tabbar')), 'Tabbar')
const GameClassify = r => require.ensure([], () => r(require('page/gameClassify')), 'GameClassify')
const MyGameTab = r => require.ensure([], () => r(require('page/myGameTab')), 'MyGameTab')
const GameDetail = r => require.ensure([], () => r(require('page/GameDetail')), 'GameDetail')
const ConsultationDetails = r => require.ensure([], () => r(require('page/ConsultationDetails')), 'ConsultationDetails')
const Mine = r => require.ensure([], () => r(require('page/Mine')), 'Mine')
const Pay = r => require.ensure([], () => r(require('page/Pay')), 'Pay')
const MyGbi = r => require.ensure([], () => r(require('page/MyGbi')), 'MyGbi')
const gameImg = r => require.ensure([], () => r(require('page/gameImg')), 'gameImg')
const gameVideo = r => require.ensure([], () => r(require('page/gameVideo')), 'gameVideo')
const Shopping = r => require.ensure([], () => r(require('page/Shopping')), 'Shopping')
const VipType = r => require.ensure([], () => r(require('page/VipType')), 'VipType')
const TransactionRecord = r => require.ensure([], () => r(require('page/TransactionRecord')), 'TransactionRecord')
const searchAfter = r => require.ensure([], () => r(require('page/searchAfter')), 'searchAfter')
const search = r => require.ensure([], () => r(require('page/search')), 'search')
const comment = r => require.ensure([], () => r(require('page/comment')), 'comment')
const commenOrter = r => require.ensure([], () => r(require('page/commenOrter')), 'commenOrter')
const AllComments = r => require.ensure([], () => r(require('page/AllComments')), 'AllComments')
const ContactUs = r => require.ensure([], () => r(require('page/ContactUs')), 'ContactUs')
const InvitingFriends = r => require.ensure([], () => r(require('page/InvitingFriends')), 'InvitingFriends')
const Detailed = r => require.ensure([], () => r(require('page/Detailed')), 'Detailed')
const EditData = r => require.ensure([], () => r(require('page/EditData')), 'EditData')
const newAddress = r => require.ensure([], () => r(require('page/newAddress')), 'newAddress')
const Report = r => require.ensure([], () => r(require('page/Report')), 'Report')
const rule = r => require.ensure([], () => r(require('page/rule')), 'rule')
const submitOrder = r => require.ensure([], () => r(require('page/submitOrder')), 'submitOrder')
const address = r => require.ensure([], () => r(require('page/address')), 'address')
const myWallet = r => require.ensure([], () => r(require('page/myWallet')), 'myWallet')
const GameLibrary = r => require.ensure([], () => r(require('page/GameLibrary')), 'GameLibrary')
const Question = r => require.ensure([], () => r(require('page/Question')), 'Question')
const Forget = r => require.ensure([], () => r(require('@/components/LoginPopup/Forget')), 'Forget')
const Forget1 = r => require.ensure([], () => r(require('@/components/LoginPopup/Forget1')), 'Forget1')
const ForgetResult = r => require.ensure([], () => r(require('@/components/LoginPopup/ForgetResult')), 'ForgetResult')

//文档路由
const Api = r => require.ensure([], () => r(require('page/api/Api')), 'Api') //接口文档
const Pathtree = r => require.ensure([], () => r(require('page/pathtree')), 'Pathtree') //说明文档

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        component: App,
        children: [
            /****  页面路由    *****/
            { path: '', component: Tabbar, page: '主页' },
            { path: '/GameDetail/:flag', component: GameDetail, page: '游戏详情页', needFlag: true }, //游戏详情页
            { path: '/gameClassify', component: GameClassify, page: '游戏根类' }, //游戏根类
            { path: '/myGameTab', component: MyGameTab, page: '我的游戏   想玩 在玩' }, //我的游戏   想玩 在玩
            { path: '/ConsultationDetails/:flag/:flag2', component: ConsultationDetails, page: '咨询详情', needFlag: true }, //ConsultationDetails 咨询详情
            { path: '/Mine', component: Mine, page: 'Mine' }, //Mine
            { path: '/Pay', component: Pay, page: '收银台',name: 'Pay'  }, //Pay 收银台
            { path: '/MyGbi', component: MyGbi, page: 'G币' }, //MyGbi G币
            { path: '/Shopping', component: Shopping, page: '购物车' }, //购物车
            { path: '/VipType', component: VipType, page: '会员类别' }, //会员类别
            { path: '/Pay/:orderId/:price', component: Pay, page: '收银台' }, //Pay 收银台
            { path: '/MyGbi', component: MyGbi, page: 'G币' }, //MyGbi G币
            { path: '/gameImg/:flag', component: gameImg, page: '游戏图片' }, //gameImg 游戏图片
            { path: '/gameVideo/:name', component: gameVideo, page: '游戏视频' }, //gameImg 游戏视频
            { path: '/TransactionRecord/:id', component: TransactionRecord, page: '交易记录' }, //TransactionRecord 交易记录
            { path: '/searchAfter', component: searchAfter, page: '搜索后' }, //searchAfter  搜索后
            { path: '/search', component: search, page: '搜索' }, //search  搜索
            { path: '/comment/:articleId', component: comment, page: '评论' }, //comment  评论
            { path: '/commenOrter/:flag', component: commenOrter, page: '评论其他' }, //commenOrter  评论其他
            { path: '/AllComments/:flag/:flag2', component: AllComments, page: '所有评论', needFlag: true }, //AllComments  所有评论
            { path: '/ContactUs', component: ContactUs, page: '联系我们' }, //ContactUs  联系我们
            { path: '/InvitingFriends', component: InvitingFriends, page: '邀请好友' }, //InvitingFriends  邀请好友
            { path: '/Detailed', component: Detailed, page: '明细' }, //Detailed  明细
            { path: '/EditData', component: EditData, page: '编辑我的资料' }, //EditData  编辑我的资料
            { path: '/newAddress/:flag', component: newAddress, page: '添加新地址' }, //newAddress  添加新地址
            { path: '/Report/:flag', component: Report, page: '举报' }, //Report  举报
            { path: '/rule', component: rule, page: '规则' }, //rule  规则
            { path: '/submitOrder/:orderId', component: submitOrder, page: '提交订单', name: 'submitOrder' }, //submitOrder  提交订单
            { path: '/address', component: address, page: '收货地址' }, //address  收货地址
            { path: '/myWallet', component: myWallet, page: '我的钱包' }, //myWallet  我的钱包
            { path: '/GameLibrary', component: GameLibrary, page: '游戏库' }, //GameLibrary  游戏库
            { path: '/Question', component: Question, page: '常见问题' }, //GameLibrary  常见问题
            { path: 'tabbar', component: Tabbar, page: '主页' },
            { path: '/forget', component: Forget, page: '重置密码' },
            { path: '/forget1/:id', component: Forget1, page: '重置密码' },
            { path: '/ForgetResult', component: ForgetResult, page: '重置密码' },

            /****  文档路由    *****/
            { path: '/Api', component: Api, page: 'Api 文档' },
            { path: '/Pathtree', component: Pathtree, page: '项目说明' },

            // {
            //     //重定向也是通过 routes 配置来完成，下面例子是所有 重定向到 /：
            //     path: '*',
            //     redirect: "/EditData"
            // }
        ]
    }]
})
