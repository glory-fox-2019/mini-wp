import Vue from 'vue';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import wysiwyg from './vueWysiwyg'

Vue.use(wysiwyg)
Vue.use(BootstrapVue)
new Vue(App).$mount('#app');