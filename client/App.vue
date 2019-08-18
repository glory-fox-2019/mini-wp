<template>
<div>
      <NavBar v-if="islogin" @logout="loginUser($event)"></NavBar>
      <RegisterLogin v-else @login="loginUser($event)"></RegisterLogin>
<div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import RegisterLogin from './components/RegisterLogin.vue'

export default {
  data() {
    return {
      islogin: false,
    };
  },
  components: {
    NavBar,
    RegisterLogin
  },
  created() {
      if(localStorage.getItem('token')) {
          this.islogin = true
      }
  },
  methods: {
      loginUser(event) {
          this.islogin = event
      }
  }
};
</script>

<style scoped>

</style>