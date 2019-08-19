<template>
  <div>
    <div class="container d-flex justify-content-center" style="margin-top: 110px">
      <div>
        <h2 style="text-align: center; padding-top: 80px; padding-bottom: 0px;">MINI-WP</h2>
        <img
          id="logo-pic"
          src="https://cdn.pixabay.com/photo/2016/11/22/11/48/mountain-1849091_960_720.png"
          alt
        />
      </div>
      <div class="card w-35">
        <div class="card-body">
          <h5 class="card-title" style="text-align: center">Login</h5>
          <form @submit.prevent="submitLogin">
            <div class="form-group">
              <label>Email address</label>
              <input
                type="email"
                class="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                required
                autofocus
                v-model="loginForm.email"
              />
              <small id="emailHelp" class="form-text text-muted">
                We'll never share your email with anyone
                else.
              </small>
            </div>
            <div class="form-group" style="margin-bottom: 0px">
              <label>Password</label>
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                required
                autofocus
                v-model="loginForm.password"
              />
            </div>
            <div style="padding-bottom: 10px">
              <small>
                not a member?
                <a href="#" @click.prevent="clickRegister">Register</a>
              </small>
            </div>
            <button style="margin-left: 93px" type="submit" class="btn btn-primary">Submit</button>

            <div class="d-flex justify-content-center" style="margin-top:10px">
              <div id="google-signin-button"></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const userPath = "http://localhost:3000/users";
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000
});

export default {
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
      }
    };
  },

  methods: {
    clickRegister() {
      this.$emit("go-to-register-page");
    },

    submitLogin() {
      axios({
        method: "post",
        url: `${userPath}/signin`,
        data: this.loginForm
      })
        .then(({ data }) => {
          console.log(data);
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.username);
          localStorage.setItem("id", data.id);
          this.$emit("success-login");
          this.$emit("go-to-home-page");
          Swal.fire("Welcome", `Have a good day ${data.username}`, "success");
        })
        .catch(err => {
          console.log(err);
          Swal.fire("Opppsss..", `something wrong`, "error");
        });
    },

    onSignIn(googleUser) {
      const id_token = googleUser.getAuthResponse().id_token;
      axios({
        method: "post",
        url: `${userPath}/signinGoogle`,
        data: { id_token }
      })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.username);
          localStorage.setItem("id", data.id);
          this.$emit("success-login");
          this.$emit("go-to-home-page");
          Swal.fire("Welcome", `Have a good day ${data.username}`, "success");
        })
        .catch(err => {
          console.log(err);
          Swal.fire("Opppsss..", `something wrong`, "error");
        });
    }
  },

  mounted() {
    gapi.signin2.render("google-signin-button", {
      onsuccess: this.onSignIn
    });
  }
};
</script>

<style>
</style>