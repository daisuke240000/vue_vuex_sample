<template>
  <div class="itemlist">
    <ul id="items">
      <li
        v-for="(item,key,index) in $store.state.itemlistJSON"
        :key="index"
        class="item"
      >
        <div class="inner">
          <p class="assort">
            {{ item['assortment'] | assort_name }}
          </p>
          <h2 class="h2">
            {{ item['name'] }}
          </h2>
          <p class="operation">
            運営法人：<span>{{ item['corporation'] }}</span><br>
            出所：介護サービス情報公表システム
          </p>
          <div class="second">
            <span class="title">エリア</span><span>{{ item['address'] }}</span>
          </div>
          <div class="second">
            <span class="title">路線</span><span>{{ item['access_info'] }}</span>
          </div>
          <div class="first">
            <span class="title">一時金</span><span class="price">
              {{ digit3(item['min_deposit']) }}<span class="black">{{ item['min_deposit'] | nyoro }}</span>{{ digit3(item['max_deposit']) }}<span class="black">円</span>
            </span>
          </div>
          <div class="first">
            <span class="title">月額利用料</span><span class="price">
              {{ digit3(item['min_amount']) }}<span class="black">{{ item['min_amount'] | nyoro }}</span>{{ digit3(item['max_amount']) }}<span class="black">円</span>
            </span>
          </div>
          <p class="req_title">
            入居条件：
          </p>
          <div class="req_list">
            <span>自立：{{ item['condition_1'] | iconBoolean }}、</span>
            <span>要支援1：{{ item['condition_2'] | iconBoolean }}、</span>
            <span>要支援2：{{ item['condition_3'] | iconBoolean }}、</span>
            <span>要介護1：{{ item['condition_4'] | iconBoolean }}、</span>
            <span>要介護2：{{ item['condition_5'] | iconBoolean }}、</span>
            <span>要介護3：{{ item['condition_6'] | iconBoolean }}、</span>
            <span>要介護4：{{ item['condition_7'] | iconBoolean }}、</span>
            <span>要介護5：{{ item['condition_8'] | iconBoolean }}、</span>
            <span>認知症：{{ item['condition_9'] | iconBoolean }}、</span>
            <span>認知症重度：{{ item['condition_10'] | iconBoolean }}、</span>
            <span>生活保護：{{ item['condition_11'] | iconBoolean }}、</span>
            <span>身元保証人なし：{{ item['condition_12'] | iconBoolean }}、</span>
            <span>入居年齢相談：{{ item['condition_13'] | iconBoolean }}、</span>
          </div>
          <div class="btnWrapper">
            <router-link
              class="btn-outline-primary"
              :to="'/kaigo/detail/?'+item['facilities_id']"
              exact="exact"
              @click.native="updateStoreSelectId(item['facilities_id'])"
            >
              施設詳細
            </router-link>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
@import '@/scss/variable.scss';
@import '@/scss/sp/base.scss';
.itemlist{
  //
  #items{
    background-color: $primary-bg-color;
    .item{
      //
      background-color: #fff;
      text-align: left;
      border-top:1px solid $border-color;
      border-bottom: 1px solid $border-color;
      margin-bottom: 32px;
      .price{
        color: $alert-text-color;
        font-size: $fs16;
        font-weight: bold;
        .black{
          color: $text-color;
          font-size: .75rem;
        }
      }
      .first{
        //
        white-space: nowrap;
        margin-bottom: 15px;
        .title{
          //
          font-size: .68rem;
          color:#fff;
          font-weight: bold;
          border: 1px solid $text-color;
          background-color: $text-color;
          border-radius: 4px;
          padding: 4px 15px 2px;
          margin: 0 10px 0 0;
          display: inline-block;
        }
        >span:last-child{
          //
          font-size: 1.125rem;
          font-weight: bold;
          display: inline-block;
          line-height: 24px;
          position: relative;
          top: 2px;
          color: $alert-text-color;
          // whitespace: nowrap;
        }
      }
      .second{
        //
        white-space: nowrap;
        margin-bottom: 15px;
        .title{
          //
          font-size: .68rem;
          color: $text-color;
          font-weight: bold;
          border: 1px solid $text-color;
          border-radius: 4px;
          padding: 4px 15px 2px;
          margin: 0 10px 0 0;
          display: inline-block;
        }
        >span:last-child{
          //
          font-size: .875rem;
          font-weight: bold;
          display: inline-block;
          line-height: 24px;
          position: relative;
          top: 2px;
        }
      }
      .original{
        text-align: right;
        font-size: .625rem;
        margin-top: 4px;
        margin-bottom: 0;
        a{
          color: $text-color;
        }
      }
      .assort{
        font-size: $fs12;
        font-weight: bold;
        color: $green-alt ;
        line-height: 1;
        margin-top: 28px;
      }
      .h2{
        margin-top: 0;
        margin-bottom: 15px;
        font-size: 1.125rem;
        font-weight: bold;
      }
      .operation{
        font-size: $fs12;
        line-height: 1.5;
      }
      .req_title{
        font-weight: bold;
        font-size: .81rem;
        margin-bottom: 2px;
      }
      .req_list{
        font-size: $fs12;
        margin-bottom: 10px;
      }
      .btnWrapper{
        text-align: center;
        margin-bottom: 32px;
        a{
          display: inline-block;
          font-size: 1.25rem;
          font-weight: bold;
          height: 50px;
          line-height: 46px;
          padding: 2px 32px 0;
          border-radius: 25px;
          border: 2px solid $primary-color;

          &.btn-outline-primary{
            color:$primary-color;
            margin-right: 10px;
          }
          &.btn-primary{
            color: #fff;
          }
        }
      }
    }
  }
}
//OS別のCSSハック
.Android{
  .itemlist #items .item .btnWrapper a{
    line-height: 40px;
  }
}
</style>
<script>
export default {
  name: 'ItemlistSP',
  components: {
  },
  filters:{
    assort_name: function(value) {
      switch (value) {
        case 1:
          return '介護付き有料老人ホーム'
        case 2:
          return '住宅型有料老人ホーム'
        case 3:
          return '健康型有料老人ホーム'
        case 4:
          return 'サービス付き高齢者向け住宅'
        case 5:
          return '高齢者向け住宅'
        case 6:
          return 'シニア向け分譲マンション'
        case 7:
          return 'グループホーム'
        case 8:
          return 'ケアハウス'
        case 9:
          return '特別養護老人ホーム'
        case 10:
          return '老人保健施設'
        case 11:
          return '介護療養型医療施設'
        case 12:
          return 'その他高齢者向け住宅'
      }
    },
    domain: function(value){
      var temp =[]
      temp = value.split("/")
      var val = temp[0]+'//'+temp[2]+'/'
      return val
    },
    domain_name: function(value){
      var temp =[]
      temp = value.split("/")
      if(temp[2]=='kaigo.homes.co.jp'){
        return 'LIFULL介護'
      }else if(temp[2]=='www.minnanokaigo.com'){
        return 'みんなの介護'
      }else if(temp[2]=='sumai.panasonic.jp'){
        return 'パナソニックのエイジフリー'
      }else if(temp[2]=='www.wam.go.jp'){
        return 'WAM NET'
      }else if(temp[2]=='ansinkaigo.jp'){
        return '安心介護'
      }else if(temp[2]=='kaigo.news-postseven.com'){
        return '介護ポストセブン'
      }else if(temp[2]=='www.irs.jp'){
        return 'イリーゼ'
      }else if(temp[2]=='info.ninchisho.net'){
        return '認知症ねっと'
      }else if(temp[2]=='www.senior-anshin.com'){
        return 'シニアのあんしん相談室'
      }else if(temp[2]=='www.kaigokensaku.mhlw.go.jp'){
        return '厚生労働省 介護事業所・生活関連情報検索'
      }else{
        return '不明'
      }
    },
    nyoro:function(){
      return '円〜'
    },
    //1や0を○や×に変える
    iconBoolean:function(val){
      var str = val.toString();
      if(
        str == '2'||
        str == 2
      ){
        return '◎'
      }else if(
        str == '1'||
        str == 1
      ){
        return '○'
      }else if(
        str == '0'||
        str == 0
      ){
        return '×'
      }else if(
        str == '0.5'||
        str == 0.5
      ){
        return '△'
      }else{
        return 'ー'
      }
    },
    param_encode:function(value){
      var split = value.split('?')
      // var regexp = split[1].replace(/\//g, '&#47;');
      var temp_1 = encodeURIComponent(split[1])
      var temp_2 = temp_1.replace(/%3D/g,'=')
      var split_1 = temp_2.replace(/%26/g,'&')
      var join = split[0]+'?'+split_1
      return join
    }
  },
  data () {
    return {
    }
  },
  computed:{
  },
  created: function() {
    var self = this
    self.getQuery();
    var param = '&p=1'
    if(location.search != ''){
      self.getParam();
    }else{
      self.$store.dispatch('changeQuery',param)
    }
    self.getJSON();
  },
  mounted: function(){
  },
  methods:{
    getQuery: function(){
      var self = this
      self.$store.dispatch('getQuery')
    },
    getJSON: function(){
      var self =this
      self.$store.dispatch('getJSON')
    },
    //パラメータをgetJSONに使う
    getParam: function(){
      var self = this
      self.$store.dispatch('getParam')
    },
    changeRange(range){
      var self = this
      self.$store.dispatch('changeRange',range)
    },
    updateStoreSelectId: function(_id) {
      var self = this;
      self.$store.commit('updateStoreSelectId', {
          id   : _id,
      })
    },
    digit3(num) {
      if(num !== null) {
        return String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
      }
    },
  },
}
</script>
