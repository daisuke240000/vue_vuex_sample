<template lang="pug">
  .itemlist
    p.total {{all_amount}}件中{{display_amount}}件を表示
</template>
<style lang="scss" scoped>
@import '@/scss/pc/base.scss';
.itemlist{
  .total{
    margin-bottom: 0px;
  }
}
</style>
<script>
export default {
  name: 'Totalcount',
  data () {
    return {
    }
  },
  computed:{
    display_amount(){
      var self = this;
      if(self.$store.state.count == 0){
        return '0'
      }else if(self.$store.state.count < 20){
        return '1〜'+self.$store.state.count
      }else{
        return self.$store.state.range;
      }
    },
    all_amount(){
      var self =this;
      return self.$store.state.count;
    }
  },
}
</script>
