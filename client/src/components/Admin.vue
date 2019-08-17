<template>
  <div id="admin" class="container-fluid">
    <div class="row">
      <Nav :page="page" @update:page="page = $event"></Nav>
      <div class="col main-content">
        <list-post v-if="page === 'list-post'" :posts="posts" @delete:post="deletePost($event)" @edit:post="loadEditPost($event)" @search="searchPost($event)"></list-post>
        <create-post v-if="page === 'create-post'" @add:post="posts.push($event)" @update:page="page = $event"></create-post>
        <edit-post v-if="page === 'edit-post'" :id="edit.id" @update:page="page = $event" @update:post="updatePost($event)"></edit-post>
      </div>
    </div>
  </div>
</template>
<script>
import axios from '../../config/axios';
import Nav from './Admin-Nav';
import ListPost from './Admin-ListPost';
import CreatePost from './Admin-CreatePost';
import EditPost from './Admin-EditPost';
export default {
  components: {Nav,ListPost,CreatePost,EditPost},
  data(){
    return {
      baseUrl: 'http://localhost:3000/api',
      page: 'list-post',
      search: '',
      posts:[],
      edit: {
        id: '',
      },
    }
  },
  mounted(){
    axios.get('/posts')
      .then(({data}) => {
        console.log(data);
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
  methods: {
    searchPost(keyword){
      let url = encodeURI(keyword);
      axios.get(`/posts?search=`+url)
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
    deletePost(id){
      axios.delete(`/posts/${id}`)
        .then(({data}) => {
          this.$swal({
            type: 'success',
            title: 'Success',
            text: data.message,
          })
          this.posts = this.posts.filter((el) => el._id !== id);
        })
        .catch(({response}) => {
          this.$swal({
            type: 'error',
            title: 'Oops...',
            text: response.data.error,
          })
        })
    },
    loadEditPost(id){
      this.page = 'edit-post';
      this.edit.id = id;
    },
    updatePost(data){
      let index = this.posts.findIndex((el) => {
        return el._id == data._id 
      })
      this.posts[index] = data;
    }
  }
}
</script>