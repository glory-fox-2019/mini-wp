<template>
  <div class="container grid">
    <div class="grid-item" v-for="(article) in articles" style="margin-bottom:30px;">
      <div class="d-flex justify-content-center">
        <div class="card" style="max-width: 50%;  border: 0px">
          <div class="card body">
            <div class="row no-gutters">
              <div class="col-5 d-flex align-items-center">
                <img v-bind:src="article.urlToImage" class="card-img" alt="thumb(400x300)" />
              </div>
              <div class="col-7 d-flex align-items-stretch">
                <div class="card-body">
                  <h4 class="card-title">{{article.title}}</h4>
                  <p class="card-text">{{article.description.substring(0,120)}}...</p>
                  <a v-bind:href="article.url">read more</a>
                  <hr />
                  <div class="card-meta">
                    <span style="font-size:10px">
                      <i class="far fa-calendar-alt"></i>
                      {{new Date(article.publishedAt)}}
                    </span>
                  </div>
                  <small class="card-meta float-right">{{article.author}}</small>
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
export default {
  data() {
    return {
      articles: []
    };
  },

  created() {
    axios({
      method: "get",
      url: "http://localhost:3000/articles/top-newest"
    })
      .then(({ data }) => {
        console.log(data);
        this.articles = data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
img {
  max-width: 700px;
  max-height: 400px;
}

.card-body {
  max-width: 700px;
  max-height: 400px;
}

.card {
  box-shadow: 4px 5px 11px -1px rgba(0, 0, 0, 0.77);
}
</style>
