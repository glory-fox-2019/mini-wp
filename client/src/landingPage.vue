<template>
    <div>
        <landingPageNavbar @onpage="toRoot($event)"></landingPageNavbar>
        <itemLandingPage v-bind:page="page"  v-bind:isLogin="isLogin"  @onpage="toRoot($event)" @changeLoginStatus="changeLogin($event)"></itemLandingPage>


    </div>
    
</template>

<script>
import landingPageNavbar from './landingPage-child/landingPageNavbar.vue'
import itemLandingPage from './landingPage-child/itemLandingPage.vue'
export default {
    data(){
        return{

        }

    },
    components :{
        landingPageNavbar,
        itemLandingPage

    },
    props : ['page', 'isLogin']
    ,
    methods :{
        toRoot(directPage){
            this.$emit('onpage',directPage)
        },
        changeLogin(status){
            this.$emit('changeLoginStatus', status)
        }
    }
    
}
</script>

<style scoped>


</style>