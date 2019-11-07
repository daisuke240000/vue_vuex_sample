<template>
  <div class="medical">
    <button
      class="div"
      type="button"
      @click="openModal();"
    >
      <i class="fas fa-hospital-alt fa-fw fa-55px" /><br>
      <span class="small font-weight-bold">看護・医療体制から探す</span>
    </button>
    <transition
      v-if="modal"
      name="modal"
      appear
      @click="closeModal"
    >
      <div
        class="modal modal-overlay"
        @click.self="closeModal(); updateStoreMedical(selectMedical); getQuery()"
      >
        <div class="modal-window">
          <div
            id="mMedical"
            class="dialog"
            role="dialog"
            aria-label="入居条件モーダル"
          >
            <form
              method="get"
              action=""
            >
              <h3>看護・医療体制から探す</h3>
              <div class="ul">
                <div
                  v-for="(item, index) in getMedical"
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
                </div>
              </div>
              <div class="primaryWrapper">
                <button
                  type="button"
                  class="btn-primary"
                  @click="closeModal(); updateStoreMedical(selectMedical); getQuery()"
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
                    @click.self="closeModal(); updateStoreMedical(selectMedical); getQuery()"
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

.medical{
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
import medical from '@/assets/json/medical.json'
import $ from 'jquery'
export default {
  data () {
    return {
      modal: false,
      medical: medical,
      selectMedical:{},
    }
  },
  computed: {
    getMedical: {
      get: function () {
        var self = this;
        return self.medical;
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
    updateStoreMedical: function(_selectMedical){
      this.$store.commit('updateStoreMedical',_selectMedical)
    },
    //状態を配列に格納する
    setChecked: function(checked, event) {
      var self = this;
      for(var i in self.medical) {
        if(self.medical[i]['id'] == event.target.value) {
          if(event.target.checked == true) {
            self.medical[i][checked] = 1;
          }else{
            self.medical[i][checked] = 0;
          }
        }
      }
    },
    //選んだやつをdataにいれる
    select: function () {
      var self = this;
      var temp_data = []
      self.selectMedical = '';
      for(var i in self.medical) {
        if(self.medical[i]["checked"]==1){
          temp_data.push(self.medical[i]);
        }
      }
      self.selectMedical = temp_data
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
