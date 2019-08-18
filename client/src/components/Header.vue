<template>
  <div class="container-fluid" id="header">
    <nav class="navbar navbar-expand-sm navbar-light">
      <a class="navbar-brand" href="#">Mini WP</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse w-100 order-3" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto" v-if="isLogin">
          <li class="nav-item active">
            <a class="btn btn-light nav-link" href="#" @click.stop="logout">Logout</a>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto" v-else>
          <li class="nav-item active">
            <a class="btn btn-light nav-link" href="#" @click.stop="showLoginForm">Login</a>
          </li>
          <li class="nav-item active">
            <a class="btn btn-light nav-link" href="#" @click.stop="showSignupForm">Signup</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  props : ['isLogin'],
  methods : {
    showLoginForm () {
      this.$emit('showLoginForm')
    },
    showSignupForm () {
      this.$emit('showSignupForm')
    },
    logout () {
      this.$emit('logout')
    }
  }
}
</script>

<style>
#header{
  background-color: rgb(255, 255, 255);
  box-shadow: 0 0 20px rgba(0,0,0,.1);
}
</style>