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
                            People assailed by anxiety or depression need to know they're not alone – and stories shared by both celebrities and non-celebrities go a long way in helping.
                            <br>
                            <b>- Marc Wilson (May 23, 2018)</b>
                            <br>
                            <br>
                            Everyone experiences these issues differently as there’s such a large spectrum of causes and severity when struggling with anxiety. That’s why we believe in the power of stories and using therapeutic photography to help people open up and break the silence as a way to better understand these mental health issues for ourselves and everyone else.
                            <br>
                            <b>-The One Project Education</b>
                            <br>
                            <br>
                            Anxiety is a perfectly rational response to a number of things, however when it becomes irrational, make sure you find your strategy of coping.’
                            ‘If you are anxious about an everyday situation, try to imagine the worst possible scenario, and realise it’s not the end of the world if that happens.’
                            ‘The feelings always subside. Although this is something you may have to cope with occasionally, realise it’s just a blip and you will have good times too.’
                            ‘I always say to myself, don’t take today’s feelings into tomorrow. Tomorrow is another day.’
                            ‘I've developed a sense of humour over the years which helps me to deal with the condition.’
                            <br>
                            <b>-Learning to live with anxiety – Anna’s story, AXA health care</b>

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