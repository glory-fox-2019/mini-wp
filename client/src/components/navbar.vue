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
            <a @click.prevent="goToHomePage" class="nav-link" href="#">
              <i class="fa fa-home"></i> Home
            </a>
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
            >
              <i class="far fa-keyboard"></i> Features
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#" @click.prevent="profile">My Profile</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#" @click.prevent="editProfile">Edit Profile</a>
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
            >
              <i class="fas fa-file-alt"></i> Article
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#" @click.prevent="myArticle">My Articles</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#" @click.prevent="createNewArticle">Create Article</a>
            </div>
          </li>
          <li class="nav-item">
            <a @click.prevent="logout" class="nav-link" href="#">
              <i class="fas fa-power-off"></i> Logout
            </a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            v-model="keyword"
          />
        </form>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: "",
      keyword: ""
    };
  },
  methods: {
    goToHomePage() {
      this.$emit("goToHome");
    },
    logout() {
      localStorage.clear();
      this.$emit("loggedout");
    },
    profile() {
      this.$emit("getProfile", this.userId);
    },
    editProfile() {
      this.$emit("editProfile");
    },
    createNewArticle() {
      this.$emit("createNew");
    },
    myArticle() {
      this.$emit("myArticle");
    }
  },
  created() {
    this.userId = localStorage.userId;
  }
  ,watch: {
    keyword() {
      this.$emit('search', this.keyword)
      return this.keyword
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