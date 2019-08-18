<template>
<div>
  <b-card title="Create New Post" class="mb-2">
    <form @submit.prevent="createArticle()">
      <div class="form-group">
        <label class="title" for="formCreate-name">Title</label>
        <input v-model="article.title" type="text" class="form-control" placeholder="put your title here...">
      </div>
      <tags-input element-id="tags"
        v-model="article.tags"
        :existing-tags="available"
        :typeahead="true"></tags-input>
      <div class="form-group">
        <!-- <wysiwyg v-model="article.content"></wysiwyg> -->
        <tinymce-editor v-model="article.content" api-key="1d9hzq7843jfpu3bcfhtzccsin7i1j0iz4k6vxg9pl1ridhc" :init="{plugins: 'wordcount',menubar:false}"></tinymce-editor>
      </div>
      <div class="custom-file">
        <input @change="inputFile" type="file" class="custom-file-input" id="customFile">
        <label class="custom-file-label" for="customFile">Choose file</label>
      </div>
       <p><sub>Upload an image is required</sub></p>  
      <button type="submit" class="btn btn-primary mt-2">Submit</button>
    </form>
  </b-card>

</div>

</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import ax from '../../config/axios'
import VoerroTagsInput from '@voerro/vue-tagsinput';

export default {
  props:{
    available: Array
  },
  data(){
    return {
      article:{
        title: '',
        tags: [],
        content: '',
        file: ''
      },
      tagList: ''
    }
  },
  components: {
    'tinymce-editor': Editor,
    'tags-input': VoerroTagsInput
  },
  methods:{
    // ================== Penting untuk upload image ================== 
    inputFile(e) {
      this.article.file = e.target.files[0]
    },
    createArticle() {
      let arr = []
      for (let i=0; i<this.article.tags.length; i++){
        arr.push(this.article.tags[i].value)
      }
      if (this.article.tags.length === 0){
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `tags cannot be empty`,
          })
      }
      else {
        let formData = new FormData()
        formData.append('title', this.article.title)
        formData.append('content', this.article.content)
        formData.append('file', this.article.file)
        formData.append('tags', arr)
        this.$emit('loading', true)
        ax({
          url: `/articles/create`,
          method: `post`,
          data: formData,
          headers: {
          'token': localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            // this.dataDefault()
            // this.page = 'listArticle'
            this.$emit('refreshTag')
            this.$emit('changePage', 'myArticle')
            this.$emit('loading', false)
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Post has been created',
              showConfirmButton: false,
              timer: 1500
            })
          })
          .catch((err) => {
            this.$emit('loading', false)
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: `${(err.response.data.message).substr(27)}`,
            })
          })
      }
      
    },
  }
}
</script>

<style>

</style>