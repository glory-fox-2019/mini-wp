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
    tagInput: '',
  },
  mounted(){
    this.checkLogin(() => {
      // console.log(this.isLogin, this.isAdmin)
      if(this.isLogin && this.isAdmin){
        axios({
          url:`${this.baseUrl}/posts`,
          method:'get',
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({data}) => {
          this.posts = data;
        })
        .catch(err => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: err,
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
        console.log(data);
        this.posts = data;
      })
      .catch(err => {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: err,
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
      this.post.tags.push(this.tagInput);
      this.tagInput = '';  
    },
    removeTag(i){
      console.log('test')
      this.post.tags.splice(i,1);
    },
    saveCreatePost(){
      axios({
        url: `${this.baseUrl}/posts`,
        method: 'post',
        data: {
          title: this.post.title,
          content: this.post.content,
          tags: this.post.tags
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        console.log(data)
        this.page = 'list-post'
        this.posts.push(data);
        this.clearPost();
      })
      .catch((err) => {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: err
        })
      })
    },
    previewImage(event){
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.post.thumbnail  = e.target.result;
          // this.post.thumbnail = reader.readAsDataURL(input.files[0]);
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
      .catch(err => {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: err,
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
          // Swal.fire({
          //   type: 'error',
          //   title: 'Oops...',
          //   text: err,
          // })
        })
      }else{
        this.isLogin = false;
      }
    }
  },
  computed: {}
})