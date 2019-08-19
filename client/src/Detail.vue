<template>
  <div  class="d-flex flex-xl-column justify-content-xl-center flex-lg-column justify-content-lg-center">
    <div>
      <h1>{{title}}</h1>
      <!-- <div class="g-signin2" data-onsuccess="onSignIn"></div> -->
    </div>
    <div>
      <p>{{content}}</p>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      title: "",
      content: ""
    };
  },
  props: ["IdArticle"],
  created() {
    axios({
      method: "GET",
      url: `http://localhost:3000/api/article/${this.IdArticle}`,
      headers: {
        token: localStorage.getItem("token")
      }
    })
      .then(({ data }) => {
        let { title, content } = data;
        this.articles = data;
        this.title = title;
        this.content = content;
        console.log(data);
        // console.log(this.articles)
      })
      .catch(err => {
        console.log("error");
        console.log(err, "  fdfdf");
      });
    console.log(this.IdArticle, " di detail ya");
    // console.log('sldfdklsmfkdsmfkdsmfdskmfdskfm' , this.articles)
  }
};
</script>

<style scoped>
h1 {
  font-family: medium-content-title-font, Georgia, Cambria, "Times New Roman",
    Times, serif;
}
</style>