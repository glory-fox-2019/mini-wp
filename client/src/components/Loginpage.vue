<template>
    <div>
    <b-container style="display: flex; height: 100vh; justify-content:center; flex-direction: column; width: 50%" >
      <div id="title" style="margin-bottom: 20px; display:flex; justify-content: center;">
          <img :src="image" style="width: 50px; height: 50px;">
          <h1 style="margin-left: 10px;">Omongin aja</h1>
      </div>
      <b-form @submit.prevent="signIn" method='POST' action="#">
        <b-form-group
          label="Email address:"
          label-for="input-1"
          description="We'll never share your email with anyone else."
          style="width: 100%"
        >
          <b-form-input
            id="input-1"
            type="email"
            required
            placeholder="Enter email"
            v-model="loginForm.email"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Your Password:" label-for="input-2">
          <b-form-input
            id="input-2"
            type="password"
            required
            placeholder="Enter Password"
            v-model="loginForm.password"
          ></b-form-input>
        </b-form-group>
        <div style="display: flex; justify-content: space-between; flex-direction: column; height:35%">
          <b-button type="submit" variant="primary" style="width: 100%;">Sign In</b-button>
          <b-button @click.prevent="register" variant="secondary" style="width: 100%">Register</b-button>
        </div>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import image from '../../png/friends-talking.png'

export default {
    data() {
        return {
            loginForm: {
                email: '',
                password: '',
            },
            image: image
        }
    },
    methods: {
        signIn() {
            this.$emit('userLogin',this.loginForm)
        },
        register() {
            this.$emit('registerButton')
        }
    }
}
</script>

<style scoped>

</style>