<template lang="pug">
  .pc
    .biglogo
      img(alt="ヒトシア介護" src="@/assets/img/logo.svg")
    h2.font-weight-bold 介護施設を探す
    updateinfo
    forms(:select-requirement="selectRequirement" :select-assortment="selectAssortment" :select-feature="selectFeature" :select-medical="selectMedical")
    .detailSearch.mb50
      h2.extend.font-weight-bold 詳しい条件で介護施設を探す
      p.mb40 サービスの充実度や介護認定のレベルで選びたい方の検索です。
      .iconWrapper
        .icons
          requirement
          assortment
          feature
          medical
    .kaigoMedia.pt50.pb30
      h2.extend.font-weight-bold 介護に関するお役立ち情報
      p.mb40 初めて介護をする方や、介護についてより詳しく知りたいという方も、<br class="PCNone">介護施設選びのためにお役立てください。
      news
    button#scrolltoTop.toTop(@click="toTop()")
      i.fas.fa-angle-up.fa-2x
</template>
<style lang="scss" scoped>
@import '@/scss/pc/base.scss';
.pc{
  .biglogo{
    margin: 100px auto;
    img{
      width:500px;
    }
  }
  h2 {
    position: relative;
    display: inline-block;
    margin-bottom: 1em;
    font-size: 1.75rem;
    letter-spacing: .11em;
    &:before {
      content: '';
      position: absolute;
      bottom: -6px;
      display: inline-block;
      width: 224px;
      height: 1px;
      left: 50%;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
      background-color: black;
      border-radius: 2px;
    }
  }
  .detailSearch{
    color: $secondary-color-alt;
    h2{
      color:$secondary-color-alt;
      &:before{
        background-color:$secondary-color-alt;
      }
      &.extend:before{
        width:416px;
      }
    }
    p{
      color:$secondary-color-alt;
      a{
        color:$secondary-color-alt;
      }
    }
    .iconWrapper{
      margin: 0 auto; width: 640px;
      .icons{
        display: flex;
        p{width:160px;
          span{
            display:block;
            margin-top: 20px
          }
        }
      }
    }
  }
  .kaigoMedia{
    background-color: #fafafa;
    border-top: 1px solid #ddd;
    h2.extend:before{
      width:384px;
    }
  }
}
</style>
<script>
import forms from '@/components/pc/home/partial/Form.vue'
import news from '@/components/common/News.vue'
import updateinfo from '@/components/pc/home/partial/UpdateInfo.vue'
import requirement from '@/components/pc/home/partial/Requirement.vue'
import assortment from '@/components/pc/home/partial/Assortment.vue'
import feature from '@/components/pc/home/partial/Feature.vue'
import medical from '@/components/pc/home/partial/Medical.vue'
import requirementJSON from '@/assets/json/requirement.json'
import assortmentJSON from '@/assets/json/assortment.json'
import featureJSON from '@/assets/json/feature.json'
import medicalJSON from '@/assets/json/medical.json'
import $ from 'jquery'
export default {
  name: 'Homepc',
  components: {
    forms,
    news,
    updateinfo,
    requirement,
    assortment,
    feature,
    medical
  },
  data () {
    return {
      requirement:requirementJSON,
      assortment: assortmentJSON,
      feature: featureJSON,
      medical: medicalJSON,
      selectRequirement:'',
      selectAssortment:'',
      selectFeature:'',
      selectMedical:'',
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
