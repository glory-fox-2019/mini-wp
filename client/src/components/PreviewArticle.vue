<template>
  <div class="preview d-flex flex-column align-items-center">
    <div
      class="banner-image d-flex flex-column justify-content-around align-items-center"
      :style="{ backgroundImage: 'url(' + article.featured_image + ')' }"
    >
      <span></span>
      <h1>{{article.title}}</h1>
      <span></span>
      <button
        v-if="!article.isPublished"
        class="btn btn-primary publish-btn"
        @click.prevent="publishArticle(article._id)"
      >Publish this article</button>
    </div>
    <div class="creator align-self-end">
      <h5 class="author">Author: {{article.author.username}}</h5>
      <small class="created-at">Created at {{createdAt}},</small>
      <small class="created-at">published {{moment(`${formatDate}`).fromNow()}}</small>
    </div>
    <div class="parag" v-html="article.content"></div>
  </div>
</template>

<script>
import moment from "moment";
import Swal from "sweetalert2";
import axios from "axios";

export default {
  props: ["article", "baseUrl"],
  data() {
    return {
      moment: moment
    };
  },
  methods: {
    publishArticle(id) {
      Swal.fire({
        title: "Publish this article?",
        text: "Once publish, your article can seen by other people",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, sharet it!"
      }).then(result => {
        if (result.value) {
          axios({
            method: "put",
            url: `${this.baseUrl}/articles/publish/${id}`,
            headers: {
              token: localStorage.getItem("token")
            }
          })
            .then(({ data }) => {
              Swal.fire(
                "Success!",
                "Your article has been published.",
                "success"
              );
              this.$emit("publish-article");
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  },
  computed: {
    createdAt() {
      return this.article.createdAt.substr(0, 10);
    },
    formatDate() {
      let dateObject = new Date(this.article.updatedAt);
      let month = dateObject.getMonth() + 1;
      let hour = dateObject.getHours();
      let minutes = dateObject.getMinutes();
      let seconds = dateObject.getSeconds();

      if (month.toString().length == 1) {
        month = `0${dateObject.getMonth() + 1}`;
      }
      if (hour.toString().length == 1) {
        hour = `0${dateObject.getHours()}`;
      }
      if (minutes.toString().length == 1) {
        minutes = `0${dateObject.getMinutes()}`;
      }
      if (seconds.toString().length == 1) {
        seconds = `0${dateObject.getSeconds()}`;
      }

      var date = `${dateObject.getFullYear()}-${month}-${dateObject.getDate()}`;
      var time = `${hour}:${minutes}:${seconds}`;
      var dateTime = date + " " + time;
      return dateTime;
    }
  }
};
</script>


<style scoped>
div.preview {
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.513);
  border-radius: 6px;
}

h1 {
  font-family: "Lobster";
  margin-top: 20px;
  color: white;
  font-size: 90px;
  text-shadow: 4px 4px 5px rgba(0, 0, 0, 0.61);
}

div.parag {
  margin-top: 30px;
  padding: 0 100px;
  height: 100%;
  font-family: "Times New Roman", Times, serif;
}

.banner-image {
  width: 100%;
  height: 350px;
  background-size: cover;
  border-radius: 6px 6px 0 0;
  background-position-y: -150px;
  background-attachment: fixed;
}

.publish-btn {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.541);
  position: relative;
  top: 0;
  transition: 0.2s;
}

.publish-btn:hover {
  top: -4px;
  box-shadow: 0 6px 7px rgba(0, 0, 0, 0.438);
}

.creator {
  margin-right: 100px;
  margin-top: 40px;
  text-align: right;
}

small.created-at {
  color: grey;
  font-family: "Oswald";
}

h5.author {
  font-family: "Oswald";
  font-size: 25px;
}
</style>
