<template>
    <div class="article">
        <div class="article-title">
            <h2>{{art.title}}</h2>
            <p>created: {{art.createdAt.slice(0, 10)}}</p>
            <div class="article-buttons">
                <button class="update-button" @click="editContent({id: art._id, eTitle: art.title, eContent: art.content})">Edit</button>
                <button class="delete-button" @click="deleteArticle(art._id)">Delete</button>
            </div>
        </div>
        <div class="article-thumbnail">
            <img :src="art.featured_image">
        </div>
    </div>    
</template>

<script>
export default {
    props: ['art'],
    methods: {
        deleteArticle(id) {
            Swal.fire({
                title: 'Are you sure?',
                text: "Are you sure you want to delete this article?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    axios.delete(`http://35.247.138.16/articles/${id}`, {
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    })
                        .then(() => {
                            this.$emit('deleteAnArticle', id)
                             Swal.fire(
                                'Deleted!',
                                'Your article has been deleted.',
                                'success'
                                )
                        })
                        .catch(console.log)
                   
                }
            })
        },
        editContent(info) {
            info.page = "editpage"
            this.$emit('editArticle', info)
        }
    }
}
</script>

<style scoped>
.article {
    border: 1px solid #99ccff;
    margin: 27px;
    width: 600px;
    height: 120px;
    border-radius: 15px;
    padding: 20px;
    background-color: #f6f6f6;
    transition: 0.4s;
    display: flex;
    color: #0e3835;
}

.article:hover {
    box-shadow: 0 0px 10px #739bc4;
}

.article-thumbnail {
    border-radius: 8px;
    flex-basis: 200px;
    overflow: hidden;
}

.article-thumbnail img {
    width: 100%;
}

.article-title {
    display: flex;
    flex-direction: column;
    padding: 10px;
    justify-content: space-between;
    flex-basis: 200px;
    flex-grow: 1;
}

.article-title p {
    font-size: 13px;
    font-style: italic;
    margin: 8px;
}

.article-buttons {
    display: flex;
}

button {
    color: #10283f;
}
</style>