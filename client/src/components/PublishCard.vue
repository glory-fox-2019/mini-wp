<template>
  <div class="published-card d-flex">
    <div
      class="featured-image col-3"
      :style="{ backgroundImage: 'url(' + article.featured_image + ')' }"
    ></div>
    <div class="main-content col-9">
      <a href class="title" @click.prevent="showArticle(article._id)">
        <h2>{{article.title}}</h2>
      </a>
      <div class="paragraph" v-html="clampedParagraph"></div>
      <div class="footer-card d-flex justify-content-between">
        <div class="tags-list d-flex">
          <TagCard
            v-for="tag in article.tags"
            :key="tag._id"
            :id="tag._id"
            :tagName="tag.name"
            :isPublished="article.isPublished"
            :count="tag.count"
            :baseUrl="baseUrl"
            @search-bytag="$emit('search-bytag', $event)"
          ></TagCard>
        </div>
        <div class="publish-info d-flex align-items-center">
          <i class="fas fa-globe-asia mr-1"></i>
          <small>published {{moment(`${formatDate}`).fromNow()}}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TagCard from "./TagCard.vue";
import moment from "moment";

export default {
  props: ["article", "baseUrl"],
  components: {
    TagCard
  },
  data() {
    return {
      moment: moment
    };
  },
  methods: {
    showArticle(id) {
      this.$emit("show-article", id);
    }
  },
  computed: {
    clampedParagraph() {
      return `${this.article.content.substr(0, 170)} ...`;
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
.published-card {
  margin-bottom: 20px;
  width: 100%;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.555);
  border-radius: 5px;
  position: relative;
  top: 0;
  transition: 0.2s;
}

.published-card:hover {
  top: -5px;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.336);
}

.featured-image {
  background-size: cover;
  border-radius: 5px 0 0 5px;
}

div.main-content {
  padding: 10px;
  padding-left: 20px;
  padding-right: 30px;
  width: 100%;
  background-color: white;
  border-radius: 0 5px 5px 0;
}

.title h2 {
  font-family: "Oswald";
  text-decoration: none;
  font-size: 23px;
}

a.title {
  text-decoration: none;
}

.paragraph {
  font-family: "Times New Roman", Times, serif;
  font-size: 15px;
}

div.footer-card {
  margin-top: 30px;
  margin-bottom: 10px;
}

small,
i {
  color: rgb(158, 154, 154);
}
</style>