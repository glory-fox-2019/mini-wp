import Vue from 'vue';
import App from './App.vue';

// import axios from 'axios';

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Editor from './components/Editor';
import VueSweetalert2 from 'vue-sweetalert2'

// Vue.use(Axios);
Vue.use(VueSweetalert2);
Vue.use(BootstrapVue);
Vue.component('editor',Editor);

new Vue(App).$mount('#app');