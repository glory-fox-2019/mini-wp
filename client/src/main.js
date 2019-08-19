import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './App.vue'
import wysiwyg from "vue-wysiwyg";
import Swal from 'sweetalert2'
import "vue-wysiwyg/dist/vueWysiwyg.css";


new Vue(App).$mount('#app');
Vue.use(wysiwyg, {
   
}); // config is optional. more below
Vue.use(BootstrapVue)
// Vue.use(Swal)
