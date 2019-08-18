<template>
    <div>
        <navbarLogin @loginStatus="logout($event)" @on_page="toPage($event)"></navbarLogin>
        <dashboard v-if=" page == 'dashboard'"></dashboard>
        <story v-if="page == 'story'" 
            @on_page="toPage($event)" 
            @dataToUpdate="toUpdate($event)"
            v-bind:new_data="new_data"
        > 
        </story>
        <updateStory 
            v-if="page == 'update'"
            v-bind:updateTitle="updateTitle"
            v-bind:updateId="updateId"
            v-bind:updateContent="updateContent"
            @on_page="toPage($event)"
        >
        </updateStory>
        <createStory 
            v-if="page == 'create'"
            @on_page="toPage($event)"
            @newdata="toAdd($event)"
        >
        </createStory>
    </div>

</template>

<script>
import navbarLogin from './afterLogin-child/navbarLogin'
import dashboard from './afterLogin-child/dashboard'
import story from './afterLogin-child/story'
import updateStory from './afterLogin-child/updateStory'
import createStory from './afterLogin-child/createStory'
export default {
    data(){
        return{
            updateTitle : "",
            updateId : "",
            updateContent : "",
            new_data : null
        }
    }
    ,components : {
        navbarLogin,
        dashboard,
        story,
        updateStory,
        createStory
    },
    methods:{
        logout(status){
            this.$emit('loginStatus',status)
        },
        toPage(directPage){
            this.$emit('on_page',directPage)
        },
        toUpdate(data){
            this.updateId = data._id,
            this.updateContent = data.content,
            this.updateTitle = data.title
            this.$emit('on_page','update')
        },
        toAdd(data){
            this.new_data = data
        }
    },
    props: ['page']
    
    
}
</script>

<style scoped>

</style>