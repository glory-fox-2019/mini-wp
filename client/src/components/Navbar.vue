<template>
<div>
        <b-navbar toggleable="lg" type="light" variant="white"
          style="display: flex; justify-content: space-between; padding: 10px; align-content: center; align-items: center; border-bottom: 2px solid #f5f5f7;"
        >
          <b-navbar-brand style="margin-left: 15px; display:flex; width: 30%; align-items: center;">
              <img :src="image" style="width: 30px; height: 30px; margin-right: 10px;">
              <h5 style="margin-left: 10px; padding: 0; margin: 0;">Omongin aja</h5>
          </b-navbar-brand>
          <b-navbar-nav tabs fill style="display:flex; width:40%;">
            <b-nav-item @click.prevent="allArticles">Home</b-nav-item>
            <b-nav-item @click.prevent="userArticles">Your Articles</b-nav-item>
            <b-nav-item @click.prevent="createArticle">Create Articles</b-nav-item>
          </b-navbar-nav>
            <!-- Right aligned nav items -->
            <b-navbar-nav style="display: flex; justify-content: flex-end; width: 60%;">
              <b-nav-form style="display: flex; width: 60%; justify-content: flex-end; margin-right: 60px;">
                <b-form-input size="sm" v-model="search" style="margin-right: 10px; width: 80%" placeholder="Search article here.."></b-form-input>
              </b-nav-form>

              <b-navbar-nav right style="margin-right: 10px;">
                <b-button variant="light" @click.prevent="signOut">Logout</b-button>
              </b-navbar-nav>
            </b-navbar-nav>
        </b-navbar>
</div>
</template>

<script>
import image from '../../png/friends-talking.png'

export default {
    data() {
        return {
            image: image,
            search: ''
        }
    },
    methods: {
        userArticles() {
            this.$emit('userArticles')
        },
        allArticles() {
            this.$emit('allArticles')
        },
        createArticle() {
            this.$emit('createArticle')
        },
        signOut() {
            this.$emit('signOut')
        }
    },
    watch: {
        search(newValue, oldValue) {
            this.$emit('search', newValue)
        }
    }
}
</script>

<style scoped>

</style>