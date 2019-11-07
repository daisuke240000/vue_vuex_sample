<template lang="pug">
  .container-fluid(style="max-width:1000px;")
    .row
      .col-md-4(v-for="(wpAPI,i) in wpAPIs")
        .card
          a(:href="wpAPI.link")
            .card-img-wrap
              img.card-img-top( :src="wpAPI | image" alt="Card image cap")
            .card-body.textAlignLeft
              p.card-text.font-weight-bold {{ wpAPI.title.rendered | truncate}}
              .wrapper
               a.card-link(:href="wpAPI._embedded['wp:term'][0][0]['link']") {{ wpAPI._embedded['wp:term'][0][0]['name'] | truncate2}}
              .note.small
                | {{ wpAPI.date | moment}}
</template>
<script>
import axios from 'axios'
import moment from 'moment';
export default {
  filters: {
    moment: function (date) {
      return moment(date).format('YYYY.MM.DD');
    },
    truncate: function(value) {
      var length = 30;
      var ommision = '...';
      if(value.length <= length) {
        return value;
      }else {
        return value.substring(0, length) + ommision;
      }
    },
    truncate2: function(value) {
      var length = 8;
      var ommision = '';
      if(value.length <= length) {
        return value;
      }else {
        return value.substring(0, length) + ommision;
      }
    },
    image: function(index) {
      if(index['_embedded']['wp:featuredmedia'] != undefined){
        var value = index['_embedded']['wp:featuredmedia'][0].source_url;
        return value;
      }else if(index['_embedded']['wp:featuredmedia'] == undefined){
        var value2 = index['content']['rendered'].match(/<img[^>]+>/gi);
        var url = value2[0].match(/src=["|'](.*?)["|']/)[1]
        return url;
      }else{
        return '/kaigo/common/img/noimage.png';
      }
    },
  },
  data () {
    return {
      wpAPIs: [],
      apiserver: '',
    }
  },
  created: function() {
    this.apiServer();
    this.getJSON();
  },
  methods:{
    getJSON: function(){
      axios
        .get(
          this.apiserver, {
            headers: { "Content-Type": "application/json" },
            data: {} //←これ！！！
          }
        )
        .then(response => {
          this.wpAPIs = response.data;
        })
        .catch(error => {
          // window.alert(error);
          console.log(error);
        });
    },
    apiServer: function(){
      var self = this;
      var url = location.hostname;
      if(url=='hitoshia.bla-one.net'){
        self.apiserver = 'https://hitoshia.bla-one.net/media/wp-json/wp/v2/posts?_embed&per_page=12'
      }else if(url=='hitoshia.com'){
        self.apiserver = 'https://hitoshia.com/media/wp-json/wp/v2/posts?_embed&per_page=12'
      }else if(process.env.VUE_APP_ENV=='localhost'){
        self.apiserver = 'http://localhost:8001/media/wp-json/wp/v2/posts?_embed&per_page=12'
      }else if(process.env.VUE_APP_ENV=='private'){
        self.apiserver = 'https://hitoshia.bla-one.net/media/wp-json/wp/v2/posts?_embed&per_page=12'
      }
      // console.log(self.apiserver)
    },
  },
}
</script>
<style lang='scss' scoped>
@import '@/scss/variable.scss';
p,div,li{
  color:$text-color;
}

</style>
