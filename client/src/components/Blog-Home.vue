<template>
  <div id="blog-home" class="content">
    <div class="container">
      <div class="post--list row">
        <div class="col-12 col-sm-6 col-md-4 col-xl-3" v-for="data in posts" :key="data._id">
          <a href="#" class="post__item" @click="$emit('show:post',data._id)">
            <div class="post__item--thumbnail" :style="{backgroundImage: `url('`+data.thumbnail || 'https://picsum.photos/id/1023/300/200'+`')`}"></div>
            <div class="post__item--title">
              {{ data.title }}
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['posts'],
  data() {
    return {
      // posts: [],
    }
  },

}
</script>