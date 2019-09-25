<template>
  <div>
    <signin @loggedin="login" v-if="!isLogin"></signin>
    <afterLogin v-if="isLogin" @loggedout="logout" @on_page="toPage" :page="page"></afterLogin>
  </div>
</template>

<script>
import signin from "./components/signin";
import afterLogin from "./afterLogin";

export default {
  data() {
    return {
      isLogin: false,
      page: ""
    };
  },
  components: {
    signin,
    afterLogin
  },
  methods: {
    login() {
      this.page = localStorage.getItem("page")
      this.isLogin = true;
    },
    logout() {
      localStorage.clear()
      sessionStorage.clear()
      this.isLogin = false;
    },
    toPage() {
      this.page = localStorage.getItem("page")
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      this.page = localStorage.getItem("page")
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }
};
</script>

<style scoped>
</style>    