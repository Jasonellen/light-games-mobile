import apiList from './http';
import ajax from './ajax';
// http:

/**
 * gameApi  所有的api集合
 * */
const gameApi = {};
// const domin = '//119.23.104.119:8181/zzb-dream';
const domin = '//39.108.68.193:8181/zzb-dream';



apiList.forEach((item,index)=>{
  let {url,use} = item;
  url = url.replace(/\s/g,'');
  let urlName = url.split('/').pop();
  if(url){
    url = url.replace(/^\/zzb-dream/,'');
    let sendUrl = `${domin}${url}`;
    gameApi[urlName] = {
      send(params={},congig = {}){
        return ajax({
          url : sendUrl,
          use
        },{
          params,
          congig
        })
      },
      url : sendUrl
    }
  }

})


export default gameApi;
