<template>
    <div class="card-body" id="formLogin" >
        <form >
            <div class="form-group">
                <label for="email">E-mail:</label>
                <input type="email" class="form-control" v-model="email">
            </div>
            <div class="form-group">
                <label for="pwd">Password:</label>
                <input type="password" class="form-control" v-model="pwd">
            </div>
            <button type="submit" class="btn btn-default" style="background-color: #0f0e0ec5; color : rgb(255, 255, 255);" v-on:click="login">login</button> 
            <hr>
            <center> <div id = "google-signin-button"></div></center>
            <hr>
            <center><span>Doesn't have an account?</span></center>
            <center><span>Register <a href="#" v-on:click="registerForm()">here</a> </span></center>
            <hr>     
        </form>
    </div>
    
</template>

<script>
const baseUrl = 'http://localhost:3000/api'
export default {
    data(){
        return{
            email : "",
            pwd : ""
        }

    },
    methods : {
        registerForm(){
            this.$emit('onpage','register')
        },
        login(){
            this.axios.post(baseUrl+'/users/login',{
            email : this.email,
            password : this.pwd
            })
            .then(({data})=>{
                console.log(data);
                this.$swal.fire({
                    type: 'success',
                    title : 'Success!',
                    text: 'Login Success!',
                    showConfirmButton: false,
                    timer: 1500
                    })
                localStorage.setItem('token',data.token)
                this.$emit('changeLoginStatus',true)
            })
            .catch(err=>{
                console.log(err);
                this.$swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Invalid username/password!',
            })
            })
            this.pwd = ""
            this.email = ""
        },
        onSignIn (googleUser) {
            var id_token = googleUser.getAuthResponse().id_token;
            this.axios.post(baseUrl+'/users/googleLogin',{
                token : id_token
            })
            .then(({data})=>{
                console.log('Sign in as', data);
                localStorage.setItem('token',data)
                this.$emit('changeLoginStatus',true)
                
            })
            .catch(err=>{
                console.log(err);
                this.$swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Invalid username/password!',
            })
            })
            this.pwd = ""
            this.email = ""     
    }
        
    },

    mounted(){
        gapi.signin2.render('google-signin-button', {
        onsuccess: this.onSignIn
    })
    }
  
}
</script>

<style scoped>

</style>