<template>
<div class="row pt-3">
    <div class="col col-12 col-sm-2 pl-4">
        <b-menu>
        <b-menu-list label="Navigate">
            
            <b-menu-item   @click.prevent="showAll" icon="information-outline" label="Latest Posts"></b-menu-item>
            <b-menu-item   @click.prevent="filterUser" icon="information-outline" label="My Articles"></b-menu-item>
            <b-menu-item   @click.prevent="filterFav" icon="information-outline" label="My Favourites"></b-menu-item>

        </b-menu-list>
        <b-menu-list label="">
            <b-menu-item @click.prevent="logout" label="Logout"></b-menu-item>
        </b-menu-list>
    </b-menu>
        <!-- <ul class=" sidebar navbar-nav" >
            <li class="nav-item active">
            <a @click.prevent="showAll" class="nav-link" href="#">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span>
            </a>
            </li>
            <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="pagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-fw fa-folder"></i>
                <span>Pages</span>
            </a>
            <div class="dropdown-menu" aria-labelledby="pagesDropdown">
                <h6 class="dropdown-header">Login Screens:</h6>
                <a class="dropdown-item" href="#">My Profile</a>
                <a class="dropdown-item" href="#">Logout</a>
                <h6 class="dropdown-header">Social</h6>
                <a class="dropdown-item" href="#">Private Messages</a>
            </div>
            </li>
            <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="pagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-fw fa-folder"></i>
                <span>Reader</span>
            </a>
            <div class="dropdown-menu" aria-labelledby="pagesDropdown">
                <h6 class="dropdown-header">Personalized:</h6>
                <a class="dropdown-item" @click.prevent="filterUser" href="#">Published</a>
                <a class="dropdown-item" @click.prevent="filterFav" href="#">Favourited</a>
                <h6 class="dropdown-header">By Tag:</h6>
                <a class="dropdown-item" href="#">Tags</a>
            </div>
            </li> 
        </ul> -->
    </div>

    <div  class="col col-12 col-sm-10 d-flex">
        <div v-if="mainContent" class="form-group col col-12 ">
            <div class="row mid contents d-flex justify-content-center">
                <!-- <input v-model="search" type="text" class="form-control col-sm-10" placeholder="Search Article "> -->
                <!-- <button class= "btn"><i class="fas fa-search"></i></button> -->
                <div class="article-list col col-sm-10" >
                    <ul class="list-group list-group-flush" >
                        <li  v-for="article in filteredList" :key="article._id" class="list-group-item">
                            <div class="row"  id="list-item">
                                <div class="col-10 row" @click="getDetails(article)" >
                                    <div class="col-2 pl-0 pr-0">
                                        <img :src="article.featuredImage" alt="image" height="70" width="120" >
                                    </div>
                                    <div class="col-10 pl-1">
                                        <h4 class="article-title">{{article.title}}</h4>
                                        <h6 v-show="currentUser._id == article.author._id">by <span style="color:blue">{{article.author.username}} <i class="far fa-user"></i></span></h6> 
                                        <h6 v-show="currentUser._id !== article.author._id">by <span style="color:grey">{{article.author.username}}</span></h6>   
                                    </div>                                 
                                </div>
                                <div  class="col col-2 m-0 p-0 row " >
                                    <button style="color: blue" v-if="article.favouritedBy.some(f=>{return f._id == currentUser._id})" v-on:click="addToFavourite(article._id)" class= "btn col-lg-4"> <i class="fas fa-star">{{article.favouritedBy.length}}</i> </button>  
                                    <button style="color: blue" v-else v-on:click="addToFavourite(article._id)" class= "btn col-lg-4">  <i class="far fa-star">{{article.favouritedBy.length}}</i> </button>  
                                    <button style="color: black" v-if="currentUser._id == article.author._id" v-on:click="editArticle(article)" class= "btn col-lg-4"><i class="fas fa-pen-square"></i></button>
                                    <button style="color: red" v-if="currentUser._id == article.author._id" v-on:click="deleteArticle(article._id)" class= "btn col-lg-4"><i class="fas fa-trash-alt"></i></button>                                    
                                </div>

                            </div>                                            
                                    <div class="row col-12 pt-3" >
                                            <b-button @click.prevent="filterByTag(tag)" v-for="(tag,index) in article.tags" :key="index" class="col-2 " size="is-small">{{tag}}</b-button>                                                   
                                    </div>                                       
                        </li>
                    </ul>
                </div>            
            </div>
            
        </div>
            <div class="col-12" v-if="detail">    
                <h1 @click="back" class="my-4">
                <i class="fa fa-chevron-circle-left"></i>
                </h1>         
                <div class="row">            
                    <div class="col-4">
                        <h1>{{currentArticle.title}}</h1>
                        <img class="img-fluid" :src="currentArticle.featuredImage" alt="cover  ">
                    </div>
                    <div class="col-md-8">
                        <button style="color: blue" v-if="currentArticle.favouritedBy.some(f=>{return f._id == currentUser._id})" v-on:click="addToFavourite(currentArticle._id)" class= "btn col-lg-4"> <i class="fas fa-star">{{currentArticle.favouritedBy.length}}</i> </button>  
                        <button style="color: blue" v-else v-on:click="addToFavourite(currentArticle._id)" class= "btn col-lg-4">  <i class="far fa-star">{{currentArticle.favouritedBy.length}}</i> </button>  
                        <h3 class="my-3">by <strong>{{currentArticle.author.username}}</strong></h3>
                        <p v-html="currentArticle.content" >
                        </p>
                        <div class="row col-12 pt-3" >
                                <b-button @click.prevent="filterByTag(tag)" v-for="(tag,index) in currentArticle.tags" :key="index" class="col-2 " size="is-small">{{tag}}</b-button>                                                   
                        </div>    
                    </div>        
            </div>
        
    
    </div>                      
        
        <articleForm
            v-show="isWriting"
            :postArticle = "postArticle"
            :currentUser = "currentUser"
        ></articleForm>

        <editForm
            v-show="isEditing"
            :article = "article"
            :submitEdit = "submitEdit"
        ></editForm>
    </div> 
</div>
</template>

<script>
import articleForm from './articleForm' 
import editForm from './editForm'
import axios from 'axios'

export default {
    props: [
        'currentUser', 
        'writeForm', 
        'editForm', 
         
        'isWriting', 
        'isEditing', 
        'postArticle', 
        'submitEdit', 
        'mainContent',
        'searchValue'
    ],
    components: {
        articleForm,
        editForm
    },
    data() {
        return {
            articles :[],
            article: null,
            filterByUser : false,
            filterFavourite : false,
            filterByTags: false,
            filterTagValue: "",
            //detail
            detail: false,
            currentArticle: {
                title: null,
                content: null,
                feautredImage: null,
                favouritedBy:[],
                tags: null,
                author: {
                    username: ""
                }
            }
        };
    },
    methods:{
        getAllArticles(){
            axios({
                method: "GET",
                url: `http://35.232.133.45/articles`,
                headers :{
                    token: localStorage.getItem('token')
                }
            })
            .then(({data}) =>{
                this.articles = data
            console.log("get all articles")
            })
            .catch(err=>{
                console.log(err)
            })
        },
        editArticle(article){
            this.article = article
            this.$emit('edit')
        },
        deleteArticle(articleId){
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            })
            .then((result) => {
            if (result.value) {
                axios({
                    method: "DELETE",
                    url: `http://35.232.133.45/articles/${articleId}`,
                    headers :{
                        token: localStorage.getItem('token')
                    }
                })
                .then(({data})=>{
                        Swal.fire({
                            position: 'top-end',
                            type: 'success',
                            title: 'Your article has been posted',
                            showConfirmButton: false,
                            timer: 1500
                            })
                        })
                .catch(err=>{
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        footer: err.message
                    })
                })
            }
        })
            
        },
        addToFavourite(articleId){
            axios({
                method: "PUT",
                url: `http://35.232.133.45/articles/fav/${articleId}`,
                data:{
                    userId : this.currentUser._id
                },
                headers :{
                    token: localStorage.getItem('token')
                }
            })
            .then(data=>{
                console.log("addedToFavourite")
                this.getAllArticles()
            })
            .catch(err=>{
                console.log(err)
            })   
        },
        getDetails(article){
            this.currentArticle = article
            this.detail = true
            this.$emit('hideList')
        },
        back(){
            this.detail = false
            this.$emit('showList')
        },
        //filters (sidebar)
        showAll(){
            this.filterByUser = false
            this.filterFavourite = false
        },
        filterUser(){
            this.filterByUser = true
            this.filterFavourite = false
            this.filterByTag = false

        },
        filterFav(){
            this.filterFavourite = true
            this.filterByUser = false
            this.filterByTag = false
        },
        filterByTag(tag){
            this.filterTagValue = tag
            this.filterByTags = true
            this.filterByUser = false
            this.filterFavourite = false
            this.detail = false
            this.$emit('showList')
        },
        logout(){
            this.$emit("logout")
        }
    },
    mounted(){
        this.getAllArticles()
    },
    computed: {
        filteredList() {
            const userId = this.currentUser._id
            if(this.filterByUser==true){
                return this.articles.filter(article=>{
                    return article.author._id  == userId
                })
                .filter(article => {
                    return article.title.toLowerCase().includes(this.searchValue.toLowerCase())
                })
                
            } else if (this.filterFavourite==true){
                return this.articles.filter(article=>{
                    return article.favouritedBy.some(f=>{
                        return f._id == userId
                    })
                })
                .filter(article => {
                    return article.title.toLowerCase().includes(this.searchValue.toLowerCase())
                })
            }else if (this.filterByTags==true){
                return this.articles.filter(article=>{
                    return article.tags.includes(this.filterTagValue)
                })
                .filter(article => {
                    return article.title.toLowerCase().includes(this.searchValue.toLowerCase())
                })
            } else{
                return this.articles.filter(article => {
                    return article.title.toLowerCase().includes(this.searchValue.toLowerCase())
                })
            }
        }
    },
    watch:{
        mainContent: function(newVal, oldVal){
            if(newVal ==true){
                this.getAllArticles()
            }
        },
        noFilter: function(newVal, OldVal){
            if(newVal == true){
                this.getAllArticles()
            }
        }
    }
};
</script>

<style scoped>
.list-group-item:hover{
    background-color: lightgray
}
</style>

