import Login from 'pageview/LoginPopup';
import Vue from 'vue';

const LoginModel = Vue.extend(Login);
let insetLogin;

let emptyFunction = ()=>{}

/*
* *
* @params nextSure1(this,接口返回值) 注册回调不管成功与否
* @params nextSure2(this,接口返回值) 完成注册回调不管成功与否
* @params nextSure3(this,接口返回值) 登陆回调不管成功与否
*
* 每一步操作都在每一个对于的文件去做
* */
export default {
  open(options = {}) {
    if (!insetLogin) {
      insetLogin = new LoginModel({
        el: document.createElement('div')
      });
    }
    if (insetLogin.visible) return;
    insetLogin.nextSure1 = options.nextSure1 || emptyFunction;
    insetLogin.nextSure2 = options.nextSure2 || emptyFunction;
    insetLogin.nextSure3 = options.nextSure3 || emptyFunction;
    insetLogin.step = options.step || 1;
    document.body.appendChild(insetLogin.$el);
    Vue.nextTick(() => {
      insetLogin.visible = true;
    });
  },
  
  close() {
    if (insetLogin) {
      insetLogin.visible = false;
    }
  }
};

