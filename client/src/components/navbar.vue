<template>
      <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
          <b-navbar-brand href="#" @click.prevent="home">MINI-WP</b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-item> <b-form-input size="md" class="mr-sm-2" placeholder="Search"></b-form-input> </b-nav-item>
              <b-nav-item><b-button size="md" class="my-2 my-sm-0" v-b-modal.modal-prevent-closing @click.prevent="showModal" variant="outline-success" right v-if="!isLogin">Login</b-button></b-nav-item>
              <b-nav-item><b-button size="md" class="my-2 my-sm-0" v-b-modal.modal-register-prevent @click.prevent="showModalRegister" variant="outline-primary" right v-if="!isLogin">Register</b-button></b-nav-item>
              <b-nav-item><b-button size="md" class="my-2 my-sm-0" @click.prevent="dashboard" variant="primary" right v-if="isLogin">Dashboard</b-button></b-nav-item>
              <b-nav-item> <b-button size="md" class="my-2 my-sm-0" @click.prevent="logout" type="submit" variant="danger" right v-if="isLogin">Logout</b-button></b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
        <modalLogin ref="modal" @actionLogin="login"></modalLogin>
        <modalRegister ref="modalregister"></modalRegister>
      </div>

</template>

<script>
import modalLogin from './modalLogin'
import modalRegister from './modalRegister'
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
        localStorage.clear()
         Swal.fire({
                type: 'success',
                title: 'Success',
                text: 'Succesfulyl Logout',
            })
      },
      login(status){ 
        this.$emit('actionLogin', status)
      },
      showModal(){
        this.$refs.modal.modalShow()
      },
      showModalRegister(){
        this.$refs.modalregister.modalShow()
      },
      home(){
        this.$emit('home')
      },
      dashboard(){
        console.log('menuju dashboard')
        this.$emit('dashboard')
      }
  },
  components: {
      modalLogin,
      modalRegister
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


