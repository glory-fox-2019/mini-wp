<template>
    <div class="col-4">
        <h1 class="standout text-center">Log In</h1>
        <form @submit.prevent="signIn">
            <input v-model="email" class="form-control mt-4 shadow-sm" type="email" placeholder="Email">
            <input v-model="password" class="form-control mt-3 shadow-sm" type="password" placeholder="Password">
            <input v-if="!isLoading" class="form-control mt-3 btn-primary" type="submit" value="Log In">
            <b-button v-else class="form-control btn-primary mt-3" disabled>
                <b-spinner small></b-spinner>
                Loading...
            </b-button>
        </form>
        <p class="text-secondary my-2 text-center">or</p>
        <button v-google-signin-button="clientId" class="btn btn-outline-primary btn-block">
            <font-awesome-icon :icon="['fab','google']" class="mr-2"></font-awesome-icon>
            Signin with Google</button>
        <p class="mt-2 text-center text-secondary">Don't have an account?<a href="#" @click="$emit('to:register')" id="register-link"> Sign up</a></p>   
    </div>
</template>

<script>
import ax from '../config/axios'
import Swal from 'sweetalert2'
import GoogleSignInButton from 'vue-google-signin-button-directive'
export default {
    directives: {
        GoogleSignInButton
    },
    data() {
        return {
            clientId: '973604254627-ca6u1b9pjmibaclhq74cfn303jip6cb6.apps.googleusercontent.com',
            isLoading: false,
            email: '',
            password: ''
        }
    },
    methods: {
        OnGoogleAuthSuccess (idToken) {
            ax({
                url: '/users/signin/google',
                method: 'post',
                data: {
                    id_token: idToken
                }
            })
            .then(({ data })=> {
                Swal.fire({
                title: 'Login Success!',
                type: 'success'
                })
                localStorage.setItem('token', String(data.access_token) )
                this.$emit('login:done')
            })


        },
        OnGoogleAuthFail (error) {
            console.log(error)
        },
        signIn() {
            this.isLoading = true
            ax({
                method: 'post',
                url: '/users/signin',
                data: {
                    email: this.email,
                    password: this.password
                }
            })
            .then(({data}) => {
                Swal.fire({
                title: 'Login Success!',
                type: 'success'
                })
                localStorage.setItem('token', data.access_token)
                localStorage.setItem('username', data.username)
                this.isLoading = false
                this.email = ''
                this.password = ''
                this.$emit('login:done')
            })
            .catch( err => {
                this.isLoading = false
                this.email = ''
                this.password = ''
                Swal.fire({
                    type: 'error',
                    title: err.response.data
                })
            })
        }
    }
}
</script>

<style>

</style>