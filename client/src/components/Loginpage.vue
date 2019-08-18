<template>
    <div>
    <b-container style="display: flex; height: 100vh; justify-content:center; flex-direction: column; width: 50%" >
      <div id="title" style="margin-bottom: 20px; display:flex; justify-content: center;">
          <img :src="image" style="width: 50px; height: 50px;">
          <h1 style="margin-left: 10px;">Omongin aja</h1>
      </div>
      <b-form @submit.prevent="signIn" method='POST' action="#">
        <b-form-group
          label="Email address:"
          label-for="input-1"
          description="We'll never share your email with anyone else."
          style="width: 100%"
        >
          <b-form-input
            id="input-1"
            type="email"
            required
            placeholder="Enter email"
            v-model="loginForm.email"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Your Password:" label-for="input-2">
          <b-form-input
            id="input-2"
            type="password"
            required
            placeholder="Enter Password"
            v-model="loginForm.password"
          ></b-form-input>
        </b-form-group>
        <div style="display: flex;flex-direction: column; height:45%; align-items: center;">
          <b-button type="submit" variant="primary" style="width: 100%; margin-bottom: 5px;">Sign In</b-button>
          <b-button @click.prevent="register" variant="secondary" style="width: 100%; margin-bottom: 5px;">Register</b-button>
        </div>
      </b-form>
      <div>
        <button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google</button>
      </div>
    </b-container>
  </div>
</template>

<script>
import image from '../../png/friends-talking.png'
import GoogleSignInButton from 'vue-google-signin-button-directive'
export default {
    directives:{
        GoogleSignInButton
    },
    data() {
        return {
            loginForm: {
                email: '',
                password: '',
            },
            clientId: '552587421887-16nnsk6qohvfi0psso6l7cma0s329scb.apps.googleusercontent.com',
            image: image
        }
    },
    methods: {
        signIn() {
            this.$emit('userLogin',this.loginForm)
        },
        register() {
            this.$emit('registerButton')
        },
        OnGoogleAuthSuccess (idToken) {
            this.$emit('googleSignIn', idToken)
        },
        OnGoogleAuthFail (error) {
            console.log(error)
        }
    }
}
</script>

<style scoped>
.google-signin-button {
    width: 100%;
  color: #797a7a;
  background-color: white;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>