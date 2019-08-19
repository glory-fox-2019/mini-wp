<template>
  <v-app>
    <Navbar @logout="logout" :isLogin="isLogin" id="navbar" :appName="appName"></Navbar>
    <v-content class="pa-12">
      <FormLoginRegister 
        v-if="!isLogin"
        @loginGoogle="loginGoogle">
      </FormLoginRegister>

      <router-view 
      v-if="isLogin"
      :baseUrl="baseUrl"
      @logout="logout"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios';
import Navbar from './components/Navbar';
import FormLoginRegister from './views/FormLoginRegister';
// 
export default {
  components: {
    Navbar,
    FormLoginRegister
  },
  data() {
    return {
      isLogin: false,
      token: '',
      appName: "My App",
      baseUrl: 'https://mini-wp-server.herokuapp.com',
    }
  },
  created() {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.$router.push('/dashboard');
      this.isLogin = true;
    }
  },
  methods: {
    loginGoogle(val) {
      axios({
        method: "POST",
        url: `${this.baseUrl}/user/login/google`,
        data: {
          idToken: val
        }
      })
      .then(({data}) => {
        // kalau di method $router
        this.isLogin = true;
        this.$router.push('dashboard');
        localStorage.setItem('token', data.token);
        // console.log(data);
      })
      .catch(err => {
        console.log(err);
      })
    },
    logout() {
      console.log('logout');
      localStorage.removeItem('token');
      this.isLogin = false;
    },
    createPost(val) {
      this.newPost = val;
    },
  },
  watch: {
    $route() {
      if (!this.token) {
        // this.$router.push('login');
      } else {
        // this.$router.push('dashboard');
        this.isLogin = true;
      }
    }
  }
};
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }
</style>
