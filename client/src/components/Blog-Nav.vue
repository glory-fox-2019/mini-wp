<template>
  <nav>
    <div class="container">
      <div class="nav--brand">
        <a href="javascript:void(0)" @click="$emit('update:page','blog-home')">
          Mini Wp
        </a>
      </div>
      <div class="nav--search">
        <input type="text" placeholder="Search" v-model="search">
      </div>
      <div class="nav--menu--auth">
        <a href="javascript:void(0)" @click="$emit('update:app:page','admin')">
          <span v-if="!isLogin">Login</span>
          <span v-if="isLogin">Admin Panel</span>
        </a>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  props: ['isLogin'],
  data() {
    return {
      search: '',
    }
  },
  watch: {
    search(val){
      this.$emit('search:post',val);
      this.$emit('update:page','blog-home');
    }
  }
}
</script>