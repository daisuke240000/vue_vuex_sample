<template lang="pug">
  .navigation
    ul.selectWrapper2
      li(v-if="p")
        h3 現在の検索条件
        p {{Request}}
      li
        h3 エリア
        select(v-model="p" v-on:change="resetCity()")
          option(v-for="item in prefs" v-bind:value="item.name") {{ item.name }}
        select(v-model="c")
          option(value="全域") 全域
          option(v-for="(item) in getCity" v-bind:value="item.name") {{item.name }}
      li
        h3 施設種別
        v-select(v-model="selectedAssortment" :options="assortment" v-on:change="updateAssortment($event);" multiple)
      li
        h3 入居条件
        v-select(v-model="selectedRequirement" :options="requirement" v-on:change="updateRequirement($event);" multiple)
      li
        h3 特徴
        v-select(v-model="selectedFeature" :options="feature" v-on:change="updateFeature($event);" multiple)
      li
        h3 看護・医療体制
        v-select(v-model="selectedMedical" :options="medical" v-on:change="updateMedical($event);" multiple)
      li.initial
        h3 入居一時金
        v-select(v-model="selectedInitialCost" :options="initialCost" v-on:change="updateStoreInitialCost2($event);" :clearable="false")
      li.subsc
        h3 月額利用料
        v-select(v-model="selectedSubscription" :options="subscription" v-on:change="updateStoreSubscription2($event);" :clearable="false")
      li
        p この条件の施設数：{{count}}件
        a.btn-primary(v-on:click="refresh()") 再検索する
        a.btn-outline-primary(v-on:click="clear();") リセット
</template>
<style lang="scss" scoped>
@import '@/scss/pc/base.scss';
.navigation{
  .selectWrapper2{
    margin-bottom: 0;
    li{
      padding-top: 0;
      margin-bottom: 25px;
      h3{
        //
        font-size: $fs16;
        margin-bottom: 10px;
        text-align: left;
        font-weight: bold;
      }
      p{
        //
        text-align: left;
        margin-bottom: 0;
        font-size: $fs12;
        line-height: 1.25rem;
      }
      .btn-primary{
        display: block;
        height: 40px;
        line-height: 40px;
        color: #fff;
        font-weight: bold;
        border-radius: 20px;
        margin-top: 10px;
      }
      .btn-outline-primary{
        display: block;
        height: 40px;
        line-height: 40px;
        color: $primary-color;
        border: 2px solid $primary-color;
        font-weight: bold;
        border-radius: 20px;
        margin-top: 10px;
      }
      select{
        //
        height: 40px;
        line-height: 38px;
        border:1px solid $border-color;
        font-size: .85rem;
        + select{
          //
          margin-top: 10px;
          font-size: .85rem;
        }
        option{
          //
          height: 40px;
          line-height: 40px;
        }
      }
      select[multiple]{
        height: 280px;
        background-image: none;
      }
    }
  }
}
</style>
<script>
import prefJSON from '@/assets/json/pref.json'
import initialCostJSON from '@/assets/json/initialCosts.json'
import subscriptionJSON from '@/assets/json/subscriptions.json'
import requirementJSON from '@/assets/json/requirement.json'
import assortmentJSON from '@/assets/json/assortment.json'
import featureJSON from '@/assets/json/feature.json'
import medicalJSON from '@/assets/json/medical.json'
import vSelect from 'vue-select'
export default {
  name: 'Navigation',
  components: {vSelect},
  data () {
    var self = this;
    return {
      assortments  : assortmentJSON,
      citys: self.$store.state.cityJSON,
      features     : featureJSON,
      initialCosts : initialCostJSON,
      medicals     : medicalJSON,
      prefs        : prefJSON,
      requirements : requirementJSON,
      selectedAssortment  : [],
      selectedFeature     : [],
      selectedInitialCost : [],
      selectedMedical     : [],
      selectedRequirement : [],
      selectedSubscription: [],
      subscriptions: subscriptionJSON,
    }
  },
  computed:{
    count(){
      var self = this;
      return self.$store.state.count
    },
    //現在の検索条件
    Request(){
      var self = this;
      var join = '';
      if(self.$store.state.p !=''){
        join += self.$store.state.p +',';
      }
      if(self.$store.state.c !=''){
        join += self.$store.state.c +',';
      }
      for(var i in self.$store.state.initialCost){
        if(self.$store.state.initialCost[i].selected == 1){
          if(self.$store.state.initialCost[i].option =='　'){
            join += '指定なし,'
          }else{
            join += self.$store.state.initialCost[i].option+',';
          }
        }
      }
      for(var j in self.$store.state.subscription){
        if(self.$store.state.subscription[j].selected == 1){
          if(self.$store.state.subscription[j].option =='　'){
            join += '指定なし,'
          }else{
            join += self.$store.state.subscription[j].option+',';
          }
        }
      }
      for(var k in self.$store.state.requirement){
        if(self.$store.state.requirement[k].checked == 1){
          join += self.$store.state.requirement[k].name+',';
        }
      }
      for(var l in self.$store.state.assortment){
        if(self.$store.state.assortment[l].checked == 1){
          join += self.$store.state.assortment[l].name+',';
        }
      }
      for(var m in self.$store.state.feature){
        if(self.$store.state.feature[m].checked == 1){
          join += self.$store.state.feature[m].name+',';
        }
      }
      for(var n in self.$store.state.medical){
        if(self.$store.state.medical[n].checked == 1){
          join += self.$store.state.medical[n].name+',';
        }
      }
      return join;
    },
    //pref簡易版
    p:{
      get: function (){
        var self = this
        return self.$store.state.p
      },
      set: function(p){
        var self = this;
        if(!p || p == undefined){
          //nothing to do
        }else{
          self.$store.commit('updateStoreP',p)
        }
      }
    },
    //city簡易版
    c:{
      get: function (){
        var self = this
        return self.$store.state.c
      },
      set: function(c){
        var self = this;
        if(!c || c == undefined){
          //nothing to do
        }else{
          self.$store.commit('updateStoreC',c)
        }
      }
    },
    storePref:{
      get: function(){
        var self = this;
        return self.$store.state.selectPref;
      },
      set: function(Obj){
        var self    = this;
        //store.jsへ
        self.$store.commit('updateStorePref', {
            id   : Obj.id,
            key  : 'id',
            option : Obj.option,
        })
      },
    },
    //storePrefとstoreCityは必要。IDを検索クエリにわたす必要がある。
    storeCity:{
      get: function(){
        var self = this;
        return self.$store.state.selectCity
      },
      set: function(Obj){
        var self    = this;
        self.$store.commit('updateStoreCity', {
            id       : Obj.id,
            key      : 'id',
            option   : Obj.option,
            pref     : Obj.pref,
            prefName : Obj.prefName,
        })
      },
    },
    getCity: {
      get: function () {
        var self = this;
        return self.citys.filter(
          function (item) {
            return (
              item.prefName.indexOf(self.$store.state.p) !== -1 && (item.prefName == self.$store.state.p || self.$store.state.p == ''));
          }
        );
      },
    },
    //初期費用
    initialCost:function(){
      var self =this
      var optionArray = []
      for(  var i = 0;  i < self.initialCosts.length;  i++  ){
        optionArray.push(self.initialCosts[i].option)
      }
      return optionArray
    },
    //月額利用料
    subscription:function(){
      var self =this
      var optionArray = []
      for(  var i = 0;  i < self.subscriptions.length;  i++  ){
        optionArray.push(self.subscriptions[i].option)
      }
      return optionArray
    },
    //入居条件
    requirement:function(){
      var self =this
      var optionArray = []
      for(  var i = 0;  i < self.requirements.length;  i++  ){
        optionArray.push(self.requirements[i].name)
      }
      return optionArray
    },
    //種別
    assortment:function(){
      var self =this
      var optionArray = []
      for(  var i = 0;  i < self.assortments.length;  i++  ){
        optionArray.push(self.assortments[i].name)
      }
      return optionArray
    },
    //特徴
    feature:function(){
      var self =this
      var optionArray = []
      for(  var i = 0;  i < self.features.length;  i++  ){
        optionArray.push(self.features[i].name)
      }
      return optionArray
    },
    //看護・医療体制
    medical:function(){
      var self =this
      var optionArray = []
      for(  var i = 0;  i < self.medicals.length;  i++  ){
        optionArray.push(self.medicals[i].name)
      }
      return optionArray
    },
  },
  created:function(){
    var self = this;
    //初期費用
    if(self.$store.state.initialCost.length >1){
      for(var i in self.$store.state.initialCost){
        if(self.$store.state.initialCost[i].selected == 1){
          self.$data.selectedInitialCost = self.$store.state.initialCost[i].option
        }
      }
    }
    //月額利用料
    if(self.$store.state.subscription.length >1){
      for(var j in self.$store.state.subscription){
        if(self.$store.state.subscription[j].selected == 1){
          self.$data.selectedSubscription = self.$store.state.subscription[j].option
        }
      }
    }
    //入居条件
    if(self.$store.state.requirement.length >1){
      for(var k in self.$store.state.requirement){
        if(self.$store.state.requirement[k].checked == 1){
          self.$data.selectedRequirement.push(self.$store.state.requirement[k].name)
        }
      }
    }
    //施設種別
    if(self.$store.state.assortment.length >1){
      for(var l in self.$store.state.assortment){
        if(self.$store.state.assortment[l].checked == 1){
          self.$data.selectedAssortment.push(self.$store.state.assortment[l].name)
        }
      }
    }
    //特徴
    if(self.$store.state.feature.length >1){
      for(var m in self.$store.state.feature){
        if(self.$store.state.feature[m].checked == 1){
          self.$data.selectedFeature.push(self.$store.state.feature[m].name)
        }
      }
    }
    //看護・医療体制
    if(self.$store.state.medical.length >1){
      for(var n in self.$store.state.medical){
        if(self.$store.state.medical[n].checked == 1){
          self.$data.selectedMedical.push(self.$store.state.medical[n].name)
        }
      }
    }
  },
  methods:{
    selectPID:function(e){//eはイベント値ではなく、県名に変更
      var self = this
      var temp = self.prefs.filter(function(item){
        // return item.name == e.target.value;
        return item.name == e;
      })
      // if(e.isTrusted){
      if(e.length > 0 && e !='全国'){
        return temp[0].no
      }else{
        return ''
      }
    },
    selectCID:function(e){//eはイベント値ではなく、市の名前に変更
      var self = this
      var temp = self.citys.filter(function(item){
        // return item.name == e.target.value;
        return item.name == e;
      })
      // if(e.isTrusted){
      if(e.length > 0 && e !='全域' && e !=''){
        return temp[0].no
      }else{
        return '0'
      }
    },
    selectCP:function(e){//eはイベント値ではなく、市の名前に変更
      var self = this
      var temp = self.citys.filter(function(item){
        // return item.name == e.target.value;
        return item.name == e
      })
      // if(e.isTrusted){
      if(e.length > 0 && e !='全域'){
        return temp[0].pref
      }else{
        return '0'
      }
    },
    selectCPN:function(e){//eはイベント値ではなく、市の名前に変更
      var self = this
      var temp = self.citys.filter(function(item){
        // return item.name == e.target.value;
        return item.name == e;
      })
      // if(e.isTrusted){
      if(e.length > 0 && e !='全域'){
        return temp[0].prefName
      }else{
        return '不明'
      }
    },
    //検索クエリ用のIDのために必要
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
    //一応、初期費用は複数選べるようになっています。
    updateStoreInitialCost2: function(events){
      var self = this
        for(var i in self.initialCosts) {
          self.initialCosts[i].selected = 0
          if(events == self.initialCosts[i].option){
            self.initialCosts[i].selected = 1
          }
        }
        self.$store.commit('updateStoreInitialCost2', self.initialCosts)
    },
    //一応、月額利用料は複数選べるようになっています。
    updateStoreSubscription2: function(events){
      var self = this
        for(var i in self.subscriptions) {
          self.subscriptions[i].selected = 0
          if(events == self.subscriptions[i].option){
            self.subscriptions[i].selected = 1
          }
        }
        self.$store.commit('updateStoreSubscription2', self.subscriptions)
    },
    //入居条件
    updateRequirement: function(events){
      var self = this
        for( var i = 0;  i < self.requirements.length;  i++){
          if(events.indexOf(self.requirements[i].name) != -1 ){
            self.requirements[i].checked = 1
          }else{
            self.requirements[i].checked = 0
          }
        }
      self.$store.commit('updateStoreRequirement', self.requirements)
    },
    //施設種別
    updateAssortment: function(events){
      var self = this
        for( var i = 0;  i < self.assortments.length;  i++){
          if(events.indexOf(self.assortments[i].name) != -1 ){
            self.assortments[i].checked = 1
          }else{
            self.assortments[i].checked = 0
          }
        }
      self.$store.commit('updateStoreAssortment', self.assortments)
    },
    //特徴
    updateFeature: function(events){
      var self = this
        for( var i = 0;  i < self.features.length;  i++){
          if(events.indexOf(self.features[i].name) != -1 ){
            self.features[i].checked = 1
          }else{
            self.features[i].checked = 0
          }
        }
      self.$store.commit('updateStoreFeature', self.features)
    },
    //看護医療体制
    updateMedical: function(events){
      var self = this
        for( var i = 0;  i < self.medicals.length;  i++){
          if(events.indexOf(self.medicals[i].name) != -1 ){
            self.medicals[i].checked = 1
          }else{
            self.medicals[i].checked = 0
          }
        }
      self.$store.commit('updateStoreMedical', self.medicals)
    },
    changeQuery(param){
      var self = this
      self.$store.dispatch('changeQuery',param)
    },
    changeRange(range){
      var self = this
      self.$store.dispatch('changeRange',range)
    },
    getQuery: function(){
      var self = this
      self.$store.dispatch('getQuery')
    },
    getJSON: function(){
      var self = this
      self.$store.dispatch('getJSON')
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
      param = self.$store.state.apiserver.split('?')
      self.$router.push('/kaigo/searchresult/?'+param[1])
    },
    resetCity: function(){
      var self = this
      self.$store.commit('updateStoreC','')
    },
    clear: function(){
      var self = this;
      //料金クリア
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
      //各種チェックボックスのクリア
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
      //cityのクリア
      self.$store.commit('updateStoreCity', {
          id       : '',
          key      : 'id',
          option   : '',
          pref     : '',
          prefName : ''
      })
      self.$store.commit('updateStoreC','')
      // //prefのクリア
      self.$store.commit('updateStorePref', {
          id   : '',
          key  : 'id',
          option : '',
      })
      self.$store.commit('updateStoreP','')
      self.getQuery();
      //読み込む
      self.refresh();
    },
  },
}
</script>
