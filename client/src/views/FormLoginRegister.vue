<template>
  <button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google</button>
</template>

<script>
import GoogleSignInButton from 'vue-google-signin-button-directive';

export default {
  props: ['baseUrl'],
  directives: {
    GoogleSignInButton
  },
  data: () => ({
    clientId: '343557730462-9js2ago9i152g81gtmuiav6b4r2kve69.apps.googleusercontent.com'
  }),
  methods: {
    OnGoogleAuthSuccess (idToken) {
      this.$emit('loginGoogle', idToken);
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