<template>
  <div class="container d-flex flex-column" style="margin-top:20px;">
    <div class="d-flex justify-content-center" style="padding-right: 10px">
      <small> <a href="#" @click.prevent="clickSubmit"> <i class="far fa-plus-square"> Publish </i> </a> </small>
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
                v-model="newArticle.title"
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
            <wysiwyg v-model="newArticle.content">
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      newArticle: {
        title: '',
        content: '',
        image: ''
      },
    }
  },

  methods: {

    clickSubmit(){
      let formData = new FormData()
      formData.append('title', this.newArticle.title)
      formData.append('content', this.newArticle.content)
      formData.append('image', this.newArticle.image)
      console.log(formData);
      this.caption= ""
      this.image= ""
      this.title= ""
      axios({
          method: "post",
          url: `http://localhost:3000/articles`,
          data: formData,
          headers:{
              token: localStorage.getItem('token')
          }
      })
      .then(({ data })=>{
          this.$emit('go-to-article-page', '')
      })
      .catch(err => {
        console.log(err);
      })
    },

    imageHandler(event){
      this.newArticle.image = event.target.files[0]
      console.log(this.newArticle.image);
    }
  }
}
</script>
  
<style>

</style>