<template>
    <!-- login -->
        <section v-show="pages && user.loggedIn == false">
            <h4>Login</h4>
            <form v-on:submit.prevent="submitLogin">
                <div class="form-group">
                    <label>Email address</label>
                    <input v-model="userForm.email" type="email" class="form-control" placeholder="lala@mail.com">
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input v-model="userForm.password" type="password" class="form-control" placeholder="Password">
                </div>
                
                <button type="submit" class="btn btn-primary">Login</button>
                <span @click="toRegister">register</span>
                <div id="google-signin-button"></div>
            </form>
        </section>
</template>

<script>
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
                // console.log('child');
                this.$emit('login', this.userForm)
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>