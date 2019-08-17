<template>
    <div>
        <b-container>
            <b-row style="align-content: center; display: flex; flex-direction: column;">
                <Card :articles="articles" style="width: 70%;"></Card>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import Card from './Card.vue'

export default {
    props: {
        articles: Array
    },
    components: {
        Card
    }
}
</script>

<style scoped>

</style>