<template lang="pug">
  .home
    Header
    .sp(v-if="isMobile()")
      SpLayout
    .pc(v-else)
      PcLayout
    Footer
</template>
<script>
import Header from '@/components/common/Header.vue'
import Footer from '@/components/common/Footer.vue'
import PcLayout from '@/components/pc/searchresult/Layout.vue'
import SpLayout from '@/components/sp/searchresult/Layout.vue'

export default {
  name: 'SearchResult',
  components: {
    Header,
    Footer,
    PcLayout,
    SpLayout,
  },
  data () {
    return {
      //description:'',
      //keyword:'',
      //title:'',
      //site_url:'',
      test : 1,
      pref:'', //全国
      city:'', //空白
      assort:'',//種別
    }
  },
  head:{
    title: function () {
      var self = this
      return {
        inner: self.$store.state.title
      }
    },
    meta:function(){
      var self = this
      return[
        { name: 'description', content: self.$store.state.description },
        { name: 'keyword', content: self.$store.state.keyword },
        { property: 'og:title', content: self.$store.state.title+' | あれ' },
        { property: 'og:description', content: self.$store.state.description },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: self.$store.state.site_url },
        { property: 'og:image', content: 'https://hitoshia.com/kaigo/common/img/og.png' },
      ]
    },
  },
  created:function(){
    var self = this
    //自分の今のURLをストアに入れておく。mutation使うべきか
    self.$store.state.site_url = location.href;
    //都道府県
    var url_pref;
    if(self.$route.query.pc !== ''){
      url_pref = self.$route.query.pc
      var pref = self.$store.state.prefJSON
      var temp_pref = pref.filter(function(item){
        if (item.no == url_pref ) return true;
      })
      if(temp_pref.length > 0){
        self.pref = temp_pref[0]['name'];
      }else{
        self.pref = '全国'
      }
    }else{
      self.pref = '全国'
    }
    if(self.$store.state.p ==''){
      self.$store.commit('updateStoreP',self.pref)
    }
    //市町村
    var url_city;
    if(self.$route.query.ad !== '' && self.$route.query.ad != undefined){
      var pref_and_city = self.$route.query.ad
      //神奈川県横浜市から、神奈川県を削除する
      if(pref_and_city.match('神奈川県|和歌山県|鹿児島県')){
        pref_and_city = pref_and_city.replace('神奈川県','')
        pref_and_city = pref_and_city.replace('和歌山県','')
        pref_and_city = pref_and_city.replace('鹿児島県','')
      }else{
        //東京都練馬区から、東京都を削除する
        pref_and_city = pref_and_city.slice(3);
      }
      //横浜市、練馬区
      self.city = pref_and_city;
    }else{
      self.city = ''
    }
    if(self.$store.state.c =='' && self.city != undefined){
      self.$store.commit('updateStoreC',self.city)
    }
    //種別
    var url_as;
    var assort;
    if(self.$route.query.as !== ''){
      url_as = self.$route.query.as
      var array_as = [];
      if(url_as != undefined){
        array_as = url_as.split(',');
      }
      //施設書別の配列まるごと読み込む
      assort = self.$store.state.assortment
      //まずセレクトフォームに値を戻す
      //元々checkedが1の状態は考慮してない。
      for(var k in array_as){
        if (array_as[k]=='1' ){assort[0]['checked']=1}
        if (array_as[k]=='2' ){assort[1]['checked']=1}
        if (array_as[k]=='3' ){assort[2]['checked']=1}
        if (array_as[k]=='4' ){assort[3]['checked']=1}
        if (array_as[k]=='5' ){assort[4]['checked']=1}
        if (array_as[k]=='6' ){assort[5]['checked']=1}
        if (array_as[k]=='7' ){assort[6]['checked']=1}
        if (array_as[k]=='8' ){assort[7]['checked']=1}
        if (array_as[k]=='9' ){assort[8]['checked']=1}
        if (array_as[k]=='10' ){assort[9]['checked']=1}
        if (array_as[k]=='11' ){assort[10]['checked']=1}
        if (array_as[k]=='12' ){assort[11]['checked']=1}
      }
      //配列まるごと投げてストアをアップデートする
      self.$store.commit('updateStoreAssortment',assort)
      //タイトル用に、必要な行だけを取り出す
      var temp_as = assort.filter(function(item){
        //配列は["1",""]として2回実行されるが””にマッチするassortは存在しない
        for(var i in array_as){
          if (item.id == array_as[i] ) return true;
        }
      })
      //タイトル用に、テキストを作成（このself.assortは変数ではなく、dataにあるやつ）
      for(var j in temp_as){
        if( temp_as[j]['name'] != undefined ){
          self.assort += temp_as[j]['name']+'・';
        }
      }
      if(self.assort !=''){
        self.assort = self.assort.slice(0,-1) ;
      }
    }
    //月額利用料
    var url_mxa;
    if(self.$route.query.mxa !== ''){//からっぽだったら何もしない
      url_mxa = self.$route.query.mxa //（例）mxa=100000など
      var array_mxa = self.$store.state.subscription;//月額の配列全部
      //パラメータを見て、局所的に書き換える
      if(url_mxa =='100000'){array_mxa[1]['selected']=1;}else{array_mxa[1]['selected']=0;}
      if(url_mxa =='120000'){array_mxa[2]['selected']=1;}else{array_mxa[2]['selected']=0;}
      if(url_mxa =='140000'){array_mxa[3]['selected']=1;}else{array_mxa[3]['selected']=0;}
      if(url_mxa =='160000'){array_mxa[4]['selected']=1;}else{array_mxa[4]['selected']=0;}
      if(url_mxa =='180000'){array_mxa[5]['selected']=1;}else{array_mxa[5]['selected']=0;}
      if(url_mxa =='200000'){array_mxa[6]['selected']=1;}else{array_mxa[6]['selected']=0;}
      if(url_mxa =='220000'){array_mxa[7]['selected']=1;}else{array_mxa[7]['selected']=0;}
      if(url_mxa =='240000'){array_mxa[8]['selected']=1;}else{array_mxa[8]['selected']=0;}
      if(url_mxa =='260000'){array_mxa[9]['selected']=1;}else{array_mxa[9]['selected']=0;}
      if(url_mxa =='280000'){array_mxa[10]['selected']=1;}else{array_mxa[10]['selected']=0;}
      if(url_mxa =='300000'){array_mxa[11]['selected']=1;}else{array_mxa[11]['selected']=0;}
      if(url_mxa =='350000'){array_mxa[12]['selected']=1;}else{array_mxa[12]['selected']=0;}
      if(url_mxa =='400000'){array_mxa[13]['selected']=1;}else{array_mxa[13]['selected']=0;}
      if(url_mxa =='450000'){array_mxa[14]['selected']=1;}else{array_mxa[14]['selected']=0;}
      if(url_mxa =='9999999999'){array_mxa[15]['selected']=1;}else{array_mxa[15]['selected']=0;}
      //配列まるごと投げてストアをアップデートする
      self.$store.commit('updateStoreSubscription2',array_mxa)
    }
    //入居一時金
    var url_mxd;
    if(self.$route.query.mxd !== ''){//からっぽだったら何もしない
      url_mxd = self.$route.query.mxd //（例）mxd=500000など
      var array_mxd = self.$store.state.initialCost;//初期費用の配列全部
      //パラメータを見て、局所的に書き換える
      if(url_mxd =='0'){array_mxd[1]['selected']=1;}else{array_mxd[1]['selected']=0;}
      if(url_mxd =='500000'){array_mxd[2]['selected']=1;}else{array_mxd[2]['selected']=0;}
      if(url_mxd =='1000000'){array_mxd[3]['selected']=1;}else{array_mxd[3]['selected']=0;}
      if(url_mxd =='2000000'){array_mxd[4]['selected']=1;}else{array_mxd[4]['selected']=0;}
      if(url_mxd =='3000000'){array_mxd[5]['selected']=1;}else{array_mxd[5]['selected']=0;}
      if(url_mxd =='4000000'){array_mxd[6]['selected']=1;}else{array_mxd[6]['selected']=0;}
      if(url_mxd =='5000000'){array_mxd[7]['selected']=1;}else{array_mxd[7]['selected']=0;}
      if(url_mxd =='6000000'){array_mxd[8]['selected']=1;}else{array_mxd[8]['selected']=0;}
      if(url_mxd =='7000000'){array_mxd[9]['selected']=1;}else{array_mxd[9]['selected']=0;}
      if(url_mxd =='8000000'){array_mxd[10]['selected']=1;}else{array_mxd[10]['selected']=0;}
      if(url_mxd =='9000000'){array_mxd[11]['selected']=1;}else{array_mxd[11]['selected']=0;}
      if(url_mxd =='10000000'){array_mxd[12]['selected']=1;}else{array_mxd[12]['selected']=0;}
      if(url_mxd =='20000000'){array_mxd[13]['selected']=1;}else{array_mxd[13]['selected']=0;}
      if(url_mxd =='30000000'){array_mxd[14]['selected']=1;}else{array_mxd[14]['selected']=0;}
      if(url_mxd =='9999999999'){array_mxd[15]['selected']=1;}else{array_mxd[15]['selected']=0;}
      //配列まるごと投げてストアをアップデートする
      self.$store.commit('updateStoreInitialCost2',array_mxd)
    }
    //特徴
    //特徴まるごと配列を読み込む
    var feature =  self.$store.state.feature;
    //urlに含まれる数字を配列にいれる
    var feature_array =[]
    if(self.$route.query.f1 != undefined){feature_array.push(1);}
    if(self.$route.query.f2 != undefined){feature_array.push(2);}
    if(self.$route.query.f3 != undefined){feature_array.push(3);}
    if(self.$route.query.f4 != undefined){feature_array.push(4);}
    if(self.$route.query.f5 != undefined){feature_array.push(5);}
    if(self.$route.query.f6 != undefined){feature_array.push(6);}
    if(self.$route.query.f7 != undefined){feature_array.push(7);}
    if(self.$route.query.f8 != undefined){feature_array.push(8);}
    if(self.$route.query.f9 != undefined){feature_array.push(9);}
    if(self.$route.query.f10 != undefined){feature_array.push(10);}
    if(self.$route.query.f11 != undefined){feature_array.push(11);}
    if(self.$route.query.f12 != undefined){feature_array.push(12);}
    if(self.$route.query.f13 != undefined){feature_array.push(13);}
    if(self.$route.query.f14 != undefined){feature_array.push(14);}
    if(self.$route.query.f15 != undefined){feature_array.push(15);}
    if(self.$route.query.f16 != undefined){feature_array.push(16);}
    if(self.$route.query.f17 != undefined){feature_array.push(17);}
    if(self.$route.query.f18 != undefined){feature_array.push(18);}
    if(self.$route.query.f19 != undefined){feature_array.push(19);}
    if(self.$route.query.f20 != undefined){feature_array.push(20);}
    if(self.$route.query.f21 != undefined){feature_array.push(21);}
    if(self.$route.query.f22 != undefined){feature_array.push(22);}
    if(self.$route.query.f23 != undefined){feature_array.push(23);}
    if(self.$route.query.f24 != undefined){feature_array.push(24);}
    if(self.$route.query.f25 != undefined){feature_array.push(25);}
    if(self.$route.query.f26 != undefined){feature_array.push(26);}
    if(self.$route.query.f27 != undefined){feature_array.push(27);}
    if(self.$route.query.f28 != undefined){feature_array.push(28);}
    if(self.$route.query.f29 != undefined){feature_array.push(29);}
    if(self.$route.query.f30 != undefined){feature_array.push(30);}
    if(self.$route.query.f31 != undefined){feature_array.push(31);}
    if(self.$route.query.f32 != undefined){feature_array.push(32);}
    if(self.$route.query.f33 != undefined){feature_array.push(33);}
    if(self.$route.query.f34 != undefined){feature_array.push(34);}
    if(self.$route.query.f35 != undefined){feature_array.push(35);}
    if(self.$route.query.f36 != undefined){feature_array.push(36);}
    if(self.$route.query.f37 != undefined){feature_array.push(37);}
    if(self.$route.query.f38 != undefined){feature_array.push(38);}
    if(self.$route.query.f39 != undefined){feature_array.push(39);}
    if(self.$route.query.f40 != undefined){feature_array.push(40);}
    if(self.$route.query.f41 != undefined){feature_array.push(41);}
    if(self.$route.query.f42 != undefined){feature_array.push(42);}
    if(self.$route.query.f43 != undefined){feature_array.push(43);}
    if(self.$route.query.f44 != undefined){feature_array.push(44);}
    if(self.$route.query.f45 != undefined){feature_array.push(45);}
    if(self.$route.query.f46 != undefined){feature_array.push(46);}
    if(self.$route.query.f47 != undefined){feature_array.push(47);}
    for(var l in feature){
      for(var m in feature_array){
        if(feature[l]['id'] == feature_array[m]){
          feature[l]['checked'] = 1;
        }
      }
    }
    //配列まるごと投げてストアをアップデートする
    self.$store.commit('updateStoreFeature',feature)
    //看護・医療
    var url_m;
    //特徴まるごと配列を読み込む
    var medical =  self.$store.state.medical;
    //urlに含まれる数字を配列にいれる
    var medical_array =[]
    if(self.$route.query.m1 != undefined){medical_array.push(1);}
    if(self.$route.query.m2 != undefined){medical_array.push(2);}
    if(self.$route.query.m3 != undefined){medical_array.push(3);}
    if(self.$route.query.m4 != undefined){medical_array.push(4);}
    if(self.$route.query.m5 != undefined){medical_array.push(5);}
    if(self.$route.query.m6 != undefined){medical_array.push(6);}
    if(self.$route.query.m7 != undefined){medical_array.push(7);}
    if(self.$route.query.m8 != undefined){medical_array.push(8);}
    if(self.$route.query.m9 != undefined){medical_array.push(9);}
    if(self.$route.query.m10 != undefined){medical_array.push(10);}
    if(self.$route.query.m11 != undefined){medical_array.push(11);}
    if(self.$route.query.m12 != undefined){medical_array.push(12);}
    if(self.$route.query.m13 != undefined){medical_array.push(13);}
    if(self.$route.query.m14 != undefined){medical_array.push(14);}
    if(self.$route.query.m15 != undefined){medical_array.push(15);}
    if(self.$route.query.m16 != undefined){medical_array.push(16);}
    if(self.$route.query.m17 != undefined){medical_array.push(17);}
    if(self.$route.query.m18 != undefined){medical_array.push(18);}
    if(self.$route.query.m19 != undefined){medical_array.push(19);}
    if(self.$route.query.m20 != undefined){medical_array.push(20);}
    if(self.$route.query.m21 != undefined){medical_array.push(21);}
    if(self.$route.query.m22 != undefined){medical_array.push(22);}
    if(self.$route.query.m23 != undefined){medical_array.push(23);}
    if(self.$route.query.m24 != undefined){medical_array.push(24);}
    if(self.$route.query.m25 != undefined){medical_array.push(25);}
    if(self.$route.query.m26 != undefined){medical_array.push(26);}
    if(self.$route.query.m27 != undefined){medical_array.push(27);}
    if(self.$route.query.m28 != undefined){medical_array.push(28);}
    if(self.$route.query.m29 != undefined){medical_array.push(29);}
    if(self.$route.query.m30 != undefined){medical_array.push(30);}
    if(self.$route.query.m31 != undefined){medical_array.push(31);}
    if(self.$route.query.m32 != undefined){medical_array.push(32);}
    if(self.$route.query.m33 != undefined){medical_array.push(33);}
    if(self.$route.query.m34 != undefined){medical_array.push(34);}
    if(self.$route.query.m35 != undefined){medical_array.push(35);}
    if(self.$route.query.m36 != undefined){medical_array.push(36);}
    if(self.$route.query.m37 != undefined){medical_array.push(37);}
    if(self.$route.query.m38 != undefined){medical_array.push(38);}
    for(var n in medical){
      for(var o in medical_array){
        if(medical[n]['id'] == medical_array[o]){
          medical[n]['checked'] = 1;
        }
      }
    }
    //配列まるごと投げてストアをアップデートする
    self.$store.commit('updateStoreMedical',medical)
    //入居条件
    //入居のパラメータ「c1=1〜c13=1」
    var url_c;
    //特徴まるごと配列を読み込む
    var requirement =  self.$store.state.requirement;
    //urlに含まれる数字を配列にいれる
    var requirement_array =[];
    if(self.$route.query.c1 != undefined){requirement_array.push(1);}
    if(self.$route.query.c2 != undefined){requirement_array.push(2);}
    if(self.$route.query.c3 != undefined){requirement_array.push(3);}
    if(self.$route.query.c4 != undefined){requirement_array.push(4);}
    if(self.$route.query.c5 != undefined){requirement_array.push(5);}
    if(self.$route.query.c6 != undefined){requirement_array.push(6);}
    if(self.$route.query.c7 != undefined){requirement_array.push(7);}
    if(self.$route.query.c8 != undefined){requirement_array.push(8);}
    if(self.$route.query.c9 != undefined){requirement_array.push(9);}
    if(self.$route.query.c10 != undefined){requirement_array.push(10);}
    if(self.$route.query.c11 != undefined){requirement_array.push(11);}
    if(self.$route.query.c12 != undefined){requirement_array.push(12);}
    if(self.$route.query.c13 != undefined){requirement_array.push(13);}
    for(var p in requirement){
      for(var q in requirement_array){
        if(requirement[p]['id'] == requirement_array[q]){
          requirement[p]['checked'] = 1;
        }
      }
    }
    //配列まるごと投げてストアをアップデートする
    self.$store.commit('updateStoreRequirement',requirement)

    //タイトル変更用
    if(self.$store.state.p != '' ){
      self.$store.state.title = self.$store.state.p;
      if(self.$store.state.c != '' ){
        self.$store.state.title += self.$store.state.c;
      }
    }
        assort = '介護施設・老人ホーム'
    if(self.assort.length > 0){
        assort = self.assort
    }
    //ページ数
    if(self.$route.query.p !== '' && self.$route.query.p != undefined){
      var now = Number(self.$route.query.p)
      self.$store.commit('updateStoreNow',now)
    }else{
      self.$store.commit('updateStoreNow', 1)
    }
    //タイトル
    self.$store.state.title = '【'+self.$store.state.title+'】'
    self.$store.state.keyword = self.$store.state.title +','+ 'あれ'
    self.$store.state.description = self.$store.state.title + 'の検索結果です。あれ'
    var _now =''
    if(self.$store.state.now > 1){
      _now = self.$store.state.now + 'ページ目｜'
    }
    self.$store.state.title += assort+'の検索結果一覧｜'+ _now +'あれ';
  },
  methods: {
    isMobile() {
      if(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
      } else {
        return false
      }
    },
  },
}
</script>
