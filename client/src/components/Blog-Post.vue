<template>
  <div id="blog-post" class="content">
    <div class="container">
      <div class="post">
        <div class="post--content post--card">
          <div class="post--thumbnail">
            <img :src="post.thumbnail" alt="Thumbnail">
          </div>
          <div class="post--title">
            <h1>{{post.title}}</h1>
          </div>
          <div class="post--content">
            <p>{{post.description}}</p>
          </div>
          <div class="post--tag">
            <div class="post--tag--label">
              Tag:
            </div>
            <div class="tag--item" v-for="(tag,index) in post.tags" :key="index">
              {{ tag }}
            </div>
          </div>
        </div>
        <div class="post--account post--card">
          <div class="account--avatar">
            <div class="account--avatar__img" style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png')"></div>
          </div>
          <div class="account--detail">
            <p class="account--detail__avatar">Just Arya</p>
            <p class="account--detail__description">Author</p>
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
  data() {
    return {
      post: {},
    }
  },
  mounted(){
    this.fetchPost();
  },
  methods: {
    fetchPost(){
      axios.get(`/posts/${this.id}`)
      .then(({data}) => {
        console.log('test',data);
        this.post = data;
      })
      .catch(({response}) => {
        this.$swal({
          type: 'error',
          title: 'Oops...',
          text: response.data.error,
        })
      })
    }
  }
}
</script>