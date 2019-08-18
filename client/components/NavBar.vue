<template>
    <div class="wrapper">
        <header>
                <nav class="mynav">
                    <div class="nav-item nav-left">
                        <div class="logo nav-left-item">
                            <div class="logo-box">
                                <img id="logo" src="../img/wordtiv.png" alt="logo">
                            </div>
                        </div>
                        <div class="nav-left-item">
                            <i class="fas fa-book-reader"></i> Reader
                        </div>
                    </div>
                    <div class="nav-item nav-right">
                        <div class="nav-right-item">
                            <div class="write-button">                        
                                <i class="far fa-edit"></i> Write
                            </div>
                        </div>
                        <div class="nav-right-item">
                            <img src="../img/icons8-color-50.png" alt="user">
                        </div>
                        <div class="nav-right-item">
                            <i class="far fa-envelope"></i>
                        </div>
                        <div class="nav-right-item">
                            <button id="signout" @click="signOut()">Sign Out</button>
                        </div>
                    </div>
                </nav>
            </header>
        <div class="container">
            <div class="side-bar">
                <p>{{user.split(" ")[0]}}'s Dashboard</p>
                <ul class="side-menu">
                    <li @click="changePage('dashboard')"><i class="fas fa-list-alt"></i> Blog Posts</li>
                    <li @click="changePage('makepage')"><i class="fas fa-pencil-alt"></i> Add Article</li>
                </ul>
            </div>
            <ArticleList 
                v-bind:page="page" 
                v-bind:filteredArticles="filteredArticles"
                v-bind:postedArticles="postedArticles"
                v-on:deleteArticle="removeArticle"
                v-on:searchArticle="searchArticle"
                v-on:getData="getArticle"
                v-on:changePage="changePage"
                v-on:editArticle="editArticle"
            ></ArticleList>

            <WriteArticle 
                v-bind:page="page"
                v-on:postArticle="addArticle"
            ></WriteArticle>

            <EditArticle
                v-bind:page="page"
                v-bind:editData="editData"
                v-on:postArticle="getUserArticle"
            ></EditArticle>
        </div>
    </div>
</template>

<script>
import ArticleList from './ArticleList.vue'
import WriteArticle from './WriteArticle.vue'
import EditArticle from './EditArticle.vue'

export default {
    data() {
      return {
        user: localStorage.getItem('user'),
        page: "dashboard",
        filter: "",
        postedArticles: [],
        filteredArticles: [],
        editData: {}
      }  
    },
    methods: {
        signOut() {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out.');
            });
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                Swal.fire(
                    'Logging Out',
                    'You are now logged out',
                    'info'
                )
                this.$emit('logout', false)
        },
        changePage(page) {
            this.page = page
        },
        removeArticle(id) {
            this.postedArticles = this.postedArticles.filter(artikel => artikel._id !== id)
            this.filteredArticles = this.filteredArticles.filter(artikel => artikel._id !== id)
        },
        searchArticle(name) {
            this.filteredArticles = this.postedArticles.filter(art => name.test(art.title))
        },
        getArticle(art) {
            this.postedArticles = art
            this.filteredArticles = art
        },
        addArticle(art) {
            this.filteredArticles.unshift(art.data)
            // this.postedArticles.unshift(art.data)
            this.page = art.page
        },
        editArticle(info) {
            this.page = info.page
            this.editData = info
        },
        getUserArticle(page) {
            this.page = page
            axios.get('http://35.247.138.16/articles', {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({data}) => {
                this.filteredArticles = data
                this.postedArticles = data
            })
            .catch(console.log)
            }
    },
    components: {
        ArticleList,
        WriteArticle,
        EditArticle
    }
}
</script>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #f7f9f8;
}

.mynav {
    display: flex;
    justify-content: space-between;
    background-color: #35b0ab;
    width: 100%;
    height: 55px;
    z-index: 2;
    padding: 0 !important;
    flex-basis: 100px;
}

.mynav .nav-item {
    display: flex;
    align-items: center;
}

.nav-right {
    margin-right: 25px;
}

.nav-right-item, .nav-left-item {
    margin: 3px 10px;
}

.nav-left-item {
    color: #083f3f
}

.fa-envelope {
    font-size: 33px;
    padding: 5px;
    border-radius: 50%;
    background-color: #5ebbd4;
}

.fa-edit {
    font-weight: 600;
}

.logo-box {
    /* overflow: hidden; */
    width: 85px;
    height: 55px;
}

#logo {
    height: 150%;
    margin-top: -12px;
}

.write-button {
    border: 1px solid #c1dfe7;
    padding: 8px 12px;
    background-color: white;
    border-radius: 7px;
    color: #35b0ab;    
    box-sizing: border-box;
}

.side-bar p {
    color: #15726f;
    margin: 8px;
    font-weight: 600;
}

#signout {
    transition: 0.4s;
    background-color: #15726f;
    height: 45px;
    width: 70px;
    border-radius: 8px;
    color: #def1f6;
    border: 1px solid #35b0ab;
    cursor: pointer;
    font-weight: 500;
}

#signout:hover {
    color: #35b0ab;
    background-color: #def1f6;
}
</style>