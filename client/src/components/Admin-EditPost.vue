<template>
  <div id="create-post">
    <div class="container">
      <div class="title">
        <h2>Edit Post</h2>
      </div>
      <div class="editor">
          <div class="row">
            <div class="col-12 col-md-8">
              <div class="editor--title">
                <input type="text" name="title" placeholder="Title" v-model="post.title" autocomplete="off">
              </div>
              <div class="editor--content">
                <editor v-if="fetch" v-model="post.content" :value="post.content"></editor>
              </div>
              <div class="editor--submit">
                <button type="submit" class="btn btn-primary" @click="saveEditPost()">Save Post</button>
              </div>
            </div>
            <div class="col-12 col-md-4">
              <div class="editor--thumbnail">
                <div class="editor--thumbnail__image">
                  <img :src="input.thumbnailInput">
                </div>
                <div class="editor--thumbnail__input">
                  <div class="custom-file">
                    <input type="file" class="custom-file-input" ref="file" @change="handleImage" accept="image/*">
                    <label class="custom-file-label" for="customFile" >Choose thumbnail</label>
                  </div>
                </div>
              </div>
              <div class="editor--tag">
                <div class="editor--tag__input">
                  <span class="editor--tag__input__label">
                    <label for="">Tag</label>
                  </span>
                  <div class="editor--tag__input__form">
                    <input type="text" name="tag" @keyup.enter="addTag()" v-model="input.tagInput">
                  </div>
                </div>
                <div class="editor--tag__item--list">
                  <div class="editor--tag__item" v-for="(data,i) in post.tags" :key="data._id">{{ data }} <a @click="removeTag(i)">&times;</a></div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from '../../config/axios';
export default {
  props: ['id'],
  data(){
    return {
      fetch: false,
      post:{
        title: '',
        content: '',
        oldThumbnailUrl: '', //url
        thumbnail: '', //file
        tags: [],
      },
      input:{
        tagInput: '',
        isUpdateThumbnail: false,
        thumbnailInput: '',
      }
    }
  },
  mounted() {
    this.fetchPost();
  },
  methods: {
    fetchPost(){
      axios.get('/posts/'+this.id)
        .then(({data}) => {
          this.post.title = data.title;
          this.post.content = data.content;
          this.post.thumbnail = '';
          this.post.tags = data.tags;
          this.post.oldThumbnailUrl = data.thumbnail;
          this.input.thumbnailInput = data.thumbnail;
          this.fetch = true;
        })
        .catch(({response}) => {
          this.$swal({
            type: 'error',
            title: 'Oops...',
            text: response.data.error
          })
          this.$emit('update:page','list-page');
        })
    },
    addTag(){
      this.post.tags.push(this.input.tagInput);
      this.input.tagInput = '';  
    },
    removeTag(i){
      console.log('test')
      this.post.tags.splice(i,1);
    },
    saveEditPost(){
      let formData = new FormData();
      formData.append('title', this.post.title);
      if(this.post.oldThumbnailUrl) formData.append('oldThumbnail',this.post.oldThumbnailUrl);
      if(this.input.isUpdateThumbnail) formData.append('photo', this.post.thumbnail);
      formData.append('isUpdateThumbnail', this.input.isUpdateThumbnail);
      formData.append('content', this.post.content);
      formData.append('tags', JSON.stringify(this.post.tags));
      
      axios.put('/posts/'+this.id,formData, {
          headers: {
            'token': localStorage.getItem('token'),
            'Content-Type':'multipart/form-data',
          }
        })
        .then(({data}) => {
          this.$emit('update:page','list-post');
          this.$emit('update:post',data);
          console.log(data);
        })
        .catch(({response}) => {
          this.$swal({
            type: 'error',
            title: 'Oops...',
            text: response.data.error
          })
        })
    },
    handleImage(event){
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.input.thumbnailInput  = e.target.result;
          this.post.thumbnail = this.$refs.file.files[0];
          this.input.isUpdateThumbnail = true;
        }
        reader.readAsDataURL(input.files[0]);
      }
    },
  }
}
</script>