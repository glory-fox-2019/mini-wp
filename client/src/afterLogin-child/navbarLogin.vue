<template>
    <div>
        <!-- NABNAR LOGIN -->
        <nav class="navbar navbar-expand-lg navbar-light bg-light" style="padding: 30px">
            <a class="navbar-brand" href="#"><h1>anxietext</h1></a>

            <div class = "navbar-collapse justify-content-end">
                <ul class="nav nav-pills ">
                    <li class="nav-item" >
                            <a class="nav-link" href="#" style = "color: black" >Search</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" style = "color: black">Notifications</a>
                    </li>
                    <li class="nav-item" >
                            <a class="nav-link" href="#" style = "color: black">Profile</a>
                    </li>
                    <li class="nav-item" >
                        <a class="nav-link active"  style="background-color: rgb(155, 103, 55)" href="#" v-on:click="logout()">sign out</a>
                    </li>
                </ul>
            </div>
        </nav>
        <ul class="nav justify-content-center justify-content-around" style = "background-color : rgb(226, 221, 221) ">
            <li class="nav-item">
                <a class="nav-link active" href="#" style = "color: black" v-on:click="toPage('dashboard')">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" style = "color: black" v-on:click="toPage('story')">Story</a>
            </li>
            <li class="nav-item">
                    <a class="nav-link" href="#" style = "color: black">Friends</a>
                </li>
            <li class="nav-item">
                <a class="nav-link" href="#" style = "color: black" v-on:click="toPage('create')">Create Story</a>
            </li>
        </ul>
    </div>
    
</template>


<script>
export default {
    props : ['page'],
    methods : {
        logout(){
            this.$swal.fire(
                {   title : "Are you sure want to Sign Out?",
                    type : "question",
                    showConfirmButton : true,
                    showCancelButton : true,
                })
                .then((isConfirm)=>{
                    if(isConfirm.value){
                        localStorage.clear()
                        this.$emit('loginStatus',false)
                        this.$emit('on_page','dashboard')
                    }
                })
        },
        toPage(param){
            this.$emit('on_page',param)
        }
    }
    
}
</script>

<style scoped>

</style>