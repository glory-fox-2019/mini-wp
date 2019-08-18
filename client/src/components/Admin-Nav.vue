<template>
  <div id="nav">
    <div class="brand">
      <span>Mini Wp</span>
    </div>
    <ul class="menu--list">
      <li class="menu--item"><a href="javascript:void(0)" :class="{'active': isActive('list-post')}" @click="changePage('list-post')"><i class="material-icons">description</i><span>List Post</span></a></li>
      <li class="menu--item"><a href="javascript:void(0)" :class="{'active': isActive('create-post')}" @click="changePage('create-post')"><i class="material-icons">note_add</i><span>Create Post</span></a></li>
    </ul>
    <div class="nav--footer">
      <ul class="account--menu--content" :class="{'account--menu--content--active': menu.menuAccount}">
        <li><a href="javascript:void(0)" @click="$emit('logout:auth')">Logout</a></li>
      </ul>
      <div class="nav--account">
        <div class="account--avatar">
          <div class="account--avatar__img"></div>
        </div>
        <div class="account--detail">
          <p class="account--detail__avatar">{{ userdata.name }}</p>
          <p class="account--detail__description">{{ userdata.role }}</p>
        </div>
        <div class="account--menu">
          <a href="javascript:void(0)" class="account--menu__icon"><i class="material-icons" @click="menu.menuAccount = !menu.menuAccount">more_vert</i></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['page','userdata'],
  data(){
    return {
      // page: '',
      menu: {
        menuAccount: false,
      }
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