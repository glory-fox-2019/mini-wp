<template>
  <div>
    <center>
      <h1>My Blog</h1>
    </center>
    <div class="row">
      <div class="col-md-4 mt-5 d-flex justify-content-center" v-for="article in articles">
        <div class="card h-100" style="width: 18rem;">
          <!-- <a href="#" @click="getModal(article)" data-toggle="modal" data-target="#myModal">
            <img class="card-img-top" src="http://placehold.it/700x400" alt />
          </a>-->
          <!-- <a href="#" @click="getModal(article)" data-toggle="modal" data-target="#myModal">
            <img v-bind:src="article.image" />
          </a> -->
          <div class="card-body">
            <h4 class="card-title">
              <a
                href="#"
                @click.prevent="getModal(article)"
                data-toggle="modal"
                data-target="#myModal"
              >{{ article.title }}</a>
            </h4>
            <p class="card-text">{{ article.content }}</p>
          </div>
        </div>
      </div>

      <!-- Article Modal -->

      <!-- <div class="modal" id="myModal">
            <h6>{{articleModal.userId.username}}<h6>
            <br>
            <small>{{articleModal.content}}</small>
      </div> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      userId: "",
      articleModal: {
        image: "",
        userId: {
          _id: "",
          username: ""
        },
        likes: []
      },
      articles: []
    };
  },
  methods: {
    getAllArticles() {
      axios({
        url: "http://localhost:3000/articles/myArticle",
        method: "get",
        headers: {
          token: localStorage.token
        }
      }).then(({ data }) => {
        this.articles = data;
        console.log(data);
      });
    },
    getModal(article) {
      // axios({
      //   method: "get",
      //   url: `http://localhost:3000/articles/one/${article._id}`,
      //   headers: {
      //     token: localStorage.token
      //   }
      // }).then(({ data }) => {
      //   this.articleModal = data;
      // });
        this.$emit('contentActive', {articleId: article._id})
    },
    like() {
      axios({
        method: "patch",
        url: `http://localhost:3000/posts/${this.articleModal._id}`,
        headers: {
          token: localStorage.token
        }
      }).then(({ data }) => {
        console.log("liked");
        this.getModal(this.articleModal);
      });
    },
    deletePost() {
      axios({
        method: "delete",
        url: `http://localhost:3000/posts/${this.articleModal._id}`,
        headers: {
          token: localStorage.token
        }
      }).then(({ data }) => {
        console.log("deleted");
        this.articleModal = {
          image:
            "https://cdn4.iconfinder.com/data/icons/common-toolbar/36/Delete-2-512.png",
          userId: {
            username: "deleted"
          },
          likes: []
        };
        this.getAllArticles();
      });
    },
    createComment() {
      console.log("masuk create comment");
      axios({
        url: `http://localhost:3000/comment/${this.articleModal._id}`,
        method: "post",
        headers: {
          token: localStorage.token
        },
        data: { comment: this.iscomment }
      }).then(({ data }) => {
        this.com = data;
        this.fetchComment();
        console.log(data);
      });
    },
    fetchComment() {
      axios({
        url: `http://localhost:3000/comment/${this.articleModal._id}`,
        method: "get",
        headers: {
          token: localStorage.token
        }
      }).then(({ data }) => {
        this.comments = data;
        console.log(data);
      });
    }
  },
  created() {
    this.getAllArticles();
    this.userId = localStorage.userId;
  },
  computed: {
    filteredPhotos() {
      if (filterUser == true) {
        return this.photos.filter(photo => {
          return article.author._id == userId;
        });
      }
    }
  }
};
</script>

<style scoped>
.row {
  margin-top: 50px;
}
h1 {
  margin-top: 150px;
}
</style>