<template>
  <div>
    
    <div v-for="article in ownArticle" :key="article._id" class="card mb-3">
      <div class="row article-cover">
        <div class="col-sm-3 d-flex align-self-stretch">
          <img class="card-img-top img-fluid cover-image" :src="article.fileUrl" alt="Card image cap">
        </div>
        <div class="col-sm-8">
          <div class="card-body">
            <h5 class="card-title articleTitle">{{article.title}}</h5>
            <div class="d-flex">
              <p v-for="(tag) in article.tags" :key="tag._id" class="tagName mr-3">{{tag.name}}</p>
            </div>
            <p v-line-clamp=7 class="card-text articleContent" v-html="(article.content)" style="max-height: 200px; "></p>
          </div>

          <div class="ml-3">
            <a class="mr-2 mb-2">{{article.updatedAt | moment('from')}}</a>
          </div>
          
          <div class="ml-3">
            <a @click.prevent="articleDetails(article._id)" class="nav-font mr-2"> &#128220; See full version </a>
            <a @click.prevent="editArticle(article._id)" class="nav-font mr-2"> &#10000; Edit </a>
            <a @click.prevent="deleteArticle(article._id)" class="nav-font"> &#128465; Delete</a>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import ax from '../../config/axios'

export default {
  data(){
    return {
      ownArticle: []
    }
  },
  created(){
    ax({
      url: `/articles/own`,
      method: `get`,
      headers: {
        'token': localStorage.getItem('token')
      }
    })
      .then(({ data }) => {
        
        this.ownArticle = data
        console.log('ini own article', this.ownArticle)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    articleDetails(id){
      
      this.$emit('changePage', 'articleDetails', id)
    },
    deleteArticle(id){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        console.log('======= delete', id)
        if (result.value) {
          ax({
            url: `/articles/${id}`,
            method: 'delete',
            headers: {
            'token': localStorage.getItem('token')
            }
          })
            .then(({data})=>{
              this.refresh()
              Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Post has been deleted',
                showConfirmButton: false,
                timer: 1500
              })
            })
            .catch((err)=>{
              console.log(err)
            })

        }
      })
      .catch((err)=>{
        console.log(err)
      })

    },
    editArticle(id){
      ax({
        url: `/articles/article/${id}`,
        method: `get`,
        headers: {
        'token': localStorage.getItem('token')
        }
      })
        .then(({data})=>{
          this.$emit('changePage', 'editArticle', data)
          // this.changePage('editArticle')
          // this.edit = data
        })
        .catch((err)=>{
          console.log(err)
        })
    },
    refresh(){
      ax({
        url: `/articles/own`,
        method: `get`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          
          this.ownArticle = data
          console.log('ini own article', this.ownArticle)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
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