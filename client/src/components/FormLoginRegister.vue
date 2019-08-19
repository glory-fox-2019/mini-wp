<template>
  <button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google</button>
</template>

<script>
import GoogleSignInButton from 'vue-google-signin-button-directive';
import axios from 'axios';

export default {
  props: ['baseUrl'],
  directives: {
    GoogleSignInButton
  },
  data: () => ({
    clientId: '292667409432-bhlk8dnfbldiculhk6l0mg45e1vke31p.apps.googleusercontent.com'
  }),
  methods: {
    OnGoogleAuthSuccess(idToken) {
      axios({
        method: "POST",
        url: `${this.baseUrl}/user/login/google`,
        data: {
          idToken
        }
      })
      .then(({data}) => {
        // localStorage.setItem('token', data.token);
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      })
    },
    OnGoogleAuthFail (error) {
      console.log(error)
    }
  },
}
</script>

<style>
.google-signin-button {
  color: white;
  background-color: red;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>