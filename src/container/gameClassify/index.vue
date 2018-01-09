<template>
  <div class="game-classify-page pd-head">
    <my-header title="游戏分类">
      <span slot="right" @click="sure">确定</span>
    </my-header>
    <div class="p-t-b-30 all-box" @click='checkedAll'>
      <div class="sub">全部游戏
        <div class="triangle" v-if='allChecked'>
          <i class="edge-icon"></i>
        </div>
      </div>
    </div>
    <div v-for="(item,index1) in list" :key="index1">
      <div class="title">{{item.title}}</div>
      <div class="game-warp">
        <div class="game-list">
          <div
            class="game-item"
            v-for="(item2,index2) in item.sub"
            :key="index2"
            @click="selectSingle(index1,index2,!item2.checked)"
          >{{item2.label}}

            <div class="triangle" v-if='item2.checked'>
              <i class="edge-icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import pageCache from 'core/pageCache'
  import list from './gameList';

  export default {
    data(){
      return{
        list,
        onOff:true,
      }
    },
    methods:{
      checkedAll(){
        let {allChecked} = this;
        this.list = this.list.map((item)=>{
          item.sub = item.sub.map(function(item2){
            return {...item2,...{checked : !allChecked}}
          })
          return item;
        })
      },
      selectSingle(i1,i2,checked){
        this.$set(this.list[i1].sub[i2],'checked',checked)
      },
      //确定事件
      sure(){
        let arr = ['buzzType','platformType','gameType','language'];
        let result = {};
        let {allChecked} = this;
        this.list.forEach(({sub},index)=>{
          let names = arr[index];
          sub.forEach(item=>{
            if(item.checked || allChecked){
              let list = result[names] || [];
              list.push(item.label);
              result[names] = list;
              result.hasChild = true;
            }
          })
          if(result[names]){
            result[names] = result[names].join(',')
          }
        })

        if(!result.hasChild){
          this.alert('请选择分类');
        }else{
          delete result.hasChild;
          pageCache.allGameList = result;
          toPage.GameLibrary.push();

        }

      }
    },
    computed : {
      allChecked(){
        let isAll = true;
        this.list.forEach(({sub})=>{
          sub.forEach(({checked})=>{
            isAll && (isAll = checked);
          })
        })
        this.onOff = !isAll
        return isAll;
      }
    },


  }
</script>

<style lang="scss" src="./index.scss" rel="stylesheet/scss"></style>
