<template>
  <div id="admin" class="container-fluid">
    <div class="row">
      <Nav :page="page" :userdata="userdata" @update:page="page = $event" @logout:auth="logout()"></Nav>
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
  props: ['userdata'],
  components: {Nav,ListPost,CreatePost,EditPost},
  data(){
    return {
      page: 'list-post',
      search: '',
      posts:[],
      edit: {
        id: '',
      },
    }
  },
  mounted(){
    this.fetchPost();
  },
  methods: {
    searchPost(keyword){
      let url = encodeURI(keyword);
      axios.get(`/user/posts?search=`+url,{
        headers: {
          token: localStorage.getItem('token')
        }
      })
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
    fetchPost(){
      console.log('Fetch Post');
      axios.get('/user/posts',{
        headers: {
          token: localStorage.getItem('token')
        }
      })
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
      axios.delete(`/user/posts/${id}`,{
        headers: {
          token: localStorage.getItem('token')
        }
      })
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
    },
    logout(){
      this.posts = [];
      this.search = '';
      this.$emit('logout:auth');
    }
  }
}
</script>