<template>
    <b-card no-body class="mt-1" style="height: 180px;">
        <b-row>
            <b-col cols="4">
                <img :src="article.image_path" alt="card-image" class="img-card-left" style="width: 180px; height: 178px; object-fit: cover;">
            </b-col>
            <b-col cols="8" class="pl-0">
                <b-card-body class="pt-2 pl-0 mb-0 pb-0">
                    <div class="mt-2">
                        <button @click="deleteArticle()" type="button" class="close btn-sm">
                        <font-awesome-icon icon="trash"></font-awesome-icon>
                        </button>
                        <button @click="$emit('article:update', article)" type="button" class="mx-2 close btn-sm">
                        <font-awesome-icon icon="edit"></font-awesome-icon>
                        </button>
                    </div>
                    <h5 class="text-primary"><b>{{ article.title }}</b></h5>
                    <sup class="text-secondary p-0">{{ article.author.username }}</sup>
                    <p class="text-justify">{{ article.content.replace(/<[^>]+>/ig, '').replace('</[^>','').substring(0,100) }}<a @click.prevent="$emit('to:article', article)" href="#"> See details...</a> </p>
                    <div class="float-bottom">
                    <a @click.prevent="$emit('search:tag', t.name )" href="#">
                        <b-badge v-for="(t,i) in article.tagsId" :key="i" pill variant="primary" class="mr-1">{{ t.name }}</b-badge>
                    </a>
                    </div>
                </b-card-body>
            </b-col>
        </b-row>
    </b-card>
</template>

<script>
import ax from '../config/axios'
import Swal from 'sweetalert2'
export default {
    props: ['article'],
    methods: {
        deleteArticle(){
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                        )
                    }
                }).then( () => {
                    ax({
                        method: 'delete',
                        url: '/articles/' + this.article._id,
                        headers: { token: localStorage.getItem('token') }
                    })
                    .then(({ data }) => {
                        Swal.fire({
                            type: 'success',
                            title: 'Data has been deleted!'
                        })
                        this.$emit('article:delete')
                    })
                    .catch( err => {
                        Swal.fire({
                            type: 'error',
                            title: err.response.data
                        })
                    })
                })   
        }
    }
}

</script>

<style>

</style>