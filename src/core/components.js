import Vue from 'vue';

import {
  Button,Toast, Navbar,
  Tabbar, TabItem, Header,
  TabContainer, TabContainerItem,
  Swipe, SwipeItem, Checklist,
  InfiniteScroll,Loadmore,
  MessageBox,Switch, Field,
  DatetimePicker, Radio, Picker
} from 'mint-ui';

import MyHeader from 'pageview/MyHeader';
import Evaluation from 'pageview/Evaluation/index.vue';
import LoadMore1 from 'pageview/LoadMore/index.vue';
import BuyIcon from 'pageview/BuyIcon/index.vue';
import PingLun from 'pageview/PingLun/index.vue';
import ZiXun from 'pageview/ZiXun/index.vue';
Vue.component(MyHeader.name, MyHeader);//公用头部
Vue.component(Evaluation.name, Evaluation);
Vue.component(LoadMore1.name, LoadMore1);//上啦刷新
Vue.component(BuyIcon.name, BuyIcon);//购物车
Vue.component(PingLun.name, PingLun);//评论
Vue.component(ZiXun.name, ZiXun);//评论

//swiper插件
import VueAwesomeSwiper from 'vue-awesome-swiper';
Vue.use(VueAwesomeSwiper);





Object.assign(Vue.prototype,{
  alert(message,option={}){
    option = {...option,...{message}}
    Toast(option);
  },
  alertBox(option){
    return MessageBox(option);
  }
})

Vue.use(InfiniteScroll);

Vue.component(Switch.name, Switch);
Vue.component(Button.name, Button);
Vue.component(Navbar.name, Navbar);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Header.name, Header);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Checklist.name, Checklist);
Vue.component(MessageBox.name, MessageBox);
Vue.component(Field.name, Field);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Radio.name, Radio);
Vue.component(Picker.name, Picker);


Vue.filter('filterTime',function (val) {
  return val ? val.split(' ').shift() : val;
})


Vue.filter('commentFilter',function (val) {
  return val ? (parseFloat(val) > 999 ? '999+' : val) : 0;
})


Vue.filter('supportCh',function (val) {
  return val === '1' ?'支持' : '不支持';
})
