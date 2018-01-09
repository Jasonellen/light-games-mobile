<template>
  <div class="pd-head mine-page">
    <my-header title="我的">
      <img slot="left"  class="kefu" src="../../assets/kefu.svg" alt="" @click='toYsf'>
      <BuyIcon slot="right"/>
    </my-header>
      <div class="Mine_wrap clearfix">

        
           <div class="head_img_wrap fl">
             <div class="img imgCover" :style="{background:`url(${userImg})`}" @click='toEdit'>
               <!--<img />-->
             </div>
           </div>
      
         <div class="head_info fl">
           <p>{{userNickname}}</p>
           <p>{{userSynopsis}}</p>
           <p>
             <router-link to="/VipType"><span>{{vipLevel}}</span></router-link>
           </p>
         </div>
      </div>
      <ul class="Mine_top_list clearfix">
        <router-link v-bind:to="'MyGbi'">
          <li class="fl list">
            <p>我的G币</p>
            <p>{{userGCoin}}</p>
          </li>
        </router-link>
        <router-link v-bind:to="'myWallet'">
          <li class="fl list">
            <p>我的钱包</p>
            <p>￥{{userBalance}}</p>
          </li>
        </router-link>
        <router-link v-bind:to="'TransactionRecord/1'">
          <li class="fl list">
            <p>交易记录</p>
            <p>{{jyjl}}</p>
          </li>
        </router-link>
        <router-link v-bind:to="'MyGameTab'">
          <li class="fl list">
            <p class="none_border_left">我的游戏</p>
            <p class="none_border_left">{{userBuyCount}}/{{userRentCount}}</p>
          </li>
        </router-link>
      </ul>
      <ul class="content_list_wrap">
          <li
            class="content_list_one clearfix"
            :style="index === 3 && mt"
            :key="index" v-for="({icon,label,arrow,link},index) in list"
            @click="goPage(index)"
          >
            <img :src="icon" class="fl"/>
            <span class="lf">{{label}}</span>
            <img :src="arrow" class="fr"/>
          </li>
      </ul>
  </div>
</template>

<script src="./mine.js"></script>


<style src='./index.scss' lang="scss" rel="stylesheet/scss" scoped></style>
