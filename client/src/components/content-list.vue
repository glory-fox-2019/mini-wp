<template>
  <div>
      <contentListItem v-for="content in contents" :key="content.title" :content="content" @read="read"></contentListItem>
  </div>
</template>

<script>
import contentListItem from './content-list-item'
export default {
    props : ['contents'],
    components: {
        contentListItem
    },
    methods: {
        read(object){
            this.$emit('read',object)
        }
    }
}
</script>

<style>

</style>