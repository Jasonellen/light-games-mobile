// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import 'vconsole'
require('es6-promise').polyfill();
import './core/extend';
import './core/components';
import 'lodash';
Vue.config.productionTip = false
import initUser from './core/firstLoad';
initUser();
const FastClick = require('fastclick');
FastClick.attach(document.body);


new Vue({
  el: '#app',
  router,
})
