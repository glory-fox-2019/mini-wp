<template>
    <div class="container-fluid" style="background-image: url(../img/simple-modern-black-and-white-geometric-pattern-comforters.jpg)">
        <div class="row">
        <div class="col-sm-7">
            <div class = "card mt-4 ml-5 mb-5 " style="background-color: rgba(214, 214, 198, 0.911);">
                <div class = "row mt-4 ml-4 mb-4">
                    <div class = "col-sm mt-1 ml-4">
                        <img src="../img/3e214c382e5db32f871b30f826a286ed.jpg" height="500px">
                    </div>
                    <div class = "col-sm ml-4 pr-4 mr-4">
                        <h2>Share you anxiety here...</h2>
                        <span class = "mt-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget iaculis enim. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi pulvinar nisl quis nulla facilisis, vitae dictum nisl facilisis. Suspendisse potenti. Vestibulum efficitur et lorem ut sodales. Pellentesque ut lorem sed mi auctor facilisis. Phasellus tempus lacus ut libero fermentum, non facilisis libero convallis. Suspendisse vitae nisl semper mauris tristique condimentum. Donec tempor venenatis tempus. Maecenas ultrices est venenatis ex sollicitudin, id aliquet sem iaculis. Duis ac posuere metus. 
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-sm">
            <div class = "card mt-4 ml-5 mr-5" style="background-color: rgb(214, 214, 198);" >
                <register v-if=" page == 'register'" @onpage="toLandingPage($event)"></register>
                <login v-if=" page == 'dashboard'" @onpage="toLandingPage($event)" @changeLoginStatus="changeLogin($event)"></login>
            </div>
        </div>


        
    </div>
</template>


<script>
import register from './itemLandingPage-child/register.vue'
import login from './itemLandingPage-child/login.vue' 
export default {
    components : {
        login,
        register
    },

    props : ['page', 'isLogin'],

    methods :{
        toLandingPage(directPage){
            this.$emit('onpage',directPage)
        },
        changeLogin(status){
            this.$emit('changeLoginStatus',status)
        }
    }
    
}
</script>

<style scoped>

</style>