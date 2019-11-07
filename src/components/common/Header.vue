<template lang="pug">
  header
    nav
      .inner.cf
        h1.title
          a(href="/media/")
            img(src="@/assets/img/logo.svg" alt="ヒトシア介護" title="ヒトシア")
        ul.nav_list
          li
            router-link(to="/kaigo/") 介護施設を探す
          li
            a(href="/media/") 介護の情報ガイド
          li.sp_nav
            a(href="/media/company/") 会社概要
          li.sp_nav
            a(href="/media/contact/") お問い合わせ
          li.sp_nav
            a(href="/media/policy") プライバシーポリシー
        p.pc_desc
          | 日本中の介護施設情報が全てここに
          br
          | 介護施設探しは「ヒトシア介護」
        #fontsize
          ul
            li.current.middle 標準
            li.large 大
        p.fontsize_txt 文字サイズ
    .sp_menu_btn
      .drawer_bg
      button.drawer_button(type="button")
        span.drawer_bar.drawer_bar1
        span.drawer_bar.drawer_bar2
        span.drawer_bar.drawer_bar3
</template>

<script>
import $ from 'jquery'
export default {
  name: 'Header',
  mounted: function(){
      $("#fontsize li").click(function(){
        $("#fontsize li").removeClass("current");
        var fontCss = $(this).attr("class");
        $(this).addClass("current");
        if(fontCss == "large"){
          $("body").css("zoom","1.2");
        }else if(fontCss == "middle"){
          $("body").css("zoom","1");
        }
      });
      $('.drawer_button').click(function () {
        $(this).toggleClass('active');
        $('.drawer_bg').fadeToggle();
        $('.nav_list').toggleClass('open');
      })
      $('.drawer_bg').click(function () {
        $(this).fadeOut();
        $('.drawer_button').removeClass('active');
        $('.nav_list').removeClass('open');
      });
  }
}

</script>

<style scoped lang="scss">
@import '@/scss/variable.scss';
header {
  width: 100%;
  background: rgba(255,255,255,1);
  z-index: 200;
  box-shadow: 0 4px 12px 0 rgba(0,0,0,.05);
  position: fixed;
  top: 0;
  @media #{$large} {
    background: rgba(255,255,255,1);
  }
  @media #{$small} {
    position: fixed;
    left: 0;
    top: 0;
  }
  p,ul{margin-bottom: 0;}
  .inner {
    max-width: 1346px;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    @media #{$small} {
      padding: 10px 16px;
    }
    .title {
      float: left;
      line-height: 64px;
      margin-left: 10px;
      @media #{$small} {
        line-height: 37px;
        margin-left: 0;
      }
      @media #{$ssmall} {
      }
      img {
        width: 150px;
        padding-top: 20px;
        @media #{$small} {
          width: 157px;
          padding-top: 7px;
        }
      }
    }
    .nav_list {
      float: left;
      font-size: 0;
      letter-spacing: 0;
      margin-left: 27px;
      &.open {
        transform: translateX(0);
        box-shadow: 0px 0px 65px 5px rgba(0, 0, 0, 0.25);
      }
      li {
        display: inline-block;
        @media #{$small} {
          display: block;
        }
        &.sp_nav {
          display: none;
          @media #{$small} {
            display: block;
          }
        }
        a {
          color: $text-color;
          font-weight: bold;
          display: inline-block;
          padding: 4px 32px 0;
          font-size: 16px;
          line-height: 60px;
          position: relative;
          &:before {
            -webkit-transition: all 0.3s cubic-bezier(0, 1, 0.64, 1);
            -moz-transition: all 0.3s cubic-bezier(0, 1, 0.64, 1);
            -ms-transition: all 0.3s cubic-bezier(0, 1, 0.64, 1);
            transition: all 0.3s cubic-bezier(0, 1, 0.64, 1);
            content: '';
            position: absolute;
            bottom: 0;
            right: 0;
            left: 0;
            width: 0;
            height: 4px;
            margin: 0 auto;
            background: $green;
          }
          &:hover:before {
            width: 100%;
          }
          @media #{$small} {
            width: 100%;
            display: block;
            font-size: 16px;
            height: 70px;
            line-height: 70px;
            border-top: 1px solid #eeeeee;
            padding: 0 20px;
            text-align: left;
          }
        }
      }
      @media #{$small} {
        padding: 70px 0;
        width: 250px;
        height: 100%;
        transition: all 0.2s;
        transform: translateX(250px);
        position: fixed;
        top: 0;
        right: 0;
        z-index: 1000;
        background-color: #ffffff;
      }
    }
    .pc_desc {
      text-align: left;
      float: left;
      padding: 15px 0 0 24px;
      line-height: 1.4;
      color: $note-color;
      font-size: 12px;
      @media #{$mmiddle} {
        display: none;
      }
      @media #{$small} {
        display: none;
      }
    }
    .fontsize_txt {
      float: right;
      font-size: 14px;
      font-weight: bold;
      line-height: 60px;
      padding-top: 4px;
      display: inline-block;
      color: $text-color;
      @media #{$mmiddle}{
        font-size:12px;
      }
      @media #{$small} {
        display: none;
      }
    }
    #fontsize {
      float: right;
      padding: 0 10px 0 0;
      ul {
        display: inline-block;
        li {
          font-size: 14px;
          font-weight: bold;
          float: left;
          margin-left: 10px;
          cursor: pointer;
          height: 26px;
          line-height: 26px;
          margin-top: 20px;
          padding: 0 8px;
          text-align: center;
          color: $secondary-color-alt;
          border: 1px solid $secondary-color-alt;
          background-color: #fff;
          transition-duration: 0.3s;
          &.current {
            background-color: $secondary-color-alt;
            color: #ffffff;
          }
          &:hover {
            // opacity: .7;
            color: #fff;
            background-color: $secondary-color-alt;
            transition-duration: 0.3s;
          }
        }
      }
      @media #{$small} {
        display: none;
      }
    }
  }
  .sp_menu_btn {
    display: none;
  }
}

@media #{$small} {

  header .sp_menu_btn {
    display: block;
    .drawer_bg {
      width: 100%;
      height: 100%;
      position: fixed;
      z-index: 999;
      display: none;
      top: 0;
      left: 0;
    }
    .drawer_button {
      display: block;
      background: none;
      border: none;
      padding: 0;
      width: 21px;
      letter-spacing: 0.1em;
      cursor: pointer;
      position: fixed;
      top: 10px;
      right: 16px;
      z-index: 1001;
      text-align: center;
      outline: none;
      @media #{$small} {
        top: 16px;
      }
      &.active {
        .drawer_bar1 {
          background-color: $green !important;
          transform: rotate(45deg);
          position: relative;
          left:2px;
        }
        .drawer_bar2 {
          opacity: 0;
        }
        .drawer_bar3 {
          background-color: $green !important;
          transform: rotate(-45deg);
          position: relative;
          top:1px;
        }
      }
      &.sp_block {
        display: none;
        .drawer_bar {
          background-color: #ffffff;
        }
        @media #{$ssmall} {
          display: block;
        }
      }
    }
    .drawer_bar {
      display: block;
      height: 3px;
      margin: 4px 0 0;
      transition: all 0.2s;
      transform-origin: 0 0;
      background-color: $primary-color ;
      border-radius: 2px;
    }
    .drawer_text {
      text-align: center;
      font-size: 10px;
    }
    .drawer_close {
      letter-spacing: 0.08em;
      display: none;
    }
    .drawer_menu_text {
      display: block;
    }
    .drawer_nav_wrapper {
      width: 250px;
      height: 100%;
      transition: all 0.2s;
      transform: translate(-250px);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
      background-color: #ffffff;
      &.open {
        transform: translate(0);
        box-shadow: 0px 0px 65px 5px rgba(0, 0, 0, 0.25);
      }
    }
  }
}
</style>
