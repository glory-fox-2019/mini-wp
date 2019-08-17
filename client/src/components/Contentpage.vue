<template>
    <div>
        <b-container>
            <b-row style="align-content: center; display: flex; flex-direction: column;">
                <Card :articles="articles" style="width: 70%;" :isEdit="isEdit" @deleteArticle="deleteArticle"></Card>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import Card from './Card.vue'

export default {
    props: {
        articles: Array,
        isEdit: Boolean
    },
    components: {
        Card
    },
    methods: {
        deleteArticle(id) {
            this.$emit('deleteArticle',id)
        }
    }
}
</script>

<style scoped>

</style>