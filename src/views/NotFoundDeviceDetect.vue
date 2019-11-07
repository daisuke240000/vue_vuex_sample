<template>
  <div class="notfound">
    <Header />
    <h1>404 Page Not Found</h1>
    <Footer />
  </div>
</template>
<script>
import Header from '@/components/common/Header.vue'
import Footer from '@/components/common/Footer.vue'

export default {
  name: 'NotFound',
  components: {
    Header,
    Footer,
  }
}
</script>
