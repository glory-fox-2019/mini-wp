<template>
  <div>
    <Navbar
      v-if="user.isLogin"
      @go-to-home="goToHomePage"
      @go-to-article="goToArticlePage"
      @go-to-sign-out="signOut"
      @go-to-myArticle-page="goToMyArticlesPage"
    ></Navbar>

    <LoginForm
      v-if="onpage.loginPage && !user.isLogin"
      @go-to-register-page="goToRegisterPage"
      @go-to-home-page="goToHomePage"
      @success-login="successLogin"
    ></LoginForm>

    <RegisterForm v-if="onpage.registerPage && !user.isLogin" @go-to-login-page="goToLoginPage"></RegisterForm>

    <Home v-if="onpage.homePage && user.isLogin"></Home>

    <Article
      v-if="onpage.articlePage && user.isLogin"
      @go-to-add-article="goToAddArticlePage"
      @go-to-detail-article="goToDetailArticlePage($event)"
    ></Article>

    <AddArticle 
      v-if="onpage.addArticlePage && user.isLogin"
      @go-to-article-page="goToArticlePage($event)"
      >
    </AddArticle>

    <DetailArticle
      v-if="onpage.detailArticlePage && user.isLogin"
      v-bind:someId="someId"
      @go-to-article-page="goToArticlePage($event)"
      @go-to-edit-page="goToEditArticlePage($event)"
    ></DetailArticle>

    <EditArticle
      v-if="onpage.editArticlePage && user.isLogin"
      v-bind:someId="someId"
      @go-to-article-page="goToArticlePage($event)"
    ></EditArticle>

    <MyArticle
      v-if="onpage.myArticlePage && user.isLogin"
      @go-to-detail-page="goToDetailArticlePage($event)"
    ></MyArticle>

    <Footer
      v-if="user.isLogin"
    >
    </Footer>

  </div>
</template>

<script>
import LoginForm from "./components/login-form";
import RegisterForm from "./components/register-form";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Article from "./components/article";
import AddArticle from "./components/add-article";
import DetailArticle from "./components/detail-article";
import EditArticle from "./components/edit-article";
import MyArticle from "./components/myArticle";
import Footer from "./components/footer"

export default {
  data() {
    return {
      onpage: {
        loginPage: true,
        registerPage: false,
        homePage: false,
        articlePage: false,
        addArticlePage: false,
        detailArticlePage: false,
        editArticlePage: false,
        myArticlePage: false
      },

      user: {
        isLogin: false
      },

      someId: ""
    };
  },

  components: {
    LoginForm,
    RegisterForm,
    Navbar,
    Home,
    Article,
    AddArticle,
    DetailArticle,
    EditArticle,
    MyArticle,
    Footer
  },

  methods: {
    successLogin() {
      this.user.isLogin = true;
    },

    signOut() {
      this.user.isLogin = false;
      localStorage.clear();
      this.goToLoginPage();
      Swal.fire("Bye", `Mampir lagi ya:)`, "success");
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {
      });
    },

    goToRegisterPage() {
      this.onpage.loginPage = false;
      this.onpage.registerPage = true;
      this.onpage.homePage = false;
      this.onpage.articlePage = false;
      this.onpage.addArticlePage = false;
      this.onpage.detailArticlePage = false;
      this.onpage.editArticlePage = false;
      this.onpage.myArticlePage = false;
    },

    goToLoginPage() {
      this.onpage.loginPage = true;
      this.onpage.registerPage = false;
      this.onpage.homePage = false;
      this.onpage.articlePage = false;
      this.onpage.addArticlePage = false;
      this.onpage.detailArticlePage = false;
      this.onpage.editArticlePage = false;
      this.onpage.myArticlePage = false;
    },

    goToHomePage() {
      this.onpage.loginPage = false;
      this.onpage.registerPage = false;
      this.onpage.homePage = true;
      this.onpage.articlePage = false;
      this.onpage.addArticlePage = false;
      this.onpage.detailArticlePage = false;
      this.onpage.editArticlePage = false;
      this.onpage.myArticlePage = false;
    },

    goToArticlePage(id) {
      this.onpage.loginPage = false;
      this.onpage.registerPage = false;
      this.onpage.homePage = false;
      this.onpage.articlePage = true;
      this.onpage.addArticlePage = false;
      this.onpage.detailArticlePage = false;
      this.onpage.editArticlePage = false;
      this.onpage.myArticlePage = false;
    },

    goToAddArticlePage() {
      this.onpage.loginPage = false;
      this.onpage.registerPage = false;
      this.onpage.homePage = false;
      this.onpage.articlePage = false;
      this.onpage.addArticlePage = true;
      this.onpage.detailArticlePage = false;
      this.onpage.editArticlePage = false;
      this.onpage.myArticlePage = false;
    },

    goToDetailArticlePage(id) {
      this.onpage.loginPage = false;
      this.onpage.registerPage = false;
      this.onpage.homePage = false;
      this.onpage.articlePage = false;
      this.onpage.addArticlePage = false;
      this.onpage.detailArticlePage = true;
      this.onpage.editArticlePage = false;
      this.onpage.myArticlePage = false;
      if (id) this.someId = id;
    },

    goToEditArticlePage(id) {
      this.onpage.loginPage = false;
      this.onpage.registerPage = false;
      this.onpage.homePage = false;
      this.onpage.articlePage = false;
      this.onpage.addArticlePage = false;
      this.onpage.detailArticlePage = false;
      this.onpage.editArticlePage = true;
      this.onpage.myArticlePage = false;
      if (id) this.someId = id;
    },

    goToMyArticlesPage(id) {
      this.onpage.loginPage = false;
      this.onpage.registerPage = false;
      this.onpage.homePage = false;
      this.onpage.articlePage = false;
      this.onpage.addArticlePage = false;
      this.onpage.detailArticlePage = false;
      this.onpage.editArticlePage = false;
      this.onpage.myArticlePage = true;
      if (id) this.someId = id;
    }
  },

  mounted() {
    if (localStorage.getItem("token")) {
      this.user.isLogin = true;
      this.goToHomePage();
    }
  }
};
</script>

<style>
</style>