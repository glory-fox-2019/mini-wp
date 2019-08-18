<template>
  <div class="read-article ">
      <h2 class="text-muted title p-10"> {{content.title}} </h2>
      <hr>
      <img v-bind:src="content.imageUrl">
      <h6 class="author"> Author : {{content.author.fullname}} </h6>
      <p align="justify" v-html="content.content">  </p>
      <small><i class="fas fa-eye"> </i> {{content.views}} </small>
  </div>
</template>

<script>
export default {
    props : ['content']

}
</script>

<style scoped>
.read-article {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    margin: 20px auto;
}

p {
    font-size: 18px;
}

.title {
    padding: 10px;
    align-content: center;
    display: flex;
    justify-content: center;
}

.author{
    margin: 20px;
    padding: 10px;
    display: flex;
    justify-content: flex-start;
}


</style>