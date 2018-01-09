let _step1Cache;
let _step2Cache;
let _step3Cache;


export default {
  get step1Cache(){
    return _step1Cache;
  },
  set step1Cache(newVal){
    _step1Cache = newVal;
  },
  get step2Cache(){
    return _step2Cache;
  },
  set step2Cache(newVal){
    _step2Cache = newVal;
  },
  get step3Cache(){
    return _step3Cache;
  },
  set step3Cache(newVal){
    _step3Cache = newVal;
  },
  reset(){
    _step1Cache = null;
    _step2Cache = null;
    _step3Cache = null;
  }
  
}
