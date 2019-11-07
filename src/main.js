//sample 
import Vue from 'vue'
import App from './App.vue'
//vue-routerを使用します。
import router from './router'
//vuexを利用します。
import store from './store'
import VueHead from 'vue-head'
//FontAewsomeを利用する
import '@fortawesome/fontawesome-free-webfonts/css/fontawesome.css'
import '@fortawesome/fontawesome-free-webfonts/css/fa-solid.css'
//CSSなどのpreloadを使う場合のpolyfillです。
import '@digitalkaoz/preload-polyfill/dist/preload-polyfill.min.js'
import '@digitalkaoz/preload-polyfill/dist/preload-polyfill-invoke.min.js'
import '@digitalkaoz/preload-polyfill/dist/preload-polyfill-inline.min.js'
//?
Vue.config.productionTip = false
Vue.use(VueHead,{separator:' '})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

//基本的なCSSを読み込みます。
import '@/scss/reset.scss'
import '@/scss/custom.scss'
