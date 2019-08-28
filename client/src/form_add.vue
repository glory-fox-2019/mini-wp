<template>
  <div>
    <div>
      <form v-on:submit.prevent="add" enctype="multipart/form-data" >
        <div class="form-group">
          <label for="exampleInputEmail1">Enter Article</label>
          <input type="text" class="form-control" placeholder="Enter Title" v-model="title" />
        </div>
        <div class="form-group">
          <wysiwyg v-model="content" />
        </div>
        <div class="form-group">
          <input type="file" @change="previewFile" id="file" ref="myFiles" />
        <input type="submit" class="btn btn-primary" />
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      content: "",
      title: ""
    };
  },
  props: ["IdArticle"],
  created() {},
  methods: {
    add() {
      let { title, content } = this;
      axios({
        method: "POST",
        url: "http://localhost:3000/api/article",
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          title,
          content
        }
      })
        .then(({ data }) => {
          //   this.articles = data;
          // console.log('fkdsfnjdsnfjdsn')
          console.log("skdnfkdsnfdksnfdsk");
          console.log(data , ' di isinsfpsdfpdlfpdslfp')
          this.$emit("adds", data);
        })
        .catch(err => {
          console.log("error");
          console.log(err, "  fdfdf");
        });
    }
  }
};
</script>

<style scoped>
</style>