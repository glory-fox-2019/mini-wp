import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import Swal from 'sweetalert2'
new Vue(App).$mount('#app');
Vue.use(axios)
Vue.use(Swal)