<template>
  <div id="login">
    <form @submit.prevent="login">
      <div class="title">
        <h2>Login</h2>
      </div>
      <div class="form-group">
        <label for="input--username">Username:</label>
        <input type="text" class="form-control" id="input--username" v-model="username">
      </div>
      <div class="form-group">
        <label for="input--password">Password:</label>
        <input type="text" class="form-control" id="input--password" v-model="password">
      </div>
      <div class="editor--submit">
        <button type="submit" class="btn btn-primary">Login</button>
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
      username:'',
      password:'',
    }
  },
  methods: {
    login(){
      axios({
        url: `${this.baseUrl}/user/login`,
        method:'post',
        data:{
          username: this.username,
          password: this.password,
        }
      })
      .then(({data}) => {
        localStorage.setItem('token',data.token);
        this.isLogin = true;
        this.isAdmin = data.payload.role === 'admin'
        let auth = {
          isLogin: this.isLogin,
          isAdmin: this.isAdmin,
          username: data.payload.username,
          name: data.payload.name,
        }
        this.$emit('auth',auth);
      })
      .catch(({response}) => {
        console.log('masuk error')
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