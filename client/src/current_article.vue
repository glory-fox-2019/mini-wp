<template>
  <div class="col-xl-7  col-lg-7 col-md-10 col-sm-10 col-10">
      <articleItemCurrent v-for="items in articlesUser" :key="items._id" :items="items" @deletes="deleteBaru($event)" @edit="newEdit($event)" ></articleItemCurrent>
  </div>
</template>
<script>
import articleItemCurrent from './current_article_item'
export default {
  props : ['articlesUser'],
  data() {
    return {
      tes: "hai"
    };
  },
  components : {
      articleItemCurrent
  },
  methods : {
    pindahPage(id){
      this.$emit('page' , id)
    },
    deleteBaru(id){
        this.$emit('hapus' , id)
    },
    newEdit(id){
        this.$emit('edit' , id)
    }
  }
};
</script>

<style scoped>
</style>