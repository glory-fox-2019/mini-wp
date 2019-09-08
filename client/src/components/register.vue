<template>
    <div>
        <section class="register" v-show="register">
            <h4>Register</h4>
            <form v-on:submit.prevent="submitRegister" class="mt-3" >
                <div class="form-group">
                    <label >Username</label>
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
                
                <button type="submit" class="btn btn-primary mr-3">Register</button>
                <span @click="toLogin">have acount (login)</span>
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
    .register{
        border: 1px solid whitesmoke;
        border-radius: 1rem;
        width: 25rem;
        padding: 1rem;
        top: 40%;
        left: 50%;
        position: absolute;
        transform: translate(-50%, -50%);
    }
    .form-control:-moz-input-placeholder {
        color: aliceblue;
    }
    span {
        cursor: pointer;
    }
    span:hover {
        color: blue;
    }
</style>