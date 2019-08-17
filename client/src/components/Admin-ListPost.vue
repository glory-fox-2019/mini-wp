<template>
  <div id="list-post">
    <div class="container">
      <div class="title">
        <h2>All Post</h2>
      </div>
      <div class="action">
        <div class="form-group">
          <input type="text" class="form-control" id="input--search" placeholder="Search" autocomplete="off" v-model="search">
        </div>
      </div>
      <div class="post--list row">
        <div class="col-12 col-sm-6 col-md-4 col-xl-3" v-for="data in posts" :key="data._id">
          <div class="post__item">
            <div class="post__item--thumbnail" :style="{backgroundImage: `url('`+data.thumbnail || 'https://picsum.photos/id/1023/300/200'+`')`}">
              <div class="post__item--action">
                <a href="#" class="post__item--action--read" @click="showPost(data._id)"><i class="material-icons">remove_red_eye</i></a>                      
                <a href="#" class="post__item--action--edit" @click="$emit('edit:post', data._id)"><i class="material-icons">edit</i></a>
                <a href="#" class="post__item--action--delete" @click="$emit('delete:post',data._id)"><i class="material-icons">delete</i></a>
              </div>
            </div>
            <div class="post__item--title">
              {{ data.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['posts'],
  data(){
    return {
      search: '',
    }
  },
  methods: {

  },
  watch: {
    search(val){
      this.$emit('search', val);
    }
  }
}
</script>