<template>
  <div style="margin-top:20px;">
    <b-card >
            <b-row style="height: 15vh;">
            <b-col cols="3" class="photo-card" style="background: url(https://images.unsplash.com/photo-1556742044-3c52d6e88c62?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60)"></b-col>
            <b-col cols="9">
                <h5> <a href="#" text-muted @click.prevent="read(content)"> {{content.title}}</a> </h5>
                <h6> {{content.author}} </h6>
                <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. <p> 
                <small><i class="fas fa-eye"> </i> {{content.view}} </small>
            </b-col>
        </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
    props: ['content'],
    methods :{
        read(object){
            this.$emit('read',object)
        }
    }
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