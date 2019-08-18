<template>
  <div id="blog">
    <Nav @update:page="page = 'blog-home'" @search:post="searchPost($event)" @update:app:page="$emit('update:app:page',$event)" :isLogin="isLogin"></Nav>
    <Home v-if="page === 'blog-home'" :posts="posts" @show:post="showPost($event)"></Home>
    <Post v-if="page === 'blog-post'" :id="postId"></Post>
    <Footer></Footer>
  </div>
</template>
<script>
import axios from '../../config/axios';
import Nav from './Blog-Nav';
import Home from './Blog-Home';
import Post from './Blog-Post';
import Footer from './Blog-Footer';
export default {
  components: {Nav,Home,Post,Footer},
  props: ['showpost','isLogin'],
  data(){
    return {
      posts:[],
      page: 'blog-home',
      postId: '',
    }
  },
  mounted(){
    this.fetchPosts();
    if(this.showpost){
      this.page = 'blog-post',
      this.postId = this.showpost;
    }
  },
  methods: {
    fetchPosts(){
      axios.get('/posts')
        .then(({data}) => {
          this.posts = data;
        })
        .catch(({response}) => {
          this.$swal({
            type: 'error',
            title: 'Oops...',
            text: response.data.error,
          })
        })
    },
    showPost(id){
      this.page = 'blog-post',
      this.postId = id;
    },
    searchPost(keyword){
      console.log(keyword)
      axios.get('/posts?search='+keyword)
        .then(({data}) => {
          this.posts = data;
        })
        .catch(({response}) => {
          this.$swal({
            type: 'error',
            title: 'Oops...',
            text: response.data.error,
          })
        })
    }
  },
  watch: {
    showpost(val){
      console.log('showpost',val)
      if(val){
        this.page = 'blog-post',
        this.postId = id;
      }
    }
  }
}
</script>