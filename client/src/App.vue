<template>
  <div>
    <div v-show="beforein">
      <navout
        @changeToLogin="changeLogin()"
        @changeToSignUp="changeSignUp()"
        @changeToHome="changeHome()"
        @pageGIn="getIn()"
      ></navout>
      <home v-show="atHome"></home>
      <formsignin v-show="login" @pageIn="getIn"></formsignin>
      <formsignup v-show="signup" @register="changeLogin"></formsignup>
    </div>
    <div v-show="afterin">
      <navin @sign-out="signingOut" @writeArticle="getWrite"></navin>
      <div class="container">
        <leftcolumn @seeArticles="getBody" @myArticles="getMine" :name="name"></leftcolumn>
        <rightcolumn
          v-show="isBody"
          :articles="articles"
          @delete-article="removeArticle($event)"
          @update-file="updateData($event)"
        ></rightcolumn>
        <write v-show="isWrite" @uploadFile="getFile($event)"></write>
        <edit v-show="isEdit" @editArticle="getUpdate($event)" :updateid="updateid"></edit>
      </div>
    </div>
  </div>
</template>

<script>
import beforein from "./components/beforein.vue";
import navout from "./components/navout.vue";
import home from "./components/home.vue";
import formsignin from "./components/formsignin.vue";
import formsignup from "./components/formsignup.vue";
import navin from "./components/navin.vue";
import leftcolumn from "./components/leftcolumn.vue";
import rightcolumn from "./components/rightcolumn.vue";
import write from "./components/write.vue";
import edit from "./components/edit.vue";

export default {
  components: {
    beforein,
    navout,
    home,
    formsignin,
    formsignup,
    navin,
    leftcolumn,
    rightcolumn,
    edit,
    write
  },
  data() {
    return {
      beforein: false,
      login: false,
      atHome: false,
      signup: false,
      afterin: false,
      isBody: false,
      isWrite: false,
      isEdit: false,
      articles: [],
      tempArticles: [],
      title: "",
      content: "",
      image: "",
      name: "",
      updateid: "",
    };
  },
  methods: {
    changeLogin() {
      this.login = true;
      this.atHome = false;
      this.signup = false;
    },
    changeSignUp() {
      this.login = false;
      this.atHome = false;
      this.signup = true;
    },
    changeHome() {
      this.login = false;
      this.atHome = true;
      this.signup = false;
    },
    signingOut() {
      this.afterin = false;
      this.beforein = true;
      this.home = true;
    },
    getIn() {
      this.getArticles();
      this.afterin = true;
      this.beforein = false;
      this.isBody = true;
    },
    getWrite() {
      this.isBody = false;
      this.isWrite = true;
      this.isEdit = false;
    },
    getBody() {
      this.getArticles();
      this.isBody = true;
      this.isWrite = false;
      this.isEdit = false;
    },
    getFile(e) {
      this.articles.unshift(e);
      this.isWrite = false;
      this.isBody = true;
      this.isEdit = false;
    },
    getArticles() {
      let token = localStorage.getItem("token");
      axios({
        method: "GET",
        url: "http://localhost:3000/articles/",
        headers: {
          token
        }
      })
        .then(data => {
          this.name = data.data.name;
          this.articles = data.data.data;
          this.tempArticles = data.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    removeArticle(id) {
      this.articles = this.articles.filter(el => el._id !== id);
    },
    getUpdate(data) {
      this.isWrite = false;
      this.isBody = true;
      this.isEdit = false;
      for (let i = 0; i < this.articles.length; i++) {
        let article = this.articles[i];
        if (article._id == data._id) {
          this.articles[i] = data;
        }
      }
      this.getArticles();
    },
    getMine() {
      let token = localStorage.getItem("token");
      axios({
        method: "GET",
        url: "http://localhost:3000/articles/myArticles",
        headers: {
          token
        }
      })
        .then(data => {
          this.isWrite = false;
          this.isBody = true;
          this.isEdit = false;
          this.articles = data.data.data;
          this.tempArticles = data.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateData(id) {
      this.isWrite = false;
      this.isBody = false;
      this.isEdit = true;
      this.updateid = id
    }
  },
  created() {
    if (localStorage.token) {
      this.getArticles();
      this.atHome = false;
      this.beforein = false;
      this.afterin = true;
    } else {
      this.atHome = true;
      this.beforein = true;
      this.afterin = false;
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Muli|Poppins&display=swap");
* {
  font-family: "Poppins", sans-serif;
}
.container {
  display: flex;
  align-content: flex-start;
  margin: 0;
  padding: 0;
}
</style>