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
        autocomplete="off"
      />
      <!-- file image input -->
      <h3 class="tag-title">Featured Image:</h3>
      <small class="small-info">
        <i>required</i>
      </small>
      <b-form-file
        placeholder="Choose a file..."
        drop-placeholder="Drop file here..."
        @change="inputFile"
      ></b-form-file>

      <!-- tags input -->
      <h3 class="tag-title">Tags:</h3>
      <small class="small-info">
        <i>required; ex: vacation, holiday, ... (press Enter to input tags); Maximum tags limit is 5</i>
      </small>
      <tags-input
        class="input-tags"
        element-id="tags"
        v-model="selectedTags"
        :existing-tags="existingTags"
        :typeahead="true"
        :limit="5"
      ></tags-input>

      <Editor
        class="editor"
        v-model="formCreate.content"
        api-key="yz6rslamoykea3ihubhhbd4r79vbysel2ke1qimc6866wzvm"
        :init="{
          plugins: 'wordcount', 
          menubar:false,
          toolbar: 'formatselect | bold italic strikethrough forecolor backcolor permanentpen formatpainter | link image media pageembed | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent | removeformat | addcomment'}"
      ></Editor>

      <div class="submit d-flex align-items-center">
        <button class="btn btn-primary" href @click.prevent="createArticle">Save</button>
        <div class="loading ml-2" v-show="isLoading">
          <span>Loading...</span>
          <b-spinner small label="Small Spinner"></b-spinner>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  props: ["baseUrl"],
  data() {
    return {
      isLoading: false,
      formCreate: {
        title: "",
        content: "",
        featured_image: "",
        tags: []
      },
      existingTags: [],
      selectedTags: []
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
      this.isLoading = true;

      let formData = new FormData();
      formData.append("title", this.formCreate.title);
      formData.append("content", this.formCreate.content);
      formData.append("image", this.formCreate.featured_image);
      formData.append("tags", this.formCreate.tags);

      if (this.formCreate.tags.length == 0) {
        this.isLoading = false;
        Swal.fire({
          type: "error",
          title: "Oops",
          text: "Please input at least one tag."
        });
      } else if (this.formCreate.featured_image == "") {
        this.isLoading = false;
        Swal.fire({
          type: "error",
          title: "Oops",
          text: "Please input featured image."
        });
      } else {
        axios({
          method: "post",
          url: `${this.baseUrl}/articles`,
          data: formData,
          headers: {
            token: localStorage.getItem("token")
          }
        })
          .then(({ data }) => {
            this.isLoading = false;
            this.$emit("create-article");
          })
          .catch(err => {
            console.log(err);
            this.isLoading = false;
            Swal.fire({
              type: "error",
              title: "Oops",
              text: err.response.data.message
            });
          });
      }
    }
  },
  created() {
    axios({
      method: "get",
      url: `${this.baseUrl}/tags`
    })
      .then(({ data }) => {
        let existTags = [];
        for (let i = 0; i < data.length; i++) {
          existTags.push({ value: data[i].name });
        }
        this.existingTags = existTags;
      })
      .catch(err => {
        console.log(err);
      });
  },
  watch: {
    // format tags input so it only input the value
    selectedTags: function(newVal, oldVal) {
      let formatedTags = [];
      for (const tag of newVal) {
        formatedTags.push(tag.value);
      }
      this.formCreate.tags = formatedTags;
    }
  }
};
</script>

<style scoped>
.editor {
  height: 300px;
}

.input-tags {
  margin-bottom: 10px;
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

.tag-title {
  font-family: "Oswald";
  font-size: 20px;
  margin-top: 10px;
}
.small-info {
  color: rgb(177, 171, 171);
}
</style>
