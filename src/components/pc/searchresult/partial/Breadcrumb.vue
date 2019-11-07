<template lang="pug">
  .breadcrumb
    ul
      li
        router-link(to="/kaigo/" exact="exact")
          i.fas.fa-home
      li(v-if="title !=''") {{title}}の検索結果
      li(v-else) 全国の検索結果
</template>
<style lang="scss" scoped>
@import '@/scss/pc/base.scss';
.breadcrumb{
  background-color: $primary-bg-color;
  height: 64px;
  padding:0 0 0 0;
  margin-bottom: 0;
  font-size: .85rem;

  ul{
    width:99%;
    margin-left: 1%;
    text-align: left;
    margin-bottom: 0;

    li{
      display: inline-block;
      line-height: 60px;
      padding-top: 4px;
      &::after{
        content:">";
        padding: 0 10px;
      }
      &:last-child{
        &::after{
          content:"";
        }
      }
      a{
        color: $text-color;
      }
    }
  }
}

</style>
<script>
export default {
  name: 'Breadcrumb',
  computed:{
    title(){
      var self = this;
      return self.$parent.title
    }
  },
}
</script>
