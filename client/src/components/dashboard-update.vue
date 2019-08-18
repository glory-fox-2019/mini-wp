<template>
  <div class="col-12" style="height: 75vh; margin-top:20px;">
    <div class="row">
      <b-form-input class="col-12" type="text" id="title" placeholder="Title" v-model="title"></b-form-input>
      <b-form-file
        ref="inputFile"
        :state="Boolean(file)"
        placeholder="Choose an image or drop it here..."
        v-on:change="onFileChange"
      ></b-form-file>
      <wysiwyg v-model="text" />
    </div>
    <div class="row">
      <b-button variant="primary" href="#" @click.prevent="create">Submit</b-button>
      <b-button variant="warning" href="#" @click.prevent="clear">clear</b-button>
    </div>
  </div>
</template>

<script>
export default {
  props : ['content'],
  data() {
    return {
      text: "",
      title: "",
      file: ""
    };
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.file = files[0];
      console.log(this.file);
    },
    clear() {
      this.text = content.content
      const input = this.$refs.inputFile;
    },
    create() {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-primary"
        },
        buttonsStyling: false
      });

      swalWithBootstrapButtons
        .fire({
          title: "What you want ?",
          type: "question",
          showCancelButton: true,
          confirmButtonText: "Publish !",
          cancelButtonText: "Save to draft",
          reverseButtons: true
        })
        .then(result => {
          if (result.value) {
            this.updateToDb(1)
          } else if (
            result.dismiss === Swal.DismissReason.cancel
          ) {
            this.updateToDb(2)
          }
        });
    }, 
    updateToDb(status){
        let formData = new FormData()
        formData.set('image',this.file)
        formData.set('title', this.title)
        formData.set('content', this.text)
        formData.set('status', status)
        let token = localStorage.getItem('token')
        axios({
            method: "patch",
            url: `http://localhost:3000/article/update/${this.content._id}`,
            data : formData,
            headers : { token }
        }).then(({data}) => {
            Swal.fire({
                type: 'success',
                title: 'Success',
                text: 'Update Data Success',
            })
        }).catch(err => {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: err.response.data.message,
            })
        })
    }
  },
  created(){
      console.log(this.content)
      this.text = this.content.content
      this.title = this.content.title

  },
};
</script>

<style>
</style>