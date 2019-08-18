<template>
<div>
    <Navbar @article:publish="publishArticle()" @to:list="$emit('to:list')" @log:out="$emit('log:out')"></Navbar>
    <b-row class="justify-content-center">
        <b-col cols="7">
            <h1 class="standout text-center" style="padding-top: 80px;">Create Article</h1>
            <b-form @submit.prevent="publishArticle()" class="mt-4">
                <b-form-input v-model="title" placeholder="Title"></b-form-input>
                <br>
                <froala :tag="'textarea'" :config="config" v-model="content"></froala>
                <br>
                <div class="my-2 text-secondary">Selected file: {{ file ? file.name : '' }}</div>
                <b-form-file
                accept="image/*"
                v-model="file"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
                ></b-form-file>
                <tags-input v-model="tags" class="mt-3" place-holder="Add one or more tags..."></tags-input>
                <b-button v-if="!isLoading" class="mt-4 btn-block float-right" type="submit" variant="primary">Publish</b-button>
                <b-button v-else class="form-control btn-primary mt-3" disabled>
                    <b-spinner small></b-spinner>
                    Loading...
                </b-button>
            </b-form>
        </b-col>
    </b-row>    
</div>

</template>

<script>
import Swal from 'sweetalert2'
import ax from '../config/axios'
import Navbar from '../components/NavbarCreate.vue'
import VueFroala from 'vue-froala-wysiwyg';
export default {
    components: {
        Navbar
    },
    data() {
        return {
            title: '',
            content: '',
            file: '',
            tags: [],
            config: {
                events: {
                'froalaEditor.initialized': function () {
                    console.log('initialized')
                    }
                }
            },
            isLoading: false 
        }
    },
    methods: {
        publishArticle(){
            this.isLoading = true
            let formData = new FormData()
            let tags = [] 
            this.tags.forEach( tag => {
                tags.push(tag.value)
            })

            formData.append('title', this.title)
            formData.append('content', this.content)
            formData.append('file', this.file)
            formData.append('tags', tags)

            ax({
                url: '/articles',
                method: 'post',
                data: formData,
                headers: { token: localStorage.getItem('token')}
            })
            .then(({ data }) => {
                console.log('Article created!')
                this.title = ''
                this.content = ''
                this.file = ''
                this.tags = ''
                this.isLoading = false
                Swal.fire({
                    type: 'success',
                    title: 'Article Published!'
                })
                this.$emit('to:list')
            })
            .catch( err => {
               Swal.fire({
                    type: 'error',
                    title: err.response.data
                })
            })
        }
    }
}
</script>

<style>

</style>