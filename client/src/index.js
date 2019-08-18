import Vue from 'vue';
import App from './App.vue';


import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Editor from './components/Editor';
import VueSweetalert2 from 'vue-sweetalert2'

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';


Vue.use(Loading);
Vue.use(VueSweetalert2);
Vue.use(BootstrapVue);
Vue.component('editor',Editor);

new Vue(App).$mount('#app');