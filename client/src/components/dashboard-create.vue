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
      (this.text = ""), (this.title = ""), (this.file = "");
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
            this.createToDb(1)
            swalWithBootstrapButtons.fire(
              "Published!",
              "Your Content sucessfully to publish",
              "success"
            );
          } else if (
            result.dismiss === Swal.DismissReason.cancel
          ) {
            this.createToDb(2)
            swalWithBootstrapButtons.fire(
              "save to draft",
              "Your content already saved to draft",
              "success"
            );
            
          }
        });
    }, 
    createToDb(status){
        let formData = new FormData()
        formData.set('image',this.file)
        formData.set('title', this.title)
        formData.set('content', this.text)
        formData.set('status', status)
        let token = localStorage.getItem('token')
        axios({
            method: "POST",
            url: `http://34.87.63.195/article/create`,
            data : formData,
            headers : { token }
        }).then(({data}) => {
            console.log(data)
        }).catch(err => {
            console.log(err.response)
        })
    }
  }
};
</script>

<style>
</style>