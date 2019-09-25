import Vue from 'vue';
import App from './App.vue';
import wysiwyg from "vue-wysiwyg";
import "vue-wysiwyg/dist/vueWysiwyg.css";

new Vue(App).$mount('#app');
Vue.use(wysiwyg, {});