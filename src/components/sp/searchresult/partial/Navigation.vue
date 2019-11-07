<template>
  <div class="navigation">
    <div class="button">
      現在の検索条件
    </div>
    <div class="toggleContent">
      <div
        class="query"
        v-html="Request"
      />
      <ul class="selectWrapper2">
        <li>
          <h3>都道府県：</h3>
          <select
            v-model="p"
            @change="updateStorePref(selectPID($event),p); getQuery();resetCity();"
          >
            <option value="全国">
              全国
            </option>
            <option
              v-for="(pref,index) in prefs"
              :key="index"
              :value="pref.name"
            >
              {{ pref.name }}
            </option>
          </select>
          <h3>市町村：</h3>
          <select
            v-model="c"
            @change="updateStoreCity(selectCID($event),c,selectCP($event),selectCPN($event)); getQuery()"
          >
            <option value="全域">
              全域
            </option>
            <option
              v-for="(_City,index) in getFilteredCity"
              :key="index"
              :value="_City.name"
            >
              {{ _City.name }}
            </option>
          </select>
        </li>
        <li>
          <h3>入居一時金</h3>
          <v-select
            v-model="selectedInitialCost"
            :options="initialCost"
            :clearable="false"
            :searchable="false"
            @change="updateStoreInitialCost2($event); getQuery()"
          />
        </li>
        <li>
          <h3>月額利用料</h3>
          <v-select
            v-model="selectedSubscription"
            :options="subscription"
            :clearable="false"
            :searchable="false"
            @change="updateStoreSubscription2($event); getQuery()"
          />
        </li>
        <li>
          <h3>入居条件：</h3>
          <v-select
            v-model="selectedRequirement"
            :options="requirement"
            :searchable="false"
            multiple
            @change="updateRequirement($event); getQuery()"
          />
        </li>
        <li>
          <h3>施設種別：</h3>
          <v-select
            v-model="selectedAssortment"
            :options="assortment"
            :searchable="false"
            multiple
            @change="updateAssortment($event); getQuery()"
          />
        </li>
        <li>
          <h3>特徴：</h3>
          <v-select
            v-model="selectedFeature"
            :options="feature"
            :searchable="false"
            multiple
            @change="updateFeature($event); getQuery()"
          />
        </li>
        <li>
          <h3>看護・医療体制：</h3>
          <v-select
            v-model="selectedMedical"
            :options="medical"
            :searchable="false"
            multiple
            @change="updateMedical($event); getQuery()"
          />
        </li>
      </ul>
      <button
        type="button"
        class="btn-primary changeButton"
        @click="fillForm(); refresh()"
      >
        再検索する
      </button>
      <button
        type="button"
        class="btn-outline-primary clearButton"
        @click="clear()"
      >
        リセット
      </button>
    </div>
  </div>
</template>

<script>
// import jQuery from 'jquery'
import $ from 'jquery'
import vSelect from 'vue-select'
export default {
  components: {vSelect},
  data () {
    var self = this;
    return {
      assortments  : self.$store.state.assortmentJSON,
      citys        : self.$store.state.cityJSON,
      features     : self.$store.state.featureJSON,
      initialCosts : self.$store.state.initialCostJSON,
      medicals     : self.$store.state.medicalJSON,
      prefs        : self.$store.state.prefJSON,
      requirements : self.$store.state.requirementJSON,
      selectedAssortment  : [],
      selectedFeature     : [],
      selectedInitialCost : "",
      selectedMedical     : [],
      selectedRequirement : [],
      selectedSubscription: "",
      subscriptions: self.$store.state.subscriptionJSON,
      reset_flag:0,
      open_flag:0,
    }
  },
  computed:{
    Request(){
      var self = this;
      var join =
        '<span class="blue">都道府県：</span><br><span class="indent">'+self.$store.state.p +'</span>'+
        '<br><span class="blue">市町村：</span><br><span class="indent">'+self.$store.state.c +''
      join+='<br><span class="blue">入居一時金：</span><br><span class="indent">';
      for(var i in self.$store.state.initialCost){
        if(self.$store.state.initialCost[i].selected == 1){
          if(self.$store.state.initialCost[i].option =='　'){
            join += '指定なし,'
          }else{
            join += self.$store.state.initialCost[i].option+',';
          }
        }
      }
      if(join.slice(-1) != '>'){
        join = join.slice(0,-1) ;
      }
      join+='<br><span class="blue">月額利用料：</span><br><span class="indent">';
      for(var j in self.$store.state.subscription){
        if(self.$store.state.subscription[j].selected == 1){
          if(self.$store.state.subscription[j].option =='　'){
            join += '指定なし,'
          }else{
            join += self.$store.state.subscription[j].option+',';
          }
        }
      }
      if(join.slice(-1) != '>'){
        join = join.slice(0,-1) ;
      }
      join+='<br><span class="blue">入居条件：</span><br><span class="indent">';
      for(var k in self.$store.state.requirement){
        if(self.$store.state.requirement[k].checked == 1){
          join += self.$store.state.requirement[k].name+',';
        }
      }
      if(join.slice(-1) != '>'){
        join = join.slice(0,-1) ;
      }
      join+='</span><br><span class="blue">施設種別：</span><br><span class="indent">';
      for(var l in self.$store.state.assortment){
        if(self.$store.state.assortment[l].checked == 1){
          join += self.$store.state.assortment[l].name+',';
        }
      }
      if(join.slice(-1) != '>'){
        join = join.slice(0,-1) ;
      }
      join+='</span><br><span class="blue">特徴：</span><br><span class="indent">';
      for(var m in self.$store.state.feature){
        if(self.$store.state.feature[m].checked == 1){
          join += self.$store.state.feature[m].name+',';
        }
      }
      if(join.slice(-1) != '>'){
        join = join.slice(0,-1) ;
      }
      join+='</span><br><span class="blue">看護医療体制：</span><br><span class="indent">';
      for(var n in self.$store.state.medical){
        if(self.$store.state.medical[n].checked == 1){
          join += self.$store.state.medical[n].name+',';
        }
      }
      if(join.slice(-1) != '>'){
        join = join.slice(0,-1) ;
      }
      join+='</span>'
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
    //入居条件プルダウン
    requirement:function(){
      var self =this
      var optionArray = []
      for(  var i = 0;  i < self.requirements.length;  i++  ){
        optionArray.push(self.requirements[i].name)
      }
      return optionArray
    },
    //施設種別プルダウン
    assortment:function(){
      var self =this
      var optionArray = []
      for(  var i = 0;  i < self.assortments.length;  i++  ){
        optionArray.push(self.assortments[i].name)
      }
      return optionArray
    },
    //特徴プルダウン
    feature:function(){
      var self =this
      var optionArray = []
      for(  var i = 0;  i < self.features.length;  i++  ){
        optionArray.push(self.features[i].name)
      }
      return optionArray
    },
    //看護医療体制プルダウン
    medical:function(){
      var self =this
      var optionArray = []
      for(  var i = 0;  i < self.medicals.length;  i++  ){
        optionArray.push(self.medicals[i].name)
      }
      return optionArray
    },
    getFilteredCity: {
      get: function () {
        var self = this;
        return self.citys.filter(
          function (_City) {
            return (
              _City.prefName.indexOf(self.$store.state.p) !== -1 &&
              (_City.prefName == self.$store.state.p || self.$store.state.p == '')
            );
          }
        );
      },
    },
  },
  mounted:function(){
    $('.button').on('click',function(){
      $(this).toggleClass('active');
      $(this).parent().toggleClass('active');
      $(this).next().toggleClass('active');
      $('.query').toggleClass('active');
    });
    $('.changeButton').on('click',function(){
      $(this).toggleClass('active');
      $('.query').toggleClass('active');
      $('.selectWrapper2').toggleClass('active');
      if($(this).hasClass('active')){
        $(this).text('保存する');
      }else{
        $(this).text('設定を変更');
        $("html,body").animate({scrollTop:0},"slow");
        $('.navigation').removeClass('active');
        $('.button').removeClass('active');
        $('.toggleContent').removeClass('active');
        $('.query').removeClass('active');
      }
    });
  },
  methods:{
    //都道府県ID取得
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
    //市町村IDと、そこを含む県名、県IDの取得
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
    //初期費用が複数選べるように
    updateStoreInitialCost2: function(events){
      var self = this
      if(self.selectedInitialCost != "" || self.reset_flag ==1){
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
    updateStoreSubscription2: function(events){
      var self = this
      if(self.selectedSubscription != "" || self.reset_flag ==1){
        for(var i in self.subscriptions) {
          self.subscriptions[i].selected = 0
          if(events == self.subscriptions[i].option){
            self.subscriptions[i].selected = 1
          }
        }
        self.$store.commit('updateStoreSubscription2', self.subscriptions)
      }
    },
    //入居条件
    updateRequirement: function(events){
      var self = this
      if(self.selectedRequirement.length >0 || self.reset_flag ==1){
        for( var i = 0;  i < self.requirements.length;  i++){
          if(events.indexOf(self.requirements[i].name) != -1 ){
            self.requirements[i].checked = 1
          }else{
            self.requirements[i].checked = 0
          }
        }
      self.$store.commit('updateStoreRequirement', self.requirements)
      }
    },
    //施設種別
    updateAssortment: function(events){
      var self = this
      if(self.selectedAssortment.length >0 || self.reset_flag ==1){
        for( var i = 0;  i < self.assortments.length;  i++){
          if(events.indexOf(self.assortments[i].name) != -1 ){
            self.assortments[i].checked = 1
          }else{
            self.assortments[i].checked = 0
          }
        }
      self.$store.commit('updateStoreAssortment', self.assortments)
      }
    },
    //特徴
    updateFeature: function(events){
      var self = this
      if(self.selectedFeature.length >0 || self.reset_flag ==1){
        for( var i = 0;  i < self.features.length;  i++){
          if(events.indexOf(self.features[i].name) != -1 ){
            self.features[i].checked = 1
          }else{
            self.features[i].checked = 0
          }
        }
      self.$store.commit('updateStoreFeature', self.features)
      }
    },
    //看護医療体制
    updateMedical: function(events){
      var self = this
      if(self.selectedMedical.length >0 || self.reset_flag ==1){
        for( var i = 0;  i < self.medicals.length;  i++){
          if(events.indexOf(self.medicals[i].name) != -1 ){
            self.medicals[i].checked = 1
          }else{
            self.medicals[i].checked = 0
          }
        }
      self.$store.commit('updateStoreMedical', self.medicals)
      }
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
    clear: function(){
      var self = this;
      self.reset_flag = 1;
      //初期費用のクリア
      // self.$store.commit('updateStoreInitialCost2', '')
      for(var i in self.initialCosts) {
        self.initialCosts[i].selected = 0
      }
      self.selectedInitialCost ='';
      self.$store.commit('updateStoreInitialCost2', self.initialCosts)
      //月額利用料
      for(var j in self.subscriptions) {
        self.subscriptions[j].selected = 0
      }
      self.selectedSubscription ='';
      self.$store.commit('updateStoreSubscription2', self.subscriptions)
      for(var k in self.$store.state.medical){
        self.$store.state.medical[k].checked = 0
      }
      //医療体制のクリア
      self.selectedMedical = [],
      self.$store.commit('updateStoreMedical', self.medicals)
      for(var l in self.$store.state.feature){
        self.$store.state.feature[l].checked=0
      }
      //特徴のクリア
      self.selectedFeature = [],
      self.$store.commit('updateStoreFeature', self.features)
      for(var m in self.$store.state.requirement){
        self.$store.state.requirement[m].checked=0
      }
      //入居条件のクリア
      self.selectedRequirement = [],
      self.$store.commit('updateStoreRequirement', self.requirements)
      //種別のクリア
      for(var n in self.$store.state.assortment){
        self.$store.state.assortment[n].checked=0
      }
      self.selectedAssortment = [],
      self.$store.commit('updateStoreAssortment', self.assortments)
      //cityのクリア
      self.$store.commit('updateStoreC','')
      //prefのクリア
      self.$store.commit('updateStorePref', {
          id   : '',
          key  : 'id',
          option : '',
      })
      self.$store.commit('updateStoreP','')
      //クエリをもう一度とりにいく
      self.getQuery();
      //読み込む
      self.refresh();
    },
    resetCity: function(){
      var self = this
      self.$store.commit('updateStoreC','')
    },
    fillForm: function(){
      var self = this
      if(self.open_flag == 0){
        for(var i in self.$store.state.initialCost){
          if(self.$store.state.initialCost[i].selected == 1){
            self.selectedInitialCost = self.$store.state.initialCost[i].option;
          }
        }
        for(var j in self.$store.state.subscription){
          if(self.$store.state.subscription[j].selected == 1){
            self.selectedSubscription  = self.$store.state.subscription[j].option;
          }
        }
        for(var k in self.$store.state.requirement){
          if(self.$store.state.requirement[k].checked == 1){
            self.selectedRequirement.push(self.$store.state.requirement[k].name)
          }
        }
        for(var l in self.$store.state.assortment){
          if(self.$store.state.assortment[l].checked == 1){
            self.selectedAssortment.push(self.$store.state.assortment[l].name)
          }
        }
        for(var m in self.$store.state.feature){
          if(self.$store.state.feature[m].checked == 1){
            self.selectedFeature.push(self.$store.state.feature[m].name)
          }
        }
        for(var n in self.$store.state.medical){
          if(self.$store.state.medical[n].checked == 1){
            self.selectedMedical.push(self.$store.state.medical[n].name)
          }
        }
        self.open_flag = 1;
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/scss/variable.scss';
 .navigation{
   //
   margin-bottom: 32px;
   position: relative;
   height: 50px;
   &.active{
     height: auto;
     margin-bottom: 855px;
   }
   .button{
     width:100%;
     display:block;
     background-color: $secondary-bg-color;
     border: 1px solid $border-color;
     height: 50px;
     line-height: 46px;
     font-weight: bold;
     padding: 2px 0 0 1em;
     background-size: 13px auto;
     background-position: 95% 50%;
     background-repeat: no-repeat;
     text-align: left;
     border: 1px solid $border-color;
     border-radius: 1px;
     position: relative;
     z-index: 3;
     &:before{
       content:url("~@/assets/img/icon_select_arrow-black.svg");
       display: inline-block;
       width: 13px;
       position: absolute;
       right:5%;
       transition: all 300ms 0s ease;
     }
     &.active{
       &:before{
         transform: rotate(180deg);
       }
     }
   }
   .toggleContent{
     width:100%;
     background-color: $primary-bg-color;
     border: 1px solid $border-color;
     border-top: 0;
     padding: 16px 16px 32px;;
     position: absolute;
     z-index: 2;
     height: 0;
     opacity: 0;
     top: 0px;
     &.active{
       height: auto;
       opacity: 1;
       top:50px;
       transition: all 300ms 0s ease;
     }
   }
   .query{
     text-align: left;
     font-weight: bold;
     display: none;
     position: relative;
     z-index: 2;
     &.active{
       display: block;
     }
     //
     .blue {
       color: $link-color;
     }
     .indent{
       display: inline-block;
       text-indent: 16px;
     }
   }
   .selectWrapper2{
     display: none;
     background-color: transparent;
     margin-bottom: 0;
     &.active{
       display: block;
     }
     h3{
       font-size: $fs16;
       font-weight: bold;
       text-align: left;
       color: $link-color;
     }
     select{
     }
   }
   .btn-primary{
     width:100%;
     color:#fff;
     font-weight: bold;
     padding: 2px 0 0 0;
     line-height: 46px;
     height: 50px;
     border-radius: 25px;
     margin-top: 16px;
   }
   .btn-outline-primary{
     width: 100%;
     height: 50px;
     background-color: #fff;
     display: block;
     line-height: 40px;
     color: $primary-color;
     border: 2px solid $primary-color;
     font-weight: bold;
     border-radius: 25px;
     margin-top: 20px;
   }
 }
</style>
