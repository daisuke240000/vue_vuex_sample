<template lang="pug">
  .medical
    button.div(type="button" v-on:click="openModal()")
      i.fas.fa-hospital-alt.fa-4x.fa-fw
      br
      span.small.font-weight-bold 看護・医療体制から探す
    transition(name="modal" appear="" v-on:click="closeModal" v-if="modal")
      .modal.modal-overlay(v-on:click.self="closeModal(); updateStoreMedical(medicals)")
        .modal-window
          #mMedical.dialog(role="dialog" aria-label="看護・医療体制モーダル")
            form(method="get" action="")
              h3 看護・医療体制から施設を探す
              p 以下の条件からお選び下さい。
              .flex
                .ul(v-model="medicals")
                  .li.form-check.form-check-inline.radioCheckWrapper(v-for="(item, index) in getMedical")
                    input.form-check-input(type="checkbox" v-on:click="setChecked('checked',$event);" v-bind:checked="defChecked(item)" v-bind:value="item.id" :id="'id'+item.id")
                    label.form-check-label(:for="'id'+item.id") {{item.name}}
              .primaryWrapper
                button.mt40.btn-primary(type="button" v-on:click="closeModal(); updateStoreMedical(medicals); getQuery()") 設定を保存する
              .btnWrapper
                button.Cancel(type="button" tabindex="1")
                  img(src="@/assets/img/close_btn.svg" v-on:click.self="closeModal(); updateStoreMedical(medicals); getQuery()")
</template>
<script>
export default {
  data () {
    return {
      modal: false,
      medicals: [],
    }
  },
  computed: {
    getMedical: {
      get: function () {
        var self = this;
        return self.medicals;
      },
    },
  },
  created:function(){
    var self = this
    if (self.$store.state.medical.length > 1) {
      self.$data.medicals = self.$store.state.medical
    }else{
      self.$data.medicals = self.$store.state.medicalJSON
    }
  },
  methods:{
    openModal(){
      this.modal = true
    },
    closeModal(){
      this.modal = false
    },
    setChecked: function(checked, event) {
      var self = this;
      for(var i in self.medicals) {
        if(self.medicals[i]['id'] == event.target.value) {
          if(event.target.checked == true) {
            self.medicals[i][checked] = 1;
          }else{
            self.medicals[i][checked] = 0;
          }
          break;
        }
      }
    },
    defChecked: function (item){
      if(item.checked == 1){
        return true;
      }else{
        return false;
      }
    },
    updateStoreMedical: function(_medicals){
      this.$store.commit('updateStoreMedical',_medicals)
    },
    getQuery: function(){
      var self = this
      self.$store.dispatch('getQuery')
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/scss/pc/VueModal.scss';
.modal .modal-window{width:1130px;}
.dialog{width:1130px;}
@media screen and (max-width:1130px) {
  .modal .modal-window{width:900px;}
  .dialog{width:900px;}
}
.dialog .ul .li{ width: 250px;}
</style>
