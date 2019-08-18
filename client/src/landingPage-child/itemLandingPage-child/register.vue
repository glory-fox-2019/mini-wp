<template>
        <div class="card-body" id="formRegister" >
            <form >
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="text" class="form-control">
                </div>
                <div class="form-group">
                    <label for="email">E-mail:</label>
                    <input type="email" class="form-control">
                </div>
                <div class="form-group">
                    <label for="pwd">Password:</label>
                    <input type="password" class="form-control">
                </div>
                <div class="form-group">
                    <label for="pwd">Birthday:</label>
                    <input type="date" class="form-control">
                </div>
                <button type="submit" class="btn btn-default" style="background-color: #0f0e0ec5; color : rgb(255, 255, 255);" v-on:click="register">register</button> 
                <hr>
                <hr>
                <center><span>Already have an account?</span></center>
                <center><span>Login <a href="#" v-on:click="loginFormBack">here</a> </span></center>
                <hr>     
            </form>
        </div>
    
</template>

<script>
export default {
    methods :{
        loginFormBack(){
            this.$emit('onpage','dashboard')
        },
        register(){
            //create new user
            //pesan user berhasil dibuat
            this.loginFormBack()
        }

    },

    
}
</script>

<style scoped>

</style>