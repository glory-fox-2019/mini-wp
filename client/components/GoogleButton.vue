<template>
    <button v-google-signin-button="clientId" class="google-signin-button">
       <img src="../img/goog.png" width="30px">
       Continue with Google
    </button>
</template>

<script>
import GoogleSignInButton from 'vue-google-signin-button-directive'
export default {
  directives: {
    GoogleSignInButton
  },
  data: () => ({
    clientId: '71336833481-j74ok0d7pg8oi86pfrli5s7m9k9brvhl.apps.googleusercontent.com'
  }),
  methods: {
    OnGoogleAuthSuccess (idToken) {
      // Receive the idToken and make your magic with the backend
            axios.post('http://miniwp-api.tediyaki.site/user/google-sign-in', {id_token: idToken})
                .then(({data}) => {
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('user', data.name)
                    Swal.fire(
                        'Google Sign In Success',
                        `Welcome to Wordtiv8`,
                        'success'
                    )
                    this.$emit('login', true)
                })
    },
    OnGoogleAuthFail (error) {
      console.log(error)
    }
  }
}
</script>

<style>
.google-signin-button {
    display: flex;
    cursor: pointer;
    position: absolute;
    margin-top: 73vh;
    background-color: rgb(192, 231, 241);
    color: rgb(34, 107, 136);
    height: 50px;
    font-size: 16px;
    border-radius: 10px;
    padding: 13px 20px 25px 50px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.google-signin-button img {
    position: absolute;
    bottom: 10px;
    left: 8px;
}

</style>