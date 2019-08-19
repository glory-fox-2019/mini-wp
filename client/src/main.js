import Vue from 'vue';
import App from './App.vue';
import wysiwyg from 'vue-wysiwyg';
import 'vue-wysiwyg/dist/vueWysiwyg.css'
import VueSweetalert2 from 'vue-sweetalert2'

Vue.use(VueSweetalert2)
Vue.use(wysiwyg, {
  hideModules: { "table": true, "image": true },
  image: {
    uploadURL: "/api/myEndpoint",
    dropzoneOptions: {}
  },
  maxHeight: "300px",
  forcePlainTextOnPaste: false
})

new Vue(App).$mount('#app')