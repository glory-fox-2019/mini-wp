<template>
  <b-container fluid class="p-0">
      <navbar :isLogin="pages.isLogin" @actionLogin="loginStatus" @home="homeClick" @dashboard="toDashboard"></navbar>
      <b-container>
      <div v-if="!pages.isDashboard">
          <listContent v-if="!pages.isReadMode" :contents="datas.contents" @read="read"></listContent>
          <readArticle v-if="pages.isReadMode" :content="datas.content"></readArticle>
      </div>
      <div v-if="pages.isDashboard">
          <dashboard></dashboard>
      <div>
      </b-container>
  </b-container>
</template>

<script>
import navbar from './components/navbar'
import listContent from './components/content-list'
import readArticle from './components/read-article'
import dashboard from './components/dashboard'
export default {
  data() {
    return {
      pages : {
          isLogin : false,
          isReadMode : false,
          isDashboard : false,
      },
      datas : {
          contents : [],
          tempContents : [],
          content : {}
      }
    }; 
  },
  components : {
      navbar,
      listContent,
      readArticle,
      dashboard
  },
  methods : {
      loginStatus(status){
         this.pages.isLogin = status
         this.pages.isDashboard = false;
      },
      read(object){
          axios({
              method: "GET",
              url : `http://localhost:3000/article/view/${object._id}`,
          }).then(({data}) => {
              this.datas.content = data
              this.pages.isReadMode = true;
          }).catch(err => {
              console.log(err.response)
          })
         
      },
      getHome(){
        axios({
            method: 'GET',
            url : "http://localhost:3000/article/home",
        }).then(({data}) => {
            console.log(data)
            this.datas.contents = data
            this.tempContents = data
        }).catch(err => {
            console.log(err)
        })
      },
      homeClick(){
          this.pages.isReadMode = false;
          this.pages.isDashboard = false;
          console.log(this.pages.isDashboard)
          this.getHome()
      },
      toDashboard(){
          this.pages.isDashboard = true
      }
  },
  created(){
     this.getHome()
     if (localStorage.token){
          this.pages.isLogin = true
      }
  }
};
</script>

<style scoped>
 .p-0{
     padding: 0;
 }
</style>


