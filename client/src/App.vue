<template>
  <div>
    <navbar v-if="isLogin" @loggedout="logout" @upload="upload"></navbar>
    <signin @loggedin="login" v-if="!isLogin"></signin>
    <home @contentActive="showContent($event)" v-if="isLogin && !isContent"></home>
    <singlearticle v-if="isContent"></singlearticle>

  </div>
</template>

<script>
import navbar from "./components/navbar";
import signin from "./components/signin";
import home from "./components/home";
import singlearticle from "./components/content"

export default {
  data() {
    return {
      isLogin: false,
      uploading: false,
      inHome: false,
      inProfile: false,
      isContent: false
    };
  },
  components: {
    navbar,
    signin,
    home,
    singlearticle
  },
  methods: {
    login() {
      this.isLogin = true;
    },
    logout() {
      this.isLogin = false;
    },
    showContent(articleId) {
      this.isContent = true;
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      this.login();
    }
  }
};
</script>

<style scoped>
</style>    