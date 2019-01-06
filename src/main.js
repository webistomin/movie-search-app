import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import filters from './assets/js/filters';


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  filters,
  template: '<App/>',
  components: { App },
});
