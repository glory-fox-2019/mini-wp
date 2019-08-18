<template>
  <div class="read-article ">
      <h2 class="text-muted title p-10"> {{content.title}} </h2>
      <img src="https://miro.medium.com/max/700/1*x-fXt6NMNpI6GZvn3eAn5Q.jpeg">
      <h3 class="author"> {{content.author}} </h3>
      <p align="justify"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. 
      <br>
      <br>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </p>
      <small><i class="fas fa-eye"> </i> {{content.view}} </small>
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

.title {
    padding: 10px;
    align-content: center;
    display: flex;
    justify-content: center;
}

.author{
    margin: 20px auto;
    padding: 10px;
    display: flex;
    justify-content: flex-start;
}


</style>