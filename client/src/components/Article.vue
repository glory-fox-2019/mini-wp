<template>
  <div class="card row flex-row align-items-center">
    <div class="article-title col-9 mb-2">
      <div class="main-content mb-3">
        <h1 @click.prevent="previewArticle(id)">
          <a href>{{title}}</a>
        </h1>
        <span class="timestamp">{{condition}} {{moment(`${formatDate}`).fromNow()}}</span>
      </div>
      <div class="list-tags d-flex">
        <Tag
          v-for="tag in tags"
          :key="tag._id"
          :tagName="tag.name"
          :id="tag._id"
          :isPublished="isPublished"
          :publishListPage="publishListPage"
          class="tag-component"
          :baseUrl="baseUrl"
          :count="tag.count"
          @search-bytag="searchByTagDraft"
        ></Tag>
      </div>
    </div>

    <div class="article-image col-2" :style="{ backgroundImage: 'url(' + featuredImage + ')' }"></div>

    <div class="article-options col-1 d-flex flex-column justify-content-around align-self-stretch">
      <a href class="edit icon-options-draft" @click.prevent="editPage(id)">
        <font-awesome-icon icon="edit" class="edit"></font-awesome-icon>
      </a>
      <a href class="delete icon-options-draft" @click.prevent="deleteArticle(id)">
        <font-awesome-icon icon="trash" class="delete"></font-awesome-icon>
      </a>
    </div>
  </div>
</template>

<script>
import Tag from "./TagCard.vue";
import moment from "moment";

export default {
  props: [
    "id",
    "title",
    "content",
    "featuredImage",
    "tags",
    "createdAt",
    "updatedAt",
    "isPublished",
    "baseUrl",
    "publishListPage"
  ],
  components: {
    Tag
  },
  data() {
    return {
      moment: moment
    };
  },
  methods: {
    deleteArticle(id) {
      this.$emit("delete-article", id);
    },
    editPage(id) {
      this.$emit("edit-page", id);
    },
    previewArticle(id) {
      this.$emit("preview-article", id);
    },
    searchByTagDraft(articles) {
      this.$emit("search-bytag-draft", articles);
    }
  },
  computed: {
    formatDate() {
      let dateObject = new Date(this.updatedAt);
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
    },
    condition() {
      return this.isPublished ? "published" : "saved";
    }
  }
};
</script>

<style scoped>
div.article-title a {
  text-decoration: none;
}

.article-image {
  background-size: cover;
  width: 50%;
  height: 100px;
  border-radius: 3px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.644);
}

.icon-options-draft {
  font-size: 100%;
  transition: 0.1s;
}

.icon-options-draft:hover {
  font-size: 120%;
}

div.article-title h1 {
  font-family: "Oswald";
  font-size: 28px;
  text-decoration: none;
}
</style>
