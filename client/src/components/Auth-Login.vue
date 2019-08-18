<template>
  <div id="login">
    <form @submit.prevent="login">
      <div class="title">
        <h2>Login</h2>
      </div>
      <div class="form-group">
        <label for="input--email">Email:</label>
        <input type="email" class="form-control" id="input--email" v-model="email">
      </div>
      <div class="form-group">
        <label for="input--password">Password:</label>
        <input type="password" class="form-control" id="input--password" v-model="password">
      </div>
      <div class="editor--submit">
        <p>Doesn't Have An Account, <a href="javascript:void(0)" @click="$emit('update:auth:page','register')">Register</a></p>
        <button type="submit" class="btn btn-primary">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from '../../config/axios';
export default {
  data(){
    return {
      email:'',
      password:'',
    }
  },
  methods: {
    login(){
      axios({
        url: `/user/login`,
        method:'post',
        data:{
          email: this.email,
          password: this.password,
        }
      })
      .then(({data}) => {
        localStorage.setItem('token',data.token);
        this.isLogin = true;
        let auth = {
          isLogin: this.isLogin,
          role: data.payload.role,
          username: data.payload.username,
          name: data.payload.name,
          loginWith: data.payload.loginWith,
        }
        this.$emit('auth',auth);

      })
      .catch(({response}) => {
        this.$swal({
          type: 'error',
          title: 'Oops...',
          text: response.data.error,
        })
      })
    },
  }
}
</script>