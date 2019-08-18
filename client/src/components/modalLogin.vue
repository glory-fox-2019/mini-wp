<template>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Submit Your Name"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <b-form-group
        label="Email address:"
        label-for="email"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="email"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Password:" label-for="password">
        <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>
      <button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google</button>
    </b-modal>
</template>

<script>
import GoogleSignInButton from 'vue-google-signin-button-directive'
  export default {
    data() {
      return {
       form : {
           email : '',
           password : ''
       },
       clientId : "128325823668-ufctjqn2m5anj8gu3vicpdcq54slfaq0.apps.googleusercontent.com"
      }
    },
    methods: {
      resetModal() {
        this.email = ''
        this.password = ''
      },
      modalShow(){
          this.$refs.modal.show()
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
         let email = this.form.email
         let password = this.form.password
         axios({
            method: 'POST',
            url : "http://34.87.63.195/user/login",
            data: {email,password}
        }).then(({data}) => {
            localStorage.setItem('token',data.token)
            this.$emit('actionLogin',true)
            Swal.fire({
                type: 'success',
                title: 'Success',
                text: 'Sucessfully login',
            })
            this.$nextTick(() => {
              this.$refs.modal.hide()
            })
        }).catch(err => {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: err.response.data.message,
            })
        })
      },
      OnGoogleAuthSuccess (idToken) {
      // Receive the idToken and make your magic with the backend
      axios({
            method: 'POST',
            url : "http://34.87.63.195/user/loginOauth",
            data: {token : idToken}
        }).then(({data}) => {
            localStorage.setItem('token',data.token)
            this.$emit('actionLogin',true)
            Swal.fire({
                type: 'success',
                title: 'Success',
                text: 'Sucessfully login',
            })
            this.$nextTick(() => {
              this.$refs.modal.hide()
            })
        }).catch(err => {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: err.response.data.message,
            })
        })
      },
      OnGoogleAuthFail (error) {
        console.log(error)
      }
    },
  
  }
</script>
<style scoped>
.google-signin-button {
  color: white;
  background-color: red;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  width:  100%;
}
</style>