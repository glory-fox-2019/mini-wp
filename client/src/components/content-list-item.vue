<template>
  <div style="margin-top:20px;">
    <b-card >
            <b-row style="height: 15vh;">
            <b-col cols="3" class="photo-card" v-bind:style="{ 'background-image': 'url(' + content.imageUrl + ')' }"></b-col>
            <b-col cols="9">
                <h5> <a href="#" text-muted @click.prevent="read(content)"> {{content.title}}</a> </h5>
                <h6> {{content.author.fullname}} </h6>
                <p v-html="content.content"><p> 
                <small><i class="fas fa-eye"> </i> {{content.views}} </small>
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