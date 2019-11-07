<template>
  <div class="itemlist">
    <totalCount />
    <ul id="items">
      <li
        v-for="(item,key,index) in itemList"
        :key="index"
        class="open"
      >
        <div class="flex">
          <div class="left">
            <p class="assort">
              {{ item['assortment'] | assort_name }}
            </p>
            <h2 class="h2">
              {{ item['name'] }}
            </h2>
            <div class="info">
              <div class="first">
                <div>
                  <span class="title">一時金</span>
                  <span class="price">{{ digit3(item['min_deposit']) }}<span class="black">{{ item['min_deposit'] | nyoro }}</span>{{ digit3(item['max_deposit']) }}<span class="black">円</span></span>
                </div>
                <div>
                  <span class="title">月額</span>
                  <span class="price">{{ digit3(item['min_amount']) }}<span class="black">{{ item['min_amount'] | nyoro }}</span>{{ digit3(item['max_amount']) }}<span class="black">円</span></span>
                </div>
              </div>
              <div class="second">
                <div class="address_wrapper">
                  <span class="title">エリア</span><span class="address">{{ item['address'] | text18 }}</span>
                </div>
                <div class="access_wrapper">
                  <span class="title">路線</span><span class="access_info">{{ item['access_info'] | text35 }}</span>
                </div>
              </div>
            </div>
            <div class="requirement">
              <span class="title">入居条件</span>
              <span class="content">
                自立：{{ imgBoolean(item['condition_1']) }}
                /要支援1：{{ imgBoolean(item['condition_2']) }}
                /要支援2：{{ imgBoolean(item['condition_3']) }}
                /要介護1：{{ imgBoolean(item['condition_4']) }}
                /要介護2：{{ imgBoolean(item['condition_5']) }}
                /要介護3：{{ imgBoolean(item['condition_6']) }}
                /要介護4：{{ imgBoolean(item['condition_7']) }}
                /要介護5：{{ imgBoolean(item['condition_8']) }}
                /認知症：{{ imgBoolean(item['condition_9']) }}
                /認知症重度：{{ imgBoolean(item['condition_10']) }}
                /生活保護：{{ imgBoolean(item['condition_11']) }}
                /身元保証人なし：{{ imgBoolean(item['condition_12']) }}
                /入居年齢相談：{{ imgBoolean(item['condition_13']) }}
              </span>
            </div>
            <p class="operation">
              運営法人：<span>{{ item['corporation'] }}</span><br>
              出所：介護サービス情報公表システム
            </p>
            <div class="btnWrapper">
              <router-link
                :to="'/kaigo/detail/?'+item['facilities_id']"
                class="btn-outline-primary"
              >
                施設詳細を見る
              </router-link>
            </div>
          </div>
          <div class="imgWrapper">
            <div
              :id="item['facilities_id'] | background_num"
              class="itemThumb"
            />
          </div>
        </div>
      </li>
    </ul>
    <totalCount />
  </div>
</template>
<style lang="scss" scoped>
@import '@/scss/pc/base.scss';
.itemlist{
  //
  .total{
    //
    margin-bottom: 40px;
  }
  #items{
    //
    li{
      //
      border-bottom: 1px solid $border-color;
      padding: 40px 35px;
      overflow: hidden;
      position:relative;
      h2{
        font-size: 1.5rem;
        font-weight: bold;
        transition: all .5s;
        color: $link-color-alt;
        margin-bottom: 15px;
        &.active{
          font-size: 2.125rem;
        }
      }
      .flex{
        //
        display: flex;
        .left{
          //
          flex: 1;
          .assort{
            font-size: .75rem;
            margin-bottom: 10px;
            transition: all .5s;
            &.active{
              margin-bottom: 75px;
            }
          }
          .info{
            //
            width:100%;
            overflow: hidden;
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
              // width: 280px;
              width: 300px;
              float: left;
              font-size: .68rem;
              >*{
                margin-bottom: 12px;
              }
              .title{
                //
                color:#fff;
                font-weight: bold;
                border: 1px solid $text-color;
                background-color: $text-color;
                border-radius: 4px;
                padding: 4px 9px 2px;
                width:20%;
                text-align: center;
                margin: 0 10px 0 0;
                display: inline-block;
              }
            }
            .second{
              //
              // width: 280px;
              width: 300px;
              float: left;
              font-size: .68rem;
              >*{
                //
                margin-bottom: 12px;
              }
              .address_wrapper{display: flex;}
              .access_wrapper{display: flex;}
              .title{
                //
                color: $text-color;
                font-weight: bold;
                border: 1px solid $text-color;
                border-radius: 4px;
                padding: 4px 9px 2px;
                width:20%;
                height: 24px;
                margin: 0 10px 0 0;
                display: inline-block;
                text-align: center;
              }
              .address{
                display: inline-block;
                width: 75%;
                margin-top: 5px;
              }
              .access_info{
                display: inline-block;
                width: 75%;
                margin-top: 5px;
              }
            }
          }
          .requirement{
            display: flex;
            font-size: .68rem;
            .title{
              //
              color: $text-color;
              font-weight: bold;
              border: 1px solid $text-color;
              border-radius: 4px;
              padding: 4px 1px 2px;
              width:56px;
              height: 24px;
              margin: 0 10px 0 0;
              display: inline-block;
              text-align: center;
            }
            .content{
              display: inline-block;
              width: 76%;
              margin-top: 5px;
            }
          }
          .btnWrapper{
            //
            margin-top: 20px;
            .btn-primary{
              //
              @include btn();
              display:inline-block;
              @media screen and (max-width: 1299px) {
                width:150px
              }
            }
            .btn-outline-primary{
              //
              @include btn();
              display: inline-block;
              background-color: #fff;
              color:$primary-color;
              border: 2px solid $primary-color;
              margin-left: 15px;
              @media screen and (max-width: 1299px) {
                width:150px
              }
              &:hover{
                opacity: .75;
              }
            }
          }
          .operation{
            //
            margin-top:20px;
            margin-bottom: 0;
            font-size: .75rem;
          }
        }
        .imgWrapper{
          //
          float: right;
          margin-top: 0px;
          transition: all .5s;
          width: 33%;
          @media screen and (max-width: 1300px) {
            width: 200px;
          }
          height: auto;
          &.active{
            //
            margin-top: 95px;
            width: 70%;
            height: auto;
          }
          img{
            //
            width:100%;
          }
          .itemThumb {
            width: 100%;
            // height: 80%;
            min-height: 66%;
            background-position: center center;
            background-size: cover;
            background-repeat: no-repeat;
            @media screen and (max-width: 1300px) {
              // background-size: contain;
              min-height: 50%;
            }
          }
          .caption{
            //
            text-align: right;
            margin-top:5px;
            font-size: .75rem;
          }
        }
      }
      .close{
        //
        width:26px;
        height: 26px;
        position: absolute;
        z-index: 0;
        right:35px;
        top:40px;
        opacity: 0;
        transition: all .5s;
        &.active{
          opacity: 1;
        }
      }
      .specTable{
        margin-top:50px;
        display: flex;
        .tableContent{
          //
          border:1px solid $border-color;
          width:30%;
          margin-right: 5%;
          th{
            //
            height: 50px;
            vertical-align: middle;
            padding-left: 20px;
            background-color: $primary-bg-color;
            border-right:1px solid $border-color;
            border-bottom:1px solid $border-color;
          }
          td{
            //
            font-size: .75rem;
            height: 50px;
            vertical-align: middle;
            padding-left: 20px;
            border-right:1px solid $border-color;
            border-bottom:1px solid $border-color;
            &:first-child{
              width:75%;
            }
            &:last-child{
              text-align: center;
              padding-left: 0;
              text-indent: 100%;
              white-space: nowrap;
              overflow: hidden;
              &.false{
                background: url(~@/assets/img/icon_status_0.svg);
                background-position: center center;
                background-size: 24px;
                background-repeat: no-repeat;
              }
              &.true{
                background: url(~@/assets/img/icon_status_1.svg);
                background-position: center center;
                background-size: 28px;
                background-repeat: no-repeat;
              }
              &.double{
                background: url(~@/assets/img/icon_status_4.svg);
                background-position: center center;
                background-size: 28px;
                background-repeat: no-repeat;
              }
              &.triangle{
                background: url(~@/assets/img/icon_status_2.svg);
                background-position: center center;
                background-size: 28px;
                background-repeat: no-repeat;
              }
              &.hyphen{
                background: url(~@/assets/img/icon_status_3.svg);
                background-position: center center;
                background-size: 24px;
                background-repeat: no-repeat;
              }
            }
          }
          &:last-child{
            margin-right: 0;
          }
        }
      }
    }
  }
}
#bg_0{background: url('~@/assets/img/0.jpg');}
#bg_1{background: url('~@/assets/img/1.jpg');}
#bg_2{background: url('~@/assets/img/2.jpg');}
#bg_3{background: url('~@/assets/img/3.jpg');}
#bg_4{background: url('~@/assets/img/4.jpg');}
#bg_5{background: url('~@/assets/img/5.jpg');}
#bg_6{background: url('~@/assets/img/6.jpg');}
#bg_7{background: url('~@/assets/img/7.jpg');}
#bg_8{background: url('~@/assets/img/8.jpg');}
#bg_9{background: url('~@/assets/img/9.jpg');}
</style>
<script>
// import $ from 'jquery'
import totalCount from '@/components/pc/searchresult/partial/TotalCount.vue'
export default {
  name: 'ItemlistPC',
  components: {
    totalCount,
  },
  filters:{
    assort_name: function(value) {
      switch (value) {
        case 1:
          return '介護付き有料老人ホーム'
          // break;
        case 2:
          return '住宅型有料老人ホーム'
          // break;
        case 3:
          return '健康型有料老人ホーム'
          // break;
        case 4:
          return 'サービス付き高齢者向け住宅'
          // break;
        case 5:
          return '高齢者向け住宅'
          // break;
        case 6:
          return 'シニア向け分譲マンション'
          // break;
        case 7:
          return 'グループホーム'
          // break;
        case 8:
          return 'ケアハウス'
          // break;
        case 9:
          return '特別養護老人ホーム'
          // break;
        case 10:
          return '老人保健施設'
          // break;
        case 11:
          return '介護療養型医療施設'
          // break;
        case 12:
          return 'その他高齢者向け住宅'
          // break;
      }
    },
    nyoro:function(){
    // nyoro:function(value){
      // if(value > 0){
        return '円〜'
      // }else{
      //   return ''
      // }
    },
    param_encode:function(value){
      var split = value.split('?')
      // var regexp = split[1].replace(/\//g, '&#47;');
      var temp_1 = encodeURIComponent(split[1])
      var temp_2 = temp_1.replace(/%3D/g,'=')
      var split_1 = temp_2.replace(/%26/g,'&')
      var join = split[0]+'?'+split_1
      return join
    },
    text18:function(value){
      return value.substr(0,18)+'...';
    },
    text35:function(value){
      return value.substr(0,35)+'...';
    },
    background_num:function(value){
      var val = String(value).slice(-1);
      return 'bg_'+val
    }
  },
  data () {
    return {
    }
  },
  computed:{
    itemList:{
      get: function (){
        var self = this
        return self.$store.state.itemlistJSON
      },
      set: function(itemList){
        var self = this;
        self.$store.commit('updateStoreItemListJSON',itemList)
      }
    },
  },
  created: function() {
    var self = this
    //TOPで「何も操作しなかった人」のクエリを取得しておく。
    self.getQuery();
    //クエリ用に1ページ目を定義
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
    //APIサーバーから指定した値のJSONを取り出す
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
    //APIからくる0,1などの値を○×などの背景画像classにする
    imgBoolean(val){
      var str = val.toString();//★
      // var str
      if(
        str == '2'||
        str == 2
      ){
        return '◎'//二重丸
      }else if(
        str == '1'||
        str == 1
      ){
        return '○'//丸
      }else if(
        str == '0'||
        str == 0
      ){
        return '×'//バツ
      }else if(
        str == '0.5'||
        str == 0.5
      ){
        return '△'//三角
      }else{
        return '-'//ハイフン
      }
    },
    digit3(num) {
      if(num !== null) {
        return String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
      }
    },
  },
}
</script>
