if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueSweetalert2 from 'vue-sweetalert2';
import VueFroala from 'vue-froala-wysiwyg';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import router from './router.js';

Vue.use(VueFroala);
Vue.use(VueSweetalert2);

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app');