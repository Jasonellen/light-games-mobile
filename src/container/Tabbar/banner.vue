<template>
  <!-- <swiper :options="swiperOption" ref="xxxx">
    <swiper-slide v-for="({img_name,banner_type,info_id},i) in list" :key="i">
      <img :src="img_name" alt="" @click='linkTo(banner_type,info_id)'>
    </swiper-slide>
  </swiper> -->

  <mt-swipe :auto="3000">
    <mt-swipe-item v-for="({img_name,banner_type,info_id},i) in list" :key="i">
      <img :src="img_name" alt="" @click='linkTo(banner_type,info_id)'>
    </mt-swipe-item>
  </mt-swipe>
</template>

<script>
	export default {
    name : 'banner',
    props : {list : Array},
    data(){
    	return{
        swiperOption: {
          setWrapperSize :true,
          observeParents:true,
        },
      }
    },
    methods:{
      linkTo(banner_type,info_id){
        if(banner_type == '1'){
          toPage.GameDetail.push(info_id);
        }else{
          toPage.ConsultationDetails.push(`${info_id}/1`);
        }
      }
    }
  }
</script>


