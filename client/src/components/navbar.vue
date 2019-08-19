<template>
  <div>
    <div class="container">
      <div id="headers-ads" class="row">
        <div class="col-5 d-flex align-content-center flex-wrap">
          <h2>MINI-WP</h2>
        </div>
        <div class="col-7">
          <img
            id="logo-pic"
            src="https://i.pinimg.com/originals/42/3b/eb/423bebda5f758d8bcbd6c46bf9ca1f60.jpg"
            alt
          />
        </div>
      </div>
    </div>

    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light" style="background-color: white">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="fas fa-home" @click.prevent="clickHome"> HOME</i>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="fab fa-canadian-maple-leaf" @click.prevent="clickArticle"> ARTICLE</i>
            </a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="fas fa-user"> PROFILE</i>
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#" @click.prevent="clickMyArticle">My Article</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#" @click.prevent="clickSignOut">Sign Out</a>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {

  methods: {

    clickSignOut(){
      this.$emit('go-to-sign-out')
    },

    clickHome(){
      this.$emit('go-to-home')
    },

    clickArticle(){
      this.$emit('go-to-article')
    },

    clickMyArticle(){
      this.$emit('go-to-myArticle-page')
    }
  }

};
</script>

<style>
</style>