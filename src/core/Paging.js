/*
* 分页处理器
* */



export default class Paging{
  constructor(params,api){
    if(!api){
      throw Error('缺少调用方法')
    }
    this.params = {};
    this.curIndex = 1;
    this.pageSize = 6;
    this.api = api;
    Object.assign(this.params,params);
  }
  
  send(){
    let {curIndex,pageSize} = this;
    return this.api({
      curIndex,pageSize,...this.params
    })
  }
  
}

