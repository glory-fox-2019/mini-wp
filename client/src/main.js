import Vue from 'vue';
import App from  './App.vue'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import wysiwyg from "vue-wysiwyg";
import "vue-wysiwyg/dist/vueWysiwyg.css"



new Vue(App).$mount('#app')
Vue.use(BootstrapVue)
Vue.use(VueSweetalert2)
Vue.use(VueAxios, axios)
Vue.use(wysiwyg, {});



