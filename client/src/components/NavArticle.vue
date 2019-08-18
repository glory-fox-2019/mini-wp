<template>
  <div class="nav-articles row justify-content-around">
    <ul class="nav nav-pills col-md d-flex align-items-center">
      <li class="nav-item">
        <a
          class="nav-link"
          href="#"
          :class="{active: isPublished}"
          @click.prevent="clickPublished()"
        >Published</a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{active: !isPublished}"
          href="#"
          @click.prevent="clickDraft()"
        >Drafts</a>
      </li>
    </ul>

    <div class="search-articles col-md">
      <small class="info text-danger" v-if="info">Please select one of search type..</small>
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["baseUrl", "isPublish"],
  data() {
    return {
      info: false,
      search: "",
      isPublished: this.isPublish,
      selectedBy: null,
      options: [
        { value: "title", text: "By Title" },
        { value: "tag", text: "By Tag" }
      ]
    };
  },
  methods: {
    clickPublished() {
      this.isPublished = true;
      axios({
        method: "get",
        url: `${this.baseUrl}/articles/published`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.$emit("see-published", data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    clickDraft() {
      this.isPublished = false;
      this.$emit("see-draft");
    }
  },
  watch: {
    selectedBy: function(newVal, oldVal) {
      this.info = false;
    },
    search: function() {
      if (this.selectedBy == null) {
        this.info = true;
      } else {
        this.info = false;
        this.$emit("search-article", {
          keyword: this.search,
          by: this.selectedBy,
          page: this.isDraft ? "draft" : "published"
        });
      }
    }
  },
  computed: {
    tabCondition() {
      return this.isPublish;
    }
  }
};
</script>

<style scoped>
.nav-articles {
  width: 100%;
  margin-bottom: 30px;
}

.by {
  height: 100%;
  width: 100px;
}

.active {
  transition: all 600ms ease;
}
</style>