<template>
  <nav id="navbar" class="p-0 pl-5 navbar">
    <div>
      <img class="logoImage" src="../../css/pics/logo.png" alt="Mini WP logo" />
    </div>

    <div>
      <!-- btn after login -->
      <ul id="btnAfterLogin" class="userBtn" v-if="islogin">
        <li>
          <button @click="logout()" class="btn btn-sign mr-4">Logout</button>
        </li>
      </ul>
      <!-- btn after login -->

      <!-- btn before login -->
      <ul id="btnBeforeLogin" class="userBtn" v-else>
        <li v-if="homeForm">
          <div class="g-signin2 mr-4" data-onsuccess="onSignIn"></div>
        </li>
        <li v-if="homeForm">
          <button @click="goToSignIn()" class="btn btn-sign mr-4">Sign In</button>
        </li>
        <li v-if="homeForm">
          <button @click="goToSignUp()" class="btn btn-sign mr-4">Sign Up</button>
        </li>
        <li v-if="!homeForm">
          <button @click="backToHome()" class="btn btn-sign mr-4">Back</button>
        </li>
      </ul>
      <!-- btn before login -->
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goToSignIn: function() {
      this.signInEmail = "";
      this.signInPassword = "";
      this.signInForm = true;
      this.signUpForm = false;
      this.homeForm = false;
    },
    signInUser: function() {
      let data = {
        email: this.signInEmail,
        password: this.signInPassword
      };
      axios({
        url: `${url}/users/login`,
        method: "post",
        data
      })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          this.signInForm = false;
          this.islogin = true;
          this.username = data.name;
        })
        .catch(({ err }) => {
          console.log(`masuk error`);
          console.log(err.message);
        });
    },
    goToSignUp: function() {
      this.signUpName = "";
      this.signUpEmail = "";
      this.signUpPassword = "";
      this.signInForm = false;
      this.signUpForm = true;
      this.homeForm = false;
    },
    logout: function() {
      localStorage.removeItem("token");
      this.editForm = false;
      this.islogin = false;
      this.myArticle = false;
      this.articleList = false;
      this.createNew = false;
      this.articleForm = false;
      this.homeForm = true;
    }
  }
};
</script>

<style scoped>
.navbar{
    background-color: #202421;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    z-index: 8;
}

.sticky {
    position: fixed;
    top: 0;
    width: 100%;
}
  
.sticky + .content {
    padding-top: 60px;
}

.navigasi{
    width: 40%;
}

.navlink{
    color: whitesmoke;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    list-style: none;
    margin: 0px;
    padding: 0px;
}

.navlink li a{
    color: whitesmoke;
    text-decoration: none;
}

.navlink li a:hover{
    color: #2b5ec4;
    text-decoration: none;
    transition: 0.3s all;   
}

.logoImage{
    width: 80px;
}

.userBtn{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    list-style: none;
    margin: 0px;
    padding: 0px;
}

.btn-sign{
    color: #2b5ec4;
    border: 2px solid #2b5ec4;
    border-radius: 7%;
}

.btn-sign:hover{
    color: whitesmoke;
    background-color: #2b5ec4;
    border: 2px solid #2b5ec4;
    border-radius: 7%;
    transition: 0.3s all;
}
</style>