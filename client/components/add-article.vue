<template>
  <!-- New Article -->
  <section>
    <loading :active.sync="isLoading"></loading>;
    <div class="new-article">
      <h1>Create Post</h1>

      <form action="" class="wysiwyg">
        <h2>Title</h2>
          <input v-model="form.title" type="text" class="form-control" id="title" placeholder="Article Title" style="margin-bottom: 50px">
        <h2>Image</h2>
        <small>Choose Featured Image For Your Post</small>
          <b-form-file
            v-model="form.file"
            :state="Boolean(form.file)"
            placeholder="Choose a file..."
            drop-placeholder="Drop file here..."
          ></b-form-file>
        <h2 style="margin-top : 10px;">Article</h2>
        <quill v-model="form.content" style="height : 250px; margin-bottom : 50px;" output="html"></quill>
      </form>
      <div class="d-flex justify-content-center article-submit">
        <a @click.prevent="submit(false)" href="" class="btn btn-blue" role="button">Save as Draft</a>
        <a @click.prevent="submit(true)" href="" class="btn btn-blue" role="button">Submit</a>
      </div>
    </div>

  </section>
</template>

<script>
  import Swal from 'sweetalert2'
  import axios from 'axios'
//   import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';
 export default {
  components: {
    Loading,
  },
  data() {
    return {
      form : {
        title : null,
        file : null,
        content: null,
        isPublished: null,
      },
      isLoading: false,
    }
  },
  methods : {
    submit(input) {
      this.isLoading = true
      let formData = new FormData()
      formData.append('title', this.form.title)
      formData.append('content', this.form.content)
      
      axios({
        method: 'POST',
        url: `http://localhost:4000/articles`,
        data: formData,
        config : {
          headers : {
            'Content-Type': 'multipart/form-data',
            }
        },
        headers : {
          token : localStorage.token
        }
      })
      .then(({ data }) => {
        Swal.fire({
          toast: true,
          timer: 3000,
          type: 'success',
          title: (input === true)
        });
        this.$emit('insertnewarticle', data)
      })
      .catch((err) => {
        this.isLoading = false
        console.log(err);
        console.log(err.response.data.message);
        Swal.fire({
          timer: 3000,
          type: 'error',
          title: 'Something Happened',
        });
      })
    }
  }
}
</script>