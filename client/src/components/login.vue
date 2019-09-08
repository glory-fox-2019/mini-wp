<template>
    <!-- login -->
    <section class="login">
        <h4>Login</h4>
        <form v-on:submit.prevent="submitLogin" class="mt-3">
            <div class="form-group">
                <label>Email address</label>
                <input v-model="userForm.email" type="email" class="form-control" placeholder="lala@mail.com">
            </div>
            <div class="form-group">
                <label>Password</label>
                <input v-model="userForm.password" type="password" class="form-control" placeholder="Password">
            </div>
            
            <button type="submit" class="btn btn-primary mr-3">Login</button>
            <span @click="toRegister">to register</span>
            <div class="mt-4 g-signin2" data-onsuccess="gauthOption"></div>
        </form>
    </section>
</template>

<script>

    import GAuth from 'vue-google-oauth2'
    import axios from 'axios'

    export default {
        props: ['pages', 'user'],
        data() {
            return {
                userForm: {
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            toRegister() {
                this.$emit('to-register')
            },
            submitLogin() {
                this.$emit('login', this.userForm)
            },
            gauthOption() {
                this.$gAuth
                    .getAuthCode()
                    .then(authCode => {
                    //on success
                        console.log(authCode);
                        return this.$http.post('http://localhost:3000/auth/google', { code: authCode, redirect_uri: 'postmessage' })
                    })
                    .then(response => {
                    //after ajax
                        console.log(response, "<-------");
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },
            mounted() {

            }
        }
    }
</script>

<style scoped>
    .login{
        border: 1px solid whitesmoke;
        width: 25rem;
        padding: 1rem;
        border-radius: 1rem;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%)
    }
    span {
        cursor: pointer;
    }
    span:hover {
        color:blue;
    }
</style>