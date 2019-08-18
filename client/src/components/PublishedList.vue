<template>
  <div class="published-list">
    <div class="search-bar d-flex align-items-center justify-content-between">
      <div class="title-nav d-flex align-items-center">
        <i class="fas fa-globe-asia mr-1 globe-icon mr-3"></i>
        <h3>Discover</h3>
      </div>
      <div class="search-section d-flex justify-content-end align-items-center">
        <b-input-group class="search">
          <b-input-group-prepend>
            <span class="input-group-text">
              <font-awesome-icon icon="search"></font-awesome-icon>
            </span>
          </b-input-group-prepend>
          <b-form-input class="LoginInput" size="lg" placeholder="Search ..." v-model="search"></b-form-input>
        </b-input-group>
        <div class="align-self-stretch">
          <b-form-select v-model="selectedBy" :options="options" class="ml-1 by">
            <template slot="first">
              <option :value="null" disabled>Choose</option>
            </template>
          </b-form-select>
        </div>
      </div>
    </div>
    <!-- global published article list -->
    <div class="main-list-and-trending d-flex">
      <div class="pub-list col-9">
        <PublishCard
          v-for="article in articles"
          :key="article._id"
          :article="article"
          :baseUrl="baseUrl"
          @show-article="$emit('show-article', $event)"
          @search-bytag="$emit('search-bytag', $event)"
        ></PublishCard>
      </div>
      <div class="trending-tags col">
        <div class="tags d-flex flex-column align-items-center p-3">
          <h5 class="mb-4">Trending Tags</h5>
          <div class="tag-list d-flex flex-wrap">
            <TagCard
              class="mb-2"
              v-for="tag in tags"
              :key="tag._id"
              :id="tag._id"
              :tagName="tag.name"
              :count="tag.count"
              :isPublished="true"
              :baseUrl="baseUrl"
              @search-bytag="$emit('search-bytag', $event)"
            ></TagCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PublishCard from "./PublishCard.vue";
import axios from "axios";
import TagCard from "./TagCard.vue";

export default {
  props: ["articles", "baseUrl"],
  components: {
    PublishCard,
    TagCard
  },
  data() {
    return {
      search: "",
      selectedBy: null,
      options: [
        { value: "title", text: "By Title" },
        { value: "tag", text: "By Tag" }
      ],
      tags: []
    };
  },
  methods: {
    getAllPublishedTags() {
      axios({
        method: "get",
        url: `${this.baseUrl}/tags/published`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          let collect = [];
          for (let i = 0; i < data.length; i++) {
            if (collect.length == 10) {
              break;
            }
            collect.push(data[i]);
          }
          this.tags = collect;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getAllPublishedTags();
  }
};
</script>

<style scoped>
.search-bar {
  margin-bottom: 40px;
  border-bottom: 1px solid rgb(168, 168, 168);
  padding-bottom: 20px;
}

.globe-icon {
  font-size: 50px;
  color: rgb(116, 116, 116);
}

h3 {
  margin: 0;
  font-family: "Oswald";
  font-size: 45px;
  color: rgb(71, 71, 71);
}

.by {
  height: 100%;
  width: 100px;
}

.tags {
  background-color: #19476d;
  position: fixed;
  width: 250px;
  height: 300px;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.438);
}

h5 {
  font-family: "Oswald";
  color: rgb(235, 233, 233);
  font-size: 26px;
}
</style>