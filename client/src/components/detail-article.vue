<template>
  <div class="container" style="padding-top: 100px">
    <div class="row d-flex justify-content-center">
      <div class="col-4 detailArt">
        <img v-bind:src="image" alt="thumb" />
      </div>
      <div class="col-8 detailArt">
        <div class="card" style="height: 100%; width: 100%;">
          <div class="card-body">
            <h5 class="card-title">{{title}}</h5>
            <p class="card-text">{{content}}</p>
            <p class="card-text">
              <small class="text-muted">Lastes updated {{new Date(updated)}}</small>
            </p>
            <small v-if="authoriz">
              <a href="#" @click.prevent="clickEditArticle(someId)">
                <i class="fas fa-edit"></i>
              </a>
              <a href="#" @click.prevent="deleteArticle(someId)">
                <i class="fas fa-trash"></i>
              </a>
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["someId"],

  data() {
    return {
      content: "",
      title: "",
      image: "",
      updated: "",
      authoriz: false
    };
  },

  methods: {
    deleteArticle(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      })
        .then(result => {
          if (result.value) {
            return axios({
              method: "delete",
              url: `http://localhost:3000/articles/${id}`,
              headers: {
                token: localStorage.getItem("token")
              }
            });
          }
        })
        .then(response => {
          this.$emit("go-to-article-page", "");
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        })
        .catch(err => {
          console.log(err);
        });
    },

    clickEditArticle(id) {
      this.$emit("go-to-edit-page", id);
    }
  },

  mounted() {
    axios({
      method: "get",
      url: `http://localhost:3000/articles/${this.someId}`,
      headers: {
        token: localStorage.getItem("token")
      }
    })
      .then(({ data }) => {
        if (data.UserId._id == localStorage.getItem("id")) {
          this.authoriz = true;
        }
        this.title = data.title;
        this.content = data.content;
        this.image = data.image;
        this.updated = data.updatedAt;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
</style>