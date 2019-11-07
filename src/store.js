
import Vue from 'vue'
import Vuex from 'vuex'
// リロードしても消えないようにする
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex);
//読み込み専用
import prefJSON from '@/assets/json/pref.json'
import prefSeparateJSON from '@/assets/json/pref_separate.json'
import cityJSON from '@/assets/json/city.json'
import initialCostJSON from '@/assets/json/initialCosts.json'
import subscriptionJSON from '@/assets/json/subscriptions.json'
import requirementJSON from '@/assets/json/requirement.json'
import assortmentJSON from '@/assets/json/assortment.json'
import featureJSON from '@/assets/json/feature.json'
import medicalJSON from '@/assets/json/medical.json'
import axios from 'axios'

export default new Vuex.Store({
  state: {
    apiserver:'',
    p:'',
    c:'',
    //▼検索用にIDを持っておく必要がある
    selectPref: {id:'',option:'エリア'},
    selectCity: {id:'',option:'',pref:'',prefName:''},
    selectPostalCode:'',
    //▲検索用にIDを持っておく必要がある
    //▼初期費用も複数もっておく
    initialCost: [
    ],//{id:'0',option:'入居一時金',selected:''}
    subscription: [
    ],//{id:'0',option:'月額利用料',selected:''}
    requirement: [
      {id:'',name:'',checked:''}
    ],
    assortment: [
      {id:'',name:'',checked:''}
    ],
    feature: [
      {id:'',name:'',checked:''}
    ],
    medical: [
      {id:'',name:'',checked:''}
    ],
    selectid:{id:''},
    test: 'initial state',
    itemlistJSON    : [],
    count           : '',
    totalCount      : '',
    now             : 1,
    displayPager    : 3,
    range           :'1〜20',
    prefJSON        : prefJSON,
    prefSeparateJSON: prefSeparateJSON,
    cityJSON        : cityJSON,
    initialCostJSON : initialCostJSON,
    subscriptionJSON: subscriptionJSON,
    requirementJSON : requirementJSON,
    assortmentJSON  : assortmentJSON,
    featureJSON     : featureJSON,
    medicalJSON     : medicalJSON,
    //施設詳細
    item:[],
    //メタタグをココに持つ方式に変更します。
    title           :  '',
    description     :  '',
    keyword         :  '',
    site_url        :  '',
  },
  getters:{
    //es6バージョン
    // test: state => state.test
    //es5バージョン
    // test: (function (state) {
    //   return state.test;
    // })
  },
  mutations: {
  //▼検索用にIDを持っておく必要がある
    //都道府県を変更
    updateStorePref: function(state, _payload) {
      var self = this;
      self.state.selectPref.id   = _payload.id;
      self.state.selectPref.option = _payload.option;
    },
    //市区町村を変更
    updateStoreCity: function(state, _payload) {
      var self = this;
      self.state.selectCity.id       = _payload.id;
      self.state.selectCity.option     = _payload.option;
      self.state.selectCity.pref     = _payload.pref;
      self.state.selectCity.prefName = _payload.prefName;
    },
    //郵便番号を変更
    updateStorePostalCode: function(state, _payload) {
      var self = this;
      self.state.selectPostalCode   = _payload;
    },
  //▲検索用にIDを持っておく必要がある
  //▼初期費用が単一である場合
    //初期費用を変更
    updateStoreInitialCost: function(state, _payload){
      var self = this;
      self.state.initialCost.id     = _payload.id;
      self.state.initialCost.option = _payload.option;
    },
  //▼初期費用が複数選べるようになる場合
    //初期費用を変更
    updateStoreInitialCost2: function(state, _payload){
      var self = this;
      self.state.initialCost =[];
      for(var i in _payload){
        self.state.initialCost.push(_payload[i]);
      }
    },
  //▼月額利用料が単一である場合
    //月額利用料を変更
    updateStoreSubscription: function(state, _payload){
      var self = this;
      self.state.subscription.id     = _payload.id;
      self.state.subscription.option = _payload.option;
    },
  //▼月額利用料が複数選べるようになる場合
    //月額利用料を変更
    updateStoreSubscription2: function(state, _payload){
      var self = this;
      self.state.subscription =[];
      for(var i in _payload){
        self.state.subscription.push(_payload[i]);
      }
    },
    //入居条件を変更
    updateStoreRequirement: function(state, _payload){
      var self = this;
      self.state.requirement =[];
      for(var i in _payload){
        self.state.requirement.push(_payload[i]);
      }
    },
    //施設種別を変更
    updateStoreAssortment: function(state, _payload){
      var self = this;
      self.state.assortment =[];
      for(var i in _payload){
        self.state.assortment.push(_payload[i]);
      }
    },
    //特長を変更
    updateStoreFeature: function(state, _payload){
      var self = this;
      self.state.feature =[];
      for(var i in _payload){
        self.state.feature.push(_payload[i]);
      }
    },
    //看護・医療体制を変更
    updateStoreMedical: function(state, _payload){
      var self = this;
      self.state.medical =[];
      for(var i in _payload){
        self.state.medical.push(_payload[i]);
      }
    },
    //選択したIDを変更
    updateStoreSelectId: function(state, _payload){
      var self = this;
      self.state.selectid.id = _payload.id;
    },
    //都道府県を変更
    updateStoreP: function(state, _p){
      var self = this;
      self.state.p = _p;
    },
    //市区町村を変更
    updateStoreC: function(state, _c){
      var self = this;
      self.state.c = _c;
    },
    //APIサーバーを変更
    updateStoreApiServer: function(state, _payload){
      var self = this;
      self.state.apiserver = _payload;
    },
    //トータルカウントを変更
    updateStoreTotalCount: function(state, _payload){
      var self = this;
      self.state.totalCount = _payload;
    },
    //カウントを変更
    updateStoreCount: function(state, _payload){
      var self = this;
      self.state.count = _payload;
    },
    //範囲（1~20）を変更
    updateStoreRange: function(state, _payload){
      var self = this;
      self.state.range = _payload;
    },
    //今何ページ目を変更
    updateStoreNow: function(state, _payload){
      var self = this;
      self.state.now = _payload;
    },
    //ページネーションを変更
    updateStoreDisplayPager: function(state, _payload){
      var self = this;
      self.state.displayPager = _payload;
    },
    //施設リストを変更
    updateStoreItemListJSON: function(state, _payload){
      var self = this;
      self.state.itemlistJSON = _payload;
    },
    //施設詳細を変更
    updateStoreItem: function(state, _payload){
      var self = this;
      self.state.item = _payload;
    },
  },
  actions: {
    //該当する施設件数の取得
    getCount: function(){
      var self = this;
      var url = location.hostname;
      var count ;
      if(url=='hitoshia.bla-one.net'){
        count = 'https://api.hitoshia.bla-one.net/api/v1/facilities/count'
      }else if(url=='hitoshia.com'){
        count = 'https://api.hitoshia.com/api/v1/facilities/count'
      }else if(process.env.VUE_APP_ENV=='localhost'){
        count = 'http://127.0.0.1:8001/api/v1/facilities/count'
      }else if(process.env.VUE_APP_ENV=='private'){
        count = 'https://api.hitoshia.bla-one.net/api/v1/facilities/count'
      }
      axios
        .get(
          count
        )
        .then(response => {
          self.commit('updateStoreCount', response.data['resource']['data']['total'])
        })
        .catch(error => {
          window.alert(error);
        });
    },
    //クエリからURLを整形する。
    getTheQuery: function(){
      var self = this;
      var url = location.hostname;
      if(url=='hitoshia.bla-one.net'){
        self.commit('updateStoreApiServer', 'https://api.hitoshia.bla-one.net/api/v1/facilities')
      }else if(url=='hitoshia.com'){
        self.commit('updateStoreApiServer', 'https://api.hitoshia.com/api/v1/facilities')
      }else if(process.env.VUE_APP_ENV=='localhost'){
        self.commit('updateStoreApiServer', 'http://127.0.0.1:8001/api/v1/facilities')
      }else if(process.env.VUE_APP_ENV=='private'){
        self.commit('updateStoreApiServer', 'https://api.hitoshia.bla-one.net/api/v1/facilities')
      }
      self.state.apiserver += '?facilities_id='+self.state.selectid.id
    },
    //検索のクエリを作る
    getQuery: function(){
      var self = this;
      var url = location.hostname;
      var query = '?query';
      //?と&の仕分けがメンドくさいだけ。。
      query += '&pc=';
      if(self.state.selectPref.id != ''){
        query += self.state.selectPref.id;
      }
      query += '&ad=';
      if(self.state.selectCity.option !='' && self.state.selectCity.option != '全域' && self.state.selectCity.option !== undefined){
         for(var pref in prefJSON) {
          if(prefJSON[pref].no === self.state.selectPref.id) {
            query += prefJSON[pref].name+self.state.selectCity.option;
          }
        }
      }
      query += '&as=';
      for(var i in self.state.assortment){
        if(self.state.assortment[i].checked == 1){
          query += self.state.assortment[i].id+',';
        }
      }
      //月額
      // query += '&mia=';
      var temp_sub;
      for(var sub in self.state.subscription){
        if(self.state.subscription[sub].selected == "1"){
          temp_sub = self.state.subscription[sub].id
        }
      }
      if(temp_sub == "1"){query += '&mia=0';}
      else if(temp_sub == "2"){query += '&mia=100000';}
      else if(temp_sub == "3"){query += '&mia=120000';}
      else if(temp_sub == "4"){query += '&mia=140000';}
      else if(temp_sub == "5"){query += '&mia=160000';}
      else if(temp_sub == "6"){query += '&mia=180000';}
      else if(temp_sub == "7"){query += '&mia=200000';}
      else if(temp_sub == "8"){query += '&mia=220000';}
      else if(temp_sub == "9"){query += '&mia=240000';}
      else if(temp_sub == "10"){query += '&mia=260000';}
      else if(temp_sub == "11"){query += '&mia=280000';}
      else if(temp_sub == "12"){query += '&mia=300000';}
      else if(temp_sub == "13"){query += '&mia=350000';}
      else if(temp_sub == "14"){query += '&mia=400000';}
      else if(temp_sub == "15"){query += '&mia=500000';}
      else{
        query += '&mia=';
      }
      // query += '&mxa=';
      //無駄なif文
      if(temp_sub == "1"){query += '&mxa=100000';}
      else if(temp_sub == "2"){query += '&mxa=120000';}
      else if(temp_sub == "3"){query += '&mxa=140000';}
      else if(temp_sub == "4"){query += '&mxa=160000';}
      else if(temp_sub == "5"){query += '&mxa=180000';}
      else if(temp_sub == "6"){query += '&mxa=200000';}
      else if(temp_sub == "7"){query += '&mxa=220000';}
      else if(temp_sub == "8"){query += '&mxa=240000';}
      else if(temp_sub == "9"){query += '&mxa=260000';}
      else if(temp_sub == "10"){query += '&mxa=280000';}
      else if(temp_sub == "11"){query += '&mxa=300000';}
      else if(temp_sub == "12"){query += '&mxa=350000';}
      else if(temp_sub == "13"){query += '&mxa=400000';}
      else if(temp_sub == "14"){query += '&mxa=450000';}
      else if(temp_sub == "15"){query += '&mxa=9999999999';}
      else{
        query += '&mxa=';
      }
      //一時金
      // query += '&mid=';
      var temp_ini
      for(var ini in self.state.initialCost){
        if(self.state.initialCost[ini].selected == "1"){
          temp_ini = self.state.initialCost[ini].id
        }
      }
      if(temp_ini == "1"){query += '&mid=0';}
      else if(temp_ini == "2"){query += '&mid=0';}
      else if(temp_ini == "3"){query += '&mid=500000';}
      else if(temp_ini == "4"){query += '&mid=1000000';}
      else if(temp_ini == "5"){query += '&mid=2000000';}
      else if(temp_ini == "6"){query += '&mid=3000000';}
      else if(temp_ini == "7"){query += '&mid=4000000';}
      else if(temp_ini == "8"){query += '&mid=5000000';}
      else if(temp_ini == "9"){query += '&mid=6000000';}
      else if(temp_ini == "10"){query += '&mid=7000000';}
      else if(temp_ini == "11"){query += '&mid=8000000';}
      else if(temp_ini == "12"){query += '&mid=9000000';}
      else if(temp_ini == "13"){query += '&mid=10000000';}
      else if(temp_ini == "14"){query += '&mid=20000000';}
      else if(temp_ini == "15"){query += '&mid=30000000';}
      else{
        query += '&mid=';
      }
      // query += '&mxd=';
      //無駄なif文
      if(temp_ini == "1"){query += '&mxd=0';}
      else if(temp_ini == "2"){query += '&mxd=500000';}
      else if(temp_ini == "3"){query += '&mxd=1000000';}
      else if(temp_ini == "4"){query += '&mxd=2000000';}
      else if(temp_ini == "5"){query += '&mxd=3000000';}
      else if(temp_ini == "6"){query += '&mxd=4000000';}
      else if(temp_ini == "7"){query += '&mxd=5000000';}
      else if(temp_ini == "8"){query += '&mxd=6000000';}
      else if(temp_ini == "9"){query += '&mxd=7000000';}
      else if(temp_ini == "10"){query += '&mxd=8000000';}
      else if(temp_ini == "11"){query += '&mxd=9000000';}
      else if(temp_ini == "12"){query += '&mxd=10000000';}
      else if(temp_ini == "13"){query += '&mxd=20000000';}
      else if(temp_ini == "14"){query += '&mxd=30000000';}
      else if(temp_ini == "15"){query += '&mxd=9999999999';}
      else{
        query += '&mxd=';
      }
      //入居条件
      for(var j in self.state.requirement){
        if(self.state.requirement[j].checked == 1){
          query += '&c'+self.state.requirement[j].id+'=1';
        }
      }
      //特徴
      for(var k in self.state.feature){
        if(self.state.feature[k].checked == 1){
          query += '&f'+self.state.feature[k].id+'=1';
        }
      }
      //医療
      for(var l in self.state.medical){
        if(self.state.medical[l].checked == 1){
          query += '&m'+self.state.medical[l].id+'=1';
        }
      }
      if(url=='hitoshia.bla-one.net'){
        self.commit('updateStoreApiServer', 'https://api.hitoshia.bla-one.net/api/v1/facilities'+query)
      }else if(url=='hitoshia.com'){
        self.commit('updateStoreApiServer', 'https://api.hitoshia.com/api/v1/facilities'+query)
      }else if(process.env.VUE_APP_ENV=='localhost'){
        self.commit('updateStoreApiServer', 'http://127.0.0.1:8001/api/v1/facilities'+query)
      }else if(process.env.VUE_APP_ENV=='private'){
        self.commit('updateStoreApiServer', 'https://api.hitoshia.bla-one.net/api/v1/facilities'+query)
      }
      // console.log('getQuery');
    },
    //URlの末尾を取得して、クエリに変換する。
    getParam: function(){
      var self = this;
      var query = location.search;
      var url = location.hostname;
      if(url=='hitoshia.bla-one.net'){
        self.commit('updateStoreApiServer', 'https://api.hitoshia.bla-one.net/api/v1/facilities'+query)
      }else if(url=='hitoshia.com'){
        self.commit('updateStoreApiServer', 'https://api.hitoshia.com/api/v1/facilities'+query)
      }else if(process.env.VUE_APP_ENV=='localhost'){
        self.commit('updateStoreApiServer', 'http://127.0.0.1:8001/api/v1/facilities'+query)
      }else if(process.env.VUE_APP_ENV=='private'){
        self.commit('updateStoreApiServer', 'https://api.hitoshia.bla-one.net/api/v1/facilities'+query)
      }
      // console.log('getParam');
    },
    //JSONを取得する
    getJSON: function(){
      var self =this;
      axios
        .get(
          self.state.apiserver
        )
        .then(response => {
          self.state.itemlistJSON = response.data['resource']['data'];
          self.commit('updateStoreCount', response.data['resource']['count']['total'])
          self.dispatch('changeTitle');
        })
        .catch(error => {
          window.alert(error);
        });
    },
    //ページのタイトルを変える
    changeTitle:function(){
      var self = this;
      //条件を整形する
      var area =''
      if(self.state.p !=''){
        area += self.state.p;
      }
      if(self.state.c !=''){
        area += self.state.c;
      }
      if(area.length >0){
        area ='【' + area + '】'
      }
      //入居条件
      var jouken ='';
      for(var k in self.state.requirement){
        if(self.state.requirement[k].checked == 1){
          jouken += self.state.requirement[k].name+',';
        }
      }
      //看護・医療体制
      for(var n in self.state.medical){
        if(self.state.medical[n].checked == 1){
          jouken += self.state.medical[n].name+',';
        }
      }
      //特徴
      for(var m in self.state.feature){
        if(self.state.feature[m].checked == 1){
          jouken += self.state.feature[m].name+',';
        }
      }
      if(jouken.length >0){
        jouken += '対応の'
      }
      //（別の変数にする）施設形体
      var assort ='';
      for(var l in self.state.assortment){
        if(self.state.assortment[l].checked == 1){
          assort += self.state.assortment[l].name+'・';
        }
      }
      //末尾の「・」を消す
      if(assort !=''){
        assort = assort.slice(0,-1) ;
      }else if(assort ==''){
        //空の場合はデフォルトを設定する
        assort ='介護施設・老人ホーム'
      }
      //末尾を設定する
      var middle = 'の検索結果一覧｜';
      var now =''
      if(self.state.now > 1){
        now = self.state.now + 'ページ目｜'
      }
      var tail = 'ヒトシア介護';
      //書き換える
      window.document.title = area + jouken + assort + middle + now + tail
    },
    //クエリを変える
    changeQuery: function(dispatch,param){
      var self = this;
      var new_query = '';
      var split_query = self.state.apiserver.split('&')
      for(var i in split_query){
        if(i == 0){
            new_query += split_query[i]
        }else{
          if( split_query[i].indexOf('p=') != -1 ){
            //nothing to do
          }else{
            new_query += '&'+split_query[i]
          }
        }
      }
      new_query += param
      self.commit('updateStoreApiServer',new_query)
      //console.log('changeQuery_'+new_query)
    },
    //ページを変える
    changeRange: function(dispatch, range ){
      var self = this;
      self.commit('updateStoreRange',range )
    },
    //「1~20件」というような表示をする
    selectPage: function(dispatch, number ){
      var self = this;
      var param = '&p='+number
      var range = ((number*20)-19) + '〜' + number*20
      self.dispatch('changeQuery', param )
      self.dispatch('getJSON')
      self.dispatch('changeRange', range )
    },
    //施設詳細を取得
    getDetail: function(){
      var self = this;
      var array = self.state.itemlistJSON.filter(
        function(item){
          return(item.facilities_id == self.state.selectid.id)
        }
      );
      self.commit('updateStoreItem', array[0] )
    },
    //施設詳細をAPIから取得する
    getDetailAPI: function(){
      var self = this;
      var id = self.state.selectid.id;
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
          self.commit('updateStoreItem',response.data['resource']['data'] )
        })
        .catch(error => {
          window.alert(error);
        });
    },
    //自分の今のURLをストアに入れておく
    getLocationHref: function(){
      var self = this;
      var url = location.href;
      self.commit()//書きかけ
    },
  },
  plugins: [createPersistedState({storage: window.sessionStorage})]
});
