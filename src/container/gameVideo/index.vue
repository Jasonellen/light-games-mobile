<template>
  <div class='pd-head gameVideo'>
	<my-header title="游戏视频"></my-header>
	<!-- <iframe :src="url" frameborder="0"></iframe> -->
	<!-- <video  controls width="100%" height="422px" preload autoplay @click='videoClick' v-if='url'>
		<source :src="url" type="video/ogg">
		<source :src="url" type="video/mp4">
	</video> -->
	<iframe
		:src="url"
		frameborder=0
		allowfullscreen>
	</iframe>

	<div class="tisp chearfix">
		<p class="fl">{{$route.params.name}}</p>
		<a class="fr" @click='_back'>立即租凭</a>
	</div>
	<div class="line"></div>
	<div class="more" >
		<p class="text">更多视频</p>
    	<p v-if='otherVideo.length<=0' style="line-height: 50px;text-align:center;">暂无更多视频</p>
		<ul class="videoList chearfix" v-if='otherVideo.length>0'>
			<li v-for='item in otherVideo' @click='toPlay(item.title)'>
				<img :src="item.img" >
				<p class="name">{{item.title}}</p>
			</li>
		</ul>
	</div>
  </div>
</template>

<script>
import Vue from 'vue';
	export default {
		data (){
			return {
				url:'',
				otherVideo:[]
			}
		},
		methods: {
			getData(name){
				gameApi.findGameDetals.send({
					name,
					type:4, curIndex :1, pageSize :5
				})
	      		.then((data)=>{
					if(data.msg=='success'){
						this.url = (data.data.result[0] || {}).url
						this.otherVideo = data.data.result.slice(1)
					}
	      		})
			},
			videoClick(e){
				const video = e.target
				if(video.paused){
					video.play()
				}else{
					video.pause()
				}
			},
			_back(){
				toPage._back()
			},
			toPlay(name){
				toPage.gameVideo.push(name)
				this.getData(name)
		      },
		},
		components:{
		},
		created(){
			document.body.style.backgroundColor='#fff';
	      	document.title = "游戏视频";
	      	this.getData(this.$route.params.name)
	    },
	}
</script>
<style src='./index.scss' lang="scss" rel="stylesheet/scss" scoped></style>



