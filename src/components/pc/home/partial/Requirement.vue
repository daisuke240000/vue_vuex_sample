<template lang="pug">
  .requirement
    button.div(type="button" v-on:click="openModal()")
      i.fas.fa-file-alt.fa-4x.fa-fw
      span.small.font-weight-bold 入居条件から探す
    transition(name="modal" appear="" v-on:click="closeModal" v-if="modal")
      .modal.modal-overlay(v-on:click.self="closeModal(); updateStoreRequirement(requirements)")
        .modal-window
          #mRequirement.dialog(role="dialog" aria-label="入居条件モーダル")
            form(method="get" action="")
              h3 入居条件から施設を探す
              p 以下の条件からお選び下さい。
              .flex
                .ul(v-model="requirements")
                  .li.form-check.form-check-inline.radioCheckWrapper(v-for="(item, index) in getRequirement")
                    input.form-check-input(type="checkbox" v-on:click="setChecked('checked',$event);" v-bind:checked="defChecked(item)" v-bind:value="item.id" :id="'id'+item.id")
                    label.form-check-label(:for="'id'+item.id") {{item.name}}
              .primaryWrapper
                button.mt40.btn-primary(type="button" v-on:click.self="closeModal(); updateStoreRequirement(requirements); getQuery()") 設定を保存する
              .btnWrapper
                button.Cancel(type="button" tabindex="1")
                  img(src="@/assets/img/close_btn.svg" v-on:click.self="closeModal(); updateStoreRequirement(requirements); getQuery()")
</template>
<script>

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
  created:function(){
    var self = this
    if (self.$store.state.requirement.length > 1) {
      self.$data.requirements = self.$store.state.requirement
    }else{
      self.$data.requirements = self.$store.state.requirementJSON
    }
  },
  methods:{
    openModal(){
      this.modal = true
    },
    closeModal(){
      this.modal = false
      //親要素にも伝達する
      //this.$emit('child-event', this.requirements);
    },
    //状態を保持する
    setChecked: function(checked, event) {
      var self = this;
      for(var i in self.requirements) {
        if(self.requirements[i]['id'] == event.target.value) {
          if(event.target.checked == true) {
            self.requirements[i][checked] = 1;
          }else{
            self.requirements[i][checked] = 0;
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
    updateStoreRequirement: function(_requirements){
      this.$store.commit('updateStoreRequirement',_requirements)
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
</style>
