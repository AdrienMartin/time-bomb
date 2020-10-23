import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue'
import router from './router'
import VueSocketIO from 'vue-socket.io'
import VueSwal from 'vue-swal'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

Vue.use(BootstrapVue);
Vue.use(VueSwal);
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://ec2-3-18-110-66.us-east-2.compute.amazonaws.com:3000',
  //connection: 'http://localhost:3000',
  query: {
      token: window.localStorage.getItem('auth')
  }
}));