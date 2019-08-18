<template>
    <div class="col-4">
        <h1 class="standout text-center">Sign Up</h1>
        <form @submit.prevent="signUp">
            <input v-model="email" class="form-control mt-3 shadow-sm" type="email" placeholder="Email">
            <input v-model="username" class="form-control mt-3 shadow-sm" type="text" placeholder="Username">
            <input v-model="password" class="form-control mt-3 shadow-sm" type="password" placeholder="Password">
            <input v-if="!isLoading" class="form-control mt-3 btn-primary" type="submit" value="Sign Up">
            <b-button v-else class="form-control btn-primary mt-3" disabled>
                <b-spinner small></b-spinner>
                Loading...
            </b-button>
        </form>
        <hr>
        <p class="mt-2 text-center text-secondary">Already have an account?<a href="#" @click="$emit('register:done')"> Login</a></p>   
    </div>
</template>

<script>
import ax from '../config/axios'
import Swal from 'sweetalert2'
export default {
    data() {
        return {
            email: '',
            username: '',
            password: '',
            isLoading: false
        }
    },
    methods: {
        signUp() {
            this.isLoading = true
            ax({
                method: 'post',
                url: '/users/signup',
                data: {
                    email: this.email,
                    username: this.username,
                    password: this.password
                }
            })
            .then(({data}) => {
                this.isLoading = false
                this.email = ''
                this.username = '' 
                this.password =  ''
                Swal.fire({
                title: 'Register Success!',
                type: 'success'
                })
                this.$emit('register:done')
            })
            .catch( err => {
                this.isLoading = false
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