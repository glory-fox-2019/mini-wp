<template>
  <div>
    <div
      class="w3-container w3-light-grey w3-padding-32 w3-padding-large"
      v-if="form == 'registerForm'"
    >
      <div class="w3-content" style="max-width:600px">
        <h5 class="w3-center">
          <b>Sign Up</b>
        </h5>
        <form @submit.prevent="register">
          <div class="w3-section">
            <label>Full Name</label>
            <input class="w3-input w3-border" type="text" name="Name" required v-model="fullName" />
          </div>
          <div class="w3-section">
            <label>Username</label>
            <input class="w3-input w3-border" type="text" name="Name" required v-model="username" />
          </div>
          <div class="w3-section">
            <label>Email</label>
            <input class="w3-input w3-border" type="text" name="Email" required v-model="email" />
          </div>
          <div class="w3-section">
            <label>Password</label>
            <input class="w3-input w3-border" type="password" name="Message" required v-model="password" />
          </div>
          <button class="w3-button w3-block w3-black w3-margin-bottom">Sign Up</button>
          <p>Have an account?</p> <a href="#" class="w3-button w3-block w3-black w3-margin-bottom" @click.prevent = "renderLogin">Login</a>

        </form>
      </div>
    </div>

    <div
      class="w3-container w3-light-grey w3-padding-32 w3-padding-large"
      v-if="form == 'loginForm'"
    >
      <div class="w3-content" style="max-width:600px">
        <h4 class="w3-center">
          <b>Login</b>
        </h4>
        <form @submit.prevent="login">
          <div class="w3-section">
            <label>Username</label>
            <input class="w3-input w3-border" type="text" name="Name" required v-model="username" />
          </div>
          <div class="w3-section">
            <label>Email</label>
            <input class="w3-input w3-border" type="text" name="Email" required v-model="email" />
          </div>
          <div class="w3-section">
            <label>Password</label>
            <input class="w3-input w3-border" type="password" name="Message" required v-model="password" />
          </div>
          <button type="submit" class="w3-button w3-block w3-black w3-margin-bottom">Login</button>
          <p>Not have an account?</p> <a href="#" class="w3-button w3-block w3-black w3-margin-bottom" @click.prevent = "renderRegister">Register</a>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
module.exports = {
  data: function() {
    return {
      //   isLogin: false,
      //   isRegister: false,
      fullName: "",
      username: "",
      email: "",
      password: "",
      form: "registerForm"
    };
  },
  methods: {
    register() {
      axios
        .post("http://localhost:4000/user/register", {
          fullName: this.fullName,
          username: this.username,
          email: this.email,
          password: this.password
        })
        .then(() => {
        //   this.isRegister = true;
          this.fullName = "";
          this.username = "";
          this.email = "";
          this.password = "";

          swal("success register, please login");
        })
        .catch(err => {
          console.log(err);
          swal("email already exist");
        });
    },
    renderRegister() {
        this.form = 'registerForm'
    },

    login() {
      axios
        .post("http://localhost:4000/user/signin", {
          username: this.username,
          email: this.email,
          password: this.password
        })
        .then(({ data }) => {
          // this.isLogin = true;
          // console.log(data, 'hahahaha')
          localStorage.setItem('token', data.token);
          this.username = "";
          this.email = "";
          this.password = "";

          this.$emit('triggerShowHome')

          swal('success login');
        })
        .catch(err => {
          swal('error login')
          console.log(err);
        });
    },

    renderLogin() {
        this.form = "loginForm"
    }
  }
};
</script>

<style>
</style>