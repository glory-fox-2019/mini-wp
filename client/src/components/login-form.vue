<template>
<div class="homepage" v-if="!isLogin && !isRegister">
        <div class="middle" >
            <div id="welcome">
                <h2>Welcome</h2> <br>
              </div>
              <div id="formLogin">
                <form method="POST" @submit="login">
                  <label for="email"> Email: </label><br>
                  <input type="text" v-model="email"><br>
                  <label for="password">Password</label><br>
                  <input type="password" v-model="password"><br>
                  <input type="submit" value="Login">
                </form>
              </div>
        </div>
      </div>
</template>

<script>
import axios from 'axios'

export default {
    data () {
        return {
            name: '',
            email: '',
            password: '',
            isRegister: false,
        }
    },
    props: ['onPage'],
    methods: {
         register() {
            axios.post('http://localhost:3000/users/register', {
                name: this.name,
                email : this.email,
                password: this.password
            })
            .then(data => {
                Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: 'Register Success',
                    showConfirmButton: false,
                    timer: 1500
                  })
                this.isRegister = false
            })
            .catch(console.log)
        },
        
        login() {
            axios.post('http://localhost:3000/users/signin', {
                email: this.email,
                password: this.password
            }).then(data=>{
                localStorage.setItem('token', data.data.token) 
            })  
            Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Login success',
                showConfirmButton: false,
                timer: 1500
              })
            this.isLogin = true
        }

    }
}