//sample
import Vue from 'vue'
import VueGtm from 'vue-gtm'
import Router from 'vue-router'
import Home from './views/HomeDeviceDetect.vue'
import Result from './views/SearchResultDeviceDetect.vue'
import Detail from './views/DetailDeviceDetect.vue'
Vue.use(Router)

let router = new Router({
  mode: 'history', // URLから#を消す設定
  routes: [
    {
      path: '/', //このURLはProdで302リダイレクトがかかります。
      name: 'home',
      component: Home,
    },
    {
      path: '/kaigo/',
      name: 'kaigo',
      component: Home,
    },
    {
      path: '/kaigo/searchresult/*',
      name: 'searchresult',
      component: Result,
    },
    {
      path: '/kaigo/detail/*',
      component: Detail,
    },
    {
      path: '*',
      component: (function () {
        return import('./views/NotFoundDeviceDetect.vue');
      })
    },
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
});

if(location.hostname != 'hitoshia.com'){
  Vue.use(VueGtm, {
    id: 'TEST', // Your GTM ID
    enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
    debug: true, // Whether or not display console logs debugs (optional)
    // vueRouter: router, // Pass the router instance to automatically sync with router (optional)
    ignoredViews: [''] // If router, you can exclude some routes name (case insensitive) (optional)
  });
}else{
  Vue.use(VueGtm, {
    id: 'GTM-MF9B65V',
    enabled: true,
    debug: true,
    // vueRouter: router,
    ignoredViews: ['']
  });
}

export default router;
