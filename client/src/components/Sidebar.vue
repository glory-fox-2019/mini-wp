<template>
  <div class="side-bar col-sm-2 d-flex flex-column">
    <div class="user-profile mt-4">
      <div class="user-picture" :style="{ backgroundImage: 'url(' + profileImage + ')' }"></div>
    </div>
    <h1 class="user-name mt-2">{{loggedUser}}</h1>
    <!-- <h2 class="streams">Streams</h2> -->
    <div class="menu-list">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <a href @click.prevent="myArticle()">
            <img src="https://i.ibb.co/kcrKgQS/round-insert-drive-file-black-18dp.png" alt="icon" />
            <span class="col-sm-10">My Article</span>
          </a>
        </li>
        <li class="list-group-item">
          <a href @click.prevent="seeGlobalPublished()">
            <img src="https://i.ibb.co/0XsfB9C/round-public-black-18dp.png" alt="icon" />
            <span class="col-sm-10">Discover</span>
          </a>
        </li>
        <!-- <li class="list-group-item">
          <a href>
            <img src="https://i.ibb.co/6mLVcCY/round-star-black-18dp.png" alt="icon" />
            <span class="col-sm-10">Favourites</span>
          </a>
        </li>-->
        <li class="list-group-item">
          <a href @click.prevent="logout">
            <img src="https://i.ibb.co/MkzcYmt/baseline-exit-to-app-black-18dp.png" alt="icon" />
            <span class="col-sm-10">Logout</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profileImage: "http://petmedmd.com/images/user-profile.png",
      loggedUser: localStorage.getItem("username")
    };
  },
  methods: {
    logout() {
      this.$emit("logout");
    },
    myArticle() {
      this.$emit("my-article");
    },
    seeGlobalPublished() {
      this.$emit("see-global");
    }
  }
};
</script>

<style scoped>
div.side-bar {
  background-color: white;
  position: fixed;
  height: 100%;
  z-index: 2;
}

h2.streams {
  margin-top: 20px;
  font-family: "Oswald";
  font-size: 20px;
}

.user-picture {
  width: 100%;
  padding-top: 100%;
  background-size: cover;
  border-radius: 6px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.452);
}

.user-name {
  font-family: 'Oswald';
  font-size: 29px;
}
</style>
