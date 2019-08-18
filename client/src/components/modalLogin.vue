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

      <b-form-group label="Your Name:" label-for="password">
        <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          required
          placeholder="Enter name"
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
           password : ''
       }
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
        this.$emit('actionLogin',true)
        // Hide the modal manually
        this.$nextTick(() => {
          this.$refs.modal.hide()
        })
      }
    },
  
  }
</script>