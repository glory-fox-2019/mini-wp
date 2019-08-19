<template>
  <div class="container">
    <!-- Login -->
    <div
      v-if="onpage == 'login-form'"
      class="row d-flex justify-content-center"
      style="margin-top: 150px"
    >
      <div class="card mb-3" style="max-width: 540px; border: none;">
        <div class="row no-gutters">
          <div class="col-md-5 d-flex align-items-center">
            <img src="../../resource/icon-login.png" class="card-img" alt="logo" />
          </div>
          <div class="col-md-7">
            <div class="card-body">
              <form @submit.prevent="onSignin">
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    class="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    v-model="email"
                  />
                  <small
                    style="font-size: 10px;"
                    class="form-text text-muted"
                  >We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    placeholder="Password"
                    v-model="password"
                  />
                </div>
                <small>
                  not a member?
                  <a href="#" @click.prevent="renderRegister">Register</a>
                </small>
                <div class="d-flex justify-content-center">
                  <button type="submit" class="btn btn-primary mt-4">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Register -->
    <div
      v-if="onpage == 'register-form'"
      class="row d-flex justify-content-center"
      style="margin-top: 120px"
    >
      <div class="card register" style="width: 400px">
        <div class="card-body">
          <h3 style="text-align: center;">Register</h3>
          <form @submit.prevent="onSignup">
            <div class="form-group">
              <label>Email address</label>
              <input
                type="email"
                autofocus
                required
                class="form-control"
                autocomplete="false"
                placeholder="Enter email"
                v-model="email"
              />
              <small
                id="emailHelp"
                class="form-text text-muted"
              >We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Username</label>
              <input
                type="text"
                class="form-control"
                autocomplete="false"
                autofocus
                required
                placeholder="Enter Username"
                v-model="username"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                autofocus
                required
                autocomplete="false"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                v-model="password"
              />
            </div>
            <small>
              already have account?
              <a href="#" @click.prevent="renderLogin">Login</a>
            </small>
            <div class="d-flex justify-content-center">
              <button type="submit" class="btn btn-primary mt-4">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      username: "",
      onpage: "login-form"
    };
  },
  methods: {

    onSignin() {
      axios({
        method: "post",
        url: "http://localhost:3000/users/login",
        data: {
          email: this.email,
          password: this.password
        }
      })

      .then(({ data })=>{
        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data.userId)
        this.$emit('loggedin')
        Swal.fire(
        'Good job!',
        'Log in success!',
        'success'
        )
      })
      .catch(err => {
        Swal.fire(
        'Opppsss..',
        'Email / password wrong',
        'error'
        )
      })
    },

    renderRegister() {
      this.onpage = "register-form";
    },

    renderLogin() {
      this.onpage = "login-form";
    },

    onSignup() {
      console.log('masuk');
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/register',
        data: {
          email: this.email,
          username: this.username,
          password: this.password
        }
      })
      .then(response => {
        Swal.fire(
        'Good job!',
        'You have successfully registered as a user!',
        'success'
        ),
        this.renderLogin()
      })
      .catch(err => {
        Swal.fire(
        'Opppsss..',
        'Use another email / username',
        'error'
        )
      })
    }
  }
};
</script>

<style scoped>
.register {
  box-shadow: 6px 8px 11px -1px #000000;
}

img {
  height: 270px;
}
</style>    