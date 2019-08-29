<template>
<div class="col col-sm-10 mid">
      
        <form enctype="multipart/form-data" >
            <div class="form-group">
                <label  for="Title">Title</label>
                <input v-model="article.title" class="form-control" type="text">
            </div>
        <Editor
        class="editor"
        v-model="article.content"
        api-key="yz6rslamoykea3ihubhhbd4r79vbysel2ke1qimc6866wzvm"
        :init="{plugins: 'wordcount'}"
         ></Editor>
      <section>
        <b-field label="Enter some tags">
            <b-taginput
                type="is-info"
                v-model="article.tags"
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
    props: ['article', 'submitEdit'],
    data() {
        return {
            editArticle: {
                title:"",
                content:"",
                featuredImage: null,
                tags: [],
            },
            filteredTags : [],
            existingTags: [
                    "article",
                    "broadway"
                ]
        };
    },
    components:{
        Editor
    },
    methods:{
        submit(){
            console.log(this.article , "<<<<<<<<<<")
            axios({
                method: "PUT",
                url: `http://35.232.133.45/articles/${this.article._id}`,
                data: this.article,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                console.log("data editted")
            })
            .catch(({data}) =>{
                console.log(data)
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
        submitEdit: function(newVal, oldVal){
            if(newVal == true){
                this.submit()
            }
        }
    },
    mounted(){
        
    }
};
</script>

<style scoped>
</style>

                    