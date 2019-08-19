<template>
  <div>
    <nav class="navbar fixed-top navbar navbar-expand-lg navbar-dark bg-primary">
      <img src="../../resource/icon.png" />
      <a class="navbar-brand" href="#">WordPress</a>
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
          <li class="nav-item active">
            <a class="nav-link" href="#"></a>
          </li>
          <li class="nav-item">
            <a @click.prevent="goToHomePage" class="nav-link" href="#">Home</a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >Features</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">My Profile</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Edit Profile</a>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >Article</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">Make Article</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Edit Article</a>
            </div>
          </li>
          <li class="nav-item">
            <a @click.prevent="upload" class="nav-link" href="#">
              <i class="fas fa-camera"></i> upload
            </a>
          </li>
          <li class="nav-item">
            <a @click.prevent="logout" class="nav-link" href="#">Logout</a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button type="submit" class="btn btn-light">Search</button>
        </form>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goToHomePage() {
      alert("Masuk Home Page");
    },
    logout() {
      localStorage.removeItem("token");
      this.$emit("loggedout");
    },
    upload() {
      this.$emit("upload");
    }
  }
};
</script>

<style scoped>
.navbar-brand {
  font-family: "Blinker", sans-serif;
  font-size: 30px;
}
</style>    