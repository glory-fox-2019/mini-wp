<template>
  <div>
    <div class="container d-flex justify-content-center" style="margin-top: 100px">
      <div class="card form" style="width: 23rem; ">
        <div class="card-body">
          <h5 class="card-title" style="text-align: center">Register</h5>
          <form @submit.prevent="submitRegister">
            <div class="form-group">
              <label>Username</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter Username"
                v-model="registerForm.username"
              />
            </div>
            <div class="form-group">
              <label>Email address</label>
              <input
                type="email"
                class="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                v-model="registerForm.email"
              />
              <small id="emailHelp" class="form-text text-muted">
                We'll never share your email with anyone
                else.
              </small>
            </div>
            <div class="form-group" style="margin: 0px">
              <label>Password</label>
              <input 
                type="password" 
                class="form-control" 
                placeholder="Password" 
                v-model="registerForm.password"
              />
            </div>
            <small>
              already have account?
              <a href="#" @click="clickLogin()">Login</a>
            </small>
            <button
              style="margin-left: 125px; margin-top: 20px"
              type="submit"
              class="btn btn-primary"
            >Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

const userPath = 'http://localhost:3000/users/signup'

export default {
  data() {
    return {
      registerForm: {
        username: "",
        email: "",
        password: ""
      }
    };
  },

  methods: {

    clickLogin(){
      this.$emit('go-to-login-page')
    },

    submitRegister(){
      axios({
        method: 'post',
        url: userPath,
        data: this.registerForm
      })
      .then(({data}) => {
        this.clickLogin()
        Swal.fire(
        'Success',
        'Thank for Register. You need to login now',
        'success'
        )
      })
      .catch(err => {
        console.log(err);
        Swal.fire(
        'Oopppss..',
        `Something worng`,
        'error'
        )
      })
    }

  }
};
</script>

<style>
</style>