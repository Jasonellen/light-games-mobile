<template>
	<div class="my-game-tab-page ">
     <header class="clearfix">
      <i class="fl back"></i>
      <div class="box fl">
        <i class="sousuo"></i>
        <input type="text" class="item" placeholder="搜索" />
      </div>
    </header>
     <div class="play-list-warp">
      <ul class="play-list">
        <li>
        <div class="top">
            <div class="top-body">
              <div class="pic-box">
                <img src="" alt="">
              </div>
              <div class="des">
                <p class="name">刺客型条 <span>(AdasdHadas)</span></p>
                <p class="p2">
                  <span>版本：港行</span>
                </p>
                <p class="p3">购买价：￥999 <font>市场价：￥399元</font></p>
              </div>
            </div>
          </div>
          
        </li>
        
      </ul>
    </div>
	</div>
</template>

<script>


	export default {
    data(){
        return{
          open:false,
        }
    },
    methods:{
        openFn(){
          this.open=!this.open;
        }
    },
    components:{
		},
    created(){
			document.body.style.backgroundColor='#f7f7f7';
       document.title = "搜索后";
    },
  }
</script>

<style lang="scss" src="./index.scss" rel="stylesheet/scss"></style>
