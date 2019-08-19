<template>
  <div class="container">
    <div class="d-flex justify-content-center" style="margin-bottom: 30px; margin-top:10px">
      <a href="#" @click.prevent="clickAddArticle">
        <i class="fas fa-plus">ADD ARTICLE</i>
      </a>
    </div>
    <div class="container grid">
      <div class="grid-item" v-for="(article, i) in articles" style="margin-bottom:15px;">
        <div class="d-flex" :class="{'justify-content-end' : i%2 == 1}">
          <cardArticle 
            :article="article"
            @go-to-detail="clickDetailArticle($event)"
          > 
          </cardArticle>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const articlePath = "http://localhost:3000/articles";
import articleAdd from "./add-article";
import cardArticle from './card-article';

export default {
  data() {
    return {
      articles: []
    };
  },
  methods: {

    clickAddArticle() {
      this.$emit("go-to-add-article");
    },

    clickDetailArticle(id){
      this.$emit('go-to-detail-article', id)
    }
  },

  components: {
    articleAdd,
    cardArticle
  },

  mounted() {
    axios({
      method: "get",
      url: articlePath
    })
      .then(({ data }) => {
        this.articles = data;
      })
      .catch(console.log);
  }
};
</script>

<style scoped>
img {
  max-width: 100%;
  max-height: auto;
  border-radius: 0px;
}
</style>
