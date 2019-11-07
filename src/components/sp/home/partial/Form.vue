<template>
  <div class="firstview">
    <form>
      <div class="form-group inner ofv">
        <h2>エリア</h2>
        <div
          id="areaBtn"
          class="areaBtn"
        >
          <span v-if="p =='全国' && c =='全域'">
            全国
          </span>
          <span v-else-if="p !='' || c !=''">
            <span>{{ p }}</span>&nbsp;
            <span>{{ c }}</span>
          </span>
          <span v-else>選択して下さい</span>
        </div>
        <h2>入居一時金</h2>
        <div class="selectWrapper">
          <v-select
            v-model="selectedInitialCost"
            :options="initialCost"
            :clearable="false"
            :searchable="false"
            @change="updateStoreInitialCost2($event); getQuery()"
          />
        </div>
        <h2>月額</h2>
        <div class="selectWrapper">
          <v-select
            v-model="selectedSubscription"
            :options="subscription"
            :clearable="false"
            :searchable="false"
            @change="updateStoreSubscription2($event); getQuery()"
          />
        </div>
        <router-link
          class="btn-primary"
          :to="searchresult_param"
          exact="exact"
        >
          <i class="fas fa-search fa-1x">&nbsp;検索</i>
        </router-link>
      </div>
    </form>
    <div class="modalWindow">
      <div
        id="mContent"
        role="dialog"
        aria-label="モーダル"
      >
        <form
          method="get"
          action=""
        >
          <p class="fontWeightBold">
            都道府県を選択してください。
          </p>
          <div class="selectWrapper">
            <select
              v-model="p"
              @change.self="updateStorePref(selectPID($event),p);resetCity();getQuery()"
            >
              <option
                v-if="storePref.id == 0 "
                class="default"
              />
              <option value="全国">
                全国
              </option>
              <option
                v-for="(item,index) in getPref"
                :key="index"
                :value="item.name"
              >
                {{ item.name }}
              </option>
            </select>
          </div>
          <div v-if="p !==''">
            <p class="fontWeightBold mt20">
              市町村を選択してください。
            </p>
            <div class="selectWrapper">
              <select
                id="shop_city"
                v-model="c"
                @change.self="closeAreaModal();updateStoreCity(selectCID(c),c,selectCP(c),selectCPN(c));getQuery()"
              >
                <option value="全域">
                  全域
                </option>
                <option
                  v-for="(item, index) in getCity"
                  :key="index"
                  :value="item.name"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
          </div>
        </form>
      </div>
      <div
        id="mOverlay"
        tabindex="-1"
        role="presentation"
        aria-hidden="true"
        @click.self="getQuery();closeAreaModal();"
      />
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import prefJSON from '@/assets/json/pref.json'
import vSelect from 'vue-select'
export default {
  name: 'FormAndModal',
  components: {vSelect},
  data () {
    var self =this;
    return {
      prefs: prefJSON,
      citys: self.$store.state.cityJSON,
      initialCosts: self.$store.state.initialCostJSON,
      subscriptions: self.$store.state.subscriptionJSON,
      selectPref: self.$store.state.pref,
      selectCity: self.$store.state.city,
      selectedInitialCost:"",
      selectedSubscription:"",
    }
  },
  computed: {
    getPref: {
      get: function () {
        var self = this;
        return self.prefs;
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
    //県の名前を入れた時に、その県の配列をprefsから抜き出す
    selectP: function selectP() {
      var self = this;
      return self.prefs.filter(function(i){
        return i.name === event.target.value
      });
    },
    // pとcは表示名のみ。やはりstorePrefとstoreCityに配列を入れないと県IDと市町村IDが取れない。
    p:{
      get: function (){
        var self = this
        if(self.$store.state.p !== ''){
          return self.$store.state.p
        }else{
          return ''
        }
      },
      set: function(p){
        var self = this;
        self.$store.commit('updateStoreP',p)
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
        if(c != undefined){
          self.$store.commit('updateStoreC',c)
        }
      }
    },
    //storePrefとstoreCityは必要。IDを検索クエリにわたす必要がある。
    storePref:{
      get: function(){
        var self = this;
        return self.$store.state.selectPref;
      },
      set: function(Obj){
        var self    = this;
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
    storeInitialCost:{
      get: function(){
        var self = this;
        return self.$store.state.initialCost
      },
      set: function(Obj){
        var self  = this;
        var _id   = Obj.id;
        var _option = Obj.option;
        self.$store.commit('updateStoreInitialCost', {
            id   : _id,
            key  : 'name',
            option : _option,
        })
      }
    },
    storeSubscription:{
      get: function(){
        var self = this;
        return self.$store.state.subscription
      },
      set: function(Obj){
        var self  = this;
        var _id   = Obj.id;
        var _option = Obj.option;
        self.$store.commit('updateStoreSubscription', {
            id   : _id,
            key  : 'name',
            option : _option,
        })
      }
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
    //初期費用
    if(self.$store.state.initialCost.length > 0){
      for(var i in self.$store.state.initialCost) {
        if(self.$store.state.initialCost[i].selected == 1){
          self.selectedInitialCost = self.$store.state.initialCost[i].option
        }
      }
    }
    //月額
    if(self.$store.state.subscription.length > 0){
      for(var j in self.$store.state.subscription) {
        if(self.$store.state.subscription[j].selected == 1){
          self.selectedSubscription = self.$store.state.subscription[j].option
        }
      }
    }
  },
  mounted: function(){
    if(this.$store.state.initialCost.id == '0'){
      $(".default").attr("selected","selected")
    }
    $('#areaBtn').on({ 'click' : function () {
        $('body').css('position','fixed')
        $('#mOverlay').addClass('show');
        $('#mContent').addClass('is-visible fadeInDown');
        // $(function () {
        //   $('#mOverlay, .Cancel').on('click', function () {
        //     $('body').css('position','static')
        //     $('#mOverlay').removeClass('show');
        //     $('#mContent').removeClass('is-visible fadeInDown');
        //   });
        // });
      }
    })
    $('#shop_city').on({'change': function (){
        $('body').css('position','static')
      }
    })
  },
  methods: {
    updateStoreInitialCost: function(_id,_option){
      var self = this;
      self.$store.commit('updateStoreInitialCost',{
        id     : _id,
        option : _option
      })
    },
    updateStoreSubscription: function(_id,_option){
      var self = this;
      self.$store.commit('updateStoreSubscription',{
        id     : _id,
        option : _option
      })
    },
    //pref簡易版（名前だけ）
    updateStoreP: function(p) {
      var self = this;
      self.$store.commit('updateStoreP',p)
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
    closeAreaModal: function(){
      $('body').css('position','static')
      $('#mOverlay').removeClass('show');
      $('#mContent').removeClass('is-visible  fadeInDown');
    },
    //初期費用が複数選べるように
    updateInitialCost2: function(events){
      var self = this
      var temp =[];
      if(events.length >0){
        for(  var i = 0;  i < events.length;  i++  ){
          var temp2 = self.initialCosts.filter(function(item){
              return item.option == events[i];
          })
          temp.push(temp2[0])
        }
        self.$store.commit('updateStoreInitialCost2', temp)
      }
    },
    //最新
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
    //月額利用料が複数選べるように
    updateSubscription2: function(events){
      var self = this
      var temp = []
      if(events.length > 0){
        for(  var i = 0;  i < events.length;  i++  ){
          var temp2 = self.subscriptions.filter(function(item){
              return item.option == events[i];
          })
          temp.push(temp2[0])
        }
        self.$store.commit('updateStoreSubscription2', temp)
      }
    },
    //最新
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
    resetCity: function(){
      var self = this
      self.$store.commit('updateStoreC','')
    },
    getQuery: function(){
      var self = this
      self.$store.dispatch('getQuery')
    },
    selectPID:function(e){//eはイベント値ではなく、県名に変更
      var self = this
      var temp = self.prefs.filter(function(item){
        return item.name == e.target.value;
        // return item.name == e;
      })
      // if(e.isTrusted){
      if(e.target.value.length > 0 && e.target.value !='全国'){
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
  },
}
</script>

<style lang="scss" scoped>
@import '@/scss/variable.scss';
@import '@/scss/sp/jQueryModal.scss';
.title{color:$secondary-color-alt;font-size: $fs19}
.title:before{background-color:$secondary-color-alt;}
.iconWrapper{
  padding-bottom: 1rem;
  .icons{
    display: flex;
    margin-top: 1rem;
  }
}
.inner{
  width: 91.4%;
  margin: 0 auto;
  overflow: hidden;
}
.ofv{
  overflow: visible;
}
.form-group{
  .modalSelect{
    height: 50px;
    font-size: $fs16;
    border: 1px solid $border-color;
  }
  h2{
    color:#407C5C;
    display: block;
    font-size: 4.8vw;
    position: relative;
    margin-top: 2rem;
    margin-bottom: .5rem;
    text-align: left;
  }
  p{
    font-size: 3.8vw;
    line-height: 1.5rem;
  }

  .areaBtn{
    padding: .375rem 0.75rem;
    text-align: left;
    color: $gray;
    height: 50px;
    line-height: 38px;
    border: 1px solid $border-color;
    border-radius: 12px;
    &::after{
      font-family: 'Font Awesome 5 Free';
      content:"\f3c5";
      color:$primary-color;
      display: inline-block;;
      font-style: normal;
      font-variant: normal;
      font-weight: bold;
      font-size: 20px;
      float:right;
    }
  }
  .selectWrapper{
    position: relative;

    select{
      position: relative;
      appearance: none;
    }

  }
  input[type="text"]{
  }
  a,a:visited{
    margin: 3.5rem auto 3rem;
    display: block;
    color: #fff;
    font-size: 5.2vw;
    height: 54px;
    line-height: 50px;
    padding-top: 4px;
    width:69%;
    border-radius: 28px;
    .fa-search{
      &::before{
        font-size: 7vw;
        position: relative;
        top: 2px;
      }
    }
  }
}
.Android{
  .form-group{
    .areaBtn{
        line-height: 36px;
    }
    a{
      padding-top: 2px;
    }
  }
}
</style>
