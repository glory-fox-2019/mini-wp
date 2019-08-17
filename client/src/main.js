import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import wysiwyg from '../wysiwig/vueWysiwyg'
import '../wysiwig/vueWysiwyg.css'
import Swal from 'sweetalert2'
new Vue(App).$mount('#app');
Vue.use(wysiwyg)
Vue.use(axios)
Vue.use(Swal)