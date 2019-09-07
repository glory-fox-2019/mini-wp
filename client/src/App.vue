<template>
<div>

  <!-- ===== Modal Register ===== -->
  <div>
    <b-modal ref="modal-register" id="modal-register" centered title="Register" hide-footer >
      <div class="modal-body">
        <div class="container-fluid">
          <div class="d-flex justify-content-center">
            <form @submit.prevent="registerUser()" id="registerForm" class="form d-flex flex-column">
              <input v-model="register.name" class="login-register" type="text" placeholder="Input your name">
              <input v-model="register.email" class="login-register" type="text" placeholder="Input your email">
              <input v-model="register.password" class="login-register" type="password"
                placeholder="Input your password">
              <button type="submit" class="modal-button btn btn-primary">Submit</button>
            </form>
          </div>
          <div class="flex-column justify-content-center text-center">
            <a class="nav-link nav-font" v-b-modal.modal-register> OR </a>
            <button @click.prevent="loginGoogle" type="submit" class="btn btn-danger">Login With Google</button>
          </div>
        </div>
      </div>
    </b-modal>
  </div>

  <!-- ===== Modal Login ===== -->
  <div>
    <b-modal ref="modal-login" id="modal-login" centered title="Login" hide-footer >
      <div class="modal-body">
        <div class="container-fluid">
          <div class="d-flex justify-content-center">
            <form @submit.prevent="loginUser()" class="form d-flex flex-column">
              <input v-model="login.email" class="login-register" type="text" placeholder="Input your email">
              <input v-model="login.password" class="login-register" type="password"
                placeholder="Input your password">
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
            <div class="flex-column justify-content-center text-center">
              <a class="nav-link nav-font" v-b-modal.modal-register> OR </a>
              <button @click.prevent="loginGoogle" type="submit" class="btn btn-danger">Login With Google</button>
            </div>
        </div>
      </div>
    </b-modal>
  </div>

  <!-- ===== Modal Loading ===== -->
  <div>
    <b-modal ref="modal-loading" id="modal-loading" centered title="Login" hide-footer hide-header no-close-on-backdrop>
      <div class="modal-body">
        <div class="text-center">
          <a class="loading-font"> Please Wait </a>
        </div>
        <div class="text-center">
          <br>
          <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
          <b-spinner variant="secondary" type="grow" label="Spinning"></b-spinner>
          <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
          <b-spinner variant="danger" type="grow" label="Spinning"></b-spinner>
          <b-spinner variant="warning" type="grow" label="Spinning"></b-spinner>
          <b-spinner variant="info" type="grow" label="Spinning"></b-spinner>
          <b-spinner variant="dark" type="grow" label="Spinning"></b-spinner>
        </div>
      </div>
    </b-modal>
  </div>
  
  <!-- ===== Navbar ===== -->
  <div>
    <b-navbar toggleable="sm">
      <b-navbar-brand> <img class="img-fluid logo" src="./assets/logo-colour.png" alt="logoPostingg"> </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <a @click.prevent="backtoHome" class="nav-link nav-font"> HOME </a>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
        <a v-if="!isLogin" class="nav-link nav-font" v-b-modal.modal-register> REGISTER </a>
        <a v-if="!isLogin" class="nav-link nav-font" v-b-modal.modal-login> LOGIN </a>
        <a v-if="isLogin" @click.prevent="logoutUser" class="nav-link nav-font">LOGOUT</a>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>


  <!-- Jumbotron -->
  <div>
    <b-jumbotron v-if="!isLogin" class="text-center jumbotron" header="POSTINGG" lead="The place where you can build and create article!">
      <p>To create an article, please login first</p>
    </b-jumbotron>
  </div>
  

  <!-- content -->
  <div class="container-fluid">
    
    <div class="row">
      <div class="col-sm-2">
        <!-- sidenav -->
        <SideNav v-if="isLogin" @changePage="changePage" :name="user.name"></SideNav>
      </div>

      <div class="col-sm-8">
        <!-- list articles -->
        <ListArticle @changePage="changePage" v-if="currentPage=='listArticle'"></ListArticle>

        <!-- my articles -->
        <MyArticle @changePage="changePage" v-if="currentPage=='myArticle'"></MyArticle>

        <!-- create article -->
        <CreateArticle @refreshTag="refreshTag" :available="tagAvailable" @loading="loading" @changePage="changePage" v-if="currentPage=='createArticle'"></CreateArticle>

        <!-- edit article -->
        <EditArticle @refreshTag="refreshTag" :available="tagAvailable" :data="dataEdit" @loading="loading" @changePage="changePage" v-if="currentPage=='editArticle'"></EditArticle>

         <!-- article details -->
         <ArticleDetails :data="dataDetails" v-if="currentPage=='articleDetails'"></ArticleDetails>

         <!-- list article by tag -->
         <ArticleByTag @changePage="changePage" :data="dataTag" v-if="currentPage=='articleByTag'"></ArticleByTag>
      </div>

      <!-- list tags -->
      <div class="col-sm-2">
        <div v-if="isLogin"  class="card">
          <div class="card-body">
            <h5 class="card-title">Available Tag</h5>
            <button v-for="tag in tagList" :key="tag._id" type="button" @click="tagFind(tag._id)" class="btn btn-primary m-2">{{tag.name}} <span class="badge"></span></button>
          </div>
        </div>
      </div>
    </div>


  </div>

  
</div>

  
</template>

<script>
import ax from '../config/axios'
import SideNav from './components/SideNav'
import ListArticle from './components/ListArticle'
import MyArticle from './components/MyArticle'
import CreateArticle from './components/CreateArticle'
import EditArticle from './components/EditArticle'
import ArticleDetails from './components/ArticleDetails'
import ArticleByTag from './components/ArticleByTag'



export default {
  components: {
    SideNav, 
    ListArticle, MyArticle, CreateArticle,EditArticle, ArticleDetails,ArticleByTag
  },
  data(){
    return {
      slide: 0,
      sliding: null,
      message : 'hello world',
      register : {
        name: '',
        email: '',
        password: ''
      },
      login: {
        email: '',
        password: ''
      },
      user: {
        name: ''
      },
      tag: {
        _id: '',
        name: ''
      },
      dataEdit:{},
      dataDetails: {},
      dataTag: [],
      tagList: [],
      tagAvailable: [],
      currentPage:'listArticle',
      isLogin: false
    }
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
    changePage(page, data) {
      console.log('ini dari change page')
      this.currentPage = page
      this.dataEdit = data
      this.dataDetails = data

    },
    backtoHome(){
      this.currentPage = 'listArticle'
    },
    loading(status){
      if (status === true){
        this.$refs['modal-loading'].show()
      }
      else {
        this.$refs['modal-loading'].hide()
      }
    },
    tagFind(id){
      console.log('masuk tag find by id: ', id)
      ax({
        url: `/articles/tags/${id}`,
        method: 'get',
        headers: {
        'token': localStorage.getItem('token')
        }
      })
        .then(({data})=>{
          // this.allArticles = data
          this.dataTag=data
          this.currentPage ='articleByTag'
          // console.log('ini datanya', data)
        })
        .catch((err)=>{
          console.log(err)
        })
      // this.dataTag=id
      // this.currentPage ='articleByTag'
    },
    registerUser() {
      
      console.log('masuk login normal', this.register)
      ax({
        url: `/users/register`,
        method: 'post',
        data: this.register,
      })
        .then(({ data }) => {
          this.$refs['modal-register'].hide()
          // this.dataDefault()
          Swal.fire('Register success, please login')
        })
        .catch((err) => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `${(err.response.data.message).substr(24)}`,
          })
          console.log(err)
        })
    },
    loginUser() {
      console.log('masuk login', this.login)
      ax({
        url: `/users/login`,
        method: 'post',
        data: this.login
      })
        .then(({ data }) => {
          console.log('ini data', data)
          localStorage.setItem('token', data.token)
          localStorage.setItem('name', data.name)
          localStorage.setItem('email', data.email)
          this.user.name = data.name
          this.isLogin = true
          this.$refs['modal-login'].hide()

          // this.dataDefault()
          Swal.fire('Login success')
        })
        .catch((err) => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `${(err.response.data.message)}`,
          })
        })
    },
    loginGoogle(){
      console.log('klik google signin')
      this.$gAuth.signIn()
        .then(GoogleUser => {
          // On success do something, refer to https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleusergetid
          console.log('user', GoogleUser)
          // GoogleUser.getId() : Get the user's unique ID string.
          // GoogleUser.getBasicProfile() : Get the user's basic profile information.
          // GoogleUser.getAuthResponse() : Get the response object from the user's auth session. access_token and so on
          this.isSignIn = this.$gAuth.isAuthorized
          const idToken= {idToken: GoogleUser.getAuthResponse().id_token}
          console.log('ini idToken', idToken)
          ax({
            url: `/users/loginGoogle`,
            method: "post",
            dataType: "json",
            data: idToken,
          })
          .then(({data})=>{
            localStorage.setItem('token', data.token)
            localStorage.setItem('name', data.name)
            localStorage.setItem('email', data.email)
            Swal.fire('Login success')
            this.user.name = data.name
            this.isLogin = true
            this.$refs['modal-login'].hide()
            this.$refs['modal-register'].hide()
          })
          .catch((err)=>{
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: `${(err.response.data.message)}`,
            })
          })

        })
        .catch( (err) => {
          console.log(err)
        })
    },
    logoutUser() {
      localStorage.clear()
      this.currentPage = 'listArticle'
      this.isLogin = false
      Swal.fire('Logout Success')
    },
    refreshTag(){
      ax({
        url: `/tags/findall`,
        method: "get",
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then(({data})=>{
          this.tagList = data
          let arr = []
          for (let value of data){
            arr.push({
              key: value.name,
              value: value.name
            })
          }
          this.tagAvailable=arr
          
          // console.log('ini list available tag', this.tagAvailable)
        })
        .catch((err)=>{
          console.log(err)
        })
    }
  },
  created(){
    // this.dataDefault()
    // this.findAllArticle()
    // this.findOwnArticle()
    if (localStorage.getItem('token')) {
      this.isLogin = true
      this.user.name = localStorage.getItem('name')
      // $(`.side-nav`).show()
    }
    else {
      this.isLogin = false
    }
    ax({
      url: `/tags/findall`,
      method: "get",
      headers: {
        'token': localStorage.getItem('token')
      }
    })
      .then(({data})=>{
        this.tagList = data
        let arr = []
        for (let value of data){
          arr.push({
            key: value.name,
            value: value.name
          })
        }
        this.tagAvailable=arr
        
        // console.log('ini list available tag', this.tagAvailable)
      })
      .catch((err)=>{
        console.log(err)
      })
  }
}
</script>

<style>
  /* 
  font-family: 'Anton', sans-serif;
  font-family: 'Roboto Condensed', sans-serif;
  font-family: 'Oswald', sans-serif;
  font-family: 'Monoton', cursive; 
  */
  .jumbotron{
    font-family: 'Anton', sans-serif;

  }

  .logo {
    font-family: 'Pacifico', cursive;
    height: auto; 
    width: auto; 
    max-width: 75px; 
    max-height: 75px;
  }

  .nav-font {
    color: black !important;
    font-size: 130%;
    font-family: 'Oswald', sans-serif;
  }

  .nav-font:hover {
    font-size: 130%;
    font-family: 'Anton', sans-serif;
    cursor: pointer;
  }

  .loading-font {
    color: black !important;
    font-size: 130%;
    font-family: 'Oswald', sans-serif;
  }

  .nav-dropdown {
    font-family: 'Oswald', sans-serif;
    cursor: pointer;
  }

  .nav-dropdown:hover {
    font-family: 'Anton', sans-serif;
    color:red
  }

  h4 {
    font-family: 'Oswald', sans-serif;
  }

  h5 {
    font-family: 'Oswald', sans-serif;
    font-size: 20px
  }

  .title {
    font-family: 'Oswald', sans-serif;
    font-size: 20px;
    text-align: center
  }

  /* .article-cover {
    height: 200px;
    
  } */

  .cover-image{
    max-height: 200px;
    max-width: 200px;
  }

  .imageEdit{
    max-height: 500px;
    max-width: 500px;
  }

  .login-register{
    border: none;
    background-color: transparent;
    outline: none;
    text-align: center;
    border-bottom: 1px solid rgb(165, 165, 165);
    margin-bottom: 10px;
    font-family: 'Roboto Condensed', sans-serif;
  }
</style>