<template>
    <div id="content" class="content" v-if="page === 'dashboard'">
        <div class="content-header">
            <div class="article-header">
                <div class="publish-draft-header">
                    <div class="inside-article-header">Published</div>
                    <div class="inside-article-header">Drafts</div>
                    
                </div>
                <div class="search-header">
                    <input v-model="filter" type="text" placeholder="Filter Article" autofocus>
                    <i class="fas fa-search inside-article-header"></i>
                </div>
            </div>
        </div>
        <div v-show="filteredArticles.length" class="content-article">
            <ArticleListItem 
                v-bind:art="art" 
                v-for="(art, index) in filteredArticles" 
                :key="index" 
                v-on:deleteAnArticle="removeArticle"
                v-on:editArticle="editArticle"
                />
        </div>
        <div class="no-articles" v-if="postedArticles.length < 1">
            <h2>You don't have any articles yet. <a href="" @click.prevent="makePage">Click here</a> to make one</h2>
        <div>
    </div>
</template>

<script>
import ArticleListItem from './ArticleListItem'
export default {
    data() {
        return {
            filter: ""
        }
    },
    props: ['page', 'filteredArticles', 'postedArticles'],
    components: {
        ArticleListItem
    },
    methods: {
        removeArticle(id) {
            this.$emit('deleteArticle', id)
        },
        makePage() {
            this.$emit('changePage', 'makepage')
        },
        editArticle(data) {
            this.$emit('editArticle', data)
        }
    },
    watch: {
        filter: function(newStr, oldStr) {
            let similarStr = new RegExp(newStr, 'i')
            this.$emit('searchArticle', similarStr)
        }
    },
    mounted() {
        console.log(localStorage.getItem('token'))
        axios.get('http://localhost:3000/articles', {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then(({data}) => {
            this.$emit('getData', data)
        })
        .catch(console.log)
    }
}
</script>

<style scoped>

.content-article {
    margin: 20px;
    height: 63vh;
    overflow-y: scroll;
    /* box-shadow: 0 0px 20px #65b1b2; */
    background-color: #e6f2ff;
}

.article-header {
    width: 706px;
    height: 60px;
    margin: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #eff5fd;
    box-sizing: border-box;
    box-shadow: 0px 8px 13px 0px rgb(163, 190, 195);
}

.publish-draft-header {
    display: flex;
}

.publish-draft-header .inside-article-header {
    transition: 0.5s;
}

.publish-draft-header .inside-article-header:hover {
    background-color: #1fc2bc;
}

.inside-article-header {
    padding: 20px;
}

.no-articles {
    margin: 30px;
    color: rgb(52, 52, 138);
}

</style>