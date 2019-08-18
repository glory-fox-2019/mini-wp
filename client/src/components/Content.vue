<template>
  <div class="content col-sm-10 d-flex flex-column">
    <div class="show-article">
      <div class="articles-container container">
        <!-- =================== LIST ARTICLE =================== -->
        <transition name="fading">
          <div
            class="list-articles d-flex flex-column align-items-center"
            id="list-articles"
            v-if="userpage"
          >
            <!-- ============ nav article -->
            <NavArticle
              v-if="userpage"
              @search-article="searchArticle"
              @see-draft="seeDraft"
              @see-published="seePublished"
              :baseUrl="baseUrl"
              :isPublish="isPublish"
            ></NavArticle>
            <!-- ============ article -->
            <Article
              class="article"
              :baseUrl="baseUrl"
              v-for="(article, index) in articles"
              :key="index"
              :id="article._id"
              :title="article.title"
              :content="article.content"
              :featuredImage="article.featured_image"
              :tags="article.tags"
              :createdAt="article.createdAt"
              :updatedAt="article.updatedAt"
              :isPublished="article.isPublished"
              @delete-article="deleteArticle"
              @edit-page="editPage"
              @preview-article="previewArticle"
              @search-bytag-draft="searchByTagDraft"
            ></Article>
          </div>
        </transition>

        <!-- ================== PUBLISHED LIST ================= -->
        <transition name="fading">
          <div class="publish-list" v-if="publishedListPage">
            <PublishedList
              :articles="articles"
              :baseUrl="baseUrl"
              @show-article="$emit('show-article', $event)"
              @search-bytag="$emit('search-bytag-draft', $event)"
            ></PublishedList>
          </div>
        </transition>

        <!-- ============= VIEW ARTICLE ================= -->
        <transition name="fading">
          <div class="preview" v-if="preview">
            <Preview
              :article="currentArticle"
              :baseUrl="baseUrl"
              @publish-article="$emit('publish-article')"
            ></Preview>
          </div>
        </transition>

        <!-- =================== ARTICLE FORM ================== -->
        <transition name="fading">
          <div id="form-article" v-if="formCreate">
            <CreateForm @create-article="createArticle" :baseUrl="baseUrl"></CreateForm>
          </div>
        </transition>

        <!-- =================== FORM EDIT ARTICLE ================ -->
        <transition name="fading">
          <div id="edit-article" v-if="formEdit">
            <EditForm :currentArticle="currentArticle" @update-article="updateArticle($event)" :baseUrl="baseUrl"></EditForm>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Article from "./Article.vue";
import NavArticle from "./NavArticle.vue";
import CreateForm from "./CreateForm.vue";
import EditForm from "./EditForm.vue";
import Preview from "./PreviewArticle";
import PublishedList from "./PublishedList.vue";

export default {
  props: [
    "baseUrl",
    "articles",
    "isLogin",
    "formCreate",
    "userpage",
    "currentArticle",
    "formEdit",
    "preview",
    "isPublish",
    "publishedListPage"
  ],
  components: {
    Article,
    NavArticle,
    CreateForm,
    EditForm,
    Preview,
    PublishedList
  },
  methods: {
    createArticle() {
      this.$emit("create-article");
    },
    deleteArticle(id) {
      this.$emit("delete-article", id);
    },
    editPage(id) {
      this.$emit("edit-page", id);
    },
    updateArticle(payload) {
      this.$emit("update-article", payload);
    },
    previewArticle(id) {
      this.$emit("preview-article", id);
    },
    searchArticle(search) {
      this.$emit("search-article", search);
    },
    searchByTagDraft(articles) {
      this.$emit("search-bytag-draft", articles);
    },
    seeDraft() {
      this.$emit("see-draft");
    },
    seePublished(payload) {
      this.$emit("see-published", payload);
    }
  }
};
</script>

<style scoped>
.fading-enter-active {
  transition: opacity 1s;
}

.fading-enter {
  opacity: 0;
}

@keyframes slideFromBottom {
  0% {
    transform: translate(0, 40px);
  }
  100% {
    transform: translate(0, 0);
  }
}

.article {
  animation: 1s ease-out slideFromBottom;
}
</style>
