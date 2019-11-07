<template lang="pug">
  footer.footer.cf(role="contentinfo")
    .footer_last.cf
      .inner.cf
        p.logo
          a(href="/media/")
            img(src="@/assets/img/footer_logo.svg" alt="あれ")
        p.copy Copyright © hitoshia Co.,Ltd. All Rights Reserved.
        ul.footer_list
          li
            a(href="/media/company/") 会社
          li
            a(href="/media/contact/") 問合せ
          li
            a(href="/media/policy/") PP
</template>
<script>
export default {
  name: 'Footer',
}
</script>
<style scoped lang="scss">
@import '@/scss/variable.scss';
.footer_last {
  color: #ffffff;
  background: $text-color;
  p,ul{margin:0 auto;}
  .inner {
    max-width: 1346px;
    width: 100%;
    margin: 0 auto;
    padding: 42px 10px;
    @media #{$small} {
      padding: 16px 0 13px;
    }
    .logo {
      float: left;
      @media #{$small} {
        float: none;
      }
      a {
        img {
          width: 150px;
          @media #{$small} {
            margin-bottom: 16px;
          }
        }
        &:hover {
          opacity: .7;
        }
      }
    }
    .copy {
      float: left;
      color: #ffffff;
      font-size: 10px;
      line-height: 33px;
      margin-left: 25px;
      @media #{$small} {
        float: none;
        line-height: 1;
        margin-left: 0;
      }
    }
    .footer_list {
      float: right;
      li {
        display: inline-block;
        a {
          color: #ffffff;
          line-height: 33px;
          margin: 0 17px;
          position: relative;
          &:before {
            -webkit-transition: all 0.3s cubic-bezier(0, 1, 0.64, 1);
            -moz-transition: all 0.3s cubic-bezier(0, 1, 0.64, 1);
            -ms-transition: all 0.3s cubic-bezier(0, 1, 0.64, 1);
            transition: all 0.3s cubic-bezier(0, 1, 0.64, 1);
            content: '';
            position: absolute;
            bottom: -10px;
            right: 0;
            left: 0;
            width: 0;
            height: 2px;
            margin: 0 auto;
            background: #ffffff;
          }
          &:hover:before {
            width: 100%;
          }
        }
        @media #{$small} {
          display: none;
        }
      }
    }
  }
}
</style>
