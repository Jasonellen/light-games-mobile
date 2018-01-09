/*
*页面缓存
* */

let _homePageIndex;//首页的tabbar  index  为了区分下次进入首页应该进入哪一个页面

let _allGameList;//所有游戏选择

let _address;//修改地址页面

let _delGbi;

let _jubao;//举报信息
export default {
  get homePageIndex(){
    return _homePageIndex;
  },
  set homePageIndex(newVal){
    _homePageIndex = newVal;
  },
  get allGameList(){
    return _allGameList;
  },
  set allGameList(newVal){
    _allGameList = newVal;
  },
  get address(){
    return _address;
  },
  set address(newVal){
    _address = newVal;
  },
  get delGbi(){
    return _delGbi;
  },
  set delGbi(newVal){
    _delGbi = newVal;
  },
  get jubao(){
    return _jubao;
  },
  set jubao(newVal){
    _jubao = newVal;
  }
}
