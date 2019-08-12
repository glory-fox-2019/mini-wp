<template>
  <div class="article-form-container">
    <h1 class="new-article">New Article</h1>
    <form enctype="multipart/form-data">
      <input
        class="inp-title"
        type="text"
        name="inp-article-title"
        id="inp-article-title"
        placeholder="Title here.."
        v-model="formCreate.title"
      />
      <input class="input-img" type="file" name="files" id="file" @change="inputFile" />

      <Editor
        class="editor"
        v-model="formCreate.content"
        api-key="yz6rslamoykea3ihubhhbd4r79vbysel2ke1qimc6866wzvm"
        :init="{plugins: 'wordcount'}"
      ></Editor>
      <button class="btn btn-primary" href @click.prevent="createArticle">Submit</button>
    </form>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import axios from "axios";

export default {
  data() {
    return {
      formCreate: {
        title: "",
        content: "",
        featured_image: ""
      }
    };
  },
  components: {
    Editor
  },
  methods: {
    inputFile: function(e) {
      this.formCreate.featured_image = e.target.files[0];
    },
    createArticle: function() {
      //harus disin new form data
      //append formdata nya denga title, contentn, featured_image
      //request ke database server
      //kalau berhasil ("masuk then")
      //this,$emit

      let formData = new FormData();
      formData.append("title", this.formCreate.title);
      formData.append("content", this.formCreate.content);
      formData.append("image", this.formCreate.featured_image);

      axios({
        method: "post",
        url: "http://localhost:3000/articles",
        data: formData,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          console.log(data, "created article response from CreateForm");
          this.$emit("create-article");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.editor {
  height: 300px;
}

h1.new-article {
  font-family: "Lobster";
}

input.input-img {
  margin-bottom: 20px;
}

button {
  margin: 10px 0;
}
</style>
