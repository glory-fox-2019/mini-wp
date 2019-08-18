<template>
  <div id="create-post">
    <div class="container">
      <div class="title">
        <h2>Create Post</h2>
      </div>
      <div class="editor">
        <form @submit.prevent="">
          <div class="row">
            <div class="col-12 col-md-8">
              <div class="editor--title">
                <input type="text" name="title" placeholder="Title" v-model="post.title" autocomplete="off" required>
              </div>
              <div class="editor--content">
                <editor v-model="post.content"></editor>
              </div>
              <div class="editor--submit">
                <a href="javascript:void(0)" class="btn" @click.prevent="$emit('update:page','list-post')">Cancel</a>
                <button type="submit" class="btn btn-primary" @click="saveCreatePost()">Save Post</button>
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
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../../config/axios';
export default {
  data(){
    return {
      post:{
        title: '',
        content: '',
        thumbnail: '',
        tags: [],
      },
      input:{
        tagInput: '',
        thumbnailInput: '',
      },
      load: true,
    }
  },
  methods: {
    addTag(){
      this.post.tags.push(this.input.tagInput);
      this.input.tagInput = '';  
    },
    removeTag(i){
      console.log('test')
      this.post.tags.splice(i,1);
    },
    saveCreatePost(){
      let loader = this.$loading.show({
        // Optional parameters
        container: this.$refs.loadingContainer,
        canCancel: false,
        loader: 'spinner',
        width: 150,
        height: 150,
        color: '#1A75FF',
        backgroundColor: '#ffffff',
        opacity: 0.5,
        zIndex: 999,
      });


      let formData = new FormData();
      formData.append('title', this.post.title);
      formData.append('photo', this.post.thumbnail);
      formData.append('content', this.post.content);
      formData.append('tags', JSON.stringify(this.post.tags));
      
      axios.post('/user/posts',formData, {
          headers: {
            'token': localStorage.getItem('token'),
            'Content-Type':'multipart/form-data',
          }
        })
        .then(({data}) => {
          loader.hide();
          console.log('post created', data);
          this.$emit('update:page','list-post');
          this.$emit('add:post',data);
        })
        .catch(({response}) => {
          loader.hide();
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
        }
        reader.readAsDataURL(input.files[0]);
      }
    },
  }
}
</script>