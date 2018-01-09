<template>
  <img @click="toShopping" width="52" src="../../assets/buyCar.png" alt="">
</template>
<script>
  export default {
    name :'BuyIcon',
    methods : {
      toShopping(){
      	alertBox.checkLogin(function (isLogin) {
          isLogin && toPage.Shopping.push();
        })

      }
    }
  }
</script>
