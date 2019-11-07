<template>
  <div class="detail">
    <div id="items"><!--sample-->
      <div class="inner">
        <breadcrumb />
        <div class="item_wrapper">
          <h2 class="h2">
            {{ item['name'] }}
          </h2>
          <div class="flex">
            <div class="left">
              <p class="assort">
                {{ item['assortment'] | assort_name }}
              </p>
              <div class="info">
                <div class="first">
                  <div>
                    <span class="title">あれ</span>
                    <span class="price">{{ item['min_deposit'] | yen }}<span class="black">{{ item['min_deposit'] | nyoro }}</span>{{ item['max_deposit'] | yen }}<span class="black">円</span></span>
                  </div>
                  <div>
                    <span class="title">あれ</span>
                    <span class="price">{{ item['min_amount']| yen }}<span class="black">{{ item['min_amount'] | nyoro }}</span>{{ item['max_amount'] | yen }}<span class="black">円</span></span>
                  </div>
                </div>
                <div class="second">
                  <div class="address_wrapper">
                    <span class="title">あれ</span><span class="address">{{ item['address'] }}</span>
                  </div>
                  <div class="access_wrapper">
                    <span class="title">あれ</span><span class="access_info">{{ item['access_info'] }}</span>
                  </div>
                </div>
              </div>
              <div class="btnWrapper">
                <p class="operation">
                  あれ：<span>{{ item['corporation'] }}</span><br>
                  出所：あれ
                </p>
              </div>
            </div>
            <div class="imgWrapper">
              <div
                :id="item['facilities_id'] | background_num"
                class="itemThumb"
              />
            </div>
          </div>
          <div class="specTable">
            <table
              v-if="conditionCount > 0"
              class="tableContent"
            >
              <tr>
                <th colspan="2">
                  入居条件
                </th>
              </tr>
              <tr v-if="item['condition_1']==1">
                <td>自立</td><td :class="imgBoolean(item['condition_1'])">
                  {{ item['condition_1'] }}
                </td>
              </tr>
              <tr v-if="item['condition_2']==1">
                <td>要支援1</td><td :class="imgBoolean(item['condition_2'])">
                  {{ item['condition_2'] }}
                </td>
              </tr>
              <tr v-if="item['condition_3']==1">
                <td>要支援2</td><td :class="imgBoolean(item['condition_3'])">
                  {{ item['condition_3'] }}
                </td>
              </tr>
              <tr v-if="item['condition_4']==1">
                <td>要介護1</td><td :class="imgBoolean(item['condition_4'])">
                  {{ item['condition_4'] }}
                </td>
              </tr>
              <tr v-if="item['condition_5']==1">
                <td>要介護2</td><td :class="imgBoolean(item['condition_5'])">
                  {{ item['condition_5'] }}
                </td>
              </tr>
              <tr v-if="item['condition_6']==1">
                <td>要介護3</td><td :class="imgBoolean(item['condition_6'])">
                  {{ item['condition_6'] }}
                </td>
              </tr>
              <tr v-if="item['condition_7']==1">
                <td>要介護4</td><td :class="imgBoolean(item['condition_7'])">
                  {{ item['condition_7'] }}
                </td>
              </tr>
              <tr v-if="item['condition_8']==1">
                <td>要介護5</td><td :class="imgBoolean(item['condition_8'])">
                  {{ item['condition_8'] }}
                </td>
              </tr>
              <tr v-if="item['condition_9']==1">
                <td>認知症</td><td :class="imgBoolean(item['condition_9'])">
                  {{ item['condition_9'] }}
                </td>
              </tr>
              <tr v-if="item['condition_10']==1">
                <td>認知症重度</td><td :class="imgBoolean(item['condition_10'])">
                  {{ item['condition_10'] }}
                </td>
              </tr>
              <tr v-if="item['condition_11']==1">
                <td>生活保護</td><td :class="imgBoolean(item['condition_11'])">
                  {{ item['condition_11'] }}
                </td>
              </tr>
              <tr v-if="item['condition_12']==1">
                <td>身元保証人なし</td><td :class="imgBoolean(item['condition_12'])">
                  {{ item['condition_12'] }}
                </td>
              </tr>
              <tr v-if="item['condition_13']==1">
                <td>入居年齢相談</td><td :class="imgBoolean(item['condition_13'])">
                  {{ item['condition_13'] }}
                </td>
              </tr>
            </table>
            <table
              v-if="medicalCount > 0"
              class="tableContent"
            >
              <tr>
                <th colspan="2">
                  看護・医療体制
                </th>
              </tr>
              <tr v-if="item['medical_1']==1">
                <td>アルツハイマー型認知症</td><td :class="imgBoolean(item['medical_1'])">
                  {{ item['medical_1'] }}
                </td>
              </tr>
              <tr v-if="item['medical_2']==1">
                <td>レビー小体型認知症</td><td :class="imgBoolean(item['medical_2'])">
                  {{ item['medical_2'] }}
                </td>
              </tr>
              <tr v-if="item['medical_3']==1">
                <td>脳血管性認知症</td><td :class="imgBoolean(item['medical_3'])">
                  {{ item['medical_3'] }}
                </td>
              </tr>
              <tr v-if="item['medical_4']==1">
                <td>前頭側頭型認知症・ピック病</td><td :class="imgBoolean(item['medical_4'])">
                  {{ item['medical_4'] }}
                </td>
              </tr>
              <tr v-if="item['medical_5']==1">
                <td>人工透析</td><td :class="imgBoolean(item['medical_5'])">
                  {{ item['medical_5'] }}
                </td>
              </tr>
              <tr v-if="item['medical_6']==1">
                <td>糖尿病・インスリン</td><td :class="imgBoolean(item['medical_6'])">
                  {{ item['medical_6'] }}
                </td>
              </tr>
              <tr v-if="item['medical_7']==1">
                <td>胃ろう</td><td :class="imgBoolean(item['medical_7'])">
                  {{ item['medical_7'] }}
                </td>
              </tr>
              <tr v-if="item['medical_8']==1">
                <td>リハビリ</td><td :class="imgBoolean(item['medical_8'])">
                  {{ item['medical_8'] }}
                </td>
              </tr>
              <tr v-if="item['medical_9']==1">
                <td>たん吸引</td><td :class="imgBoolean(item['medical_9'])">
                  {{ item['medical_9'] }}
                </td>
              </tr>
              <tr v-if="item['medical_10']==1">
                <td>中心静脈栄養（IVH）</td><td :class="imgBoolean(item['medical_10'])">
                  {{ item['medical_10'] }}
                </td>
              </tr>
              <tr v-if="item['medical_11']==1">
                <td>鼻腔・経管栄養</td><td :class="imgBoolean(item['medical_11'])">
                  {{ item['medical_11'] }}
                </td>
              </tr>
              <tr v-if="item['medical_12']==1">
                <td>在宅酸素療法</td><td :class="imgBoolean(item['medical_12'])">
                  {{ item['medical_12'] }}
                </td>
              </tr>
              <tr v-if="item['medical_13']==1">
                <td>カテーテル・尿バルーン</td><td :class="imgBoolean(item['medical_13'])">
                  {{ item['medical_13'] }}
                </td>
              </tr>
              <tr v-if="item['medical_14']==1">
                <td>ストーマ・人工肛門</td><td :class="imgBoolean(item['medical_14'])">
                  {{ item['medical_14'] }}
                </td>
              </tr>
              <tr v-if="item['medical_15']==1">
                <td>人工呼吸器</td><td :class="imgBoolean(item['medical_15'])">
                  {{ item['medical_15'] }}
                </td>
              </tr>
              <tr v-if="item['medical_16']==1">
                <td>流動食・嚥下食</td><td :class="imgBoolean(item['medical_16'])">
                  {{ item['medical_16'] }}
                </td>
              </tr>
              <tr v-if="item['medical_17']==1">
                <td>介護食</td><td :class="imgBoolean(item['medical_17'])">
                  {{ item['medical_17'] }}
                </td>
              </tr>
              <tr v-if="item['medical_18']==1">
                <td>気管切開</td><td :class="imgBoolean(item['medical_18'])">
                  {{ item['medical_18'] }}
                </td>
              </tr>
              <tr v-if="item['medical_19']==1">
                <td>ペースメーカー</td><td :class="imgBoolean(item['medical_19'])">
                  {{ item['medical_19'] }}
                </td>
              </tr>
              <tr v-if="item['medical_20']==1">
                <td>がん・末期癌</td><td :class="imgBoolean(item['medical_20'])">
                  {{ item['medical_20'] }}
                </td>
              </tr>
              <tr v-if="item['medical_21']==1">
                <td>パーキンソン病</td><td :class="imgBoolean(item['medical_21'])">
                  {{ item['medical_21'] }}
                </td>
              </tr>
              <tr v-if="item['medical_22']==1">
                <td>統合失調症</td><td :class="imgBoolean(item['medical_22'])">
                  {{ item['medical_22'] }}
                </td>
              </tr>
              <tr v-if="item['medical_23']==1">
                <td>うつ・鬱病</td><td :class="imgBoolean(item['medical_23'])">
                  {{ item['medical_23'] }}
                </td>
              </tr>
              <tr v-if="item['medical_24']==1">
                <td>筋萎縮性側索硬化症（ALS）</td><td :class="imgBoolean(item['medical_24'])">
                  {{ item['medical_24'] }}
                </td>
              </tr>
              <tr v-if="item['medical_25']==1">
                <td>脳梗塞・脳卒中・クモ膜下出血</td><td :class="imgBoolean(item['medical_25'])">
                  {{ item['medical_25'] }}
                </td>
              </tr>
              <tr v-if="item['medical_26']==1">
                <td>心筋梗塞・心臓病・狭心症</td><td :class="imgBoolean(item['medical_26'])">
                  {{ item['medical_26'] }}
                </td>
              </tr>
              <tr v-if="item['medical_27']==1">
                <td>肝炎</td><td :class="imgBoolean(item['medical_27'])">
                  {{ item['medical_27'] }}
                </td>
              </tr>
              <tr v-if="item['medical_28']==1">
                <td>骨折・骨粗しょう症</td><td :class="imgBoolean(item['medical_28'])">
                  {{ item['medical_28'] }}
                </td>
              </tr>
              <tr v-if="item['medical_29']==1">
                <td>リウマチ・関節症</td><td :class="imgBoolean(item['medical_29'])">
                  {{ item['medical_29'] }}
                </td>
              </tr>
              <tr v-if="item['medical_30']==1">
                <td>喘息・気管支炎</td><td :class="imgBoolean(item['medical_30'])">
                  {{ item['medical_30'] }}
                </td>
              </tr>
              <tr v-if="item['medical_31']==1">
                <td>誤嚥性肺炎</td><td :class="imgBoolean(item['medical_31'])">
                  {{ item['medical_31'] }}
                </td>
              </tr>
              <tr v-if="item['medical_32']==1">
                <td>結核</td><td :class="imgBoolean(item['medical_32'])">
                  {{ item['medical_32'] }}
                </td>
              </tr>
              <tr v-if="item['medical_33']==1">
                <td>梅毒（ばいどく）</td><td :class="imgBoolean(item['medical_33'])">
                  {{ item['medical_33'] }}
                </td>
              </tr>
              <tr v-if="item['medical_34']==1">
                <td>ブドウ球菌感染症（MRSA）</td><td :class="imgBoolean(item['medical_34'])">
                  {{ item['medical_34'] }}
                </td>
              </tr>
              <tr v-if="item['medical_35']==1">
                <td>ヒト免疫不全ウイルス感染症（HIV）</td><td :class="imgBoolean(item['medical_35'])">
                  {{ item['medical_35'] }}
                </td>
              </tr>
              <tr v-if="item['medical_36']==1">
                <td>褥瘡・床ずれ</td><td :class="imgBoolean(item['medical_36'])">
                  {{ item['medical_36'] }}
                </td>
              </tr>
              <tr v-if="item['medical_37']==1">
                <td>疥癬（かいせん）</td><td :class="imgBoolean(item['medical_37'])">
                  {{ item['medical_37'] }}
                </td>
              </tr>
              <tr v-if="item['medical_38']==1">
                <td>廃用症候群・生活不活発病</td><td :class="imgBoolean(item['medical_38'])">
                  {{ item['medical_38'] }}
                </td>
              </tr>
            </table>
            <table
              v-if="featureCount > 0"
              class="tableContent"
            >
              <tr>
                <th colspan="2">
                  特徴
                </th>
              </tr>
              <tr v-if="item['feature_1']==1">
                <td>高級・プレミアム</td><td :class="imgBoolean(item['feature_1'])">
                  {{ item['feature_1'] }}
                </td>
              </tr>
              <tr v-if="item['feature_2']==1">
                <td>安い・低価格</td><td :class="imgBoolean(item['feature_2'])">
                  {{ item['feature_2'] }}
                </td>
              </tr>
              <tr v-if="item['feature_3']==1">
                <td>即入居可・空室あり</td><td :class="imgBoolean(item['feature_3'])">
                  {{ item['feature_3'] }}
                </td>
              </tr>
              <tr v-if="item['feature_4']==1">
                <td>夫婦入居可・2人部屋あり</td><td :class="imgBoolean(item['feature_4'])">
                  {{ item['feature_4'] }}
                </td>
              </tr>
              <tr v-if="item['feature_5']==1">
                <td>新規オープン</td><td :class="imgBoolean(item['feature_5'])">
                  {{ item['feature_5'] }}
                </td>
              </tr>
              <tr v-if="item['feature_6']==1">
                <td>入居一時金0円</td><td :class="imgBoolean(item['feature_6'])">
                  {{ item['feature_6'] }}
                </td>
              </tr>
              <tr v-if="item['feature_7']==1">
                <td>看取り・終末期・ターミナルケア対応可</td><td :class="imgBoolean(item['feature_7'])">
                  {{ item['feature_7'] }}
                </td>
              </tr>
              <tr v-if="item['feature_8']==1">
                <td>終身利用可</td><td :class="imgBoolean(item['feature_8'])">
                  {{ item['feature_8'] }}
                </td>
              </tr>
              <tr v-if="item['feature_9']==1">
                <td>レクリエーション充実</td><td :class="imgBoolean(item['feature_9'])">
                  {{ item['feature_9'] }}
                </td>
              </tr>
              <tr v-if="item['feature_10']==1">
                <td>ペット・犬・猫可</td><td :class="imgBoolean(item['feature_10'])">
                  {{ item['feature_10'] }}
                </td>
              </tr>
              <tr v-if="item['feature_11']==1">
                <td>日中看護師常駐</td><td :class="imgBoolean(item['feature_11'])">
                  {{ item['feature_11'] }}
                </td>
              </tr>
              <tr v-if="item['feature_12']==1">
                <td>24時間看護師常駐</td><td :class="imgBoolean(item['feature_12'])">
                  {{ item['feature_12'] }}
                </td>
              </tr>
              <tr v-if="item['feature_13']==1">
                <td>24時間介護士常駐</td><td :class="imgBoolean(item['feature_13'])">
                  {{ item['feature_13'] }}
                </td>
              </tr>
              <tr v-if="item['feature_14']==1">
                <td>夜間有人</td><td :class="imgBoolean(item['feature_14'])">
                  {{ item['feature_14'] }}
                </td>
              </tr>
              <tr v-if="item['feature_15']==1">
                <td>職員体制2.5：1以上</td><td :class="imgBoolean(item['feature_15'])">
                  {{ item['feature_15'] }}
                </td>
              </tr>
              <tr v-if="item['feature_16']==1">
                <td>病院・クリニック併設</td><td :class="imgBoolean(item['feature_16'])">
                  {{ item['feature_16'] }}
                </td>
              </tr>
              <tr v-if="item['feature_17']==1">
                <td>デイサービス・訪問介護併設</td><td :class="imgBoolean(item['feature_17'])">
                  {{ item['feature_17'] }}
                </td>
              </tr>
              <tr v-if="item['feature_18']==1">
                <td>訪問看護可</td><td :class="imgBoolean(item['feature_18'])">
                  {{ item['feature_18'] }}
                </td>
              </tr>
              <tr v-if="item['feature_19']==1">
                <td>ショートステイ可</td><td :class="imgBoolean(item['feature_19'])">
                  {{ item['feature_19'] }}
                </td>
              </tr>
              <tr v-if="item['feature_20']==1">
                <td>体験入居可</td><td :class="imgBoolean(item['feature_20'])">
                  {{ item['feature_20'] }}
                </td>
              </tr>
              <tr v-if="item['feature_21']==1">
                <td>個室あり</td><td :class="imgBoolean(item['feature_21'])">
                  {{ item['feature_21'] }}
                </td>
              </tr>
              <tr v-if="item['feature_22']==1">
                <td>機能訓練室・リハビリ室あり</td><td :class="imgBoolean(item['feature_22'])">
                  {{ item['feature_22'] }}
                </td>
              </tr>
              <tr v-if="item['feature_23']==1">
                <td>風呂付き居室</td><td :class="imgBoolean(item['feature_23'])">
                  {{ item['feature_23'] }}
                </td>
              </tr>
              <tr v-if="item['feature_24']==1">
                <td>キッチン付き居室</td><td :class="imgBoolean(item['feature_24'])">
                  {{ item['feature_24'] }}
                </td>
              </tr>
              <tr v-if="item['feature_25']==1">
                <td>トイレ付き居室</td><td :class="imgBoolean(item['feature_25'])">
                  {{ item['feature_25'] }}
                </td>
              </tr>
              <tr v-if="item['feature_26']==1">
                <td>介護ベッド付居室</td><td :class="imgBoolean(item['feature_26'])">
                  {{ item['feature_26'] }}
                </td>
              </tr>
              <tr v-if="item['feature_27']==1">
                <td>広い居室</td><td :class="imgBoolean(item['feature_27'])">
                  {{ item['feature_27'] }}
                </td>
              </tr>
              <tr v-if="item['feature_28']==1">
                <td>家具付き居室</td><td :class="imgBoolean(item['feature_28'])">
                  {{ item['feature_28'] }}
                </td>
              </tr>
              <tr v-if="item['feature_29']==1">
                <td>機械浴・特殊浴あり</td><td :class="imgBoolean(item['feature_29'])">
                  {{ item['feature_29'] }}
                </td>
              </tr>
              <tr v-if="item['feature_30']==1">
                <td>入浴週3回以上</td><td :class="imgBoolean(item['feature_30'])">
                  {{ item['feature_30'] }}
                </td>
              </tr>
              <tr v-if="item['feature_31']==1">
                <td>言語聴覚士（ST）</td><td :class="imgBoolean(item['feature_31'])">
                  {{ item['feature_31'] }}
                </td>
              </tr>
              <tr v-if="item['feature_32']==1">
                <td>作業療法士（OT）</td><td :class="imgBoolean(item['feature_32'])">
                  {{ item['feature_32'] }}
                </td>
              </tr>
              <tr v-if="item['feature_33']==1">
                <td>理学療法士（PT）</td><td :class="imgBoolean(item['feature_33'])">
                  {{ item['feature_33'] }}
                </td>
              </tr>
              <tr v-if="item['feature_34']==1">
                <td>口腔ケア・訪問歯科あり</td><td :class="imgBoolean(item['feature_34'])">
                  {{ item['feature_34'] }}
                </td>
              </tr>
              <tr v-if="item['feature_35']==1">
                <td>理美容サービスあり</td><td :class="imgBoolean(item['feature_35'])">
                  {{ item['feature_35'] }}
                </td>
              </tr>
              <tr v-if="item['feature_36']==1">
                <td>ナースコール・オンコールあり</td><td :class="imgBoolean(item['feature_36'])">
                  {{ item['feature_36'] }}
                </td>
              </tr>
              <tr v-if="item['feature_37']==1">
                <td>喫煙可</td><td :class="imgBoolean(item['feature_37'])">
                  {{ item['feature_37'] }}
                </td>
              </tr>
              <tr v-if="item['feature_38']==1">
                <td>禁煙</td><td :class="imgBoolean(item['feature_38'])">
                  {{ item['feature_38'] }}
                </td>
              </tr>
              <tr v-if="item['feature_39']==1">
                <td>温泉あり</td><td :class="imgBoolean(item['feature_39'])">
                  {{ item['feature_39'] }}
                </td>
              </tr>
              <tr v-if="item['feature_40']==1">
                <td>アルコール可</td><td :class="imgBoolean(item['feature_40'])">
                  {{ item['feature_40'] }}
                </td>
              </tr>
              <tr v-if="item['feature_41']==1">
                <td>カラオケあり</td><td :class="imgBoolean(item['feature_41'])">
                  {{ item['feature_41'] }}
                </td>
              </tr>
              <tr v-if="item['feature_42']==1">
                <td>園芸・庭園あり</td><td :class="imgBoolean(item['feature_42'])">
                  {{ item['feature_42'] }}
                </td>
              </tr>
              <tr v-if="item['feature_43']==1">
                <td>麻雀あり</td><td :class="imgBoolean(item['feature_43'])">
                  {{ item['feature_43'] }}
                </td>
              </tr>
              <tr v-if="item['feature_44']==1">
                <td>将棋・囲碁あり</td><td :class="imgBoolean(item['feature_44'])">
                  {{ item['feature_44'] }}
                </td>
              </tr>
              <tr v-if="item['feature_45']==1">
                <td>ネット利用可</td><td :class="imgBoolean(item['feature_45'])">
                  {{ item['feature_45'] }}
                </td>
              </tr>
              <tr v-if="item['feature_46']==1">
                <td>ゲストルームあり</td><td :class="imgBoolean(item['feature_46'])">
                  {{ item['feature_46'] }}
                </td>
              </tr>
              <tr v-if="item['feature_47']==1">
                <td>駅近・交通アクセス良好</td><td :class="imgBoolean(item['feature_47'])">
                  {{ item['feature_47'] }}
                </td>
              </tr>
            </table>
          </div>

          <div class="btnWrapper btnController">
            <a
              class="btn-outline-primary"
              @click="$router.go(-1)"
            >検索結果に戻る</a>
          </div>
        </div>
      </div>
    </div>
    <button
      id="scrolltoTop"
      class="toTop"
      @click="toTop()"
    >
      <i class="fas fa-angle-up fa-2x" />
    </button>
  </div>
</template>
<style lang="scss" scoped>
@import '@/scss/pc/base.scss';
#items{
  text-align: left;
  overflow: hidden;
  background-color: #fafafa;
  padding-bottom: 80px;
  .inner {
    margin: 0 auto;
    background-color: #fff;
    width: 1300px;
    @media screen and (max-width: 1300px) {
      width: 100%;
    }
  }
  .item_wrapper {
    position: relative;
    padding: 40px 35px;
  }
  h2{
    font-size: 1.5rem;
    font-weight: bold;
    transition: all .5s;
    color: $link-color-alt;
    position: absolute;
    top:70px;
    left:35px;
    &.active{
      font-size: 2.125rem;
    }
  }
  .btnWrapper{
    //
    margin-top: 40px;
    .btn-primary{
      //
      @include btn();
      margin-bottom: 10px;
    }
    .btn-outline-primary{
      //
      @include btn();
      background-color: #fff;
      color:$primary-color;
      border: 2px solid $primary-color;
      margin-bottom: 10px;
      &:hover{
        opacity: .75;
      }
    }
    .operation{
      //
      margin-top:20px;
      margin-bottom: 0;
      font-size: .75rem;
    }
  }
  .btnController {
    margin: 25px 0 0;
    box-shadow:0 0 0px;
    text-align: center;
    a {
      padding: 2px 0 0;
      font-size: 1rem;
    }
    .btn-outline-primary {
      display: inline-block;
      margin: 0 10px 0 0;
      &:last-of-type {
        margin-right: 0;
      }
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
        margin-bottom: 55px;
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
          width: 50%;
          float: left;
          font-size: .68rem;
          @media screen and (max-width: 768px) {
            width: 100%;
          }
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
          width: 50%;
          float: left;
          font-size: .68rem;
          @media screen and (max-width: 768px) {
            width: 100%;
          }
          >*:first-child{
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
    }
    .imgWrapper{
      //
      float: right;
      margin-top: 0px;
      transition: all .5s;
      // width:25.4%;
      width:45%;
      height: auto;
      // &.active{
      //   //
      //   margin-top: 95px;
      //   width: 70%;
      //   height: auto;
      // }
      img{
        //
        width:100%;
      }
      .itemThumb {
        width: 100%;
        // height: 130px;
        height: 100%;
        min-height: 320px;
        background-position: center center;
        background-size: cover;
      }
      .caption{
        //
        text-align: right;
        margin-top:5px;
        font-size: .75rem;
      }
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
          text-indent: -110%;
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
import $ from 'jquery'
import breadcrumb from '@/components/pc/detail/partial/BreadcrumbDetail.vue'

export default {
  name: 'DetailPC',
  components: {
    breadcrumb,
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
    yen:function(value){
      if(value != undefined){
        return value.toLocaleString()
      }
    },
    nyoro:function(){
      return '円〜'
    },
    param_encode:function(value){
      var split = value.split('?')
      var temp_1 = encodeURIComponent(split[1])
      var temp_2 = temp_1.replace(/%3D/g,'=')
      var split_1 = temp_2.replace(/%26/g,'&')
      var join = split[0]+'?'+split_1
      return join
    },
    background_num:function(value){
      var val = String(value).slice(-1);
      return 'bg_'+val
    }
  },
  data() {
    var self = this;
    return {
      id : self.$store.state.selectid.id,
      featureCount: 0,
      medicalCount: 0,
      conditionCount: 0,
    }
  },
  computed: {
    item() {
      var self = this;
      return self.$store.state.item;
    }
  },
  created:function(){
    var self = this;
    var con = 13;
    var med = 38;
    var fea = 47;
    for (  var i = 1 ;  i <= fea;  i++  ) {
      if(self.item['feature_'+i]==1){
        self.featureCount ++;
      }
    }
    for (  var j = 1 ;  j <= med;  j++  ) {
      if(self.item['medical_'+j]==1){
        self.medicalCount ++;
      }
    }
    for (  var k = 1 ;  k <= con;  k++  ) {
      if(self.item['condition_'+k]==1){
        self.conditionCount ++;
      }
    }
  },
  mounted: function(){
    $('.gray').on('click',function(){
      $(this).toggleClass('closeTable');
      $(this).prev().toggleClass('open')
    });
    document.onscroll = function() {
      scrollFunction();
    };
    function scrollFunction() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        $("#scrolltoTop").addClass('show');
      } else {
        $("#scrolltoTop").removeClass('show');
      }
      var scrollHeight = $(document).height();
      var scrollPosition = $(window).height() + $(window).scrollTop();
      if ( (scrollHeight - scrollPosition) / scrollHeight <= 0.01) {
        $("#scrolltoTop").css('bottom','140px')
      }
    }
  },
  methods:{
    updateStoreSelectId: function(_id) {
      var self = this;
      self.$store.commit('updateStoreSelectId', {
          id   : _id,
      })
    },
    imgBoolean: function(val){
      if(val != undefined){
        var str = val.toString();
      }
      if(str =='2'||str==2){return 'double'
      }else if(str=='1'||str==1){return 'true'
      }else if(str=='0'||str==0){return 'false'
      }else if(str == '0.5'||str == 0.5){return 'triangle'
      }else{return 'hyphen'}
    },
    toTop: function(){
       $("html,body").animate({scrollTop:0},"slow");
    },
  }
}
</script>
