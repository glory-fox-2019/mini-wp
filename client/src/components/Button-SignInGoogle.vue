<template>
  <button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google</button>
</template>

<script>
import axios from '../../config/axios';
import GoogleSignInButton from 'vue-google-signin-button-directive'
export default {
  directives: {
    GoogleSignInButton
  },
  data: () => ({
    clientId: '329506494007-agajgctpmdirr2gh3ep5t0dsck69h8p4.apps.googleusercontent.com'
  }),
  methods: {
    OnGoogleAuthSuccess (idToken) {
      axios.post('/user/login/google', {idToken})
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
      // Receive the idToken and make your magic with the backend
    },
    OnGoogleAuthFail (error) {
      this.$swal({
        type: 'error',
        title: 'Oops...',
        text: error,
      })
    }
  }
}
</script>

<style>

</style>