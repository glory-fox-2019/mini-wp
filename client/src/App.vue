<template>
  <div>
    <Navbar @view-create="viewCreate" @view-article="viewArticle()" :isLogin="isLogin"></Navbar>
    <!-- sidebar -->
    <Sidebar
      v-if="isLogin"
      @logout="logout"
      @my-article="viewArticle()"
      @see-global="seeGlobalPublished()"
    ></Sidebar>
    <!-- content -->
    <Content
      v-if="isLogin"
      :baseUrl="baseUrl"
      :articles="articles"
      :isLogin="isLogin"
      :isPublish="isPublish"
      :formCreate="formCreate"
      :userpage="userpage"
      @create-article="createArticle"
      @delete-article="deleteArticle"
      :currentArticle="currentArticle"
      :formEdit="formEdit"
      @edit-page="editPage"
      @update-article="updateArticle($event)"
      @preview-article="previewArticle"
      :preview="preview"
      @search-article="searchArticle"
      @search-bytag-draft="searchByTagDraft"
      @see-draft="getArticle"
      @see-published="seePublished($event)"
      @publish-article="publishArticle()"
      :publishedListPage="publishedListPage"
      @show-article="previewArticle($event)"
    ></Content>
    <!-- landing page -->
    <LandingPage
      :baseUrl="baseUrl"
      @register="register"
      :changeView="modalForm"
      @login="login"
      @login-google="loginGoogle"
      v-if="!isLogin"
    ></LandingPage>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";
import Content from "./components/Content.vue";
import LandingPage from "./components/LandingPage.vue";

export default {
  data() {
    return {
      baseUrl: `http://localhost:3000`,
      isLogin: false,
      currentArticle: {},
      articles: [],
      publishedListPage: false,
      userpage: true,
      formCreate: false,
      formEdit: false,
      modalForm: true,
      preview: false,
      isPublish: false
    };
  },
  components: {
    Navbar,
    Sidebar,
    Content,
    LandingPage
  },
  methods: {
    register: function(payload) {
      // console.log(payload, "dari app vue nih <<<<<<<<<<<<<");
      axios({
        method: "post",
        url: `${this.baseUrl}/users/register`,
        data: {
          username: payload.username,
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          this.modalForm = false;
          Swal.fire({
            title: "Thank you!",
            text: "Please login to continue your journey..",
            type: "success",
            timer: 1300
          });
          console.log(data);
        })
        .catch(err => {
          console.log(err);
          Swal.fire({
            title: "Oops!",
            text: "Please use different email address.",
            type: "error",
            timer: 2500
          });
        });
    },
    login: function(payload) {
      axios({
        method: "post",
        url: `${this.baseUrl}/users/login`,
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          Swal.fire({
            title: "Login Success!",
            text: "Let's start your journey..",
            type: "success",
            timer: 1300
          });
          localStorage.setItem("token", data);
          this.isLogin = true;
          this.getArticle();
        })
        .catch(err => {
          console.log(err.response.data);
          Swal.fire({
            title: "Oops!",
            text: "Invalid username / password",
            type: "error",
            timer: 2000
          });
        });
    },
    loginGoogle: function(token) {
      localStorage.setItem("token", token);
      this.isLogin = true;
      this.getArticle();
    },
    logout: function() {
      Swal.fire({
        title: "Are you sure?",
        text: "You will be logged out after this",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout!"
      }).then(result => {
        if (result.value) {
          Swal.fire("See ya!", "", "success");
          localStorage.clear();
          this.isLogin = false;
          this.articles = [];
        }
      });
    },
    getArticle: function() {
      axios({
        method: "get",
        url: `${this.baseUrl}/articles`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.articles = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getPublishedArticle: function() {
      axios({
        method: "get",
        url: `${this.baseUrl}/articles/published`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.articles = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    createArticle: function() {
      console.log("Successfuly create article!");
      Swal.fire({
        title: "Congratulation!",
        text: "Your new article have been submitted",
        type: "success",
        timer: 1000
      });

      this.getArticle();
      this.formCreate = false;
      this.userpage = true;
    },
    deleteArticle: function(id) {
      //   console.log(id);
      Swal.fire({
        title: "Delete this article?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          axios({
            method: "delete",
            url: `${this.baseUrl}/articles/delete/${id}`,
            headers: {
              token: localStorage.getItem("token")
            }
          })
            .then(({ data }) => {
              Swal.fire(
                "Deleted!",
                "Your article has been deleted.",
                "success"
              );
              if (data.isPublished == true) {
                this.getPublishedArticle();
              } else {
                this.getArticle();
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    editPage: function(id) {
      //   console.log(id);
      axios({
        method: "get",
        url: `${this.baseUrl}/articles/edit/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.currentArticle = data;
          this.formEdit = true;
          this.userpage = false;
          //   console.log(this.currentArticle);
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateArticle: function(payload) {
      Swal.fire({
        title: "Update success!",
        text: "Your article has been updated",
        type: "success",
        timer: 1300
      });
      this.formEdit = false;
      if (payload.isPublished) {
        this.getPublishedArticle();
        this.isPublish = true;
      } else {
        this.getArticle();
        this.isPublish = false;
      }
      this.userpage = true;
    },
    previewArticle: function(id) {
      axios({
        method: "get",
        url: `${this.baseUrl}/articles/edit/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.currentArticle = data;
          this.preview = true;

          this.userpage = false;
          this.publishedListPage = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    searchArticle: function(search) {
      this.articles = [];
      axios({
        method: "get",
        url: `${this.baseUrl}/articles/search?keyword=${search.keyword}&&by=${search.by}&&page=${search.page}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.articles = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    viewCreate: function(condition) {
      this.formCreate = true;

      this.userpage = false;
      this.formEdit = false;
      this.preview = false;
      this.publishedListPage = false;
    },
    viewArticle: function() {
      this.publishedListPage = false;
      this.formCreate = false;
      this.userpage = false;
      this.formEdit = false;
      this.preview = false;
      this.isPublish = false;

      this.userpage = true;
      this.getArticle();
    },
    searchByTagDraft(articlesByTag) {
      this.articles = articlesByTag;
    },
    seePublished(payload) {
      this.articles = payload;
    },
    publishArticle() {
      this.preview = false;
      this.userpage = true;
      this.getArticle();
    },
    seeGlobalPublished() {
      this.userpage = false;
      this.preview = false;

      this.publishedListPage = true;
      this.getPublishedArticle();
    }
  },
  created: function() {
    if (localStorage.getItem("token")) {
      this.isLogin = true;
      this.getArticle();
    }
  }
};
</script>

<style scoped>
</style>
