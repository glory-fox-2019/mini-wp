<template>
  <div id="form-login" class="container mt-5">
    <div class="row">
      <div class="col-5">
        <form @submit.prevent="login()">
          <h3 class="title-form">Login to your account</h3>
          <hr>
          <div class="alert alert-danger" role="alert" v-show="isError">
            <ul>
              <li v-for="(error, index) in errors" :key="index">
                {{ error }}
              </li>
            </ul>
          </div>
          <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" class="form-control" id="email" placeholder="Enter email" required
            v-model="email">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Password" required
            v-model="password">
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </div>
      <div class="col-7 form-image">
        <img src="../images/undraw_referral_4ki4.svg">
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios')
export default {
  data () {
    return {
      email : '',
      password : '',
      isError : false,
      errors : []
    }
  },
  created(){
    if(localStorage.getItem('token')) {
      this.$emit('showDashboard')
    }
  },
  methods : {
    login () {
      this.$emit('showLoading')
      axios.post('http://localhost:3000/user/login',{
        email : this.email,
        password : this.password
      })
      .then(({data}) => {
        localStorage.setItem('token', data.token)
        localStorage.setItem('userName', data.userName)
        this.$emit('hideLoading')
        this.$emit('showDashboard')
        this.errors = []
      })
      .catch(err => {
        this.$emit('hideLoading')
        this.isError = true
        this.errors = err.response.data.message
      })
    }
  }
}
</script>

<style>
  .form-image img{
    width: 100%;
    max-width: 600px;
  }
  .text-login{
    margin: 20px 0;
  }
  .title-form{
    color: rgb(37, 201, 124);
  }
</style>