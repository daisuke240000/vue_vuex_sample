<template>
  <div class="sp">
    <Form />
    <div class="detailSearch">
      <div class="inner">
        <h2 class="extend font-weight-bold">
          詳しい条件で介護施設を探す
        </h2>
        <div class="iconWrapper">
          <div class="icons">
            <Requirement />
            <Assortment />
          </div>
          <div class="icons">
            <Feature />
            <Medical />
          </div>
        </div>
      </div>
    </div>
    <div class="kaigoMedia">
      <h2 class="extend font-weight-bold">
        介護に関するお役立ち情報
      </h2>
      <div class="inner">
        <p class="mb20 textAlignLeft">
          初めて介護をする方や、介護についてより詳しく知りたいという方も、介護施設選びのためにお役立てください。
        </p>
      </div>
      <News />
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
.sp{
  // margin-top: 105px;
  margin-bottom: 40px;
}
.home{
  overflow: hidden;
  .detailSearch{
    h2{color:$secondary-color-alt;}
    h2:before{background-color:$secondary-color-alt;}
    .iconWrapper{
      padding-bottom: 1rem;
      .icons{
        display: flex;
        margin-top: 1rem;
      }
    }
  }
  .kaigoMedia{
    h2{
      width:100%;
      background-color: $text-color;
      padding: 1rem;
      color: #fff;
      text-align: center;
    }
  }
}
</style>
<script>
import News from '@/components/common/News.vue'
import Form from '@/components/sp/home/partial/Form.vue'
import Requirement from '@/components/sp/home/partial/Requirement.vue'
import Assortment from '@/components/sp/home/partial/Assortment.vue'
import Feature from '@/components/sp/home/partial/Feature.vue'
import Medical from '@/components/sp/home/partial/Medical.vue'
import $ from 'jquery'
export default {
  name: 'Homesp',
  components: {
    Form,
    News,
    Requirement,
    Assortment,
    Feature,
    Medical
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
