<template>
    <div>
       <Homepage
       v-if="onPage == 'homepage'"
       @login:done="onPage = 'list-articles'"
       ></Homepage>

       <ListArticle
       v-else-if="onPage == 'list-articles'"
       @to:write="onPage = 'create-article'"
       @log:out="signOut()"
       @to:article="articleDetail($event)"
       @article:update="articleUpdate($event)">
       </ListArticle>

       <ShowArticle
       :article="article"
       v-else-if="onPage == 'article'"
       @to:write="onPage = 'create-article'"
       @to:list="onPage = 'list-articles'"
       @log:out="signOut()">
       </ShowArticle>

       <CreateArticle
       v-else-if="onPage == 'create-article'"
       @to:list="onPage = 'list-articles'"
       @log:out="signOut()">
       </CreateArticle>

       <UpdateArticle
       v-else-if="onPage == 'update-article'"
       @to:list="onPage = 'list-articles'"
       @log:out="signOut()"
       :article="article"
       ></UpdateArticle>

    </div>
</template>

<script>
import Swal from 'sweetalert2'
import Homepage from './views/Homepage'
import ListArticle from './views/ListArticle'
import CreateArticle from './views/CreateArticle'
import ShowArticle from './views/ShowArticle'
import UpdateArticle from './views/UpdateArticle'
export default {
    components: {
        Homepage,
        ListArticle,
        CreateArticle,
        ShowArticle,
        UpdateArticle
    },
    data() {
        return {
            message: 'Hello glory!',
            onPage: 'homepage',
            article: ''
        }
    },
    methods: {
        signOut() {
            Swal.fire({
                type: 'success',
                title: 'Bye!'
            })
            localStorage.clear()
            this.onPage = 'homepage'
        },
        articleDetail(payload) {
            this.article = payload
            this.onPage = 'article'
        },
        articleUpdate(payload) {
            this.article = payload
            this.onPage = 'update-article'
        }
    },
    created() {
        if(localStorage.getItem('token')) {
            this.onPage = 'list-articles'
        }
    }
}
</script>

<style>
    .standout {
        font-size: 4rem;
        font-weight: 700;
        line-height: 1.15;
    }
</style>