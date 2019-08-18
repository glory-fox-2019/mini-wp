<template>
<div>
    <Navbar @to:list="fetchAll()" @to:list:user="fetchUserArticles()" @to:write="$emit('to:write')" @log:out="$emit('log:out')"></Navbar>
    <b-container>
      <b-row class="justify-content-center">
          <b-col cols="7">
               <h1 class="standout text-center" style="margin-top: 80px;">Your Articles</h1>
               <b-card no-body class="mt-4">
                   <b-form @submit.prevent="searchByTitle()">
                    <b-input-group>
                        <b-input v-model="keyword" type="text" size="sm"></b-input>
                        <b-input-group-append>
                            <b-button type="submit" variant="outline-primary" size="sm" class="px-4">
                                <font-awesome-icon icon="search"></font-awesome-icon>
                                Search
                            </b-button>
                        </b-input-group-append>
                    </b-input-group>
                    </b-form>
                </b-card>
                <hr>
                <div class="mb-5">
                    <Article
                    @search:tag="searchByTag($event)"
                    @article:update="$emit('article:update', $event)"
                    @article:delete="fetchAll()"
                    @to:article="$emit('to:article', $event)" v-for="a in articles" :key="a._id" :article="a"></Article>
                </div>
          </b-col>
      </b-row>
    </b-container>
</div>
</template>

<script>
import ax from '../config/axios'
import Navbar from '../components/NavbarList.vue'
import Article from '../components/Article.vue'
export default {
    data() {
        return {
            articles: [],
            keyword: ''
        }
    },
    components: {
        Navbar,
        Article
    },
    created() {
        this.fetchAll()
    },
    methods: {
        searchByTitle() {
            ax({
                url: '/articles',
                method: 'get',
                headers: { token: localStorage.getItem('token')}
            })
            .then(({ data }) => {
                this.articles = data
                this.articles = this.articles.filter(a => a.title.toLowerCase().includes(this.keyword))
            })
            .catch( err => {
                console.log(err)
            })
        },
        searchByTag(tagName) {
            ax({
                url: '/articles',
                method: 'get',
                headers: { token: localStorage.getItem('token')}
            })
            .then(({ data }) => {
                this.articles = data
                this.articles = this.articles.filter(a => {
                    for(let i = 0; i < a.tagsId.length; i++) {
                        if(a.tagsId[i].name == tagName){
                            return true
                        }
                    }
                    
                    return false
                })
            })
            .catch( err => {
                console.log(err)
            })
        },
        fetchAll(){
            ax({
                url: '/articles',
                method: 'get',
                headers: { token: localStorage.getItem('token')}
            })
            .then(({ data }) => {
                return this.articles = data
            })
            .catch( err => {
                console.log(err)
            })
        },
        fetchUserArticles(){
            ax({
                url: '/articles/user',
                method: 'get',
                headers: { token: localStorage.getItem('token')}
            })
            .then(({ data }) => {
                return this.articles = data
            })
            .catch( err => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>
    p {
        font-size: 0.8rem;
        text-align: justify;
    }
</style>