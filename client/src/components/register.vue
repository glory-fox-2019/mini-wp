<template>
    <div>
        <section v-show="register">
            <h4>Register</h4>
            <form v-on:submit.prevent="submitRegister" class=" p-4" >
                <div class="form-group">
                    <label >Email address</label>
                    <input v-model="userForm.name" type="text" class="form-control" placeholder="lala">
                </div>
                <div class="form-group">
                    <label >Email address</label>
                    <input v-model="userForm.email" type="email" class="form-control" placeholder="lala@mail.com">
                </div>
                <div class="form-group">
                    <label >Password</label>
                    <input v-model="userForm.password" type="password" class="form-control" placeholder="Password">
                </div>
                
                <button type="submit" class="btn btn-primary">Register</button>
                <a @click="toLogin">have acount</a>
                <div id="google-signin-button"></div>
            </form>
        </section>
    </div>

</template>

<script>
    export default {
        props: ['register', 'user'],
        data() {
            return {
                userForm: {
                    name: '',
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            toLogin() {
                this.$emit('to-login')
            },
            submitRegister() {
                this.$emit('register', this.userForm)
            }
        },
        mounted() {
            // console.log('wkkwk');
            // console.log(this.register);
        }
    }
</script>

<style scoped>

</style>