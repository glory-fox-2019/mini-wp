<template>
  <div>
    <navbar @navpage="GantiPage($event)" v-bind:GoogleSignId="GoogleSignId"></navbar>
    <div class="row" v-if="onPage == 'home'">
      <sideBar @page="GantiPage($event)" @profile="CurrentRender('profile')"></sideBar>
      <Article
        v-bind:articles="articles"
        @page="GantiPage('detail' , $event)"
        @pages="GantiPage($event)"
      ></Article>
    </div>
    <div class="row" v-else-if="onPage == 'detail'">
      <sideBar @page="GantiPage($event)" @profile="CurrentRender('profile')"></sideBar>
      <div class="container">
        <Detail v-bind:IdArticle="IdArticle"></Detail>
      </div>
    </div>
    <div class="row" v-else-if="onPage == 'register'">
      <sideBar @page="GantiPage($event)" @profile="CurrentRender('profile')"></sideBar>
      <Register
        @succes="GantiPage($event)"
        class="col-xl-7 col-lg-7 col-md-10 col-sm-10 col-10 pt-5 pl-5 text-center"
      ></Register>
    </div>
    <div v-else-if="onPage == 'add_article' " class="container">
      <addArticle @adds="NewData($event)"></addArticle>
    </div>
    <div v-else-if="onPage == 'profile'" class="row">
      <sideBar @page="GantiPage($event)" @profile="CurrentRender('profile')"></sideBar>
      <currentArticle
        v-bind:articlesUser="articlesUser"
        @hapus="deleteBaru($event)"
        @edit="newEdit($event)"
      ></currentArticle>
    </div>
    <div v-else-if="onPage == 'editform'" class="row">
      <sideBar @page="GantiPage($event)" @profile="CurrentRender('profile')"></sideBar>
      <editForm v-bind:editedId="editedId" @update="updateData($event)"></editForm>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import navbar from "./Navbar";
import sideBar from "./sideBar";
import Article from "./Article";
import Detail from "./Detail";
import Register from "./Register";
import addArticle from "./form_add";
import currentArticle from "./current_article";
import editForm from "./edit_form";

export default {
  components: {
    navbar,
    sideBar,
    Article,
    Detail,
    Register,
    addArticle,
    currentArticle,
    editForm
  },
  data: {
    articles: [],
    onPage: "home",
    IdArticle: 0,
    articlesUser: [],
    editedId: 0,
    GoogleSignId : false
  },
  created() {
    if (!localStorage.getItem("token")) {
      this.onPage = "register";
    } else {
      axios({
        method: "GET",
        url: "http://localhost:3000/api/article",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.articles = data;
          console.log(this.articles);
        })
        .catch(err => {
          console.log("error");
          console.log(err, "  fdfdf");
          this.onPage = "register";
        });
    }
  },

  methods: {
    GantiPage(page, id) {
      console.log(page, " ini page ====");
      this.onPage = page;
      if (id) {
        this.IdArticle = id;
      }
      axios({
        method: "GET",
        url: "http://localhost:3000/api/article",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.articles = data;
          // console.log(this.articles);
        })
        .catch(err => {
          console.log("error");
          console.log(err, "  fdfdf");
          this.onPage = "register";
        });
    },
    NewData(data) {
      console.log(data)
      this.onPage = "home";
      this.articles.unshift(data);
    },
    CurrentRender() {
      axios({
        method: "GET",
        url: "http://localhost:3000/api/article/profile",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          // this.articles = data;
          console.log(data, " inininj9i98090909090909");
          this.articlesUser = data;
          this.onPage = "profile";
          // console.log(this.articles);
        })
        .catch(err => {
          console.log("error");
          console.log(err, "  fdfdf");
        });
    },
    deleteBaru(id) {
      this.articles = this.articles.filter(el => el._id != id);
      this.articlesUser = this.articlesUser.filter(el => el._id != id);
    },
    newEdit(id) {
      this.editedId = id;
      this.onPage = "editform";
    },
    updateData(data) {
      this.articles.forEach(el => {
        if (el._id == data.id) {
          el.title = data.title;
          el.content = data.content;
        }
      });
      this.onPage = "home";
    },
    onSignIn(googleUser) {
      var profile = googleUser.getBasicProfile();
      console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log("Name: " + profile.getName());
      // $('')
      console.log("Image URL: " + profile.getImageUrl());
      console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
      console.log("Token: " + googleUser.getAuthResponse().id_token);
    }
  }
};
</script>
<style>
body {
  background-color: whitesmoke;
}
</style>