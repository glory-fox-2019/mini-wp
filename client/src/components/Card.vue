<template>
<div>
    <section v-for="article in articles" :key="article._id" style="margin-bottom: 70px;">
        <b-card no-body >
            <b-row no-gutters>
                <b-col md="8">
                    <b-card-body :title="article.title" style="display:flex; flex-direction: column;">
                        <b-card-text style="padding: 0; margin: 0;">
                            <p style="font-size: 13px; color: #black; padding: 0; margin: 0;">Author: {{ article.author.username }}</p>
                            <br>
                            <a href="#" @click.prevent="seeDetails(article._id)" style="margin: 0; padding: 0; color:green; content-align: center; margin-right: 10px;">See Article</a>
                        </b-card-text>
                        <div style="display: flex; justify-content: space-between; width: 100%; margin-top: 7px; padding:0;">
                            <small style="color: #797a7a; padding: 0; margin: 0;">Updated At: {{ moment(`${article.updatedAt}`).fromNow() }}</small>
                            <small style="color: #797a7a; padding: 0; margin: 0;">Created at: {{ moment(`${article.updatedAt}`).format('DD-MM-YYYY') }}</small>
                        </div>
                    </b-card-body>
                </b-col>
                <b-col md="4" :style="{ backgroundImage: 'url(' + article.featured_image + ')' }" style="background-size: cover; background-repeat: no-repeat;">
                </b-col>
            </b-row>
        </b-card>
        <div style="display: flex; width: 100%; justify-content: flex-end;">
        <a href="#" v-if="isEdit" @click.prevent="editArticle(article._id)" style="margin: 0; padding: 0; color:green; content-align: center; margin-right: 10px;">Edit</a>
        <a href="#" @click.prevent="deleteArticle(article._id)" v-if="isEdit" style="margin: 0; padding: 0; color:red; content-align: center;">Delete</a>
        </div>
    </section>
</div>
</template>

<script>
import moment from 'moment'

export default {
    props: {
        articles: Array,
        isEdit: Boolean
    },
    data() {
        return {
            moment
        }
    },
    methods: {
        deleteArticle(id) {
            Swal.fire({
                title: 'Delete this Article ?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Delete',
            })
            .then(result => {
                if (result.value) {
                    this.$emit('deleteArticle', id)
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        seeDetails(id) {
            this.$emit('seeDetails',id)
        },
        editArticle(id) {
            this.$emit('editArticle',id)
        }
    }
}
</script>

<style scoped>

</style>