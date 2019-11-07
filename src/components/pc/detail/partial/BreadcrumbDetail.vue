<template lang="pug">
  .breadcrumb
    ul
      li
        router-link(to="/kaigo/" exact="exact")
          i.fas.fa-home
      li
        router-link(:to="'/kaigo/searchresult/'+ query" ) {{area}}の検索結果
      li.detail_name {{detail_name}}
</template>
<style lang="scss" scoped>
@import '@/scss/pc/base.scss';
.breadcrumb{
  background-color: $primary-bg-color;
  height: 64px;
  overflow: hidden;
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
      &.detail_name{
        display: inline;
      }
    }
  }
}

</style>
<script>
export default {
  name: 'BreadcrumbDetail',
  computed:{
    area(){
      var self =this;
      if(self.$store.state.p !='' || self.$store.state.c !='' ){
        return self.$store.state.p + self.$store.state.c
      }else{
        return '全国'
      }
    },
    detail_name(){
      var self = this;
      return self.$store.state.item.name
    },
    query(){
      var self = this;
      if(self.$store.state.apiserver != undefined && self.$store.state.apiserver !='' ){
        var tmp = self.$store.state.apiserver
        tmp = tmp.split('?');
        return '?'+tmp[1]
      }else{
        return ''
      }
    }
  },
}
</script>
