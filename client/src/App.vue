<template>
  <div>
    <Auth @auth="auth = $event" v-if="!auth.isLogin"></Auth>
    <Admin v-if="auth.isLogin && auth.isAdmin"></Admin>
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
        isAdmin: false,
        username: '',
        name: '',
      },
    }
  },
  mounted(){
    this.checkLogin(() => {
      
    });

  },
  methods: {
    checkLogin(cb){
      if(localStorage.getItem('token')){
        this.auth.isLogin = true;
        axios.get('/user')
          .then(({data}) => {
            this.auth.isAdmin = data.role === 'admin'
            cb();
          })
          .catch((err) => {
            this.$swal({
              type: 'error',
              title: 'Oops...',
              text: err,
            })
          })
      }else{
        this.auth.isLogin = false;
      }
    },
    loadEditItem(id){
      this.page = 'edit-post'
    },
    editItem(id){}
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