<template>
    <div v-if="page === 'makepage'">
        <div v-if="loading" class="loader"></div> 
        <div class="wysiwyg">
            <h2>Create Article</h2>
            <form method="POST" @submit.prevent="formSubmit">
                <label for="title">Title :</label>
                <input v-model="title" type="text" name="title" placeholder="Title" required autofocus><br>
                <label for="content">Content :</label><br>
                <quill-editor ref="myTextEditor" v-model="content" :options="editorOption"></quill-editor>
                <label for="image">Featured Image :</label>
                <input ref="file" type="file" name="file" @change="imageUpload"><br>
                <input type="submit" value="Submit">
            </form>
        </div>
    </div>
</template>

<script>
// import Editor from './Editor.vue'
import { quillEditor } from 'vue-quill-editor'
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            title: "",
            content: "",
            file: "",
            loading: false,
            editorOption: {}
        }
    },
    methods: {
        imageUpload() {
            this.file = this.$refs.file.files[0]
        },
        formSubmit() {
            const formData = new FormData()
                formData.set('title', this.title)
                formData.set('image', this.file)
                formData.set('content', this.content)
            this.loading = true
            axios.post('http://localhost:3000/articles', formData,
                {
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then(({data}) => {
                    this.loading = false
                    Swal.fire(
                        'Article added Successfully',
                        `Posted ${data.title}`,
                        'success'
                    )
                    this.$emit('postArticle', {data, page: 'dashboard'})                  
            })
                .catch(err =>{
                    this.loading = false
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: `File must be an image`,
                    })
                })
        }
    },
    props: ['page'],
    components: {
        quillEditor
    }
}
</script>

<style scoped>
.wysiwyg {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 35px 60px;
    width: 55vw;
}

.wysiwyg input {
    margin: 25px;
}

.wysiwyg h2 {
    color: rgb(20, 58, 80);
}

form label {
    margin-bottom: 10px;
}

input {
    padding: 3px;
}

input[type='file'] {
    border: 1px solid rgb(8, 114, 141);
    border-radius: 12px;
}

input[type='submit'] {
    width: 80px;
    height: 45px;
    cursor: pointer;
    transition: 0.4s;
    background-color: #1f3e53;
    border-radius: 10px;
    color: white;
    font-weight: 600;
}

input[type='submit']:hover {
    color: #196191;
    background-color: wheat;
}

.loader {
  position: absolute;
  top: 37vh;
  left: 50vw;
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>