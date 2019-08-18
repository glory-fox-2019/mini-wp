import App from './App.vue'

import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Axios from 'axios'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faNewspaper, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'froala-editor/js/froala_editor.pkgd.min.js'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'froala-editor/css/froala_style.min.css'

import VueFroala from 'vue-froala-wysiwyg'
import VoerroTagsInput from '@voerro/vue-tagsinput'
import '@voerro/vue-tagsinput/dist/style.css'

Vue.use(BootstrapVue)
Vue.use(Axios)
Vue.use(VueFroala)

library.add(faSearch, faNewspaper, faGoogle, faEdit, faTrash)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('tags-input', VoerroTagsInput);

Vue.config.productionTip = false

new Vue(App).$mount('#app')
