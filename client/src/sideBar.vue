<template>
  <div class="side-bar col-xl-3 col-lg-3 col-md-1 col-sm-1 col-1">
    <ul>
      <li style="padding-top : 10px; list-style: none; margin-left: 20px;">
        <img
          src="https://i1.wp.com/suka-suka.web.id/wp-content/uploads/2017/11/cat-1.jpg?fit=1024%2C640&ssl=1"
          style="max-width: 220px"
        />
      </li>
      <li class="li2">
        <a href="#" @click="pindahPage">
          <i class="far fa-address-card"></i> Add Article
        </a>
      </li>
      <li class="li2">
        <a href="#" @click="UserProfile">
          <i class="far fa-address-card"></i>
          My Article
        </a>
      </li>
      <li class="li2">
        <i class="far fa-address-card"></i> Activity
      </li>
      <li class="li2">
        <i class="far fa-address-card"></i> Plan
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tes: "hai"
    };
  },
  methods: {
    pindahPage() {
      this.$emit("page", "add_article");
    },
    UserProfile(){
      this.$emit("profile" ,'profile')
    }
  }
};
</script>

<style scoped>
.side-bar {
  width: 350px;
  height: 100vh;
  background-color: #ffffff;
  /* flex-direction: column; */
  /* overflow-y: scroll; */
  /* position: relative; */
  font-style: inherit;
  /* position: absolute; */
}
.ul2 {
  display: flex;
  flex-direction: column;
}

.li2 {
  list-style: none;
  font-size: 27px;
  margin-left: 2px;
  padding: 40px;
  color: black;
}
</style>