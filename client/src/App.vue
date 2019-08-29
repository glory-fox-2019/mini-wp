<template>

    <div>
        <navbar v-if="isLogin"
            :currentUser = 'currentUser'
            :isEditing = 'isEditing'
            :isWriting = 'isWriting'
            @signinBtn = 'signinBtn'
            @signupBtn = 'signupBtn'
            @write = 'write'
            @publish = 'publish'
            @submitEdit = 'submitingEdit'
            @cancelWrite = 'cancelWrite'
            @cancelEdit = 'cancelEdit'
            @search= "search"
        ></navbar>
      

        <contents
            v-if="contentField"
            @edit = "edit"
            @hideList = "hideList"
            @showList = "showList"
            @logout = "logout"
            :searchValue = "searchValue"
            :mainContent="mainContent"
            :isWriting="isWriting"
            :isEditing="isEditing"
            :currentUser="currentUser"
            :postArticle = "postArticle"
            :submitEdit = "submitEdit"
            :filterByUser = "filterByUser"
            :filterFavourite = "filterFavourite"    
        ></contents>



        <signin
            v-if ="signinForm"
            @login = 'login'
            @signupBtn = 'signupBtn'
        ></signin>

        <signup
            v-if="signupForm"
            @submitSignup = 'signup'
            @signinBtn = 'signinBtn'
        ></signup>
    <g-signin-button style="margin-left:525px" v-if="google" @google="onSignIn">
        </g-signin-button>
    </div>

</template>

<script>

import navbar from './components/navbar'
import sidebar from './components/sidebar'

import signin from './components/signinForm'
import signup from './components/signupForm'

import contents from './components/content'

import googleButton from './components/g-signin-button'

export default {
  data() {
    return {
      currentUser:{
          _id: localStorage.getItem('userId')
      },
      isEditing : false,
      isWriting : false,

      signinForm : true,
      signupForm : false,
      google: true,

      contentField : false,
      mainContent : true,
      postArticle: false,
      submitEdit: false,
      searchValue: "",

      filterByUser: false,
      filterFavourite : false,

      isLogin : localStorage.token
    };
  },
  components:{
      navbar,
      sidebar,
      signin,
      signup,
      contents,
      'g-signin-button': googleButton
  },
  methods:{
    //   navbar
        signinBtn(){
            this.signinForm = true, this.signupForm = false, this.contentField = false
        },
        signupBtn(){
            this.signupForm = true, this.signinForm = false, this.contentField = false
        },
        write(){
            this.isWriting = true
            this.mainContent = false
            this.isEditing = false  
        },
        edit(){
            this.isEditing = true
            this.mainContent = false
        },
        publish(){
            this.postArticle = true
            this.isWriting = false 
            this.mainContent= true
        },
        submitingEdit(){
            this.submitEdit = true
            this.isEditing = false
            this.mainContent = true
        },
        cancelWrite(){
            this.isWriting = false 
            this.mainContent= true
        },
        cancelEdit(){
            this.isEditing = false
            this.mainContent = true
        },
        search(searchValue){
            this.searchValue=searchValue
        },
    //content
        showList(){
            this.mainContent = true
        },
        hideList(){
            this.mainContent = false
        },
        logout(){
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
            this.signupForm = false
            this.signinForm = true
            this.google = true
            this.contentField = false
            this.isLogin = localStorage.token
        },
    //forms
        login(email, password){
            axios({
                method: "POST",
                url: `http://35.232.133.45/users/login`,
                data:{
                    email: email,
                    password: password
                }
            })
            .then(({data})=>{
                localStorage.setItem(`token`, data.token)
                localStorage.setItem(`userId`, data._id)
                this.currentUser = {
                    _id : data._id
                }
                this.signupForm = false
                this.signinForm = false
                this.google = false
                this.contentField = true
                this.isLogin = localStorage.token
            })
        },
        signup(username, email, password){
            axios({
                method: 'POST',
                url: `http://35.232.133.45/users/register`,                
                data: {
                    username,
                    email,
                    password
                }
            })
            .then(data => {
                console.log('SUKSES REGISTER')
                this.signupForm = false
                this.signinForm = true
                this.contentField = false
            })
            .catch(({ data }) => {
                console.log(data)
            })
        },
        onSignIn(googleUser) {
            const idToken= googleUser.getAuthResponse().id_token
                axios({
                    url: `http://35.232.133.45/users/glogin`,
                    method: 'POST',
                    data: {
                    idToken
                    }
                })
                .then(({ data })=>{
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('userId', data.userId)
                    this.signupForm = false
                    this.signinForm = false
                    this.google = false
                    this.contentField = true
                    this.isLogin = localStorage.token
                })
                .catch(function(err){
                    console.log(err)
                })
        }, 
  },
  created(){
      if(localStorage.getItem('token')){
        this.currentUser._id=localStorage.getItem('userId')
        this.isLogin = localStorage.getItem('token')
        this.signupForm = false
        this.signinForm = false
        this.google = false
        this.contentField = true
        this.mainContent = true
      }
  },
  watch:{
      isLogin(newVal){
        this.signupForm = false
        this.signinForm = false
        this.google = false
        this.contentField = true
        this.mainContent = true
      }
  }
};
</script>

<style scoped>
</style>