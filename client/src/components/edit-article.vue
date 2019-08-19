<template>
  <div class="container d-flex flex-column" style="margin-top:20px;">
    <div class="d-flex justify-content-center" style="padding-right: 10px">
      <small> <a href="#" @click.prevent="submitEdit"> <i class="fas fa-pen-square"> Edit </i> </a> </small>
    </div>
    <hr>
    <div class="d-flex justify-content-center">
      <form action="" enctype="multipart/form-data">
      <div class="d-flex flex-column" style="width: 100%">
        <div class="form-group">

          <div class="form-group">
            <input type="text" 
              class="form-control" 
              placeholder="Enter title" 
              v-model="editArticle.title"
              value="title"
              style="height: 50px; font-size: 20px; text-align: center;">
          </div>

          <div class="d-flex justify-content-between" style="margin-bottom: 10px">
            <div> 
              <input 
                type="file" 
                name="image"
                ref="file"
                accept="image/*"
                v-on:change="imageHandler"  
              >
            </div>
            <div>
              <label for="tags">Tags:</label>
              <input type="text" placeholder="Eg. Business, Design">
            </div>
          </div>
          <wysiwyg v-model="editArticle.content">
        </div>
      </div>
    </form>
    </div>
  </div>
</template>

<script>
export default {

  props: ["someId"],

  data(){
    return {
      editArticle: {
        title: '',
        content: '',
        image: ''
      },
    }
  },

  methods: {
    imageHandler(event){
      this.newArticle.image = event.target.files[0]
    },

    submitEdit(){
      axios({
        method: 'patch',
        url: `http://localhost:3000/articles/${this.someId}`,
        data: this.editArticle,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(response => {
        this.$emit('go-to-article-page', '')
        Swal.fire(
          'success edited',
          'edited!',
          'success'
        )
      })
      .catch(err => {
        console.log(err);
      })
    }

  },

  mounted() {
    axios({
      method: 'get',
      url: `http://localhost:3000/articles/${this.someId}`,
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({ data }) => {
      this.editArticle.title = data.title
      this.editArticle.content = data.content
    })
    .catch(err => {
      console.log(err);
    })
  }

}
</script>

<style>

</style>