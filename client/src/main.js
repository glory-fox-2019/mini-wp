import Vue from 'vue';
import App from './App.vue';
import Wysiwyg from './js/vueWysiwyg'

Vue.use(Wysiwyg, {})
new Vue(App).$mount('#app')