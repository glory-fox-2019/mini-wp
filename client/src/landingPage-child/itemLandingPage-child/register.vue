<template>
        <div class="card-body" id="formRegister" >
            <form >
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="text" class="form-control" v-model="name">
                </div>
                <div class="form-group">
                    <label for="email">E-mail:</label>
                    <input type="email" class="form-control" v-model="email">
                </div>
                <div class="form-group">
                    <label for="pwd">Password:</label>
                    <input type="password" class="form-control" v-model="password">
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
const baseUrl = 'http://localhost:3000/api'
export default {
    data(){
        return{
            name : "",
            email : "",
            password : ""
        }

    },
    methods :{
        loginFormBack(){
            this.$emit('onpage','dashboard')
        },
        register(){
            //create new user
            //pesan user berhasil dibuat
            this.axios.post(baseUrl+'/users',{
                name : this.name,
                email : this.email,
                password : this.password
            })
            .then(({data})=>{
                console.log(data);
                this.$swal.fire({
                    type: 'success',
                    title : 'Success!',
                    text: 'New user is created!',
                    showConfirmButton: false,
                    timer: 1500
                })

            })
            .catch(err=>{
                console.log(err);
                this.$swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                })
            })
            this.name = ""
            this.password = ""
            this.email = ""
            this.loginFormBack()
        }

    },

    
}
</script>

<style scoped>

</style>