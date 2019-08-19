<template>
  <div>
    <div class="row">
      <!-- Article Modal -->
      <div class="modal" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <h6>{{articleModal.userId.username}}<h6>
            <br>
            <small>{{articleModal.content}}</small>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      userId: "",
      articleModal: {
        image: "",
        title: "",
        createdAt: "",
        content: "",
        userId: {
          _id: "",
          username: ""
        }
      }
    };
  },
  methods: {
    getModal(article) {
      axios({
        method: "get",
        url: `http://localhost:3000/articles/one/${$event._id}`,
        headers: {
          token: localStorage.token
        }
      }).then(({ data }) => {
        this.articleModal = data;
      });
    },
    deletePost() {
      axios({
        method: "delete",
        url: `http://localhost:3000/articles/one/${this.articleModal._id}`,
        headers: {
          token: localStorage.token
        }
      }).then(({ data }) => {
        console.log("deleted");
        this.articleModal = {
          image:
            "https://cdn4.iconfinder.com/data/icons/common-toolbar/36/Delete-2-512.png",
          userId: {
            username: "deleted"
          },
          likes: []
        };
      });
    }
  }
};
</script>

<style scoped>
.modal{
    margin-top: 200px;
}
.row {
  margin-top: 50px;
}
h1 {
  margin-top: 150px;
}
</style>