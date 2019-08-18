<template>
    <div id="first-pop-up">
        <h1>WordTiv8</h1>
        <div class="wrapper">
            <div id="left-form" class="myform">
                <h2>Register</h2>
                <p class="error-message" v-if="registerForm.error.length > 0">{{registerForm.error}}</p>
                <form @submit.prevent="registerUser" id="register" class="first-form" method="POST">
                    <div class="form-group">
                        <label for="name">Full Name </label><br>
                        <input v-model="registerForm.name" type="text" name="full_name" placeholder="Name" autofocus required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email </label><br>
                        <input v-model="registerForm.email" type="email" name="email" placeholder="Email" autofocus required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password </label><br>
                        <input v-model="registerForm.password" type="password" name="password" placeholder="Password" autofocus required><br>
                    </div>
                    <input type="submit" value="Register"><br>
                </form>
            </div>
                <div id="right-form" class="myform">
                    <h2>Sign In</h2>
                    <p class="error-message" v-if="loginForm.error.length > 0">{{loginForm.error}}</p>
                    <form @submit.prevent="loginUser" id="login" class="first-form" method="POST">
                        <div class="form-group login-form">
                            <label for="email">Email </label><br>
                            <input v-model="loginForm.email" type="email" name="email" placeholder="Email" autofocus required>
                        </div>
                        <div class="form-group login-form">
                            <label for="password">Password </label><br>
                            <input v-model="loginForm.password" type="password" name="password" placeholder="Password" autofocus required><br>
                        </div>
                        <input id="sign-in-button" type="submit" value="Sign In">
                    </form>
                </div>
                <GoogleButton v-on:login="$emit('login', true)"></GoogleButton>
            </div>
            
    </div>
</template>

<script>
import Swal from 'sweetalert2'
import GoogleButton from './GoogleButton.vue'
export default {
    data() {
        return {
            registerForm: {
                name: "",
                email: "",
                password: "",
                error: ""
            },
            loginForm: {
                email: "",
                password: "",
                error: ""
            }
        }
    },
    methods: {
        loginUser() {
            const {email, password} = this.loginForm
            
            axios.post('http://localhost:3000/user/login', {email, password})
                .then(({data}) => {
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('user', data.name)
                    Swal.fire(
                        'Login Success',
                        `Welcome ${data.name}`,
                        'success'
                    )
                    this.$emit('login', true)
                })
                .catch(err => {
                    this.loginForm.error = err.response.data.message.split(': ').reverse()[0]
                })
        },
        registerUser() {
            const {name, email, password} = this.registerForm
            axios.post('http://localhost:3000/user/register', {name, email, password})
                .then(({data}) => {
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('user', data.name)
                    Swal.fire(
                        'Register Success',
                        `Welcome to Wordtiv8`,
                        'success'
                    )
                    this.$emit('login', true)
                })
                .catch(err => {
                    this.registerForm.error = err.response.data.message.split(': ').reverse()[0]
                })
        }
    },
    components: {
        GoogleButton
    }
}
</script>

<style scoped>
@font-face {
  font-family: 'Oleo Script Swash Caps';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Oleo Script Swash Caps'), local('OleoScriptSwashCaps-Regular'), url(https://fonts.gstatic.com/s/oleoscriptswashcaps/v7/Noaj6Vb-w5SFbTTAsZP_7JkCS08K-jCzDn_HAX2kSA.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

.wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 75%;
    height: 85vh;
    background-color: rgba(0, 0, 0, 0)
}

#first-pop-up {
    height: 100vh;
    text-align: center;
    background: linear-gradient(to bottom, #0066ff 0%, #ccffff 100%);
    display: flex;
    justify-content: center;
}

#first-pop-up h1 {
    position: absolute;
    top: 30px;
    font-size: 38px;
    font-family: 'Oleo Script Swash Caps';
    color: #081429;
}

.myform {
    margin: 40px;
    padding: 20px;
    height: 300px;
    background-color: rgb(102, 191, 226);
    box-shadow: 0px 10px 8px 0px rgba(5, 17, 48, 0.75);;
}

.myform h2 {
    padding-bottom: 10px;
    font-family: 'Oleo Script Swash Caps';
    color: #0d2f66;
}

#login {
    margin-top: 60px;
}

.first-form {
    margin: 20px;
}

input {
    margin: 8px;
}

#sign-in-button {
    margin-top: 28px;
}

.error-message {
    position: absolute;
    color: rgb(201, 55, 55);
    padding-left: 55px;
}

input[type="submit"] {
    width: 100px;
    height: 35px;
    background-color: rgb(54, 100, 161);
    border-radius: 9px;
    border: 1px solid rgb(102, 191, 226);
    color: rgb(172, 222, 241);
    transition: 0.4s;
}

input[type="submit"]:hover {
    color:rgb(54, 100, 161);
    background-color: rgb(172, 222, 241);
}

</style>