<template>
    <div>
        <div class="col-md-9 card-list2" v-for="(article, index) in articles" :key="index">
            <div class="col-md-2">
                <img :src="article.image" alt="">
            </div>
            <div class="content-list col-md-9">
                <!-- <h4>{{ article.title }}</h4> -->
                <h5>{{article.title}}</h5>
                <p v-html="article.content"></p>
            </div>
            <div class="options col-md-1">
                <span @click="deleteArticle(article._id)"><i class="fas fa-trash"></i></span>
                <span @click="toEditArticle(article._id)"><i class="fa fa-edit"></i></span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['list-article', 'articles', 'pages'],
        data() {
            return {
                
            }
        },
        methods: {
            toEditArticle(id){
                this.$emit('to-edit-article', id)
            },
            deleteArticle(id){
                this.$emit('to-delete-article', id)
            }
        },
        mounted() {
            // console.log(this.key);
        }
    }
</script>

<style scoped>
    .card-list2 {
        display: flex;
        margin-top: 30px;
        padding: 10px;
        background-color: rgb(248, 248, 248);
        border-radius: 5px;
        justify-content: space-between
    }

    .card-list2 h5 {
        max-height: 25px;
        overflow: hidden;
    }
    h5{
        font-style: bold !important;
        font-weight: 5rem;
    }

    .card-list2 p { 
        max-height: 47px;
        overflow: hidden;
    }

    .card-list2 img {
        max-width: 100px;
        max-height: 70px;
        overflow: hidden;
        border-radius: 2px;
    }

    .nav {
        margin-left: 30px;
        margin-right: 50px;
        margin-top: 10px;
    }

    .nav a {
        font-size: 15px;
    }

    .nav-link {
        padding-right: 20px;
        padding-left: 20px;
    }

    .nav-link:hover {
        box-shadow: 0 0 12px silver
    }

    .options {
        display: flex;
        justify-content: space-between;
    }
</style>