<template>
    <div v-show="pages" class="form-create col-md-10 ">
        <form @submit.prevent="createArticle" enctype="multipart/form-data">
            <div class="col-md-9">
                <h2>Create your article</h2>
                <div class="edit-title">
                    <input v-model="formCreate.title" type="text" value="" placeholder="title ....">
                    <input v-model="formCreate.tag" type="text" value="" placeholder="tag ....">
                </div>
 
                <div class="mt-5 mb-5">
                    <wysiwyg v-model="formCreate.content" type="text" class="mt-5"></wysiwyg>
                </div>

                <input 
                    type="file"
                    @change="handlefileupload($event)"
                    lang="es"
                />

                <div class="button-dashboard-edit">
                    <button type="submit" class="btn btn-primary">Save</button>
                    <!-- <button type="button" class="btn btn-primary">Cancel</button> -->
                </div>
            </div>
            <div class="col-md-3">
                <!-- <h4>Lorem ipsum, dolor sit amet</h4>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit eaque sapiente porro, tempore pariatur necessitatibus repellendus quia neque blanditiis iste asperiores molestiae. Tempore sequi earum dicta, dolores quasi accusantium quo. -->
            </div>
        </form>
    </div>

</template>

<script>
    export default {
        props: ['pages'],
        data() {
            return {
                formCreate: {
                    title: '',
                    content: '',
                    image: '',
                    tags: ''
                }
            }
        },
        methods: {
            handlefileupload (event) {
                let file = event.target.files || event.dataTransfer.files;
                this.formCreate.image = file[0]

            },
            createArticle(){
                // console.log(this.formCreate);
                this.$emit('create-article', this.formCreate)
            }
        }
    }
</script>

<style scoped>
    .form-create {
        display: flex;
    }
</style>