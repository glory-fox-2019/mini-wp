<template>
  <div class="card">
    <h5 class="card-header"></h5>
    <div class="card-body d-flex ml-3">
      <div style="width: 18rem;">
        <img
          src="https://i1.wp.com/suka-suka.web.id/wp-content/uploads/2017/11/cat-1.jpg?fit=1024%2C640&ssl=1"
          style="width: 100%; height: auto;"
        />
      </div>
      <div class="ml-3">
        <h5 class="card-title">{{item.title}}</h5>
        <p class="card-text">{{item.content}}</p>
        <h6>By : Mr Doflamingo</h6>
      </div>
      <div class="d-flex flex-xl-column ml-3">
        <button class="btn btn-primary" @click="gantiPage(item._id)">Detail</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tes: "hai"
    };
  },
  props: ["item"],
  methods: {
    gantiPage(id) {
      this.$emit("page", id);
      console.log(id);
    }
  }
};
</script>

<style scoped>
button {
  background: none !important;
  border: none;
  padding: 0 !important;
  /*optional*/
  font-family: arial, sans-serif;
  /*input has OS specific font-family*/
  color: #069;
  text-decoration: underline;
  cursor: pointer;
}
</style>