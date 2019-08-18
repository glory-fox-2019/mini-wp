<template>
    <div>
        <landingPage v-if="!isLogin" v-bind:page="page" v-bind:isLogin="isLogin" @onpage="toPage($event) " @changeLoginStatus="changeLogin($event)"></landingPage>
        <afterLogin v-if ="isLogin" 
            @loginStatus="changeLogin($event)" 
            @on_page="toPage($event)"
            v-bind:page="page"
        ></afterLogin>
        <footerPage></footerPage>
        
      
    </div>
</template>

<script>

import landingPage from './landingPage.vue'
import footerPage from './footer.vue'
import afterLogin from './afterLogin.vue'


export default {
    data(){
        return {
            page : 'dashboard',
            isLogin : false

        };

    },
    components :{
        landingPage,
        footerPage,
        afterLogin,
    },
    methods :{
        toPage(directPage){
            this.page = directPage
        },
        changeLogin(status){
            this.isLogin = status
        },
    
    },
    created(){
        if(localStorage.getItem('token')){
            this.isLogin = true
        }else{
            this.isLogin = false
        }
     
    }
    

}
</script>

<style scoped>

</style>