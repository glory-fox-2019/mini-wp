<template>
  <div id="admin" class="container-fluid">
    <div class="row">
      <Nav :page="page" :userdata="userdata" @update:page="page = $event" @update:app:page="$emit('update:app:page',$event)" @logout:auth="logout()"></Nav>
      <div class="col main-content">
        <list-post v-if="page === 'list-post'" :posts="posts" @delete:post="deletePost($event)" @edit:post="loadEditPost($event)" @search="searchPost($event)" @show:post="$emit('show:post',$event)"></list-post>
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
      console.log('Fetch Post');
      axios.get('/user/posts',{
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        loader.hide();
        this.posts = data;
      })
      .catch(({response}) => {
        loader.hide();
        this.$swal({
          type: 'error',
          title: 'Oops...',
          text: response.data.error,
        })
      })
    },
    deletePost(id){
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
      axios.delete(`/user/posts/${id}`,{
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({data}) => {
          loader.hide();
          this.$swal({
            type: 'success',
            title: 'Success',
            text: data.message,
          })
          this.posts = this.posts.filter((el) => el._id !== id);
        })
        .catch(({response}) => {
          loader.hide();
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