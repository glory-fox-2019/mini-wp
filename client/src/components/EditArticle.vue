<template>
  <div>
    <b-card title="Edit Post" class="mb-2">
      <form @submit.prevent="updateArticle(data._id)">
        <div class="form-group">
          <label class="title" for="formCreate-name">Title</label>
          <input v-model="edit.title" type="text" class="form-control" placeholder="put your title here...">
        </div>
        <tags-input element-id="tags"
          v-model="edit.tags"
          :existing-tags="available"
          :typeahead="true"></tags-input>
        <div class="form-group">
          <!-- <wysiwyg v-model="article.content"></wysiwyg> -->
          <tinymce-editor v-model="edit.content" api-key="1d9hzq7843jfpu3bcfhtzccsin7i1j0iz4k6vxg9pl1ridhc" :init="{plugins: 'wordcount',menubar:false}"></tinymce-editor>
        </div>
        <div class="custom-file">
          <input @change="inputFile" type="file" class="custom-file-input" id="customFile">
          <label class="custom-file-label" for="customFile">Choose file</label>
        </div>
        <button type="submit" class="btn btn-primary mt-2">Submit</button>
      </form>
    </b-card>
  </div>

</template>

<script>
import ax from '../../config/axios'
import Editor from '@tinymce/tinymce-vue'

export default {
  props:{
    data: Object,
    available: Array
  },
  components: {
    'tinymce-editor': Editor,
    'tags-input': VoerroTagsInput
  },
  data(){
    return {
      edit:{
        title: '',
        tags: [],
        content: '',
        file: ''
      }
    }
  },
  methods: {
    inputFile(e) {
      this.edit.file = e.target.files[0]
    },
    updateArticle(id){
      let arr = []
      for (let i=0; i<this.edit.tags.length; i++){
        arr.push(this.edit.tags[i].value)
      }
      if (this.edit.tags.length === 0){
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `tags cannot be empty`,
          })
      }
      else {
        console.log('ini edit', this.edit)
        console.log('masuk submit id', id)
        let formData = new FormData()
        formData.append('title', this.edit.title)
        formData.append('content', this.edit.content)
        formData.append('file', this.edit.file)
        formData.append('tags', arr)
        this.$emit('loading', true)
        ax({
          url: `/articles/${id}`,
          method: `patch`,
          data: formData,
          headers: {
          'token': localStorage.getItem('token')
          }
        })
          .then(({data})=>{
            this.$emit('refreshTag')
            this.$emit('changePage', 'myArticle')
            this.$emit('loading', false)
            Swal.fire('data has been updated')

          })
          .catch((err)=>{
            console.log(err)
            this.$emit('loading', false)
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: `${(err.response.data.message)}`,
            })
          })
        }
    },
  },
  created(){
    console.log('ini tag availabe', this.available)
    ax({
      url: `/articles/article/${this.data._id}`,
      method: 'get',
      headers: {
        'token': localStorage.getItem('token')
      }
    })
      .then(({data})=>{
        this.edit.title = data.title
        
        this.edit.content = data.content
        this.fileUrl = data.fileUrl
        let arr = []
        for (let value of data.tags){
          arr.push({
            key: value.name.name,
            value: value.name
          })
        }
        this.edit.tags = arr
        // console.log('==========', arr)
      })
      .catch((err)=>{
        console.log(err)
      })
  }
}
</script>

<style>

</style>