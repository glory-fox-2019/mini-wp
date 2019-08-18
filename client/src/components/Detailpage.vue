<template>
  <div>
        <b-container style="height: 100vh;">
            <div style=" margin-bottom: 50px;">
                <h1>
                    {{ article.title }}
                </h1>
                <br>
                <h5 style="color:#797a7a;">Author: {{ article.author.username }}</h5>
            </div>
            <div>
              <b-img :src="article.featured_image" fluid :alt="article.featured_image" style="height:300px;"></b-img>
            </div>                
            <b-row style="margin-top: 30px;">
                <b-container>
                <div v-html="article.content">
                </div>
                </b-container>
            </b-row>
        </b-container>
  </div>
</template>

<script>
export default {
    props: {
        article: Object
    }
}
</script>

<style scoped>

</style>