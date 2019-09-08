<template>
  <div ref="loadingContainer">
    <Blog :showpost="showpost" :isLogin="auth.isLogin" v-if="page === 'blog'" @update:app:page="page = $event"></Blog>
    <Auth @update:app:page="page = $event" @auth="auth = $event" v-if="!auth.isLogin && page === 'admin'"></Auth>
    <Admin v-if="auth.isLogin && (auth.role === 'admin' || auth.role === 'author') && page === 'admin'" @logout:auth="logout()" :userdata="auth" @show:post="showPost($event)" @update:app:page="page = $event"></Admin>
  </div>
</template>
<script>
import axios from '../config/axios';

import Blog from './components/Blog';
import Auth from './components/Auth';
import Admin from './components/Admin';
export default {
  components: {Auth,Admin,Blog},
  data() {
    return {
      page: 'blog',
      auth:{
        isLogin: false,
        role: '',
        username: '',
        name: '',
      },
      showpost:'',
    }
  },
  mounted(){
    this.checkLogin();
  },
  methods: {
    checkLogin(){
      if(localStorage.getItem('token')){
        console.log('checklogin')
        axios.get('/user')
          .then(({data}) => {
            let auth = {
              isLogin: true,
              role: data.role,
              username: data.username,
              name: data.name,
              loginWith: data.loginWith,
            }
            this.auth = auth;
          })
          .catch(({response}) => {
            this.$swal({
              type: 'error',
              title: 'Oops...',
              text: response.error.message,
            })
          })
      }else{
        this.auth.isLogin = false;
      }
    },
    loadEditItem(id){
      this.page = 'edit-post'
    },
    logout(){
      localStorage.clear();
      this.auth.isLogin = false;
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });

      this.auth = {
        isLogin: false,
        role: '',
        email: '',
        username: '',
        name: ''
      }
    },
    showPost(id){
      this.page = 'blog';
      this.showpost = id;
    }
  },
  watch: {
    'auth.isLogin'(newVal,oldVal){
      if(newVal){
        this.page = 'admin'
        this.$swal({
          type: 'success',
          title: 'Success',
          text: 'Success Login',
        })
      }
    },
  },
  computed: {}
}
</script>
<style scoped>
  @import './assets/css/style.scss';
</style>