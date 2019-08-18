import Vue from 'vue';
import App from './App.vue';
import GAuth from 'vue-google-oauth2'
import BootstrapVue from 'bootstrap-vue'
import wysiwyg from "vue-wysiwyg";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(wysiwyg, {
    hideModules: { "table": true, "image": true },
    maxHeight: "500px",
    forcePlainTextOnPaste: false
});
Vue.use(BootstrapVue)
new Vue(App).$mount('#app');