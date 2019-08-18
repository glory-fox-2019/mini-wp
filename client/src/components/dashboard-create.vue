<template>
     <div class="col-12" style="height: 75vh">
        <div>
            <input type="text" id="title" placeholder="Title" v-model="title">
            <!-- <input type="text-area" id="summernote" v-model="content"> -->
            <wysiwyg v-model="text"></wysiwyg>
        </div>
        <div>
            <button class="submit-article">Update</button>
            <button class="clear-article">Clear</button>
        </div>
    </div>
</template>

<script>
import wysiwyg from '../vueWysiwyg'
export default {
    data(){
        return{
            text: "",
            title : ""
        }
    },
    components:{
        wysiwyg
    }
}
</script>

<style>

</style>