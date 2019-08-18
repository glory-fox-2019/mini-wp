<template>
  <div id="dashboard">

    <ConfirmationDelete
      v-if="isShowConfirmation"
      @closeConfirmation="closeConfirmation"
      @deleteArticle="deleteArticle">
    </ConfirmationDelete>

    <section id="menu">
      <div id="profile">
        <div id="profile-image">
          <img src="../images/fox.png" alt="Josprima Sihombing">
        </div>
        <div id="profile-name">
          <h1> {{ userName }} </h1>
        </div>
        <div id="profile-sosmed">
          <a href="#" @click.prevent="logout">
            <i class="fas fa-sign-out-alt"></i> Logout
          </a>
        </div>
      </div>
      <nav>
        <a href="#" @click="showArticles">Articles</a>
        <a href="#" @click="showFormAddArticle">Add article</a>
      </nav>
    </section>

    <section id="content">
      <div id="content-body" v-show="isAdd">

        <div class="article-editor col-8">
          <form @submit.prevent="addArticle">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Judul artikel" required v-model="articleTitle">
            </div>
            <div class="form-group">
              <textarea id="summernote" name="editordata"></textarea>
            </div>
            <div class="form-group">
              <label>Featured-image :</label>
              <input type="file" class="form-control-file" ref="featuredImage" v-on:change="handleFeaturedImage" required>
            </div>
            <div class="alert alert-danger" role="alert" v-show="isError">
              <ul>
                <li v-for="(error, index) in errors" :key="index">
                  {{ error }}
                </li>
              </ul>
            </div>
            <button class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>

      <div id="content-body" v-if="isShow && articles.length < 1">
        <div class="emptyArticle">
          <div>
            <i class="far fa-folder-open"></i>
            <h2>You are not have article yet, try to add article</h2>
          </div>
        </div>
      </div>

      <div id="content-body" v-if="isShow && articles.length > 0">

        <div class="article" v-for="(article, index) in articles" :key="index">
          <div class="article-image">
            <img src="../images/thomas-willmott-DZ_CskWHcPk-unsplash.jpg">
          </div>
          <div class="article-text">
            <div class="article-text-summary">
              <h2>{{ article.title }}</h2>
              <div v-html="article.content"></div>
            </div>
            <div class="article-text-footer">
              <div class="article-action">
                <button class="btn secondary">
                  <i class="far fa-edit"></i>
                  <span>Edit</span>
                </button>
                <button class="btn third" @click="showConfirmation(article._id)">
                  <i class="far fa-trash-alt"></i>
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>

  </div>
</template>


<script>
import axios from 'axios'
import ConfirmationDelete from './ConfirmationDelete'

export default {
  data () {
    return {
      articles : [],
      isAdd : false,
      isShow : true,
      articleTitle : '',
      articleContent : '',
      featuredImage : '',
      articleId : '',
      isError :false,
      errors : [],
      userName : localStorage.getItem('userName'),
      isShowConfirmation : false
    }
  },
  created () {
    let token = localStorage.getItem('token')
    this.$emit('showLoading')
    axios.get('http://localhost:3000/dashboard', {
      headers : {
        token : token
      }
    })
    .then(({data}) => {
      this.$emit('hideLoading')
      this.articles = data
    })
    .catch(err => {
      this.$emit('hideLoading')
      if(err.response.status === 400) {
        this.$emit('logout')
      }
    })
  },
  methods : {
    showConfirmation (articleId) {
      this.articleId = articleId
      this.isShowConfirmation = true
    },
    closeConfirmation () {
      this.isShowConfirmation = false
    },
    deleteArticle () {
      this.isShowConfirmation = false
      this.$emit('showLoading')
      axios.delete(`http://localhost:3000/deleteArticle/${this.articleId}`,{
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        this.$emit('hideLoading')
        let newArticles = []
        for(let i=0;i<this.articles.length;i++) {
          if(this.articles[i]._id == this.articleId) {
          }else{
            newArticles.push(this.articles[i])
          }
        }
        this.articles = newArticles
      })
      .catch(err => {
        this.$emit('hideLoading')
        console.log(err)
      })
    },
    logout () {
      this.$emit('logout')
    },
    showArticles () {
      this.isShow = true
      this.isAdd = false
    },
    showFormAddArticle () {
      this.isShow = false
      this.isAdd = true
      $('#summernote').summernote({
        toolbar: [
          ['style', ['bold', 'italic', 'underline', 'clear']],
          ['font', ['strikethrough', 'superscript', 'subscript']],
          ['fontsize', ['fontsize']],
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['height', ['height']]
        ],
        height : 300
      })
    },
    addArticle () {
      this.$emit('showLoading')
      this.isError = false
      let formData = new FormData()
      formData.append('title', this.articleTitle)
      formData.append('content', $('#summernote').summernote('code'))
      formData.append('featuredImage', this.featuredImage)
      axios.post('http://localhost:3000/addArticle', formData, {
        headers : {
          token : localStorage.getItem('token'),
          'Content-Type' : 'multipart/form-data'
        }
      })
      .then(({data}) => {
        this.$emit('hideLoading')
        this.isError = false
        this.isShow = true
        this.isAdd = false
        this.articles.unshift(data)
      })
      .catch(err => {
        this.$emit('hideLoading')
        this.isError = true
        this.errors = err.response.data.message
      })
    },
    handleFeaturedImage () {
      this.featuredImage = this.$refs.featuredImage.files[0]
    }
  },
  components : {
    ConfirmationDelete
  }
}
</script>

<style scoped>
.article-editor{
  padding: 20px;
}
#title-article{
  font-size: 14pt;
  margin-bottom: 10px;
  border:none;
}
.emptyArticle{
  width: 100%;
  height: 100%;
  position: relative;
}
.emptyArticle div{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.emptyArticle div i{
  font-size: 72pt;
  color: #969696;
}
.emptyArticle div h2{
  color: #969696;
  font-size: 18pt;
}
#dashboard{
  font-family: 'Asap', sans-serif;
  color: rgb(58, 60, 61);
  background-image: url("../images/background.jpg") !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
}
a{
  text-decoration: none;
}
img{
  width: 100%;
  height: 100%;
}
 #dashboard{
  display: flex;
}

#menu{
  flex-basis: 300px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 10px;
  background-color: rgb(240, 240, 247);
}
#profile{
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 2px solid #ffffff;
}
#profile #profile-image{
  width: 75px;
  height: 75px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0px 4px 0px rgba(0,0,0,.2);
  margin: auto;
}
#profile #profile-name{
  text-align: center;
  margin-top: 30px;
  margin-bottom: 5px;
}
#profile #profile-sosmed{
  display: flex;
  justify-content: center;
}
#profile #profile-sosmed a{
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 4px 0px rgba(0,0,0,.2);
  padding: 5px 10px;
  border-radius: 5px;
  color: rgb(58, 60, 61);
}
#profile #profile-sosmed a:hover{
  box-shadow: 0px 2px 0px rgba(0,0,0,.2);
}
#profile #profile-sosmed a:not(:last-child){
  margin-right: 10px;
}
#menu nav{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 1;
}
#menu nav a{
  color: rgb(13, 71, 94);
  font-size: 15pt !important;
}
#menu nav a:hover{
  color: rgb(23, 100, 131);
}
#menu nav a:not(:last-child){
  margin-bottom: 30px;
}
#menu nav a.active{
  border-bottom: 2px solid rgb(13, 71, 94);
}
#content{
  flex-basis: 200px;
  flex-grow: 1;
  height: 100vh;
  padding: 10px 10px 0px 10px;
  display: flex;
  flex-direction: column;
}
#content #content-body{
  flex-basis: 200px;
  flex-grow: 1;
  overflow: auto;
  margin-top: 10px;
  border-radius: 5px;
  box-shadow: 0px 10px 20px rgba(0,0,0,.1);
  background-color: #ffffff;
}

.article{
  display: flex;
  padding: 10px;
}
.article:not(:last-child){
  margin-bottom: 10px;
}
.article .article-image{
  width: 200px;
  max-height: 200px;
  border-radius: 5px;
  background-color: rgb(216, 197, 197);
  box-shadow: 0px 10px 20px rgba(0,0,0,.1);
  margin-right: 10px;
  overflow: hidden;
}
.article .article-text{
  background-color: #ffffff;
  box-shadow: 0px 10px 20px rgba(0,0,0,.1);
  border-radius: 5px;
  flex-basis: 200px;
  padding: 10px;
  flex-grow: 1;
}
.article .article-text .article-text-summary{
  margin-top: 10px;
  margin-bottom: 10px;
}
.article .article-text .article-text-summary h2{
  margin-bottom: 5px;
}
.article-text-tag{
  display: flex;
}
.article-text-tag span{
  background-color: rgb(255, 205, 159);
  padding: 2px;
  border-radius: 5px;
  font-size: 10pt !important;
}
.article-text-tag span:not(:last-child){
  margin-right: 10px;
}
.article-text-footer{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.article-statistic{
  display: flex;
}
.article-statistic div:not(:last-child){
  margin-right: 10px;
}
.btn{
  padding: 3px 10px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 10px 20px rgba(0,0,0,.1);
  cursor: pointer;
  font-size: 10pt;
}
.btn i{
  color: #ffffff;
  margin-right: 5px;
}
.btn:hover{
  box-shadow: 0px 10px 25px rgba(0,0,0,.15);
}
.primary{
  background-color: #2e7be0;
  color: #ffffff;
  font-weight: bold;
  border: 2px solid #ffffffb0;
}
.primary:hover{
  background-color: #418cec;
}
.secondary{
  background-color: #48ca89;
  color: #ffffff;
  font-weight: bold;
  border: 2px solid #ffffffb0;
}
.secondary:hover{
  background-color: #57dd9a;
}
.third{
  background-color: #bba1ad;
  color: #ffffff;
  font-weight: bold;
  border: 2px solid #ffffffb0;
}
.third:hover{
  background-color: #c9aebb;
}
#profile-name h1{
  font-size: 12pt;
}
</style>