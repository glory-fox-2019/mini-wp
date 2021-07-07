import Vue from 'vue';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue'
import GAuth from "vue-google-oauth2"
import VoerroTagsInput from '@voerro/vue-tagsinput';
import lineClamp from 'vue-line-clamp'

import {
    library
} from '@fortawesome/fontawesome-svg-core'
import {
    faUserSecret,
    faSearch,
    faTag,
    faEdit,
    faTrash,
    faGlobeAsia
} from '@fortawesome/free-solid-svg-icons'
import {
    FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@voerro/vue-tagsinput/dist/style.css'

const gauthOption = {
    clientId: 'CLIENT_ID.apps.googleusercontent.com',
    scope: 'profile email',
    prompt: 'select_account'
}

library.add(faUserSecret, faSearch, faTag, faEdit, faTrash, faGlobeAsia)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('tags-input', VoerroTagsInput);
Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(GAuth, gauthOption)
Vue.use(lineClamp, {
    // plugin options
})

new Vue(App).$mount('#app');