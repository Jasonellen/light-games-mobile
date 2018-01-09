import axios from 'axios';

import userInfo from 'core/userInfo';



export default ({url,use},options = {},)=>{
  let headers = userInfo.getHead();
  // log('headers',headers)
  if(headers){
    Object.keys(headers).forEach((key)=>{
      axios.defaults.headers[key] = headers[key];
    })
  }
  
  let {params,congig} = options;
  let {isSearchVip} = congig;
  // info('开始请求',use,'接口',url,'参数是',params);
  function result(res) {
    let {data} = res;
    // info('接口',use,'返回的结果',data);
    if(data && (data.status == 0) && !isSearchVip){
      userLogin.open({
        step : 3,
      })
      return false;
    }else{
      return data;
    }
  }
  delete congig.isSearchVip;
  congig.apiType = congig.apiType || 'from';
  if(congig.apiType === 'from'){
    let URLparams = new FormData();
    Object.keys(params).forEach((item)=>{
      URLparams.append(item, params[item]);
    })
    return axios.post(url,URLparams,congig).then(result)
  }else if(congig.apiType === 'file'){
    let URLparams = new FormData();
    Object.keys(params).forEach((item)=>{
      URLparams.append(item, params[item]);
    })
    return axios.post(url,URLparams,congig).then(result)
  }else{
    congig.method = congig.method || 'post';
    return axios({
      url,
      params,
      ...congig
    }).then(result)
  }
}
