<template lang="pug">
  .home //sample
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
import PcLayout from '@/components/pc/home/Layout.vue'
import SpLayout from '@/components/sp/home/Layout.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Footer,
    PcLayout,
    SpLayout,
  },
  data () {
    var self = this
    return {
      description:'あれ',
      keyword:'あれ',
      title:'あれ',
      site_url:'https://hitoshia.com/kaigo/',
      citys: self.$store.state.cityJSON,
      prefs: self.$store.state.prefJSON,
    }
  },
  head:{
    title: function () {
      var self = this
      // return {
      //   inner: self.title
      // }
    },
    meta:function(){
      var self = this
      return[
        { name: 'description', content: self.description },
        { name: 'keyword', content: self.keyword },
        { property: 'og:title', content: self.title },
        { property: 'og:description', content: self.description },
        { property: 'og:url', content: self.site_url },
        // { property: 'og:type', content: 'website' },
        // { property: 'og:image', content: 'https://hitoshia.com/kaigo/common/img/og.png' },
        // { name: 'twitter:card', content: 'summary' }
      ]
    },
  },
  created:function(){
    var self = this
    self.$store.commit('updateStoreNow',1)
    self.$store.dispatch('changeRange','1〜20')
    //戻ってきたらデータを消します。
    //戻ってきたらデータを消します。
    //戻ってきたらデータを消します。
    //戻ってきたらデータを消します。
    //戻ってきたらデータを消します。
    self.clear();
  },
  methods: {
    isMobile() {
      if(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
      } else {
        return false
      }
    },
    //以下複製です。戻ってきたらデータを消します。
    //以下複製です。戻ってきたらデータを消します。
    //以下複製です。戻ってきたらデータを消します。
    //以下複製です。戻ってきたらデータを消します。
    //以下複製です。戻ってきたらデータを消します。
    clear: function(){
      var self = this;
      for(var i in self.initialCosts) {
        self.initialCosts[i].selected = 0
      }
      self.selectedInitialCost ='';
      self.$store.commit('updateStoreInitialCost2', self.initialCosts)
      for(var j in self.subscriptions) {
        self.subscriptions[j].selected = 0
      }
      self.selectedSubscription ='';
      self.$store.commit('updateStoreSubscription2', self.subscriptions)
      for(var k in self.$store.state.medical){
        self.$store.state.medical[k].checked = 0
      }
      self.selectedMedical = [],
      self.$store.commit('updateStoreMedical', self.medicals)
      for(var l in self.$store.state.feature){
        self.$store.state.feature[l].checked=0
      }
      self.selectedFeature = [],
      self.$store.commit('updateStoreFeature', self.features)
      for(var m in self.$store.state.requirement){
        self.$store.state.requirement[m].checked=0
      }
      self.selectedRequirement = [],
      self.$store.commit('updateStoreRequirement', self.requirements)
      for(var n in self.$store.state.assortment){
        self.$store.state.assortment[n].checked=0
      }
      self.selectedAssortment = [],
      self.$store.commit('updateStoreAssortment', self.assortments)
      self.$store.commit('updateStoreCity', {
          id       : '',
          key      : 'id',
          option   : '',
          pref     : '',
          prefName : ''
      })
      self.$store.commit('updateStoreC','')
      self.$store.commit('updateStorePref', {
          id   : '',
          key  : 'id',
          option : '',
      })
      self.$store.commit('updateStoreP','')
      self.getQuery();
      self.refresh();
    },
    getQuery: function(){
      var self = this
      self.$store.dispatch('getQuery')
    },
    refresh: function(){
      var self = this
      var param = '&p=1'
      var range = '1〜20'
      self.updateStorePref(self.selectPID(self.p),self.p)
      self.updateStoreCity(self.selectCID(self.c),self.c,self.selectCP(self.c),self.selectCPN(self.c))
      //親コンポーネントに値を渡す
      if(self.c =='全域'){
        self.$parent.title = self.p
      }else{
        self.$parent.title = self.p+self.c;
      }
      //クエリを書き直す
      self.getQuery();
      //1ページ目に戻す
      self.$store.dispatch('changeQuery',param)
      self.getJSON();
      self.$store.commit('updateStoreNow', 1)
      self.changeRange(range);
      //URLを書き換える
      // param = self.$store.state.apiserver.split('?')
      // self.$router.push('/kaigo/searchresult/?'+param[1])
    },
    selectPID:function(e){//eはイベント値ではなく、県名に変更
      var self = this
      var temp = self.prefs.filter(function(item){
        // return item.name == e.target.value;
        return item.name == e;
      })
      // if(e.isTrusted){
      if(e != undefined){
        if(e.length > 0 && e !='全国'){
          return temp[0].no
        }else{
          return ''
        }
      }
    },
    selectCID:function(e){//eはイベント値ではなく、市の名前に変更
      var self = this
      var temp = self.citys.filter(function(item){
        // return item.name == e.target.value;
        return item.name == e;
      })
      // if(e.isTrusted){
      if(e != undefined){
        if(e.length > 0 && e !='全域' && e !=''){
          return temp[0].no
        }else{
          return '0'
        }
      }
    },
    selectCP:function(e){//eはイベント値ではなく、市の名前に変更
      var self = this
      var temp = self.citys.filter(function(item){
        // return item.name == e.target.value;
        return item.name == e
      })
      // if(e.isTrusted){
      if(e != undefined){
        if(e.length > 0 && e !='全域'){
          return temp[0].pref
        }else{
          return '0'
        }
      }
    },
    selectCPN:function(e){//eはイベント値ではなく、市の名前に変更
      var self = this
      var temp = self.citys.filter(function(item){
        // return item.name == e.target.value;
        return item.name == e;
      })
      // if(e.isTrusted){
      if(e != undefined){
        if(e.length > 0 && e !='全域'){
          return temp[0].prefName
        }else{
          return '不明'
        }
      }
    },
    updateStorePref: function(_id,_option) {
      var self = this;
      self.$store.commit('updateStorePref', {
          id   : _id,
          key  : 'id',
          option : _option,
      })
    },
    //検索クエリ用のIDのために必要
    updateStoreCity: function(_id,_option,_pref,_prefName) {
      var self = this;
      self.$store.commit('updateStoreCity', {
          id       : _id,
          key      : 'id',
          option   : _option,
          pref     : _pref,
          prefName : _prefName
      })
    },
    getJSON: function(){
      var self = this
      self.$store.dispatch('getJSON')
    },
    changeRange(range){
      var self = this
      self.$store.dispatch('changeRange',range)
    },
  },
}
</script>
