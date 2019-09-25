<template>
  <div>
    <navbar
      @loggedout="logout"
      @getProfile="getUserProfile"
      @goToHome="goToDashboard"
      @createNew="createNewArticle"
      @editProfile="editUserProfile"
      @myArticle="userArticles"
      @search="sendKeyword($event)"
    ></navbar>

    <home v-if="page == 'dashboard'" @getSingleArticle="showContent($event)" :keyword="keyword"></home>

    <singlearticle
      v-if="page == 'content'"
      :articleId="articleId"
      @getSingleArticle="showContent($event)"
    ></singlearticle>

    <profile v-if="page == 'profile'"></profile>

    <editProfile v-if="page == 'editProfile'" @getProfile="getUserProfile"></editProfile>

    <createArticle v-if="page == 'create'" @getProfile="getUserProfile"></createArticle>

    <userArticles
      v-if="page == 'userArticles'"
      @editSingleArticle="editUserArticle($event)"
      @createNew="createNewArticle"
    ></userArticles>

    <editArticle v-if="page == 'editArticle'" @myArticle="userArticles" :articleId="articleId"></editArticle>
  </div>
</template>

<script>
import navbar from "./components/navbar";
import home from "./components/home";
import singlearticle from "./components/content";
import profile from "./components/profile";
import createArticle from "./components/createUpdate/createArticle";
import editProfile from "./components/createUpdate/updateProfile";
import userArticles from "./components/listUserArticle";
import editArticle from "./components/createUpdate/editArticle";

export default {
  props: ["page"],
  data() {
    return {
      articleId: "",
      keyword: ""
    };
  },
  components: {
    navbar,
    home,
    singlearticle,
    profile,
    createArticle,
    editProfile,
    userArticles,
    editArticle
  },
  methods: {
    logout() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$emit("loggedout");
          Swal.fire("Goodbye", "See you soon in the next time", "success");
        }
      });
    },
    showContent(event) {
      // console.log(event, "get article data");
      localStorage.setItem("page", "content");
      localStorage.setItem("articleId", event._id);
      this.$emit("on_page");
      this.articleId = event._id;
    },
    getUserProfile() {
      localStorage.setItem("page", "profile");
      this.$emit("on_page");
    },
    goToDashboard() {
      localStorage.setItem("page", "dashboard");
      this.$emit("on_page");
    },
    createNewArticle() {
      localStorage.setItem("page", "create");
      this.$emit("on_page");
    },
    editUserProfile() {
      localStorage.setItem("page", "editProfile");
      this.$emit("on_page");
    },
    userArticles() {
      localStorage.setItem("page", "userArticles");
      this.$emit("on_page");
    },
    editUserArticle(event) {
      localStorage.setItem("page", "editArticle");
      localStorage.setItem("articleId", event._id);
      this.$emit("on_page");
      this.articleId = event._id;
    },
    sendKeyword(event) {
      this.keyword = event;
    }
  },
  created() {
    this.articleId = localStorage.getItem("articleId");
  }
};
</script>