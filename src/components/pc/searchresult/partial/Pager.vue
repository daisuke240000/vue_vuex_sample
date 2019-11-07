<template lang="pug">
  .pager(v-if="this.$store.state.count > 20")
    .pagerContent
      ul
        li.left(@click="subtraction(); toTop()" v-if="this.now != 1")
          i.fas.fa-chevron-left
        li.num(v-if="now > 1")
          a(@click="selectPage(1); toTop()") 1
        li.black(v-if="pageMax > 5 && now > 2") ...
        li.num.normal(v-for="pageCount in pageCounts" v-bind:key="pageCount.id")
          span.black(v-if="pageCount.number == now") {{ pageCount.number }}
          span.empty(v-else-if="pageCount.number > pageMax")
          a(v-else="" @click="selectPage(pageCount.number); toTop()") {{ pageCount.number }}
        li.black(v-if="pageMax > 5 && !(now >= pageMax-3)") ...
        li.num(v-if="pageMax > 4")
          span.black(v-if="pageMax == now")
          a(v-else="" @click="selectPage(pageMax); toTop()") {{ pageMax }}
        li.right(@click="add(); toTop()" v-if="pageMax != now ")
          i.fas.fa-chevron-right
    #Overlay(tabindex='-1' role='presentation' aria-hidden='true')
</template>
<style lang="scss" scoped>
@import '@/scss/pc/base.scss';
.pagerContent{
  //
  display: inline-block;
  //
  ul{
    //
    display: flex;
    line-height: 60px;
    margin-bottom: 0;
    //
    li{
      //
      color: $link-color;
      font-weight: bold;
      padding-top: 4px;
      line-height: 56px;
      //
      &.left,&.right{
        //
        color: #fff;
        background-color: $link-color;
        border-radius: 30px;
        width: 60px;
        cursor: pointer;
        //
        &:hover{
          opacity: .75;
        }
      }
      &.black{
        color: $text-color;
        text-decoration: none;
        display: block;
        width: auto;
      }
      .black{
        color: $text-color;
        text-decoration: none;
        display: block;
        width: 60px;
      }
      .empty{
        width: 0px;
      }
      a{
        display: block;
        text-decoration: none;
        cursor: pointer;
        width: 60px;
        &:hover{
          text-decoration: underline;
        }
      }
    }
  }
}
#Overlay{
    transition: all .1s ease;
    z-index: 1001;
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.7);
    opacity: 0;
    &.show{
      display: block;
      opacity: 1;
    }
}
</style>
<script>
import $ from 'jquery'
export default {
  name: 'Pager',
  computed:{
    displayPager:{
      get: function(){
        var self = this
        return self.$store.state.displayPager
      },
      set: function(Display){
        var self = this
        self.$store.commit('updateStoreDisplayPager', Display)
      },
    },
    now:{
      get: function(){
        var self = this
        return self.$store.state.now
      },
      set: function(Now){
        var self = this
        self.$store.commit('updateStoreNow', Now)
      },
    },
    pageMax(){
      var self = this
      return Math.ceil(self.$store.state.count/20);
    },
    pageCounts(){
      var self = this;
      var temp_array = [];
      //5ページ以上あり、最後のページより3つ手前まで
      if(self.pageMax >= 5 && self.pageMax - self.now >= 3){
        for( var i = 0;  i < self.pageMax;  i++){
          var number = i + this.now
          var tail = number*20
          var head = tail-19;
          if(temp_array.length < self.displayPager){
            temp_array.push({number,head,tail})
          }
        }
      //4ページ以下
      }else if(self.pageMax <= 4){
        if(self.now == 1){
          var n = 1;
          var t = n*20
          var h = t-19
          temp_array.push({"number":n,"head":h,"tail":t})
        }
        for( var j = 0;  j < self.pageMax;  j++){
          var _number = j + 2
          var _tail = _number*20
          var _head = _tail-19;
          if(temp_array.length < self.displayPager){
            temp_array.push({_number,_head,_tail})
          }
        }
        if(self.now == 1){
          var _n = 4;
          var _t = _n*20
          var _h = _t-19
          temp_array.push({"number":_n,"head":_h,"tail":_t})
        }
      }else{
        //最後から3つ
        var near_max = self.pageMax - 3
        for( var k = near_max;  k < self.pageMax;  k++){
          var __number = k
          var __tail = __number*20
          var __head = __tail-19;
          if(temp_array.length < self.displayPager){
            temp_array.push({"number":__number,"head":__head,"tail":__tail})
          }
        }
        //最後のページ
        if(self.pageMax == self.now){
          var __n = self.pageMax;
          var __t = __n*20
          var __h = __t-19
          temp_array.push({"number":__n,"head":__h,"tail":__t})
        }
      }
      return temp_array;
    },
    pageCountsMax(){
      var self = this;
      var temp_array = [];
      var number = self.pageMax;
      var tail = number*20
      var head = tail-19;
      temp_array.push({number,head,tail})
      return temp_array;
    }
  },
  created:function(){
    if(location.search == ''){
      this.selectPage(1);
    }
  },
  methods:{
    selectPage:function(number){
      var self = this;
      self.now = number
      self.$store.dispatch('selectPage',number)
      self.changeRange();
      self.changeUrl();
    },
    add:function(){
      var self = this
      //最後のページの場合、矢印は出ない
      if(self.now < self.pageMax){
        self.now ++;
      }
      var param = '&p='+self.now
      self.changeQuery(param);
      self.getJSON();
      self.changeRange();
      self.changeUrl();
    },
    subtraction:function(){
      var self = this
      if(self.now > 1){
        self.now --;
      }
      var param = '&p='+self.now
      self.changeQuery(param);
      self.getJSON();
      self.changeRange();
      self.changeUrl();
    },
    changeQuery(param){
      var self = this
      self.$store.dispatch('changeQuery',param)
    },
    getJSON: function(){
      var self = this
      self.$store.dispatch('getJSON')
    },
    changeRange(){
      var self = this
      var range_left = (self.now*20)-19;
      var range_right = self.now*20;
      if(self.$store.state.count < range_right){
        range_right = self.$store.state.count;
      }
      var range = range_left + '〜' + range_right;
      self.$store.dispatch('changeRange',range)
    },
    changeUrl(){
      var self = this;
      var url_path = location.pathname;
      var url_search = location.search;
      var url_next =  url_path + url_search.replace(/&p=[0-9][0-9][0-9]/g,'').replace(/&p=[0-9][0-9]/g,'').replace(/&p=[0-9]/g,'')
      url_next = url_next + '&p='+ self.now;
      self.$router.push(url_next)
    },
    toTop: function(){
      var self = this
      $("html,body").animate({scrollTop:0},"slow");
      $('#Overlay').addClass('show');
      self.cancel();
    },
    cancel: function(){
      setTimeout(function () {
        $('#Overlay').removeClass('show');
      },700);
    }
  },
}
</script>
