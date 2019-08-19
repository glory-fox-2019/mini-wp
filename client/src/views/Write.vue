<template>
  <v-container>
    <v-text-field height="60" v-model="field.title" class="font-weight-medium headline"
      placeholder="Title"
      solo clearable
    ></v-text-field>
    
    <froala :tag="'textarea'" :config="config" v-model="field.content"></froala>

    <v-img v-if="this.existImage" :src="existImage" :height="(sizeImg * 3)" :width="(sizeImg * 4)" class="ma-4"></v-img>

    <v-file-input ref="image" v-on:change="handleImage" accept="image/*" width="400" placeholder="Image" prepend-icon="mdi-camera"></v-file-input>

    <v-btn @click="myAction" color="success" large :disabled="disableBtn">
      {{ $route.path.substr(0, 5) === '/edit' ? 'Edit' : 'Publish' }}
    </v-btn>
    <v-btn @click="deleteOne($route.params.id)" color="error" class="mx-5" large>
      <v-icon>delete</v-icon>
    </v-btn>

    <v-progress-circular v-if="loading" class="ma-5"
      :size="50"
      :width="5"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  props: ['baseUrl'],
  data() {
    return {
      page: '',
      existImage: null,
      sizeImg: 50,
      keyBtn: "",
      disableBtn: false,
      loading: false,
      config: {
        placeholder: 'Write Your Post Here! :)',
      },
      field: {
        title: '',
        content: '',
        featured_image: '',
      },
    }
  },
  methods: {
    publish() {
      let formData = new FormData();
      formData.append("title", this.field.title);
      formData.append("content", this.field.content);
      formData.append("image", this.field.featured_image);
      this.loading = true;
      this.disableBtn = true;
      
      axios({
        method: "POST",
        url: `${this.baseUrl}/post`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: formData
      })
      .then(({data}) => {
        this.disableBtn = false;
        this.loading = false;
        this.$router.push('dashboard');
        this.field = {
          title: '',
          content: '',
          featured_image: '',
        };
      })
      .catch(({response}) => {
        console.log(response.data);
        this.disableBtn = false;
        this.loading = false;
      })
    },
    handleImage(e) {
      this.field.featured_image = e;
    },
    populateLastData(id) {
      axios({
        method: "GET",
        url: `${this.baseUrl}/post/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        this.disableBtn = false;
        this.loading = false;
        this.field = {
          title: data.title,
          content: data.content,
          featured_image: data.featured_image
        }
        this.existImage = data.featured_image ? data.featured_image : false;
        console.log('berhasil populate data');
      })
      .catch(({response}) => {
        this.disableBtn = false;
        this.loading = false;
        console.log(response.data);
      })
    },
    myAction() {
      if (this.page === 'edit') {
        console.log('update my action');
        this.updateOne(this.$route.params.id);
      } else {
        this.publish();
      }
    },
    updateOne(id) {
      let formData = new FormData();
      formData.append("title", this.field.title);
      formData.append("content", this.field.content);
      formData.append("image", this.field.featured_image);
      this.loading = true;
      this.disableBtn = true;
      
      axios({
        method: "PUT",
        url: `${this.baseUrl}/post/${id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: formData
      })
      .then(({data}) => {
        this.disableBtn = false;
        this.loading = false;
        this.$router.push('/dashboard');
        this.field = {
          title: '',
          content: '',
          featured_image: '',
        };
      })
      .catch(err => {
        console.log(err);
        this.disableBtn = false;
        this.loading = false;
      })
    },
    deleteOne(id) {
      axios({
        method: "DELETE",
        url: `${this.baseUrl}/post/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        this.disableBtn = false;
        this.loading = false;
        this.$router.push('/dashboard');
        this.field = {
          title: '',
          content: '',
          featured_image: '',
        };
      })
      .catch(err => {
        console.log(err);
        this.disableBtn = false;
        this.loading = false;
      })
    }
  },
  created() {
    if (this.$route.path.substr(0, 5) === '/edit') {
      this.populateLastData(this.$route.params.id);
      this.page = 'edit'
    } else {
      this.page = 'write'
    }
  },
  watch: {
    $route: function() {
      if (this.$route.path.substr(0, 5) === '/edit') {
        this.populateLastData(this.$route.params.id);
        this.page = 'edit'
      } else {
        this.page = 'write'
        this.field = {
          title: '',
          content: '',
          featured_image: '',
        }
      }
    },
  }
}
</script>

<style>

</style>