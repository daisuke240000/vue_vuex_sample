<template lang="pug">
  p.updateInfo.mb20.note.fs12
    span 掲載物件:{{ totalCount | number }}件
    span &nbsp;({{ updatedAt | moment }}更新)
</template>
<script>
import axios from 'axios'
import moment from 'moment';
export default {
  filters: {
    moment: function (date) {
      return moment(date).format('YYYY年MM月DD日');
    },
    number:function(value){
        return value.toLocaleString()
    },
  },
  data () {
    return {
      apiserver: '',
      totalCount: '',
      updatedAt: '',
    }
  },
  created: function() {
    this.apiServer();
    this.getCount();
  },
  methods:{
    apiServer: function(){
      var self = this;
      var url = location.hostname;
      if(url=='hitoshia.bla-one.net'){
        self.apiserver = 'https://api.hitoshia.bla-one.net/api/v1/facilities/count'
      }else if(url=='hitoshia.com'){
        self.apiserver = 'https://api.hitoshia.com/api/v1/facilities/count'
      }else if(process.env.VUE_APP_ENV=='localhost'){
        self.apiserver = 'http://127.0.0.1:8001/api/v1/facilities/count'
      }else if(process.env.VUE_APP_ENV=='private'){
        self.apiserver = 'https://api.hitoshia.bla-one.net/api/v1/facilities/count'
      }

    },
    getCount: function(){
      var self = this;
      axios
        .get(
          self.apiserver
        )
        .then(response => {
          self.totalCount = response.data['resource']['data']['total'];
          self.updatedAt = response.data['resource']['data']['updated_at'];
        })
        .catch(error => {
          console.log(error+'_fromUpdateInfo.vue')
        });
    },
  },
}
</script>
