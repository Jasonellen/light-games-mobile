var http = require("http");
var fs = require("fs");
var cheerio = require("cheerio");
var url = "http://image.baidu.com/search/index?tn=baiduimage&ct=201326592&lm=-1&cl=2&ie=gbk&word=%CD%BC%C6%AC&fr=ala&ala=1&alatpl=others&pos=0";

function download ( url,callback ) {
  http.get( url,function(res){
    var data = "";
    res.on("data",function(chunk){
      data += chunk;
    });
    res.on("end",function(){
      callback(data)
    })
  }).on("error",function(err){
    console.log(err)
  })
}

download( url,function( data ) {
  if(data){
    var $=cheerio.load(data);
    $("img").each(function(i,elem){
      var imgSrc=$(this).attr("src");
  
      console.log(imgSrc);
      return;
      http.get(imgSrc,function(res){
        var imgData="";
        res.setEncoding("binary");
        res.on("data",function(chunk){
          imgData += chunk;
        });
        console.log(imgData);
        res.on("end",function(){
          var imgPath="/"+i+"."+imgSrc.split(".").pop();
          fs.writeFile(__dirname + "/imgs"+imgPath,imgData,"binary",function(err){
            console.log(err);
          })
        })
      })
    })
  }
})


