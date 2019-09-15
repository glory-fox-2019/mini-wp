<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="padding: 30px">
        <a class="navbar-brand" href="#"><h1>anxietext</h1></a>
        <div class = "navbar-collapse justify-content-end"  >
            <ul class="nav nav-pills ">
                <li class="nav-item" >
                    <a class="nav-link" href="#footer">About</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#footer">Contact</a>
                </li>
                <li class="nav-item" >
                    <a class="nav-link active"  style="background-color: rgb(76, 160, 21)" href="#" v-on:click="registerForm()">Create your own Blog!</a>
                </li>
            </ul>
        </div>
    </nav>
    
</template>


<script>
export default {
    methods : {
        registerForm(){
            this.$emit('onpage','register')
        }
    },
    
}
</script>

<style scoped>
    .nav-link{
        color: white
    }

    .nav-link:hover{
        color: rgb(187, 185, 185)
    }

    .btn{
        width : 100%;
        height : 40px;
        
    }

</style>