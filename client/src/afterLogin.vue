<template>
    <div>
        <navbarLogin @loginStatus="logout($event)" @on_page="toPage($event)"></navbarLogin>
        <dashboard 
            v-if=" page == 'dashboard'"
            @readmoree="to_readmore($event)"
        
        
        ></dashboard>
        <story v-if="page == 'story'" 
            @on_page="toPage($event)" 
            @dataToUpdate="toUpdate($event)"
            @readmoree="to_readmore($event)"
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

        <readmore
            v-if="page == 'readmore'"
            v-bind:id_to_read="id_to_read"

        >
        </readmore>
    </div>

</template>

<script>
import navbarLogin from './afterLogin-child/navbarLogin'
import dashboard from './afterLogin-child/dashboard'
import story from './afterLogin-child/story'
import updateStory from './afterLogin-child/updateStory'
import createStory from './afterLogin-child/createStory'
import readmore from './afterLogin-child/readMore'
export default {
    data(){
        return{
            updateTitle : "",
            updateId : "",
            updateContent : "",
            new_data : null,
            id_to_read : ""
        }
    }
    ,components : {
        navbarLogin,
        dashboard,
        story,
        updateStory,
        createStory,
        readmore
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
        },
        to_readmore(data){
            this.$emit('on_page','readmore')
            this.id_to_read = data.id
        }
    },
    props: ['page']
    
    
}
</script>

<style scoped>

</style>