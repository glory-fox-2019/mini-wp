<template>
  <div id="nav">
    <div class="brand">
      <span>Mini Wp</span>
    </div>
    <ul class="menu--list">
      <li class="menu--item"><a href="javascript:void(0)" :class="{'active': isActive('list-post')}" @click="changePage('list-post')"><i class="material-icons">insert_drive_file</i><span>List Post</span></a></li>
      <li class="menu--item"><a href="javascript:void(0)" :class="{'active': isActive('create-post')}" @click="changePage('create-post')"><i class="material-icons">insert_drive_file</i><span>Create Post</span></a></li>
    </ul>
    <div class="nav--footer">
      <div class="nav--account">
        <div class="account--avatar">
          <div class="account--avatar__img"></div>
        </div>
        <div class="account--detail">
          <p class="account--detail__avatar">JustArya</p>
          <p class="account--detail__description">Author</p>
        </div>
        <div class="account--menu">
          <a href="">:</a>
          <ul class="account--menu--content">
            <li><a href="#">Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['page'],
  data(){
    return {
      // page: '',
    }
  },
  methods: {
    isActive(page){
      return this.page === page
    },
    changePage(page){
      // this.page = page;
      this.$emit('update:page',page);
    },
  }
}
</script>