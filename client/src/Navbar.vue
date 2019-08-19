<template>
  <nav
    class="navbar navbar-expand-lg navbar-light"
    style="background-color : #563D7C; color : white;"
  >
    <a class="navbar-brand" href="#">Navbar</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" href="#" @click="gantiPage('home')">
            Home
            <span class="sr-only">(current)</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click="gantiPage('register')">Register</a>
        </li>
        <li class="nav-item" v-if="!GoogleSignId">
          <a class="nav-link" href="#" @click="logOut()">LogOut</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      tes: "hai"
    };
  },
  methods: {
    gantiPage(page) {
      this.$emit("navpage", page);
    },
    logOut() {
      this.$emit("navpage", "register");
      localStorage.clear();
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {
        console.log("User signed out.");
      });
    }
  }
};
</script>

<style scoped>
button {
  background: none !important;
  border: none;
  padding: 0 !important;
  /*optional*/
  font-family: arial, sans-serif;
  /*input has OS specific font-family*/
  color: #069;
  text-decoration: underline;
  cursor: pointer;
}
</style>