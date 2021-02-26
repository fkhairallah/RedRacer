import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import myStore from './store/store';

Vue.config.productionTip = false

Vue.prototype.$globals = {
  name : "Globals stored in $globals",
  count : 0,
  flag : true
}

new Vue({
  router,
  vuetify,
  store : myStore,
  render: function (h) { return h(App) }
}).$mount('#app')

