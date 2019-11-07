<template>
  <div class="searchresult">
    <div class="inner overflowVisible"><!--sample-->
      <h2 v-if=" title !=''">
        {{ title }}の検索結果
      </h2>
      <h2 v-else>
        全国の検索結果
      </h2>
      <p>{{ all_amount }}件中{{ display_amount }}件を表示</p>
      <Navigation />
    </div>
    <ItemList />
    <div class="inner">
      <p>{{ all_amount }}件中{{ display_amount }}件を表示</p>
      <Pager />
    </div>
    <button
      id="scrolltoTop"
      @click="toTop()"
    >
      <i class="fas fa-angle-up fa-2x" />
    </button>
  </div>
</template>
<style lang="scss" scoped>
@import '@/scss/sp/base.scss';
.searchresult{
  // margin-top: 90px;
  h2{
    text-align: left;
    display: block;
    margin-top:32px;
  }
  p{
    font-size: $fs12;
    text-align: left;
    margin-bottom: 24px;
  }
  .overflowVisible{
    overflow: visible;
  }
}
</style>
<script>
import Navigation from '@/components/sp/searchresult/partial/Navigation.vue'
import ItemList from '@/components/sp/searchresult/partial/ItemList.vue'
import Pager from '@/components/sp/searchresult/partial/Pager.vue'
import $ from 'jquery'
export default {
  name: 'Searchresultsp',
  components: {
    Navigation,
    ItemList,
    Pager,
  },
  data() {
    var self = this
    var title;

    if( self.$parent.pref !== '' && self.$parent.city !== '') {
      title = self.$parent.pref + self.$parent.city;
    }else if( self.$parent.city !== '') {
      title = self.$parent.city;
    }else if(self.$parent.pref !== ''){
      title = self.$parent.pref;
    }

    return{
      title: title,
    }
  },
  computed:{
    display_amount(){
      var self = this;
      if(self.$store.state.count == 0){
        return '0'
      }else if(self.$store.state.count < 20){
        return '1〜'+self.$store.state.count
      }else{
        return self.$store.state.range;
      }
    },
    all_amount(){
      var self =this;
      return self.$store.state.count;
    }
  },
  created: function() {
  },
  mounted:function(){
    document.onscroll = function() {
      scrollFunction();
    };
    function scrollFunction() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        $("#scrolltoTop").addClass('show');
      } else {
        $("#scrolltoTop").removeClass('show');
      }
    }
  },
  methods:{
    toTop: function(){
      $("html,body").animate({scrollTop:0},"slow");
    },
  },
}
</script>
