<template>
  <div>
    <b-card-group deck>
      <b-card :img-src="article.fileUrl" img-alt="Card image" img-top>
        <div class="card-body">
          <h5 class="card-title author">Author: {{name}}</h5>
          <h5 class="card-title articleTitle">{{article.title}}</h5>
          <p class="card-text articleContent" v-html="(article.content)"></p>
        </div>
      </b-card>
    </b-card-group>
  </div>

</template>

<script>
import ax from '../../config/axios'

export default {
  props:{
    data: String
  },
  data(){
    return {
      article:{
        title: '',
        tags: [],
        content: '',
        fileUrl: ''
      },
      name: ''
    }
  },
  methods: {

  },
  created(){
    ax({
      url: `/articles/article/${this.data}`,
      method: 'get',
      headers: {
        'token': localStorage.getItem('token')
      }
    })
      .then(({data})=>{
        this.article.title = data.title
        this.article.tags = data.tags
        this.article.content = data.content
        this.article.fileUrl = data.fileUrl
        this.name = data.UserId.name
        console.log('masuk data details', data)
      })
      .catch((err)=>{
        console.log(err)
      })
  }
}
</script>

<style>
  .author{
    font-family: 'Anton', sans-serif;
  }
  .articleTitle{
    font-family: 'Oswald', sans-serif;
  }
  .articleContent{
    font-family: 'Roboto Condensed', sans-serif;
  }
</style>