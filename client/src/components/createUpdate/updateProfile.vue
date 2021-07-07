<template>
  <div>
    <center>
      <h1>Edit My Profile</h1>
      <form id="profile">
        <div class="card mb-3 profile" style="max-width: 650px;">
          <div class="row no-gutters">
            <div class="col-md-4">
              <div class="image-profile">
                <img v-if="image" :src="image" class="card-img" alt="image profile" />
                <img
                  v-else
                  src="https://allworldpm.com/wp-content/uploads/2016/10/230x230-avatar-dummy-profile-pic.jpg"
                  class="card-img"
                  alt="image profile"
                />
              </div>
              <div>
                <label for="file" class="btn">
                  <i class="fas fa-camera-retro"></i> Change Picture
                </label>
                <form enctype="multipart/form-data">
                  <input
                    id="file"
                    style="visibility:hidden;"
                    type="file"
                    @change="onFileChange"
                    ref="myFiles"
                    accept="image/*"
                  />
                </form>
              </div>
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">Name: {{ username }}</h5>
                <div class="mb-3">
                  <textarea
                    class="form-control"
                    v-model="bio"
                    placeholder="Place your bio here"
                    style="height:200px"
                    maxlength="280"
                  ></textarea>
                  <span>{{ counterChar }}/280 Character Remaining</span>
                </div>
                <button
                  v-if="!isLoading"
                  type="submit"
                  class="btn btn-primary"
                  @click.prevent="updateProfile"
                >Update Your Profile</button>
                <button v-else class="btn btn-primary" type="button" disabled>
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Loading...
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </center>
  </div>
</template>

<script>
const baseUrl = "http://localhost:3000";
import axios from "axios";
export default {
  data() {
    return {
      username: "",
      bio: "",
      image: "",
      currentImage: "",
      maxCharacter: 280,
      isLoading: false
    };
  },
  methods: {
    getUserProfile() {
      axios({
        url: `${baseUrl}/users`,
        method: "get",
        headers: {
          token: localStorage.getItem("token")
        }
      }).then(({ data }) => {
        this.username = data.username;
        if (data.bio) this.bio = data.bio;
        if (data.image) this.image = data.image;
        if (data.image) this.currentImage = data.image;
      });
    },
    updateProfile() {
      Swal.fire({
        title: "Are you sure want to update your profile?",
        type: "question",
        showCancleButton: true
      }).then(() => {
        this.isLoading = true;
        this.image = this.$refs.myFiles.files;
        console.log("Progress Image");
        var bodyFormData = new FormData();
        bodyFormData.append("image", this.image[0]);
        axios({
          method: "POST",
          url: `${baseUrl}/image/upload`,
          data: bodyFormData,
          config: {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        })
          .then(({ data }) => {
            console.log("success update profile picture");
            console.log("Get data image - After Upload");
            if (data.link !== null) this.image = data.link;
            else this.image = this.currentImage;
            let newData = {
              bio: this.bio,
              image: this.image
            };
            axios({
              url: `${baseUrl}/users`,
              method: "patch",
              data: newData,
              headers: {
                token: localStorage.getItem("token")
              }
            })
              .then(({ data }) => {
                console.log("data updated");
                this.isLoading = false;
                Swal.fire({
                  title: "Your Profile Updated Successfully!",
                  type: "success",
                  showCancleButton: false,
                  timer: 2000
                });
                this.$emit("getProfile");
              })
              .catch(err => {
                Swal.fire({
                  title: "Please Fill Your Bio-Profile",
                  type: "error",
                  showCancleButton: false,
                  timer: 2000
                });
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    onFileChange(e) {
      console.log(this.$refs.myFiles.files, "Preview image");
      const file = e.target.files[0];
      this.image = URL.createObjectURL(file);
    }
  },
  created() {
    this.getUserProfile();
  },
  computed: {
    counterChar() {
      return this.maxCharacter - this.bio.length;
    }
  }
};
</script>

<style scoped>
h1 {
  margin-top: 180px;
  font-family: 'Permanent Marker', cursive;
}
#profile {
  margin-top: 40px;
}
.image-profile {
  margin-top: 55px;
  margin-left: 20px;
}
</style>