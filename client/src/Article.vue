<template>
  <div class="col-xl-7 col-lg-7 col-md-10 col-sm-10 col-10 pt-5 pl-5">
    <articleItem v-for="item in articles" :key="item._id" :item="item" @page="pindahPage($event)"></articleItem>
  </div>
</template>
<script>
import articleItem from "./article_item";
import Swal from "sweetalert2";
export default {
  props: ["articles"],
  data() {
    return {
      tes: "hai"
    };
  },
  components: {
    articleItem
  },
  created() {
    if (!localStorage.getItem("token")) {
      this.$emit("pages", "home");
    }
  },
  mounted() {
    if (!localStorage.getItem("token")) {
      this.$emit("pages", "register");
      Swal.fire("helllo");
    }
  },
  methods: {
    pindahPage(id) {
      this.$emit("page", id);
    }
  }
};
</script>

<style scoped>
</style>