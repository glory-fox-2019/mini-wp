<template>
  <div>
    <div></div>
    <div v-if="onPageHere == 'login'">
      <div class="myform form">
        <div class="logo mb-3">
          <div class="col-md-12 text-center">
            <h1>Login</h1>
          </div>
        </div>
        <form v-on:submit.prevent="Login" style="height: 440px;">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              name="email"
              class="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              v-model="email"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Password</label>
            <input
              type="password"
              class="form-control"
              placeholder="Enter Password"
              v-model="password"
              autocomplete="password"
              required
            />
          </div>
          <div class="form-group">
            <p class="text-center">
              By signing up you accept our
              <a href="#">Terms Of Use</a>
            </p>
          </div>
          <div class="col-md-12 text-center">
            <input type="submit" class="btn btn-block mybtn btn-primary tx-tfm" />
          </div>
          <div class="col-md-12">
            <div class="login-or">
              <hr class="hr-or" />
              <span class="span-or">or</span>
            </div>
          </div>
          <div class="col-md-12 mb-4">
            <center>
              <div id="google-signin-button"></div>
            </center>
          </div>
          <div class="form-group">
            <p class="text-center">
              Don't have account?
              <a
                href="#"
                @click="PindahPage('register')"
                id="signup"
              >Sign up here</a>
            </p>
          </div>
        </form>
      </div>
    </div>
    <div v-else-if="onPageHere == 'register'">
      <form v-on:submit.prevent="Register">
        <div class="form-group">
          <label for="exampleInputEmail1">Username</label>
          <input type="text" class="form-control" placeholder="Enter username" v-model="username" />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            v-model="email"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            v-model="password"
            autocomplete="password"
            required
          />
        </div>
        <input type="submit" class="btn btn-primary" />
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      onPageHere: "login"
    };
  },
  props: ["IdArticle"],
  created() {},
  mounted() {
    gapi.signin2.render("google-signin-button", {
      onsuccess: this.onSignIn
    });
  },
  methods: {
    onSignIn(user) {
      const profile = user.getBasicProfile();
      // console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
      // console.log("Name: " + profile.getName());
      // console.log("Image URL: " + profile.getImageUrl());
      // console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
      axios
        .post("http://localhost:3000/api/user/google", {
          username: profile.getName(),
          email: profile.getEmail()
        })
        .then(({ data }) => {
          // this.articles = data;
          localStorage.setItem("token", data.token);
          this.$emit("succes", "home");
          console.log("BErhasl register dengan google , hahaah", data);
        })
        .catch(err => {
          console.log("error");
          console.log(err, "  fdfdf");
        });
    },
    Register() {
      let { username, password, email } = this;
      axios
        .post("http://localhost:3000/api/user/register", {
          username,
          password,
          email
        })
        .then(({ data }) => {
          // this.articles = data;
          localStorage.setItem("token", data.token);
          this.$emit("succes", "home");
          console.log("BErhasl register , hahaah", data);
        })
        .catch(err => {
          console.log("error");
          console.log(err, "  fdfdf");
        });
    },
    PindahPage(page) {
      this.onPageHere = page;
    },
    Login() {
      let { password, email } = this;
      axios
        .post("http://localhost:3000/api/user/login", {
          password,
          email
        })
        .then(({ data }) => {
          console.log("skdfmkdmfkdfm");
          localStorage.setItem("token", data.token);
          this.$emit("succes", "home");
          console.log("BErhasl Login , hahaah", data);
        })
        .catch(err => {
          Swal.fire("gagal");
          console.log("error");
          console.log(err, "  fdfdf");
        });
    }
  }
};
</script>
<style scoped>
a {
  text-decoration: none !important;
}
h1,
h2,
h3 {
  font-family: "Kaushan Script", cursive;
}
.myform {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  padding: 1rem;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 1.1rem;
  outline: 0;
  max-width: 500px;
}
.tx-tfm {
  text-transform: uppercase;
}
.mybtn {
  border-radius: 50px;
}

.login-or {
  position: relative;
  color: #aaa;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.span-or {
  display: block;
  position: absolute;
  left: 50%;
  top: -2px;
  margin-left: -25px;
  background-color: #fff;
  width: 50px;
  text-align: center;
}
.hr-or {
  height: 1px;
  margin-top: 0px !important;
  margin-bottom: 0px !important;
}
.google {
  color: #666;
  width: 100%;
  height: 40px;
  text-align: center;
  outline: none;
  border: 1px solid lightgrey;
}
form .error {
  color: #ff0000;
}
#second {
  display: none;
}
</style>