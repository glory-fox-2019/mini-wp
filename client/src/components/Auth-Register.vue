<template>
  <div id="register">
    <form @submit.prevent="register">
      <div class="title">
        <h2>Register</h2>
      </div>
      <div class="form-group">
        <label for="input--name">Name:</label>
        <input type="text" class="form-control" id="input--name" v-model="name">
      </div>
      <div class="form-group">
        <label for="input--username">Username:</label>
        <input type="text" class="form-control" id="input--username" v-model="username">
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
        <p>Already have an Account, <a href="javascript:void(0)" @click="$emit('update:auth:page','login')">Login</a></p>
        <button type="submit" class="btn btn-primary">Register</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data(){
    return {
      baseUrl: 'http://localhost:3000/api',
      email: '',
      name: '',
      username:'',
      password:'',
    }
  },
  methods: {
    register(){
      axios({
        url: `${this.baseUrl}/user/register`,
        method:'post',
        data:{
          email: this.email,
          name: this.name,
          username: this.username,
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