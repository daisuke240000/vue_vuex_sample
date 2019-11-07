<template>
  <div class="requirement">
    <button
      class="div"
      type="button"
      @click="openModal();"
    >
      <i class="fas fa-file-alt fa-fw fa-55px" />
      <span class="small font-weight-bold">入居条件から探す</span>
    </button>
    <transition
      v-if="modal"
      name="modal"
      appear
      @click="closeModal"
    >
      <div
        class="modal modal-overlay"
        @click.self="closeModal(); updateStoreRequirement(requirements); getQuery()"
      >
        <div class="modal-window">
          <div
            id="mRequirement"
            class="dialog"
            role="dialog"
            aria-label="入居条件モーダル"
          >
            <form
              method="get"
              action=""
            >
              <h3>入居条件から探す</h3>
              <div class="ul">
                <div
                  v-for="(item, index) in getRequirement"
                  :key="index"
                  class="li form-check form-check-inline radioCheckWrapper"
                >
                  <input
                    :id="'id'+item.id"
                    type="checkbox"
                    :checked="defChecked(item)"
                    :value="item.id"
                    class="form-check-input"
                    @click="setChecked('checked',$event);"
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
                  @click="closeModal(); updateStoreRequirement(requirements); getQuery()"
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
                    @click.self="closeModal(); updateStoreRequirement(requirements); getQuery()"
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
.requirement{
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
import $ from 'jquery'
export default {
  data () {
    return {
      modal: false,
      requirements: [],
    }
  },
  computed: {
    getRequirement: {
      get: function () {
        var self = this;
        return self.requirements;
      },
    },
  },
  created: function() {
    var self = this
    //入居条件
    if (self.$store.state.requirement.length > 1) {
      self.$data.requirements = self.$store.state.requirement
    }else{
      self.$data.requirements = self.$store.state.requirementJSON
    }
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
    updateStoreRequirement: function(_requirements){
      this.$store.commit('updateStoreRequirement',_requirements)
    },
    //状態を配列に格納する
    setChecked: function(checked, event) {
      var self = this;
      for(var i in self.requirements) {
        if(self.requirements[i]['id'] == event.target.value) {
          if(event.target.checked == true) {
            self.requirements[i][checked] = 1;
          }else{
            self.requirements[i][checked] = 0;
          }
        }
      }
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
