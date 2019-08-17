import Vue from 'vue';
import App from './App.vue';
import GAuth from 'vue-google-oauth2'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
new Vue(App).$mount('#app');