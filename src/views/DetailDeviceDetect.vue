<template lang="pug">
  .detail
    Header
    .sp(v-if="isMobile()")
      SpLayout
    .pc(v-else)
      PcLayout
    Footer
</template>
<script>
import Header   from '@/components/common/Header.vue'
import Footer   from '@/components/common/Footer.vue'
import PcLayout from '@/components/pc/detail/Layout.vue'
import SpLayout from '@/components/sp/detail/Layout.vue'
import axios from 'axios'
export default {
  name: 'Detail',
  components: {
    Header,
    Footer,
    PcLayout,
    SpLayout,
  },
  data () {
    return {
      description:'',
      keyword:'あれ',
      title: 'あれ',
      site_url:'',
    }
  },
  head:{
    title: function () {
      var self = this
      return {
        inner: self.title
      }
    },
    meta:function(){
      var self = this
      return[
        { name: 'description', content: self.description },
        { name: 'keyword', content: self.keyword },
        { property: 'og:title', content: self.title +' | あれ'},
        { property: 'og:description', content: self.description },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: self.site_url },
        { property: 'og:image', content: 'https://hitoshia.com/kaigo/common/img/og.png' },
      ]
    },
  },
  watch: {
    'title':function(){
      var self = this
      self.keyword = self.title +','+ self.keyword
      self.$emit('updateHead');
    },
    'description':function(){
      var self = this;
      self.$emit('updateHead')
    }
  },
  created:function(){
    var self = this
    self.site_url = location.href;
    if(location.search.length > 0){
      var payload = [];
      payload.id = location.search.replace('?','');
      self.$store.commit('updateStoreSelectId', payload)
      var id = self.$store.state.selectid.id;
      var apiserver;
      if(location.hostname=='hitoshia.bla-one.net'){
        apiserver = 'https://api.hitoshia.bla-one.net/api/v1/facilities/' + id
      }else if(location.hostname=='hitoshia.com'){
        apiserver = 'https://api.hitoshia.com/api/v1/facilities/' + id
      }else if(process.env.VUE_APP_ENV=='localhost'){
        apiserver = 'http://127.0.0.1:8001/api/v1/facilities/' + id
      }else if(process.env.VUE_APP_ENV=='private'){
        apiserver = 'https://api.hitoshia.bla-one.net/api/v1/facilities/' + id
      }
      axios
        .get(
          apiserver
        )
        .then(response => {
          self.$store.commit('updateStoreItem',response.data['resource']['data'] )
          //headで使う変数はwatchで監視する
          self.title = response.data['resource']['data']['name']+'の詳細情報｜あれ'
          self.description = response.data['resource']['data']['detail_info'].replace(/\r?\n/g, '');
        })
        .catch(error => {
          window.alert(error);
        });
    }
  },
  methods: {
    isMobile() {
      if(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
      } else {
        return false
      }
    },
    //検索結果で取得しているJSONをフィルタして1件に絞り込む
    getDetail:function(){
      var self = this;
      self.$store.dispatch('getDetail');
    },
  },
}
</script>
