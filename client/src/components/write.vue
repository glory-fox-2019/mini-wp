 <template>
  <div id="column-right-write">
    <div class="container2">
      <div class="bottom">
        <form action enctype="multipart/form-data" @submit.prevent="submitForm">
          <div>
            <input type="text" placeholder="Title" v-model="title" />
          </div>
          <div id="textarea">
            <editor v-model="content"></editor>
          </div>
          <div>
            <input type="file" ref="file" v-on:change="handlefileupload($event)" />
          </div>
          <div class="tombol">
            <div class="submitbutton">
              <button>submit</button>
            </div>
            <div>
              <button>clear</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import editor from "./editor.vue";
export default {
  components: {
    editor
  },
  data() {
    return {
      title: "",
      content: "",
      image: ""
    };
  },
  methods: {
    handlefileupload() {
      let file = event.target.files || event.dataTransfer.files;
      this.image = file[0];
    },
    submitForm() {
      let token = localStorage.getItem("token");
      let formData = new FormData();
      formData.set("featured_image", this.image);
      formData.set("title", this.title);
      formData.set("content", this.content);
      axios({
        method: "POST",
        url: "http://localhost:3000/articles/create",
        headers: {
          token
        },
        data: formData
      })
        .then(data => {
          let response = data.data.data;
          this.$emit("uploadFile", response);
          Swal.fire(
            "Success",
            "Your Article is Successfully Submitted",
            "success"
          );
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
#column-right-write {
  height: 100vh;
  background-color: #0001;
  width: 80%;
  overflow: auto;
  display: flex;
  justify-content: center;
}
.container2 {
  margin-top: 5%;
  width: 70%;
}
.bottom {
  margin-bottom: 5%;
  padding: 5%;
  background-color: white;
  -webkit-box-shadow: 3px 6px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 3px 6px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 3px 6px 5px 0px rgba(0, 0, 0, 0.75);
}
.textarea {
  height: 100px;
}
.tombol {
  margin-top: 2%;
  display: flex;
  justify-content: center;
}
.submitbutton {
  margin-right: 3%;
}
input[type="text"] {
  width: 100%;
  height: 5%;
}
</style>              
               
               
