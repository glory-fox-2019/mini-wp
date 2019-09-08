import Vue from 'vue';
import App from './App.vue';
import Wysiwyg from './js/vueWysiwyg'
import GAuth from 'vue-google-oauth2'


Vue.use(GAuth, gauthOption)
Vue.use(Wysiwyg, {})
new Vue(App).$mount('#app')