<template>
  <div class="card">
    <img class="card-img-top img-fluid" src="../assets/user.png" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">Hi {{name}}</h5>
      <p class="card-text">What is your preferred posting today?</p>
    </div>
    <ul class="list-group list-group-flush">
      <li @click="changePage('listArticle')" class="list-group-item nav-font">&#127757; Discover</li>
      <li @click="changePage('myArticle')" class="list-group-item nav-font">&#128100; My Post</li>
      <li @click="changePage('createArticle')" class="list-group-item nav-font">&#9997; Create Post</li>
    </ul>
  </div>
</template>

<script>

export default {
  props:{
    name: String
  },
  methods: {
    changePage(pageName){
      this.$emit('changePage', pageName)
    }
  }
}
</script>

<style>

</style>