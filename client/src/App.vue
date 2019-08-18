<template>
  <b-container>
      <navbar :isLogin="pages.isLogin" @actionLogin="loginStatus" @home="homeClick"></navbar>
      <div v-if="!pages.isDashboard">
          <listContent v-if="!pages.isReadMode" :contents="datas.contents" @read="read"></listContent>
          <readArticle v-if="pages.isReadMode" :content="datas.content"></readArticle>
      </div>
      <div v-if="pages.isDashboard">
          <dashboard></dashboard>
      <div>
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
          isDashboard : true,
      },
      datas : {
          contents : [{
              title : 'Anak Tiri Durhaka',
              author : 'Aku anak kuat',
              description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
              view : 2000
          },
          {
              title : 'Anak Tiri Durhaka Banget',
              author : 'Aku anak kuat',
              description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
              view : 2000
          }],
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
      },
      read(object){
          this.pages.isReadMode = true;
          this.datas.content = object
      },
      homeClick(){
          this.pages.isReadMode = false;
      }
  }
};
</script>

<style scoped>
</style>


