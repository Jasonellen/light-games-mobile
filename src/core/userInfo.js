let _userLevel;//用户级别  如果没有 那么就是没用登陆
let _vipStatus;//会员级别  空代表不是会员



let HID_____GLAG = 'HID_____GLAG'
let HTOKEN_____GLAG = 'HTOKEN_____GLAG'

export default {
  get userLevel(){
    return _userLevel;
  },
  set userLevel(newVal){
    _userLevel = newVal;
  },
  get vipStatus(){
    return _vipStatus;
  },
  set vipStatus(newVal){
    _vipStatus = newVal;
  },
  
  
  
  
  //设置uid  token
  setHead({Hid,Htoken}){
    local.set(HID_____GLAG,Hid);
    local.set(HTOKEN_____GLAG,Htoken);
  },
  getHead(){
    let Hid = local.get(HID_____GLAG);
    let Htoken = local.get(HTOKEN_____GLAG);
    if(!Hid || !Htoken){
      return null;
    }
    return {
      Hid,
      Htoken
    }
  },
  cleanHead(){
    local.del(HID_____GLAG);
    local.del(HTOKEN_____GLAG);
    _userLevel = null;
    _vipStatus = null;
  }
}
