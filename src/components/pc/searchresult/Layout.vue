<template lang="pug">
  .searchresult //sample
    .inner
      breadcrumb
      .customContainer
        .leftNav
          navigation
        .itemListWrapper
          h2(v-if=" title !=''") {{title}}の検索結果
          h2(v-else) 全国の検索結果
          itemlist
          pager
    button#scrolltoTop.toTop(@click="toTop()")
      i.fas.fa-angle-up.fa-2x
</template>
<style lang="scss" scoped>
@import '@/scss/pc/base.scss';
.searchresult{
  //
  background-color: $primary-bg-color ;
  //
  .inner{
    //
    max-width: 1346px;
    margin: 0 auto;
    padding-bottom: 80px;
    //
    .customContainer{
      //
      display: flex;
      background-color: #fff;
      padding: 45px 25px;
      border-radius: 15px;
      //
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
      //
      .leftNav{
        //
        width:320px;
        @media screen and (max-width: 1000px) {
          width:240px;
        }
        padding-right: 25px;
        //
      }
      .itemListWrapper{
        //
        flex:1;
        text-align: left;
        h2 {
          //
          position: relative;
          display: inline-block;
          margin-bottom: 1em;
          //
        }
        h2:before {
          //
          content: '';
          position: absolute;
          bottom: -10px;
          display: inline-block;
          // width: 400px;
          width:100%;
          height: 3px;
          background-color: $text-color;
          border-radius: 2px;
          //
        }
        .pager{
          //
          width: 100%;
          text-align: center;
          margin-top: 50px;
          //
          .pagerContent{
            //
            width:400px;
            margin: 0 auto;
            //
          }
        }
      }
    }
  }
}
@media screen and  (min-width:480px) and (max-width:768px) {
  .leftNav{display: none;}
  .searchresult .inner .customContainer .itemListWrapper{
    padding-left: 0;
  }
}
</style>
<script>
import breadcrumb from '@/components/pc/searchresult/partial/Breadcrumb.vue'
import navigation from '@/components/pc/searchresult/partial/Navigation.vue'
import itemlist from '@/components/pc/searchresult/partial/ItemList.vue'
import pager from '@/components/pc/searchresult/partial/Pager.vue'
import $ from 'jquery'
export default {
  name: 'Searchresultpc',
  components: {
    breadcrumb,
    navigation,
    itemlist,
    pager
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
      var scrollHeight = $(document).height();
      var scrollPosition = $(window).height() + $(window).scrollTop();
      if ( (scrollHeight - scrollPosition) / scrollHeight <= 0.01) {
        $("#scrolltoTop").css('bottom','140px')
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
