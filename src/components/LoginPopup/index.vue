<template>
    <div class="login-modal-box" v-show="visible">
      <div class="login-mask" @click="visible = !visible"></div>
      <Step1 v-if="step === 1" v-on:nextFn="Step1Fn" v-on:jumpStep="jumpStep"></Step1>
      <Step2 v-if="step === 2" v-on:nextFn="Step2Fn" v-on:jumpStep="jumpStep"></Step2>
      <Step3 v-if="step === 3" v-on:nextFn="Step3Fn" v-on:jumpStep="jumpStep"></Step3>
    </div>
</template>
<script>
  import Step1 from './Step1.vue';
  import Step2 from './Step2.vue';
  import Step3 from './Step3.vue';
  export default {
    name : 'login-modal',
    data(){
      return{
        step : 1,
        visible : false
      }
    },
    methods : {
      Step1Fn(){
        this.step = 2;
      },
      Step2Fn(){
        this.sureFn && this.sureFn(this);
      },
      Step3Fn(){

      },
      jumpStep(index){
        this.step = index;
        if(!index)this.visible = false;
      }
    },
    components : {Step1,Step2,Step3}
  }
</script>
<style lang="scss" rel="stylesheet/scss" src="./index.scss"></style>
