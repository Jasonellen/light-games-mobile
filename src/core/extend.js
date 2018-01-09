/*
*
*这里是公用函数扩展的地方
* */

import gameApi from '../API/api';
import userLogin from './userLogin';
import toPage from './toPage';
import userInfo from './userInfo';
import { MessageBox } from 'mint-ui';

//无痕提示
if (typeof localStorage === 'object') {
    try {
        localStorage.setItem('localStorage', 1);
        localStorage.removeItem('localStorage');
    } catch (e) {
        Storage.prototype._setItem = Storage.prototype.setItem;
        Storage.prototype.setItem = function() {};
         MessageBox.alert('为了您的正常使用，请关闭无痕模式')
    }
}


//扩展对象
if (typeof Object.assign != 'function') {
  Object.assign = function(target) {
    'use strict';
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }
    
    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      if (source != null) {
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
}
if (!Array.prototype.filter)
{
  Array.prototype.filter = function(fun /* , thisArg*/)
  {
    "use strict";
    
    if (this === void 0 || this === null)
      throw new TypeError();
    
    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== "function")
      throw new TypeError();
    
    var res = [];
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++)
    {
      if (i in t)
      {
        var val = t[i];
        
        // NOTE: Technically this should Object.defineProperty at
        //       the next index, as push can be affected by
        //       properties on Object.prototype and Array.prototype.
        //       But that method's new, and collisions should be
        //       rare, so use the more-compatible alternative.
        if (fun.call(thisArg, val, i, t))
          res.push(val);
      }
    }
    
    return res;
  };
}
// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys) {
  Object.keys = (function() {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty,
      hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
      dontEnums = [
        'toString',
        'toLocaleString',
        'valueOf',
        'hasOwnProperty',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'constructor'
      ],
      dontEnumsLength = dontEnums.length;
    
    return function(obj) {
      if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }
      
      var result = [], prop, i;
      
      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }
      
      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }());
}
//扩展localhost
// Production steps of ECMA-262, Edition 5, 15.4.4.21
// Reference: http://es5.github.io/#x15.4.4.21
if (!Array.prototype.reduce) {
  Array.prototype.reduce = function(callback /*, initialValue*/) {
    'use strict';
    if (this == null) {
      throw new TypeError('Array.prototype.reduce called on null or undefined');
    }
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
    var t = Object(this), len = t.length >>> 0, k = 0, value;
    if (arguments.length == 2) {
      value = arguments[1];
    } else {
      while (k < len && !(k in t)) {
        k++;
      }
      if (k >= len) {
        throw new TypeError('Reduce of empty array with no initial value');
      }
      value = t[k++];
    }
    for (; k < len; k++) {
      if (k in t) {
        value = callback(value, t[k], k, t);
      }
    }
    return value;
  };
}
let local = {
  get(name){
    return window.localStorage[name];
  },
  set(name,val){
    window.localStorage[name] = val;
  },
  del(name){
    delete window.localStorage[name];
  }
}



/**
 * 常见控制台函数
 * */
let log,warn,info;
log = (...agu)=>console.log(...agu);
warn = (...agu)=>console.warn(...agu);
info = (...agu)=>console.info(...agu);



//会员提示  登录提示
let vipBox = `
    <div class="game-tips">
        <span class="vip-tips-icon"></span>
        <p class="text">您还不是会员</p>
    </div>
`;
let useLoginBox = `
    <div class="game-tips">
        <span class="vip-tips-icon user-tips-icon"></span>
        <p class="text">您尚未登陆</p>
    </div>
`;

let cancelButtonClass = 'c66';

let alertBox = {
  goVipPage(){
    alertBox.checkLogin(function (userLevel) {
      if(!userLevel)return;
      if(!userInfo.vipStatus){
        alertBox.vip.open();
      }else{
        toPage.VipType.push();
      }
    })
  },
  //检查有没有登陆
  checkLogin(fn){
    let {userLevel} = userInfo;
    if(!userLevel){
      alertBox.user.open();
    }
    fn && fn(userLevel);
  },
  //没有登录会员提示
  vip : {
    open(){
      return MessageBox({
        title : '',
        message : vipBox,
        showCancelButton : true,
        confirmButtonText : '加入会员',
        cancelButtonText : '我再看看',
        cancelButtonClass
      }).then(action=>{
        if(action === 'confirm'){
          toPage.VipType.push();
        }
      })
    }
  },
  //用户没有登录提示
  user : {
    open(){
      return MessageBox({
        title : '',
        message : useLoginBox,
        showCancelButton : true,
        confirmButtonText : '立即登陆',
        cancelButtonText : '暂不登陆',
        cancelButtonClass
      }).then((action)=>{
        if(action === 'confirm'){
          userLogin.open({
            step : 3,
          })
        }
      })
    }
  }
}


//扩展window对象上面的属性
Object.assign(window,{
  log,warn,info,gameApi,userLogin,toPage,local,alertBox,
})

const fillZero = function(){
  let num = parseFloat(this);
  return num < 10 ? '0' + this : this;
}

Object.assign(String.prototype,{
  fillZero,
  isPhone(){
    return /^1[34578]\d{9}$/.test(this);
  },
  isCode(){
  
  }
})
//兼容到PC
var doc = window.document;
var docEl = doc.documentElement;
var dpr = 0;
var scale = 0;
if (!dpr && !scale) {
  var devicePixelRatio = window.devicePixelRatio;
  if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
    dpr = 3;
  } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
    dpr = 2;
  } else {
    dpr = 1;
  }
  scale = 1 / dpr;
}
var metaEl = doc.createElement('meta');
metaEl.setAttribute('name', 'viewport');
metaEl.setAttribute('test', 'test');
metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
if (docEl.firstElementChild) {
  docEl.firstElementChild.appendChild(metaEl);
} else {
  var wrap = doc.createElement('div');
  wrap.appendChild(metaEl);
  doc.write(wrap.innerHTML);
}

var width = docEl.getBoundingClientRect().width;
var rem =  width / 10;
docEl.style.fontSize = rem + 'px';
document.body.style.fontSize = 12 * dpr + 'px';



