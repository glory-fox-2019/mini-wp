<template>
  <v-card class="mx-auto" max-width="344">
    <v-img v-if="post.featured_image" :src="post.featured_image" height="200px"></v-img>
    <v-card-title>
      {{ post.title }}
    </v-card-title>

    <v-card-text class="grey--text subtitle-1">
      {{ post.author }}
    </v-card-text>
    <v-card-text class="grey--text subtitle-1">
      {{ post.createdAt }}
    </v-card-text>

    <v-card-actions>
      <v-btn text>Share</v-btn>
      <v-btn outlined text color="primary" :to="'edit/'+post._id">
        Edit
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn @click="show = !show" text>
        <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-card-text v-html="post.content"></v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  props: ['post'],
  data: () => {
    return {
      show: false,
    }
  }

}
</script>

<style>

</style>