/*
* 图片预加载
* */


export default function preloadimages(arr){
  return new Promise(function (resole,reject) {
    let newimages=[], loadedimages=0;
    arr =(typeof arr!="object")? [arr] : arr
    function imageloadpost(){
      loadedimages++
      if (loadedimages==arr.length){
        resole(newimages) //加载完成调用成功
      }
    }
    for (let i=0, len = arr.length; i <len; i++){
      newimages[i] = arr[i];
      let newImgObj = newimages[i];
      let {goods_url} = newImgObj;
      if(!goods_url){
        newImgObj.reload = false;
        newImgObj.imgHeight = 0;
        imageloadpost();
      }
      newImgObj.$imgDom=new Image()
      newImgObj.$imgDom.src= goods_url;
      newImgObj.$imgDom.width= window.screen.width/2;
      newImgObj.$imgDom.onload=function(){
        newImgObj.reload = true;
        newImgObj.$imgDom = null;
        newImgObj.imgHeight = this.height;
        imageloadpost()
      }
      newImgObj.$imgDom.onerror=function(){
        newImgObj.$imgDom = null;
        newImgObj.reload = false;
        newImgObj.imgHeight = 0;
        imageloadpost()
      }
    }
  })
}


