import Vue from 'vue';
import Router from 'vue-router';
import FormLoginRegister from './views/FormLoginRegister';
import Dashboard from './views/Dashboard';
import Write from './views/Write';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/dashboard',
      component: Dashboard
    },
    {
      path: '/write',
      component: Write
    },
    {
      path: '/edit/:id',
      component: Write
    },
  ]
})