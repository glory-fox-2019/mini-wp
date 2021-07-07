<template>
  <div class="article-form-container">
    <h1 class="new-article roboto">Edit Article</h1>
    <form>
      <input
        class="inp-title"
        type="text"
        name="inp-article-title"
        placeholder="Title here.."
        v-model="formEdit.title"
      />
      <!-- file image input -->
      <h3 class="tag-title">Featured Image:</h3>
      <small class="small-info">
        <i>If you wont update the image, do not input a new image</i>
      </small>
      <b-form-file
        placeholder="Choose a file..."
        drop-placeholder="Drop file here..."
        @change="inputFile"
      ></b-form-file>
      <!-- input tags -->
      <h3 class="tag-title">Tags:</h3>
      <small class="small-info">
        ex:
        <i>vacation, holiday, ... (press Enter to input tags); Maximum tags limit is 5</i>
      </small>
      <tags-input
        class="input-tags"
        element-id="tags"
        v-model="selectedTags"
        :existing-tags="existingTags"
        :typeahead="true"
        :limit="5"
      ></tags-input>
      <!-- text editor -->
      <Editor
        class="editor"
        v-model="formEdit.content"
        api-key="yz6rslamoykea3ihubhhbd4r79vbysel2ke1qimc6866wzvm"
        :init="{plugins: 'wordcount',
        menubar:false,
        toolbar: 'formatselect | bold italic strikethrough forecolor backcolor permanentpen formatpainter | link image media pageembed | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent | removeformat | addcomment'}"
      ></Editor>

      <div class="edit d-flex align-items-center">
        <button class="btn btn-primary" href @click.prevent="updateArticle(currentArticle._id)">Edit</button>
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
  props: ["currentArticle", "baseUrl"],
  components: {
    Editor
  },
  data() {
    return {
      formEdit: {
        title: this.currentArticle.title,
        content: this.currentArticle.content,
        tags: [],
        featured_image: ""
      },
      existingTags: [],
      selectedTags: [],
      isLoading: false
    };
  },
  methods: {
    inputFile(e) {
      this.formEdit.featured_image = e.target.files[0];
    },
    updateArticle: function(id) {
      this.isLoading = true;

      let formData = new FormData();
      formData.append("title", this.formEdit.title);
      formData.append("content", this.formEdit.content);
      formData.append("tags", this.formEdit.tags);
      formData.append("imageEdit", this.formEdit.featured_image);

      if (this.formEdit.tags.length == 0) {
        this.isLoading = false;
        Swal.fire({
          type: "error",
          title: "Oops",
          text: "Please input at least one tag."
        });
      } else {
        axios({
          method: "put",
          url: `${this.baseUrl}/articles/edit/${id}`,
          data: formData,
          headers: {
            token: localStorage.getItem("token")
          }
        })
          .then(({ data }) => {
            this.isLoading = false;
            this.$emit("update-article", data);
          })
          .catch(err => {
            console.log(err);
            Swal.fire({
              type: "error",
              title: "Oops",
              text: err.response.data.message
            });
          });
      }
    }
  },
  watch: {
    // format tags input so it only input the value
    selectedTags: function(newVal, oldVal) {
      let formatedTags = [];
      for (const tag of newVal) {
        formatedTags.push(tag.value);
      }
      this.formEdit.tags = formatedTags;
    }
  },
  created() {
    // fill current tags
    for (let i = 0; i < this.currentArticle.tags.length; i++) {
      let tags = this.currentArticle.tags;
      this.selectedTags.push({ value: `${tags[i].name}` });
      this.formEdit.tags.push(`${tags[i].name}`);
    }
    // fill entire existing tags
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
  }
};
</script>

<style scoped>
.editor {
  height: 500px;
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
.input-tags {
  margin-bottom: 10px;
}

.small-info {
  color: rgb(177, 171, 171);
}
</style>
