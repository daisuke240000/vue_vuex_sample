<template lang="pug">
  .assortment
    button.div(type="button" v-on:click="openModal()")
      i.fas.fa-warehouse.fa-4x.fa-fw
      span.small.font-weight-bold 施設種別から探す
    transition(name="modal" appear="" v-on:click="closeModal" v-if="modal")
      .modal.modal-overlay(v-on:click.self="closeModal(); updateStoreAssortment(assortments)")
        .modal-window
          #mAssortment.dialog(role="dialog" aria-label="種別モーダル")
            form(method="get" action="")
              h3 施設種別から施設を探す
              p 以下の条件からお選び下さい。
              .flex
                .ul(v-model="assortments")
                  .li.form-check.form-check-inline.radioCheckWrapper(v-for="(item, index) in getAssortment")
                    input.form-check-input(type="checkbox" v-on:click="setChecked('checked',$event);" v-bind:checked="defChecked(item)" v-bind:value="item.id" :id="'id'+item.id")
                    label.form-check-label(:for="'id'+item.id") {{item.name}}
              .primaryWrapper
                button.mt40.btn-primary(type="button" v-on:click="closeModal(); updateStoreAssortment(assortments); getQuery()") 設定を保存する
              .btnWrapper
                button.Cancel(type="button" tabindex="1")
                  img(src="@/assets/img/close_btn.svg" v-on:click.self="closeModal(); updateStoreAssortment(assortments); getQuery()")
</template>
<script>

export default {
  data () {
    return {
      modal: false,
      assortments: [],
    }
  },
  computed: {
    getAssortment: {
      get: function () {
        var self = this;
        return self.assortments;
      },
    },
  },
  created:function(){
    var self = this
    if (self.$store.state.assortment.length > 1) {
      self.$data.assortments = self.$store.state.assortment
    }else{
      self.$data.assortments = self.$store.state.assortmentJSON
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
      for(var i in self.assortments) {
        if(self.assortments[i]['id'] == event.target.value) {
          if(event.target.checked == true) {
            self.assortments[i][checked] = 1;
          }else{
            self.assortments[i][checked] = 0;
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
    updateStoreAssortment: function(_assortments){
      this.$store.commit('updateStoreAssortment',_assortments)
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
.modal .modal-window{width:1170px;}
.dialog{width:1170px;}
@media screen and (max-width:1170px) {
  .modal .modal-window{width:900px;}
  .dialog{width:900px;}
}
.dialog .ul .li{ width: 260px;}
// .dialog .ul .li{ width: 205px;}
</style>
