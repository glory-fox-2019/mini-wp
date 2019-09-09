import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import Swal from 'sweetalert2'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles

new Vue(App).$mount('#app');
Vue.use(Vuesax)
Vue.use(axios)
Vue.use(Swal)