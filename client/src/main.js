import Vue from 'vue'
import App from './App.vue'
// Bootstrap
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// swal
import VueSwal from 'vue-swal'

// moment js
import moment from 'vue-moment'

// line-clamp
import lineClamp from 'vue-line-clamp'
//GAuth
import GAuth from 'vue-google-oauth2'

const gauthOption = {
  clientId: '284811322674-47mfvv1p6bicin65kbb7dnggdtq02b9a.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)

Vue.use(moment);
 
Vue.use(VueSwal)

Vue.use(BootstrapVue)

Vue.use(lineClamp, {
  // plugin options
  importCss: true
})

new Vue (App).$mount('#app');