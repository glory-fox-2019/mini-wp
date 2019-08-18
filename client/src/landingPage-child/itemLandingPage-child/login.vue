<template>
    <div class="card-body" id="formLogin" >
        <form >
            <div class="form-group">
                <label for="email">E-mail:</label>
                <input type="email" class="form-control" id="email">
            </div>
            <div class="form-group">
                <label for="pwd">Password:</label>
                <input type="password" class="form-control" id="pwd">
            </div>
            <button type="submit" class="btn btn-default" style="background-color: #0f0e0ec5; color : rgb(255, 255, 255);" v-on:click="login">login</button> 
            <hr>
            <center>  <div class="g-signin2" data-onsuccess="onSignIn"></div></center>
            <hr>
            <center><span>Doesn't have an account?</span></center>
            <center><span>Register <a href="#" v-on:click="registerForm()">here</a> </span></center>
            <hr>     
        </form>
    </div>
    
</template>

<script>
export default {
    methods : {
        registerForm(){
            this.$emit('onpage','register')
        },
        login(){
            //panggil method login
            this.$swal.fire({
                type: 'success',
                title: 'Login Success!',
                showConfirmButton: false,
                timer: 1500
                })
            this.$emit('changeLoginStatus',true)
        }
    },
  
}
</script>

<style scoped>

</style>