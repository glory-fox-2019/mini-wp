<template>
  <div>
    <!-- Article -->
    <div class="card text" id="content">
      <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs">
          <li class="nav-item">
            <a class="nav-link active" href="#" data-toggle="tab" @click="isContent = true">Article</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" data-toggle="tab" @click="isContent = false">About Creator</a>
          </li>
        </ul>
      </div>
      <div class="card-body" v-if="isContent">
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

      <!-- Creator Profile -->
      <div id="profile" v-if="!isContent">
        <h4>Creator's Profile</h4>
        <div class="card mb-3 profile" style="max-width: 540px;">
          <div class="row no-gutters">
            <div class="col-md-4">
              <img
                :src="articleData.userId.image"
                class="card-img"
                alt="image profile"
              />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{{ articleData.userId.username }}</h5>
                <p class="card-text">{{ articleData.userId.bio }}</p>
                <p class="card-text">
                  <small class="text-muted">Last update profile: {{ articleData.userId.updatedAt }}</small>
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Creator List -->
        <div id="list-blog">
          <div class="list-group">
            <span type="text" class="list-group-item list-group-item-action active">
              <i>Another Creator's Blog</i>
            </span>
            <button
              v-for="(blog, index) in blogs"
              :key="index"
              type="button"
              class="list-group-item list-group-item-action"
              @click.prevent="changeArticleId(blog)"
            >{{ blog.title }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const baseUrl = "http://localhost:3000";
export default {
  props: ["articleId"],
  data() {
    return {
      // defaultKey: 0,
      isContent: true,
      blogs: [],
      articleData: {
        image: "",
        title: "",
        createdAt: "",
        updatedAt: "",
        content: "",
        userId: {
          _id: "",
          username: "",
          bio: "",
          updatedAt: "",
          image: ""
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
          token: localStorage.getItem('token')
        }
      }).then(({ data }) => {
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
        this.articleData.userId.bio = data.userId.bio;
        this.articleData.userId.updatedAt = creatorUpdated;
        if(data.userId.image) this.articleData.userId.image = data.userId.image
        else this.articleData.userId.image = "https://allworldpm.com/wp-content/uploads/2016/10/230x230-avatar-dummy-profile-pic.jpg"
        this.getUsersArticles()
      })
    },
    getUsersArticles() {
      axios({
        method: "get",
        url: `${baseUrl}/articles/creator`,
        headers: {
          token: localStorage.getItem('token'),
          creatorId: localStorage.creatorId
        }
      }).then(({ data }) => {
        this.blogs = data;
      });
    },
    showProfile() {
      this.isContent = false;
    },
    changeArticleId(blog) {
      this.$emit("getSingleArticle", blog);
      this.isContent = true;
      this.reloadPage();
      // this.defaultKey += 1;
    },
    reloadPage(){
      window.location.reload()
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

.card.profile {
  margin-top: 10px;
  display: flex;
}

#profile {
  margin-top: 10px;
  margin-left: 25px;
}

#list-blog {
  margin-right: 25px;
  margin-bottom: 40px;
}
</style>