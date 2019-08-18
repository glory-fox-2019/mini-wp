<template>
    <b-modal
      id="modal-register-prevent"
      ref="modalregister"
      title="Register"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <b-form-group
        label="Fulname"
        label-for="fullname"
        description="We'll never share your fullname with anyone else."
      >
        <b-form-input
          id="fullname"
          v-model="form.fullname"
          type="text"
          required
          placeholder="Enter your name"
        ></b-form-input>
      </b-form-group>


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
    </b-modal>
</template>

<script>
  export default {
    data() {
      return {
       form : {
           email : '',
           password : '',
           fullname : ''
       }
      }
    },
    methods: {
      resetModal() {
        this.email = ''
        this.password = ''
        this.fullname = ''
      },
      modalShow(){
          this.$refs.modalregister.show()
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
         let fullname = this.form.fullname
         axios({
            method: 'POST',
            url : "http://localhost:3000/user/register",
            data: {email,password,fullname}
        }).then(({data}) => {
            Swal.fire({
                type: 'success',
                title: 'Success',
                text: 'Sucessfully register',
            })
            this.$nextTick(() => {
              this.$refs.modalregister.hide()
            })
        }).catch(err => {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: err.response.data.message,
            })
        })
       
        // Hide the modal manually
        
      }
    },
  
  }
</script>