<template>
  <div class="container">
        <h5 style="text-align: center;"> YOUR ARTICLES </h5>
        <hr>
    <div class="row">
      <div class="col-xs-12 col-sm-4" v-for="article in articles" style="margin-bottom: 10px;"> 
        <div class="card">
          <img
            class="img-card"
            v-bind:src="article.image"
          />
          <div class="card-content">
            <h5 class="card-title" style="text-align: center">
              {{article.title}}
            </h5>
            <div class="card-body">
              <p>{{article.content}}</p>
              <small>Author {{article.UserId.username}}</small>
            </div>
          </div>
          <div class="card-read-more">
            <a
              href="#"
              @click.prevent="clickDetailArticle(article._id)"
              class="btn btn-link btn-block"
            >Read More</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: localStorage.getItem("username"),
      articles: []
    };
  },

  methods: {
    clickDetailArticle(id){
      this.$emit('go-to-detail-page', id)
    }
  },

  mounted() {
    axios({
      method: "get",
      url: "http://localhost:3000/articles/myarticles",
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
  }
};
</script>

<style scoped>
.img-card {
  width: 100%;
  height: 200px;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  display: block;
  overflow: hidden;
}

.img-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: all 0.25s ease;
}

.card {
  box-shadow: 2px 2px 9px 1px rgba(0, 0, 0, 0.54);
}
</style>