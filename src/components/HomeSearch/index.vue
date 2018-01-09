<template>
  <div class="game-home-head">
    <header>
      <div class="box fl">
        <i class="sousuo"></i>
        <input @focus="focusIpt" type="text" class="item" :placeholder="'搜索  '+ hotword" />
      </div>
      <i class="car fr">
        <BuyIcon />
      </i>
    </header>
  </div>
</template>

<script>

	export default {
    data(){
      return{
       hotword:'11'
      }
    },
		props : {
			home : {type : Boolean}
    },
		methods: {
      focusIpt(){
      	if(this.home){
      		toPage.search.push();
        }
      }
		},
		created(){
      gameApi.findHotWord.send()
        .then(data=>{
          if(data.msg == 'success'){
            this.hotword = data.data[0].hot_word
          }
        })
    },
	}
</script>

<style src='./index.scss' lang="scss" rel="stylesheet/less" scoped></style>
