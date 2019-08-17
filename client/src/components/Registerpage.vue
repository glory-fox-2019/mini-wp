<template>
      <div>
    <b-container style="display: flex; height: 100vh; justify-content:center; flex-direction: column; width: 50%" >
      <b-form @submit.prevent="signUp">
        <b-form-group
          label="Username:"
          label-for="input-1"
          style="width: 100%"
        >
          <b-form-input
            id="input-1"
            type="text"
            required
            placeholder="Enter username"
            v-model="registerForm.username"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Email address:"
          label-for="input-2"
          description="We'll never share your email with anyone else."
          style="width: 100%"
        >
          <b-form-input
            id="input-2"
            type="email"
            required
            placeholder="Enter email"
            v-model="registerForm.email"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Your Password:" label-for="input-3">
          <b-form-input
            id="input-3"
            type="password"
            required
            placeholder="Enter Password"
            v-model="registerForm.password"
          ></b-form-input>
        </b-form-group>
        <div style="display: flex; justify-content: space-between; flex-direction: column; height:25%">
          <b-button type="submit" variant="primary" style="width: 100%;">Register</b-button>
          <b-button @click.prevent="back" variant="secondary" style="width: 100%">Back</b-button>
        </div>
      </b-form>
    </b-container>
  </div>
</template>

<script>
export default {
    data() {
        return {
            registerForm: {
                username: '',
                email: '',
                password: ''
            }
        }
    },
    methods: {
        signUp() {
            this.$emit('userRegister', this.registerForm)
        },
        back() {
            this.$emit('back')
        }
    }
}
</script>

<style>

</style>