<template>
  <a href class="tag-card d-flex align-items-center" @click.prevent="searchRelatedTag">
    <font-awesome-icon icon="tag" class="tag"></font-awesome-icon>
    <span class="tag-name">{{tagName}}</span>
    <span class="tag-count d-flex justify-content-center align-items-center">{{count}}</span>
  </a>
</template>

<script>
import axios from "axios";

export default {
  props: [
    "id",
    "tagName",
    "isPublished",
    "baseUrl",
    "count",
    "publishListPage"
  ],
  methods: {
    searchRelatedTag() {
      console.log(this.publishListPage, "masok pak ekooo <<<<<<<<<<<<");
      axios({
        method: "get",
        url: `${this.baseUrl}/articles/by-tag/${this.id}?isPublished=${this.isPublished}&&isGlobalPage=${this.publishListPage}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          // console.log(data);
          this.$emit("search-bytag", data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.tag-card {
  padding: 1px 10px;
  background-color: rgb(230, 228, 228);
  margin-right: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.411);
}

.tag-name {
  font-family: "EB Garamond";
  font-size: 15px;
}

.tag {
  color: rgb(87, 85, 85);
  margin-right: 5px;
  font-size: 10px;
}

a {
  text-decoration: none;
}

.tag-count {
  width: 15px;
  height: 15px;
  margin-left: 7px;
  padding: 2px;
  font-size: 10px;
  background-color: rgb(172, 172, 172);
  border-radius: 100%;
  color: white;
}
</style>