<template>
  <div>
    <center>
      <h1>People's Articles</h1>
    </center>
    <!-- All Articles -->
    <div class="row" v-if="!keyword">
      <div
        class="col-md-4 mt-5 d-flex justify-content-center"
        v-for="(article, index) in articles"
        :key="index"
      >
        <div class="card h-100" style="width: 18rem;">
          <a href="#" @click.prevent="getContent(article)">
            <img class="card-img-top" :src="article.image" alt style="height: 12rem;" />
          </a>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#" @click.prevent="getContent(article)">{{ article.title }}</a>
            </h4>
            <p class="card-text collapse" v-html="article.content"></p>
            <a
              class="collapsed"
              data-toggle="collapse"
              href="#collapseSummary"
              aria-expanded="false"
              aria-controls="collapseSummary"
              @click.prevent="getContent(article)"
            >. . .</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Filtered Articles -->
    <div class="row" v-if="keyword">
      <div
        class="col-md-4 mt-5 d-flex justify-content-center"
        v-for="(article, index) in filteredArticles"
        :key="index"
      >
        <div class="card h-100" style="width: 18rem;">
          <a href="#" @click.prevent="getContent(article)">
            <img class="card-img-top" :src="article.image" alt style="height: 12rem;" />
          </a>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#" @click.prevent="getContent(article)">{{ article.title }}</a>
            </h4>
            <p class="card-text collapse" v-html="article.content"></p>
            <a
              class="collapsed"
              data-toggle="collapse"
              href="#collapseSummary"
              aria-expanded="false"
              aria-controls="collapseSummary"
              @click.prevent="getContent(article)"
            >. . .</a>
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
  props: ["keyword"],
  data() {
    return {
      userId: "",
      articles: []
    };
  },
  methods: {
    getAllArticles() {
      axios({
        url: `${baseUrl}/articles`,
        method: "get",
        headers: {
          token: localStorage.getItem("token")
        }
      }).then(({ data }) => {
        this.articles = data;
      });
    },
    getContent(article) {
      this.$emit("getSingleArticle", article);
    },
    createComment() {
      axios({
        url: `${baseUrl}/comment/${this.articleModal._id}`,
        method: "post",
        headers: {
          token: localStorage.getItem("token")
        },
        data: { comment: this.iscomment }
      }).then(({ data }) => {
        this.com = data;
        this.fetchComment();
      });
    },
    fetchComment() {
      axios({
        url: `${baseUrl}/comment/${this.articleModal._id}`,
        method: "get",
        headers: {
          token: localStorage.getItem("token")
        }
      }).then(({ data }) => {
        this.comments = data;
      });
    }
  },
  created() {
    this.getAllArticles();
    this.userId = localStorage.userId;
  },
  computed: {
    filteredArticles() {
      return this.articles.filter(article => {
        return article.title.toLowerCase().includes(this.keyword.toLowerCase())
      })
    }
  }
};
</script>

<style scoped>
.row {
  margin-top: 50px;
}
h1 {
  margin-top: 180px;
  font-family: 'Permanent Marker', cursive;
}
.card-body p.collapse:not(.show) {
  height: 100px !important;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.card-body a.collapsed:after {
  content: "[ Read More ]";
}

/* .card-body p.collapsing {
    min-height: 42px !important;
} */

/* .card-body a:not(.collapsed):after {
    content: '- Read Less';
} */
</style>