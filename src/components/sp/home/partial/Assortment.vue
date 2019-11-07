<template>
  <div class="assortment">
    <button
      class="div"
      type="button"
      @click="openModal();"
    >
      <i class="fas fa-warehouse fa-fw fa-55px" />
      <span class="small font-weight-bold">施設種別から探す</span>
    </button>
    <transition
      v-if="modal"
      name="modal"
      appear
      @click="closeModal"
    >
      <div
        class="modal modal-overlay"
        @click.self="closeModal(); updateStoreAssortment(selectAssortment); getQuery()"
      >
        <div class="modal-window">
          <div
            id="mAssortment"
            class="dialog"
            role="dialog"
            aria-label="入居条件モーダル"
          >
            <form
              method="get"
              action=""
            >
              <h3>施設種別から探す</h3>
              <ul class="ul">
                <li
                  v-for="(item, index) in getAssortment"
                  :key="index"
                  class="li form-check form-check-inline radioCheckWrapper"
                >
                  <input
                    :id="'id'+item.id"
                    type="checkbox"
                    :checked="defChecked(item)"
                    :value="item.id"
                    class="form-check-input"
                    @click="setChecked('checked',$event); select(item.name)"
                  >
                  <label
                    class="form-check-label"
                    :for="'id'+item.id"
                  >{{ item.name }}</label>
                </li>
              </ul>
              <div class="primaryWrapper">
                <button
                  type="button"
                  class="btn-primary"
                  @click="closeModal(); updateStoreAssortment(selectAssortment); getQuery()"
                >
                  検索条件を保存
                </button>
              </div>
              <div class="btnWrapper">
                <button
                  class="Cancel"
                  type="button"
                  tabindex="1"
                >
                  <img
                    src="@/assets/img/close_btn-green.svg"
                    @click.self="closeModal(); updateStoreAssortment(selectAssortment); getQuery()"
                  >
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<style lang="scss" scoped>
@import '@/scss/variable.scss';
@import '@/scss/sp/VueModal.scss';

.assortment{
  width:50%;
  .fa-55px{
    font-size: 55px;
  }
  span{
    display:block;
    margin-top: 3.8vw;
    font-size: 3.8vw;
  }
}


</style>
<script>
import assortment from '@/assets/json/assortment.json'
import $ from 'jquery'
export default {
  data () {
    return {
      modal: false,
      assortment: assortment,
      selectAssortment:{},
    }
  },
  computed: {
    getAssortment: {
      get: function () {
        var self = this;
        return self.assortment;
      },
    },
  },
  methods:{
    openModal(){
      this.modal = true
      $('body').css('position','fixed')
    },
    closeModal(){
      this.modal = false
      $('body').css('position','static')
    },
    updateStoreAssortment: function(_selectAssortment){
      this.$store.commit('updateStoreAssortment',_selectAssortment)
    },
    //状態を配列に格納する
    setChecked: function(checked, event) {
      var self = this;
      for(var i in self.assortment) {
        if(self.assortment[i]['id'] == event.target.value) {
          if(event.target.checked == true) {
            self.assortment[i][checked] = 1;
          }else{
            self.assortment[i][checked] = 0;
          }
        }
      }
    },
    //選んだやつをdataにいれる
    select: function () {
      var self = this;
      var temp_data = []
      self.selectAssortment = '';
      for(var i in self.assortment) {
        if(self.assortment[i]["checked"]==1){
          temp_data.push(self.assortment[i]);
        }
      }
      self.selectAssortment = temp_data
    },
    //チェックボックスの値を呼び出して保持する
    defChecked: function (item){
      if(item.checked == 1){
        return true;
      }else{
        return false;
      }
    },
    getQuery: function(){
      var self = this
      self.$store.dispatch('getQuery')
    },
  },
}
</script>
