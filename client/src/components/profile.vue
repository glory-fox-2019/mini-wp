<template>
  <div>
    <center>
      <h1>My Profile</h1>
    </center>
      <!-- User's Profile -->
      <div id="profile">
        <div class="card mb-3 profile" style="max-width: 650px;">
          <div class="row no-gutters">
            <div class="col-md-4">
              <img
                :src="image"
                class="card-img"
                alt="image profile"
              />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{{ this.username }}</h5>
                <p class="card-text">{{ this.bio }}</p>
                <p class="card-text">
                  <hr>
                  <small class="text-muted">Last update profile: {{ this.updatedAt }}</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="navbar navbar-expand-lg navbar-dark bg-primary">
        <h3>
          <i>My Articles . . .</i>
        </h3>
      </div>

    <!-- List of User's Blog -->
    <div class="list-article">
      <div class="list-group" v-for="(article, index) in articles" :key="index">
        <span href="#" class="list-group-item list-group-item-action flex-column align-items-start">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ article.title }}</h5>
            <small>Created At: {{ article.createdAt }}</small>
          </div>
          <p class="mb-1 collapse" v-html="article.content"></p>
          <p>. . .</p>
          <small>Last Update: {{ article.updatedAt }}</small>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const baseUrl = "http://localhost:3000";
export default {
  data() {
    return {
      username: "",
      bio: "",
      updatedAt: "",
      articles: [],
      image: ""
    };
  },
  methods: {
    getUserArticles() {
      axios({
        url: `${baseUrl}/articles/user`,
        method: "get",
        headers: {
          token: localStorage.getItem('token')
        }
      }).then(({ data }) => {
        data.forEach(
          el => (el.createdAt = new Date(el.createdAt).toLocaleString())
        );
        data.forEach(
          el => (el.updatedAt = new Date(el.updatedAt).toLocaleString())
        );
        this.articles = data;
      });
    },
    getUserProfile() {
      axios({
        url: `${baseUrl}/users`,
        method: "get",
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        console.log(data,'data get in client')
        this.username = data.username
        this.bio = data.bio
        this.updatedAt = new Date(data.updatedAt).toLocaleString()
        if(data.image) this.image = data.image
        else this.image = "https://allworldpm.com/wp-content/uploads/2016/10/230x230-avatar-dummy-profile-pic.jpg"
      });
    }
  },
  created() {
    this.getUserArticles();
    this.getUserProfile();
  }
};
</script>

<style scoped>
h1 {
  margin-top: 180px;
  font-family: 'Permanent Marker', cursive;
}
h3 {
  color: white;
}

#profile {
  margin-top: 40px;
  display: flex;
  justify-content: center
}
.list-group p.collapse:not(.show) {
  height: 100px !important;
  overflow: hidden;
  display: -webkit-box;
}

</style>