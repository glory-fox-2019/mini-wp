<template>
  <div>
    <!-- Article -->
    <div class="card text" id="content" v-if="!isEdit">
      <div class="card-header">
        <div class="card-body">
          <div class="button-action">
            <button type="button" class="btn btn-success" @click.prevent="back">Back</button>
            <button type="button" class="btn btn-primary" @click.prevent="editArticle">Edit</button>
            <button type="button" class="btn btn-danger" @click.prevent="deletePost">Delete</button>
          </div>
          <h3 class="card-title">{{ articleData.title }}</h3>
          <h6>
            <i>Posted by : {{ articleData.userId.username }}</i>
          </h6>
          <img :src="articleData.image" class="image-content" />
          <br />
          <br />
          <div class="card-text" v-html="articleData.content"></div>
          <br />
          <hr />
          <p>
            <i>Created at : {{ articleData.createdAt }}</i>
          </p>
          <p>
            <i>Last update : {{ articleData.updatedAt }}</i>
          </p>
        </div>
      </div>
    </div>
    <!-- Edit Article -->
    <div class="container-fluid" v-if="isEdit">
      <h1>Edit My Article</h1>
      <div class="button-cancle">
        <button type="button" class="btn btn-primary" @click.prevent="cancle">Cancle</button>
      </div>
      <div class="row-edit">
        <div class="col-sm">
          <div class="column mt-4">
            <div class="card mb-4" style="background-color : rgba(218, 216, 216, 0.198)">
              <div class="row">
                <div class="col-sm mr-5 mb-5 ml-5 mt-5">
                  <div class="card title mb-4">
                    <div class="card-body">
                      <input
                        type="text"
                        style="width : 100%; height: 40px"
                        v-model="articleData.title"
                      />
                    </div>
                  </div>
                  <div class="card content mb-2">
                    <div class="card-body">
                      <wysiwyg v-model="articleData.content"></wysiwyg>
                    </div>
                  </div>
                  <div class="card submit mb-4">
                    <div class="card-body">
                      <center>
                        <button
                          v-if="!isLoading"
                          class="btn btn-primary"
                          type="submit"
                          style="width : 100%; height: 40px; background-color:rgba(37, 80, 149, 0.966); color:white"
                          @click.prevent="postArticle"
                        >Update and publish your article</button>
                        <button v-else class="btn btn-primary" type="button" disabled>
                          <span
                            class="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Loading...
                        </button>
                      </center>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const baseUrl = "http://localhost:3000";
import axios from "axios";
export default {
  props: ["articleId"],
  data() {
    return {
      isLoading: "",
      isEdit: false,
      articleData: {
        image: "",
        title: "",
        createdAt: "",
        updatedAt: "",
        content: "",
        userId: {
          _id: "",
          username: ""
        }
      }
    };
  },
  methods: {
    getArticle() {
      axios({
        method: "get",
        url: `${baseUrl}/articles/${this.articleId}`,
        headers: {
          token: localStorage.token
        }
      }).then(({ data }) => {
        console.log("get single content");
        const articleCreated = new Date(data.createdAt).toLocaleString();
        const articleUpdated = new Date(data.updatedAt).toLocaleString();
        const creatorUpdated = new Date(data.userId.updatedAt).toLocaleString();
        localStorage.creatorId = data.userId._id;
        this.articleData.image = data.image;
        this.articleData.title = data.title;
        this.articleData.createdAt = articleCreated;
        this.articleData.updatedAt = articleUpdated;
        this.articleData.content = data.content;
        this.articleData.userId._id = data.userId._id;
        this.articleData.userId.username = data.userId.username;
      });
    },
    postArticle() {
      this.isLoading = true;
      Swal.fire({
        title: "Are you sure want to Post this article?",
        type: "question",
        buttons: true
      }).then(() => {
        if (!this.articleData.title || !this.articleData.content) {
          Swal.fire({
            title: "Please Fill All Of Input Text",
            type: "error",
            buttons: false,
            timer: 2000
          });
        } else {
          let data = {
            title: this.articleData.title,
            content: this.articleData.content
          };
          axios({
            method: "put",
            url: `${baseUrl}/articles/${this.articleId}`,
            headers: {
              token: localStorage.getItem("token")
            },
            data
          })
            .then(({ data }) => {
              this.isLoading = false;
              Swal.fire({
                title: "Great! Your article has been uploaded succesfully!",
                type: "success",
                buttons: false,
                timer: 2000
              });
              this.$emit("myArticle");
            })
            .catch(err => {
              Swal.fire({
                title: "Something wrong, try again latter!",
                type: "error",
                buttons: false,
                timer: 2000
              });
              console.log(err);
            });
        }
      });
    },
    deletePost() {
      Swal.fire({
        title: "Are you sure want to delete this article?",
        type: "question",
        buttons: true
      })
        .then(() => {
          axios({
            method: "delete",
            url: `${baseUrl}/articles/${this.articleId}`,
            headers: {
              token: localStorage.getItem("token")
            }
          })
            .then(({ data }) => {
              Swal.fire({
                title: "Article has been deleted succesfully!",
                type: "success",
                buttons: false,
                timer: 2000
              });
              console.log("article deleted successfully");
              this.$emit("myArticle");
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    editArticle() {
      this.isEdit = true;
    },
    cancle() {
      this.isEdit = false;
    },
    back() {
      this.$emit("myArticle");
    }
  },
  created() {
    this.getArticle();
  }
};
</script>

<style scoped>
.card {
  margin-top: 116px;
}

.card-text {
  max-width: 900px;
}

.image-content {
  width: 18%;
  height: auto;
  margin-right: auto;
  margin-left: auto;
  min-width: 900px;
  max-width: 1000px;
}

.button-action {
  float: right;
}
.button-cancle {
  margin-top: -88px;
  margin-left: 1170px;
}

h1 {
  margin-top: 180px;
  text-align: center;
  font-family: 'Permanent Marker', cursive;
}
.row-edit {
  margin-top: -50px;
}
.card.title {
  margin-top: -20px;
}
.card.content,
.card.image,
.card.submit {
  margin-top: 0px;
}
</style>