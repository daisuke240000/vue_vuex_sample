<template lang="pug">
  .firstview.mb100
    form
      .form-group
        .inputtypetext(v-on:click="openAreaModal")
          .wrapper
            span {{p}} &nbsp;
            span {{c}}
        v-select(id="initial" v-model="selectedInitialCost" :options="initialCost" :clearable="false" v-on:change="updateStoreInitialCost2($event); getQuery()")
        v-select(id="subsc" v-model="selectedSubscription" :options="subscription" :clearable="false" v-on:change="updateStoreSubscription2($event); getQuery()")
        router-link.searchBtn(:to="searchresult_param").btn-primary
          i.fas.fa-search
            |検索
    .modalWindow
      #mPref(role='dialog' aria-label='市町村モーダル')
        form(method='get' action='')
          h3 エリアから施設を探す
          p 市町村をお選び下さい。
          .flex
            .ul(v-model="c")
               .li.citybtn(v-on:click.self="modalclose(); updateStoreC('全域'); updateStoreCity('0','全域','0','不明'); getQuery()") 全域
               .li.cityBtn(v-for="(item, index) in getCity" v-on:click.self="modalclose(); updateStoreC(item.name); updateStoreCity(item.no,item.name,item.pref,item.prefName); getQuery()") {{item.name}}
          .btnWrapper
            button.Cancel(type='button' tabindex='1')
              img(src='@/assets/img/close_btn.svg')
      #mContent(role='dialog' aria-label='モーダル')
        form(method='get' action='')
          h3 エリアから施設を探す
          p 都道府県をお選び下さい。
          .flex
            .ul(v-for="(item,key,index) in prefs" v-bind:key=index)
              .li.title {{key}}
              button.li(v-for="pref in item" type="button" v-on:click.self="openCityModal(); updateStoreP(pref.name); updateStorePref(pref.no,pref.name); resetCity(); getQuery();") {{pref.name}}
          .btnWrapper
              button.Cancel(type='button' tabindex='1')
                img(src='@/assets/img/close_btn.svg')
      #mOverlay(tabindex='-1' role='presentation' aria-hidden='true')
</template>
<script>
import $ from 'jquery'
import vSelect from 'vue-select'
export default {
  name: 'FirstViewForm',
  components: {vSelect},
  data () {
    var self = this;
    return {
      prefs: self.$store.state.prefSeparateJSON,
      citys: self.$store.state.cityJSON,
      initialCosts: self.$store.state.initialCostJSON,
      subscriptions: self.$store.state.subscriptionJSON,
      selectPref: self.$store.state.pref,
      selectedInitialCost:"",
      selectedSubscription:"",
    }
  },
  computed: {
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
    //pとcは表示名のみ管理。やはりstorePrefとstoreCityに配列を入れないと県IDと市町村IDが取れない。
    p:{
      get: function (){
        var self = this
        if(self.$store.state.p !== ''){
          return self.$store.state.p
        }else{
          return 'エリア'
        }
      },
      set: function(p){
        var self = this;
        self.$store.commit('updateStoreP',p)
      }
    },
    c:{
      get: function (){
        var self = this
        return self.$store.state.c
      },
      set: function(c){
        var self = this;
        self.$store.commit('updateStoreC',c)
      }
    },
    //storePrefとstoreCityは必要。IDを検索クエリにわたす必要がある。
    storePref:{
      get: function(){
        var self = this
        return self.$store.state.selectPref
      },
      set: function(Obj){
        var self    = this
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
        var self = this
        return self.$store.state.selectCity
      },
      set: function(Obj){
        var self    = this
        self.$store.commit('updateStoreCity', {
            id       : Obj.id,
            key      : 'id',
            option   : Obj.option,
            pref     : Obj.pref,
            prefName : Obj.prefName,
        })
      },
    },
    initialCost:function(){
      var self =this
      var optionArray = []
      for(  var i = 0;  i < self.initialCosts.length;  i++  ){
        optionArray.push(self.initialCosts[i].option)
      }
      return optionArray
    },
    subscription:function(){
      var self =this
      var optionArray = []
      for(  var i = 0;  i < self.subscriptions.length;  i++  ){
        optionArray.push(self.subscriptions[i].option)
      }
      return optionArray
    },
    searchresult_param:function(){
      var self = this;
      var param = self.$store.state.apiserver.split('?')
      return '/kaigo/searchresult/?'+ param[1]
    }
  },
  created: function() {
    var self = this
    if(self.$store.state.initialCost.length > 0){
      for(var i in self.$store.state.initialCost) {
        if(self.$store.state.initialCost[i].selected == 1){
          self.selectedInitialCost = self.$store.state.initialCost[i].option
        }
      }
    }
    if(self.$store.state.subscription.length > 0){
      for(var j in self.$store.state.subscription) {
        if(self.$store.state.subscription[j].selected == 1){
          self.selectedSubscription = self.$store.state.subscription[j].option
        }
      }
    }
  },
  mounted: function(){
    if( $('#initial .vs__selected-options .selected-tag').length == 0 ){
      $('#initial .form-control').attr('placeholder','　入居一時金');
    }
    if( $('#subsc .vs__selected-options .selected-tag').length == 0 ){
      $('#subsc .form-control').attr('placeholder','　月額利用料');
    }
  },
  methods: {
    openAreaModal: function(){
      $('body').addClass('is-fixed');
      $('#mOverlay').addClass('show');
      $('#mContent').addClass('is-visible fadeInDown');
      $(function () {
        $('#mOverlay, .Cancel').on('click', function () {
          $('body').removeClass('is-fixed');
          $('#mOverlay').removeClass('show');
          $('#mContent').removeClass('is-visible fadeInDown');
        });
      });
    },
    openCityModal: function(){
      $('#mPref').addClass('is-visible  fadeInDown');
      $('#mContent').removeClass('is-visible fadeInDown');
      $(function () {
        $('#mOverlay, .Cancel').on('click', function () {
          $('body').removeClass('is-fixed');
          $('#mPref').removeClass('is-visible fadeInDown');
        });
      });
    },
    //jQueryで書いたモーダルを消す。
    modalclose: function(){
      document.querySelector('body').classList.remove('is-fixed');
      document.getElementById('mOverlay').classList.remove('show');
      document.getElementById('mPref').classList.remove('is-visible');
      document.getElementById('mPref').classList.remove('fadeInDown');
    },
    //pref簡易版
    updateStoreP: function(p) {
      var self = this;
      //store.jsへ
      self.$store.commit('updateStoreP',p)
    },
    //city簡易版
    updateStoreC: function(c) {
      var self = this;
      self.$store.commit('updateStoreC',c)
    },
    //検索クエリ用のIDのために必要
    updateStorePref: function(_id,_option) {
      var self = this;
      //store.jsへ
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
    updateStoreInitialCost2: function(events){
      var self = this
      if(events !== null){
        for(var i in self.initialCosts) {
          self.initialCosts[i].selected = 0
          if(events == self.initialCosts[i].option){
            self.initialCosts[i].selected = 1
          }
        }
        self.$store.commit('updateStoreInitialCost2', self.initialCosts)
      }
    },
    updateStoreSubscription2: function(events){
      var self = this
      if(events !== null){
        for(var i in self.subscriptions) {
          self.subscriptions[i].selected = 0
          if(events == self.subscriptions[i].option){
            self.subscriptions[i].selected = 1
          }
        }
        self.$store.commit('updateStoreSubscription2', self.subscriptions)
      }
    },
    getQuery: function(){
      var self = this
      self.$store.dispatch('getQuery')
    },
    resetCity: function(){
      var self = this
      self.$store.commit('updateStoreC','')
      self.$store.commit('updateStoreCity',{'id':'0','option':'全域','pref':'0','prefName':'不明'})
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/scss/pc/base.scss';
@import '@/scss/pc/jQueryModal.scss';
.firstview{
  width:880px;
  margin:0 auto;
  .form-group{
    width:100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border:1px solid $border-color;
    border-radius: 25px;
    .form-control{
      height: 50px;
    }
    select{
      appearance: none;
    }
    //エリアの項目
    .inputtypetext{
      width: 30%;
      background: none;
      padding: 0.375rem 2.45rem 0.35rem 1.3rem;
      text-align: left;
      white-space: nowrap;
      // background-image: url('~@/assets/img/icon_select_arrow.svg');
      background-size: 14px auto;
      background-position: 95% 52%;
      background-repeat: no-repeat;
      border: 0;
      border-right:1px dotted $border-color;
      position: relative;

      &:after{
        font-family: 'Font Awesome 5 Free';
        content: "\F3C5";
        color: #71D327;
        display: inline-block;
        font-style: normal;
        font-variant: normal;
        font-weight: bold;
        font-size: 20px;
        // float: right;
        position: absolute;
        right: 10px;
        top: 5px;
      }
    }
    //検索ボタン
    .searchBtn,.searchBtn:visited{
      color: #fff;
      font-weight: bold;
      display:block;
      width: 10%;
      height: 44px;
      margin: 3px 3px 3px 0;
      padding-top: 11px;
      border-radius: 25px;
      transition-duration: 0.3s;
      &:hover{
        background-color: #407C5C!important;
        transition-duration: 0.3s;
      }
      .fa-search{
        font-size: 1rem;
        &:before{
          margin-right: 4px;
          font-size: 1.25rem;
          position: relative;
          top: 1px;
        }
      }
    }
  }
}
@media screen and (max-width: 965px) {
  #mPref{
    width:95%;
    margin-left: -47.5%;
  }
  #mContent{
    width:95%;
    margin-left: -47.5%;
  }
}
@media screen and (max-width: 930px) {
  .firstview{
    width:95%;
  }
  .form-group{
    width:100%
  }

}
</style>
