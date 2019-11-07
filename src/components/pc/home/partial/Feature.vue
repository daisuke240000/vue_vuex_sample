<template lang="pug">
  .feature
    button.div(type="button" v-on:click="openModal()")
      i.fas.fa-star.fa-4x.fa-fw
      br
      span.small.font-weight-bold 特徴から探す
    transition(name="modal" appear="" v-on:click="closeModal" v-if="modal")
      .modal.modal-overlay(v-on:click.self="closeModal(); updateStoreFeature(features)")
        .modal-window
          #mFeature.dialog(role="dialog" aria-label="特徴モーダル")
            form(method="get" action="")
              h3 特徴から施設を探す
              p 以下の条件からお選び下さい。
              .flex
                .ul(v-model="features")
                  .li.form-check.form-check-inline.radioCheckWrapper(v-for="(item, index) in getFeature")
                    input.form-check-input(type="checkbox" v-on:click="setChecked('checked',$event);" v-bind:checked="defChecked(item)" v-bind:value="item.id" :id="'id'+item.id")
                    label.form-check-label(:for="'id'+item.id") {{item.name}}
              .primaryWrapper
                button.mt40.btn-primary(type="button" v-on:click="closeModal(); updateStoreFeature(features); getQuery()") 設定を保存する
              .btnWrapper
                button.Cancel(type="button" tabindex="1")
                  img(src="@/assets/img/close_btn.svg" v-on:click.self="closeModal(); updateStoreFeature(features); getQuery()")
</template>
<script>

export default {
  data () {
    return {
      modal: false,
      features: [],
    }
  },
  computed: {
    getFeature: {
      get: function () {
        var self = this;
        return self.features;
      },
    },
  },
  created:function(){
    var self = this
    if (self.$store.state.feature.length > 1) {
      self.$data.features = self.$store.state.feature
    }else{
      self.$data.features = self.$store.state.featureJSON
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
      for(var i in self.features) {
        if(self.features[i]['id'] == event.target.value) {
          if(event.target.checked == true) {
            self.features[i][checked] = 1;
          }else{
            self.features[i][checked] = 0;
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
    updateStoreFeature: function(_features){
      this.$store.commit('updateStoreFeature',_features)
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
// .dialog .ul .li{ width: 205px;}
.dialog .ul .li{ width: 260px;}
</style>
