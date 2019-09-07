<template>
  <div>
    <div>
      <input v-model="search" class="form-control mr-sm-2 mb-2" type="search" placeholder="Search by title..."
        aria-label="Search">
      <div v-for="article in data" :key="article._id" class="card mb-3">
        <div class="row article-cover">
          <div class="col-sm-3 d-flex align-self-stretch">
            <img class="card-img-top img-fluid cover-image" :src="article.fileUrl" alt="Card image cap">
          </div>
          <div class="col-sm-8">
            <div class="card-body">
              <h5 class="card-title author">{{article.UserId.name}}</h5>
              <h5 class="card-title articleTitle">{{article.title}}</h5>
              <div class="d-flex">
                <p v-for="(tag) in article.tags" :key="tag._id" class="tagName mr-3">{{tag.name}}</p>
              </div>
  
              <p v-line-clamp=7 class="card-text articleContent" v-html="(article.content)" style="max-height: 200px; "></p>
              
              <div class="d-flex">
                <a class="nav-font mr-2">{{article.updatedAt | moment('from')}}</a>
                <a @click.prevent="articleDetails(article._id)" class="nav-font mr-2"> &#128220; See full version </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ax from '../../config/axios'

export default {
  props:{
    data: Array
  },
  data(){
    return {
      allArticles: [],
      search: '',
    }
  },
  methods:{
    articleDetails(id){
      console.log('masuk details', id)
      this.$emit('changePage', 'articleDetails', id)
      // this.$emit('changePage', 'myArticle')
    }
  }
}
</script>

<style scoped>
  .author{
    font-family: 'Anton', sans-serif;
  }
  .articleTitle{
    font-family: 'Oswald', sans-serif;
  }
  .articleContent{
    font-family: 'Roboto Condensed', sans-serif;
  }
  .tagName {
    background-color: bisque;
    padding: 0 15px;
    border-radius: 10px
  }
</style>