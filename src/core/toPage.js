/*
* 页面跳转
*
* 只做一级路由跳转
*
* 跳转方法  路由名.push|replace(string)  @params  路由配置的参数
* */


import router from '../router';
import Vue from 'vue';
import pageCache from 'core/pageCache';


function toPath(type,basePath,params,needFlag,isCb) {
  if(needFlag && !params){
    throw Error('此路由需要接受参数');
  }
  params && (params = '/' + params);
  router[type](basePath+params);
}
//页面路由跳转对象
const toPage = {};

let {routes} = router.options;
routes.forEach(({path,children})=>{
    if(children){
      children.forEach((item)=>{
        let {path:subPath,page,needFlag} = item;
        let basePath = path + subPath.replace(/^\//,'').split('/').shift();
        let routerName = basePath.replace('/','');
        if(!/[a-z]/i.test(routerName))return;
        toPage[routerName] = {
          push(params = ''){
            toPath('push',basePath,params,needFlag);
          },
          replace(params = ''){
            toPath('replace',basePath,params,needFlag);
          },
          name : routerName,
          page,
          needFlag
        }
      })
    }
})

toPage._back = ()=>router.back();
toPage._push = (...agu)=>router.push(...agu);
toPage._reload = ()=>location.reload();
export default toPage;
