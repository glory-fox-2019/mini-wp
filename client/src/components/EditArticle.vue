<template>
      <div>
    <b-container style="display: flex; height: 100vh; justify-content:flex-start; flex-direction: column; width: 50%" >
      <b-form method='POST' action="#" style="margin-top: 130px;" @submit.prevent="editArticle">
        <b-form-group
          label="Title:"
          label-for="input-1"
          style="width: 100%"
        >
          <b-form-input
            id="input-1"
            type="text"
            required
            placeholder="Insert Title here.."
            v-model="form.title"
          ></b-form-input>
        </b-form-group>
        <b-form-group>
            <b-img :src="article.featured_image"></b-img>
        </b-form-group>

        <b-form-group label="Insert File:" label-for="file-small" style="z-index: 0;">
            <b-form-file id="file-small" size="sm" v-model="form.image"></b-form-file>
        </b-form-group>
        <b-form-group label="Insert your text:" label-for="wysiwyg">
            <wysiwyg id="wysiwyg" v-model="form.content"></wysiwyg>
        </b-form-group>
        <b-button type="submit" variant="primary" style="width: 20%;">Edit</b-button>
      </b-form>
    </b-container>
    </div>
</template>

<script>
export default {
    props: {
        article: Object
    },
    data() {
        return {
            form: {
                image: this.article.featured_image,
                title: this.article.title,
                content: this.article.content
            }
        }
    },
    methods: {
        editArticle() {
            const formData = new FormData()
            formData.append('title', this.form.title)
            formData.append('image', this.form.image)
            formData.append('content', this.form.content)
            Swal.fire({
                title: 'Edit this Article ?',
                text: "You won't be able to revert this!",
                type: 'question',
                showCancelButton: true,
                cancelButtonColor: '#3085d6',
                confirmButtonColor: '#1ebf19',
                confirmButtonText: 'Confirm',
            })
            .then(result => {
                if (result.value) {
                    this.$emit('remakeArticle',{
                        formData,
                        id: this.article._id
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>