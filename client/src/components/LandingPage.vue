<template>
  <div class="landing-page">
    <!-- ================= LOGIN-PAGE -->
    <div class="container-fluid home-page">
      <div class="container-row d-flex">
        <!-- ========================= BANNER -->
        <div class="banner-home col-7 d-flex flex-column">
          <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img
                  src="https://i.ibb.co/F8kTBpr/carousel2.jpg"
                  class="d-block w-100"
                  alt="carousel1"
                />
              </div>
              <div class="carousel-item">
                <img
                  src="https://i.ibb.co/PMTwLB9/carousel1.jpg"
                  class="d-block w-100"
                  alt="carousel2"
                />
              </div>
              <div class="carousel-item">
                <img
                  src="https://i.ibb.co/4dJfNPP/carousel3.jpg"
                  class="d-block w-100"
                  alt="carousel3"
                />
              </div>
            </div>
            <a
              class="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
          <div class="motto d-flex justify-content-center">
            <h1>Let the world hear you</h1>
          </div>
        </div>
        <!-- ========================= USER GATE -->
        <div class="user-gate col-5 d-flex flex-column align-items-center">
          <h1>Start Your Journey Here..</h1>
          <form class="d-flex flex-column" @submit.prevent="login">
            <input type="text" placeholder="Enter your Username" v-model="formLogin.email" />
            <input type="password" placeholder="Enter your Password" v-model="formLogin.password" />
            <button class="btn btn-primary" type="submit">LOGIN</button>
          </form>
          <a href="#" v-b-modal.modal-1>Didn't have an Account?</a>
          <a href @click.prevent="onSignIn">
            <h5 class="signingoogle">Signin with Google Account</h5>
          </a>
          <div class="g-signin2"></div>
        </div>
        <!-- ========================== REGISTER MODAL -->
        <!-- ------------ Modal -->
        <b-modal id="modal-1" title="Sign Up" @ok="register">
          <form @submit="register">
            <h5>Username:</h5>
            <input type="text" placeholder="Enter your Username" v-model="formRegister.username" />
            <h5>Email:</h5>
            <input type="text" placeholder="Enter your Email" v-model="formRegister.email" />
            <h5>Password:</h5>
            <input
              type="password"
              placeholder="Enter your Password"
              v-model="formRegister.password"
            />
            <input type="submit" style="display: none" />
          </form>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["changeView", "baseUrl"],
  data() {
    return {
      formRegister: {
        username: "",
        email: "",
        password: ""
      },
      formLogin: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    register() {
      this.$emit("register", this.formRegister);
    },
    login() {
      this.$emit("login", this.formLogin);
    },
    onSignIn() {
      // console.log(googleUser.getBasicProfile());
      this.$gAuth
        .signIn()
        .then(GoogleUser => {
          console.log("user", GoogleUser.getAuthResponse().id_token);

          axios({
            method: "post",
            url: `${this.baseUrl}/users/login-google`,
            data: {
              token: GoogleUser.getAuthResponse().id_token
            }
          })
            .then(({ data }) => {
              this.$emit("login-google", data);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(error => {
          //on fail do something
          console.log(error);
        });
      this.isSignIn = this.$gAuth.isAuthorized;
    }
  }
};
</script>

<style scoped>
div.home-page {
  padding: 30px 60px;
}

div.container-row {
  box-shadow: 0 0 10px 8px rgba(0, 0, 0, 0.616);
}

div.banner-home {
  background-color: #19476d;
  font-family: "Lobster";
  color: azure;
  padding: 0;
}

div.motto {
  padding: 10px 0;
}

div.user-gate {
  background-image: url("https://i.ibb.co/njLhd71/leaves-pattern.png");
  padding: 20px;
}

.user-gate h1 {
  font-family: "Lobster";
  margin-bottom: 60px;
}

input {
  background-color: transparent;
  border: none;
  outline: none;
  border-bottom: 1px solid rgb(155, 155, 155);
  font-family: "Oswald";
  margin: 10px 0;
  width: 250px;
}

h5 {
  font-family: "Oswald";
}
.modal-header h5 {
  font-family: "Lobster";
  font-size: 25px;
}

button {
  margin: 10px 0;
}

div.modal-body {
  background-image: url("https://i.ibb.co/PFGSzdK/seigaiha.png");
}
div.modal-header,
div.modal-footer {
  background-color: rgb(255, 197, 39);
}

h5.signingoogle {
  margin-top: 30px;
}
</style>
