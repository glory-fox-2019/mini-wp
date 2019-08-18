import Vue from 'vue';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import wysiwyg from "vue-wysiwyg";

Vue.config.devtools = false;
Vue.config.debug = false;
Vue.config.silent = true;

Vue.use(wysiwyg, {
    hideModules: { "table": true, "image": false },
    image: {
      uploadURL: "/api/myEndpoint",
      dropzoneOptions: {}
    },
    maxHeight: "500px",
    forcePlainTextOnPaste: false
});

Vue.use(BootstrapVue)
new Vue(App).$mount('#app');