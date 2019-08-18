<template>
  <div style="margin-top:20px;">
    <b-card v-for="content in contents" :key="content._id">
            <b-row style="height: 15vh;">
            <b-col cols="3" class="photo-card" v-bind:style="{ 'background-image': 'url(' + content.imageUrl + ')' }"></b-col>
            <b-col cols="9">
                <h5> <a href="#" text-muted @click.prevent="read(content)"> {{content.title}}</a> </h5>
                <h6> {{content.author.fullname}} </h6>
                <p v-html="content.content"><p> 
                <small><i class="fas fa-eye"> </i> {{content.views}} </small>
                <small> <a href="#" @click.prevent="update(content)"> Edit </a> </small>
                <small> <a href="#" @click.prevent="removeArticle(content._id)"> Delete </a> </small>
                <small> <a href="#" @click.prevent="deletePermanent(content._id)"> Delete Permanently </a> </small>
            </b-col>
        </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
    props: ['contents'],
    methods :{
        read(object){
            this.$emit('read',object)
        },
        removeArticle(id){
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
                let token = localStorage.getItem('token')
                let status = 3
                axios({
                    method: 'patch',
                    url : `http://34.87.63.195/article/update/${id}`,
                    data : {status},
                    headers : {token}
                })
                .then(({data}) => {
                    this.$emit('removeContent',id)
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                })
                .catch(err => {
                    Swal.fire(
                        'Failed',
                        err.response.data.message,
                        'error'
                    )
                })
                
            }
            })
            
        }, 
        deletePermanent(id){
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it permanently!'
            }).then((result) => {
            if (result.value) {
                let token = localStorage.getItem('token')
                let status = 3
                axios({
                    method: 'delete',
                    url : `http://34.87.63.195/article/delete/${id}`,
                    data : {status},
                    headers : {token}
                })
                .then(({data}) => {
                    this.$emit('removeContent',id)
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                })
                .catch(err => {
                    Swal.fire(
                        'Failed',
                        err.response.data.message,
                        'error'
                    )
                })
                
            }
            })
        },
        update(content){
            this.$emit('edit',content)
        }
    },
};
</script>

<style scoped>
.photo-card{
    background-repeat: no-repeat !important;
    background-size: cover !important;
    height: 100%;
}
p {
     width: 100%;
     height: 45px;
     overflow: hidden;
     text-overflow: ellipsis;
}

.footer{
    align-self: flex-end
}

h5 a {
    text-decoration: none;
}
</style>