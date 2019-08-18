<template>
  <div ref="loadingContainer">
    <Auth @auth="auth = $event" v-if="!auth.isLogin"></Auth>
    <Admin v-if="auth.isLogin && (auth.role === 'admin' || auth.role === 'author')" @logout:auth="logout()" :userdata="auth"></Admin>
  </div>
</template>
<script>
import axios from '../config/axios';
import Auth from './components/Auth';
import Admin from './components/Admin';
export default {
  components: {Auth,Admin},
  data() {
    return {
      baseUrl: 'http://localhost:3000/api',
      auth:{
        isLogin: false,
        role: '',
        username: '',
        name: '',
      },
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
    }
  },
  watch: {
    'auth.isLogin'(newVal,oldVal){
      if(newVal){
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