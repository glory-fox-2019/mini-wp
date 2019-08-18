<template>
      <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
          <b-navbar-brand href="#" @click.prevent="home">MINI-WP</b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item href="#">Home</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-item> <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input> </b-nav-item>
              <b-nav-item><b-button size="md" class="my-2 my-sm-0" v-b-modal.modal-prevent-closing @click.prevent="showModal" variant="outline-success" right v-if="!isLogin">Login</b-button></b-nav-item>
              <b-nav-item> <b-button size="lg" class="my-2 my-sm-0" @click.prevent="logout" type="submit" variant="danger" right v-if="isLogin">Logout</b-button></b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
        <modalLogin ref="modal" @actionLogin="login"></modalLogin>
      </div>

</template>

<script>
import modalLogin from './modalLogin'
export default {
  props : {
      isLogin : Boolean
  },
  data() {
    return {
    }; 
  },
  methods : {
      logout() {
          this.$emit('actionLogin', false)
         
      },
      login(status){ 
          this.$emit('actionLogin', status)
      },
      showModal(){
          this.$refs.modal.modalShow()
      },
      home(){
          this.$emit('home')
      }
  },
  components: {
      modalLogin
  },
};
</script>

<style scoped>
.vh-10 {
  height: 10vh;
  font-size: 150%;
  color: white;
}
</style>


