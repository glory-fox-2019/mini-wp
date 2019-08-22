<template>
<div>

  <nav v-if="isLogin == true"></nav>
  <login v-if="!isLogin" @triggerShowHome="showHome"></login>
  <home v-if="isLogin == true"></home>
  <!-- <login v-if="isLogin && isRegister == true"></login> -->

</div>
   
</template>

<script>
// import nav from "../components/navbar"
import login from "../components/Register-login"
import home from "../components/main"
// import login from "../components/Login"

export default {
  data() {
    return {
      message: "",
      isRegister: false,
      isLogin: false
    };
  },
  methods: {
    showHome() {
      this.isLogin = true
    }
  },
  components: {
    login,
    home
  }
};
</script>

<style scoped>
</style>