<template>
  <div>
    <div>
      <form v-on:submit.prevent="edits">
        <div class="form-group">
          <label for="exampleInputEmail1">New Article</label>
          <input type="text" class="form-control" placeholder="Enter Title" v-model="title" />
        </div>
        <div class="form-group">
          <wysiwyg v-model="content" />
        </div>
        <input type="submit" class="btn btn-primary" />
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      content: "",
      title: ""
    };
  },
  props: ["editedId"],
  created() {
    axios({
        method: "GET",
        url: `http://localhost:3000/api/article/${this.editedId}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          console.log(data)
          let { title ,  content  } = data
          this.content = content
          this.title = title
          //   this.$emit("deletes", id);
        })
        .catch(err => {
          console.log("error");
          console.log(err, "  fdfdf");
        });
    console.log(this.editedId, " finish here ......");
  },
  methods: {
    edits() {
      let { title, content } = this;
      console.log(title, content, " disini yaaaaps");
      axios({
        method: "PUT",
        url: `http://localhost:3000/api/article/${this.editedId}`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          title,
          content
        }
      })
        .then(({ data }) => {
          //   this.$emit("deletes", id);
          // console.log(data)
          let {title , content , editedId} = this
          this.$emit('update' , {
            title , content ,id : editedId
          })
        })
        .catch(err => {
          console.log("error");
          console.log(err, "  fdfdf");
        });
    }
  }
};
</script>

<style scoped>
</style>