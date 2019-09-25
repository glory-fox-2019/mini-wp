<template>
  <div>
    <center>
      <h1>My Articles</h1>
    </center>
    <!-- List of User's Blog -->
    <div class="list-article" v-if="articles.length > 0">
      <div class="list-group" v-for="(article, index) in articles" :key="index">
        <a class="list-group-item list-group-item-action flex-column align-items-start">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ article.title }}</h5>
            <small>Created At: {{ article.createdAt }}</small>
          </div>
          <p class="mb-1 collapse" v-html="article.content"></p>
          <a
            class="collapsed"
            data-toggle="collapse"
            href="#collapseSummary"
            aria-expanded="false"
            aria-controls="collapseSummary"
            @click.prevent="editSingleArticle(article)"
          >. . .</a>
          <br />
          <br />
          <small>Last Update: {{ article.updatedAt }}</small>
        </a>
      </div>
    </div>

    <!-- Empty Article -->
    <div class="empty-list" v-else>
      <h3>You don't have any article..</h3>
      <hr>
      <h4>Create New One?</h4>
      <button type="button" class="btn btn-link" @click.prevent="createArticle">Click here..</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const baseUrl = "http://localhost:3000";
export default {
  data() {
    return {
      articles: []
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
    editSingleArticle(article) {
      this.$emit("editSingleArticle", article)
    },
    createArticle() {
      this.$emit("createNew")
    }
  },
  created() {
    this.getUserArticles();
  }
};
</script>

<style scoped>
h1 {
  margin-top: 180px;
  font-family: 'Permanent Marker', cursive;
}
.list-article {
  margin-top: 40px;
}
.list-group p.collapse:not(.show) {
  height: 100px !important;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.list-group a.collapsed:after {
  content: "[ Edit Article ]";
}
.empty-list {
  text-align: center;
  margin-top: 100px;
  font-family: 'Kalam', cursive;
}
</style>