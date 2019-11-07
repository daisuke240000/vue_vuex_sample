<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
//sample
import $ from 'jquery'
export default {
  data() {
    return{
    }
  },
  methods: {
  }
}
if ( navigator.userAgent.indexOf('Android') > 0 ) {
    $("body").addClass("Android");
}
</script>
