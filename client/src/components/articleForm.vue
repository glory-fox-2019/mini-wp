<template>
  <div class="col col-sm-10 mid">
      
        <form enctype="multipart/form-data" >
            <div class="form-group">
                <label  for="Title">Title</label>
                <input v-model="title" class="form-control" type="text">
            </div>
             <b-field class="file">
                <b-upload v-model="featuredImage">
                    <a class="button is-info">
                        <b-icon icon="upload"></b-icon>
                        <span>Click to upload</span>
                    </a>
                </b-upload>
                <span class="file-name" v-if="featuredImage">
                    {{ featuredImage.name }}
                </span>
            </b-field>
        <Editor
        class="editor"
        v-model="content"
        api-key="yz6rslamoykea3ihubhhbd4r79vbysel2ke1qimc6866wzvm"
        :init="{plugins: 'wordcount'}"
      ></Editor>
      <section>
        <b-field label="Enter some tags">
            <b-taginput
                type="is-info"
                v-model="tags"
                :data="filteredTags"
                field="tags"
                icon="label"
                placeholder="Add a tag"
                @typing="getFilteredTags">
            </b-taginput>
        </b-field>
    </section>
            
        </form>
    </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import axios from 'axios'

export default {
    props:['postArticle', 'currentUser'],
    components:{
        Editor
    },
    data() {
        return {
            title:"",
            content:"",
            featuredImage: null,
            tags: [],
            filteredTags : [],
            existingTags: [
                "article",
                "broadway"
            ]
        };
    },
    methods:{
        submit(){
            Swal.fire({
            title: 'Are you sure?',
            text: "",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, post it!'
            }).then((result) => {
            if (result.value) {
                let formData = new FormData()
                formData.append('title', this.title)
                formData.append('content', this.content)
                formData.append('featuredImage', this.featuredImage)
                formData.append('tags', this.tags)
                console.log("formdata", formData)
                axios({
                    url:`http://35.232.133.45/articles/create`,
                    method: 'POST',
                    headers: {
                        token: localStorage.getItem('token')
                        },
                    data: formData
                })
                .then(({data})=>{
                    Swal.fire({
                        position: 'top-end',
                        type: 'success',
                        title: 'Your article has been posted',
                        showConfirmButton: false,
                        timer: 1500
                        })
                })
                .catch(err=>{
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        footer: err.message
                    })
                })
            }
        })
            
        },
        getFilteredTags(text) {
                this.filteredTags = this.existingTags.filter((option) => {
                    return option
                        .toString()
                        .toLowerCase()
                        .indexOf(text.toLowerCase()) >=0
                })
            }
    },
    watch:{
        postArticle: function(newVal, oldVal){
            if(newVal == true){
                this.submit()
            }
        }
    }
};
</script>

<style scoped>
</style>    

                    