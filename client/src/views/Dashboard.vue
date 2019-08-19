<template>
  <v-container class="mx-auto" fluid id="container">
    <v-tabs>
      <v-tab>All</v-tab>
      <v-tab>Publish</v-tab>
      <v-tab>Draft</v-tab>
    </v-tabs>
    <v-toolbar flat>
      <v-text-field v-model="filterInput"
        hide-details
        prepend-icon="search"
        single-line
      ></v-text-field>
    </v-toolbar>
    <v-layout row>
      <v-flex v-for="(post, i) in postsFilter" :key="i" class="my-7" xs12 md6 lg4>
        <Card :post="post"></Card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';
import Card from '../components/Card';

export default {
  props: ['baseUrl'],
  components: {
    Card
  },
  data() {
    return {
      show: false,
      posts: [],
      filterInput: '',
      postsFilter: [],
    }
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    fetchPosts() {
      axios({
        method: "GET",
        url: `${this.baseUrl}/post`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        data.reverse();
        this.postsFilter = data;
        this.posts = data;
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
    },
  },
  watch: {
    filterInput: function(newVal, oldVal) {
      // console.log(newVal);
      this.postsFilter = this.posts.filter(function(el) { return new RegExp(newVal, "i").test(el.title) })
    }
  }
}
</script>

<style>

#container {
  max-width: 1200px;
}

</style>