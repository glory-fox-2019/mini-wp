<template>
  <div>
    <center>
      <h1>Create New Article</h1>
    </center>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm">
          <div class="column mt-4">
            <div class="card mb-4" style="background-color : rgba(218, 216, 216, 0.198)">
              <div class="row">
                <div class="col-sm mr-5 mb-5 ml-5 mt-5">
                  <div class="card mb-4">
                    <div class="card-body">
                      <input
                        type="text"
                        placeholder="Title..."
                        style="width : 100%; height: 40px"
                        v-model="title"
                        required
                      />
                    </div>
                  </div>
                  <div class="card mb-2">
                    <div class="card-body">
                      <wysiwyg v-model="content"></wysiwyg>
                    </div>
                  </div>
                  <div class="card mb-2">
                    <div class="card-body">
                      <h5>Upload New Image . . .</h5>
                      <form enctype="multipart/form-data">
                        <input
                          type="file"
                          @change="previewFile()"
                          id="file"
                          ref="myFiles"
                          accept="image/*"
                          required
                        />
                      </form>
                    </div>
                  </div>

                  <div class="card mb-4">
                    <div class="card-body">
                      <center>
                        <button
                          v-if="!isLoading"
                          class="btn btn-primary"
                          type="submit"
                          style="width : 100%; height: 40px; background-color:rgba(37, 80, 149, 0.966); color:white"
                          @click.prevent="createArticle"
                        >Create and publish your article</button>
                        <button v-else class="btn btn-primary" type="button" disabled>
                          <span
                            class="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Loading...
                        </button>
                      </center>
                    </div>
                  </div>
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
const baseUrl = "http://localhost:3000";
import axios from "axios";
export default {
  data() {
    return {
      title: "",
      content: "",
      image: "",
      isLoading: false
    };
  },
  methods: {
    createArticle() {
      Swal.fire({
        title: "Are you sure want to Post this article?",
        type: "question",
        buttons: true
      }).then(() => {
        this.isLoading = true;
        if (!this.title || !this.content || !this.image) {
          Swal.fire({
            title: "Please Fill All Of Input text and image",
            type: "error",
            buttons: false,
            timer: 2000
          });
        } else {
          let bodyFormData = new FormData();
          bodyFormData.append("image", this.image[0]);
          axios({
            method: "POST",
            url: baseUrl + "/image/upload",
            data: bodyFormData,
            config: {
              headers: {
                token: localStorage.getItem("token")
              }
            }
          })
            .then(({ data }) => {
              this.image = data.link;
              return axios.post(
                baseUrl + "/articles",
                {
                  title: this.title,
                  content: this.content,
                  image: this.image
                },
                {
                  headers: {
                    token: localStorage.getItem("token")
                  }
                }
              );
            })
            .then(({ data }) => {
              this.isLoading = false;
              Swal.fire({
                title: "Congrats, your article has been uploaded!",
                type: "success",
                buttons: false,
                timer: 2000
              });
              this.$emit("getProfile");
              this.title = "";
              this.content = "";
              this.image = "";
            })
            .catch(err => {
              swal({
                title: "Something error, try again later!",
                icon: "error",
                buttons: false,
                timer: 2000
              });
              console.log(err);
            });
        }
      });
    },
    previewFile() {
      console.log(this.$refs.myFiles.files);
      this.image = this.$refs.myFiles.files;
    }
  }
};
</script>

<style scoped>
h1 {
  margin-top: 180px;
  font-family: 'Permanent Marker', cursive;
}
</style>