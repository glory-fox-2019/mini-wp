new Vue({
  el: '#app',
  components: {
    wysiwyg: vueWysiwyg.default.component,
  },
  data: {
    baseUrl: 'http://localhost:3000/api',
    page: 'list-post',
    isLogin: false,
    isAdmin: false,
    search: '',
    auth:{
      token: localStorage.getItem('token'),
      email: '',
      username: '',
      password: '',
      name: '',login
    },
    posts:[],
    post:{
      title: '',
      content: '',
      thumbnail: '',
      tags: [],
    },
    input:{
      tagInput: '',
      thumbnailInput: '',
    }
  },
  mounted(){
    this.checkLogin(() => {
      if(this.isLogin && this.isAdmin){
        axios({
          url:`${this.baseUrl}/posts`,
          method:'get',
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({data}) => {
          console.log(data);
          this.posts = data;
        })
        .catch(({response}) => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: response.data.error,
          })
        })      
      }
    });

  },
  methods: {
    searchPost(){
      axios({
        url:`${this.baseUrl}/posts?search=`+this.search,
        method:'get',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        this.posts = data;
      })
      .catch(({response}) => {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: response.data.error,
        })
      })
    },
    changePage(page){
      this.page = page;
    },
    isActive(page){
      return this.page === page
    },
    addTag(){
      this.post.tags.push(this.input.tagInput);
      this.input.tagInput = '';  
    },
    removeTag(i){
      console.log('test')
      this.post.tags.splice(i,1);
    },
    saveCreatePost(){
      let formData = new FormData();
      formData.append('title', this.post.title);
      formData.append('photo', this.post.thumbnail);
      formData.append('content', this.post.content);
      formData.append('tags', this.post.tags);
      axios({
        url: `${this.baseUrl}/posts`,
        method: 'post',
        data: formData,
        headers: {
          'Content-Type':'multipart/form-data',
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        this.page = 'list-post'
        this.posts.push(data);
        this.clearPost();
      })
      .catch(({response}) => {
        Swal.fire({
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
    login(){
      axios({
        url: `${this.baseUrl}/user/login`,
        method:'post',
        data:{
          username: this.login.username,
          password: this.login.password,
        }
      })
      .then(({data}) => {
        localStorage.setItem('token',data.token);
        this.isLogin = true;
        this.isAdmin = data.payload.role === 'admin'
      })
      .catch(({response}) => {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: response.data.error,
        })
      })
    },
    clearPost(){
      this.post.title = '';
      this.post.content = '';
      this.post.thumbnail = '';
      this.post.tags = [];
    },
    checkLogin(cb){
      if(localStorage.getItem('token')){
        this.isLogin = true;
        axios({
          method: 'get',
          url: `${this.baseUrl}/user`,
          headers: {
            token: localStorage.getItem('token'), 
          }
        })
        .then(({data}) => {
          this.isAdmin = data.role === 'admin'
          cb();
        })
        .catch((err) => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: err,
          })
        })
      }else{
        this.isLogin = false;
      }
    },

    deleteItem(id){
      axios({
        url: `${this.baseUrl}/posts/${id}`,
        method: 'DELETE',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        Swal.fire({
          type: 'success',
          title: 'Success',
          text: data.message,
        })
        this.posts = this.posts.filter((el) => el._id !== id);
      })
      .catch(({response}) => {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: response.data.error,
        })
      })
    },
    
    loadEditItem(id){
      this.page = 'edit-post'
    },
    editItem(id){
      axios({
        url: ''
      })
    }
  },
  computed: {}
})