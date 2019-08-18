<template>
    <div>
        <b-jumbotron lead="Never Stop Creating">
            <template slot="header">{{user.info.fullname}}</template>
            <p></p>
            <b-button variant="primary" href="#">Create More Article</b-button>
        </b-jumbotron>
        <b-nav tabs>
            <b-nav-item>Publish</b-nav-item>
            <b-nav-item>Draft</b-nav-item>
            <b-nav-item>Deleted</b-nav-item>
        </b-nav>
        <listContent v-if="!action.isCreate" :contents="user.articles" @read="read"></listContent>
        <createContent v-if="action.isCreate"></createContent>
    <div>

</template>

<script>
import listContent from './content-list'
import createContent from './dashboard-create'
export default {
    data(){
        return {
            user : {
                articles : [{
                    title : 'Anak Tiri Durhaka',
                    author : 'Aku anak kuat',
                    description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    view : 2000
                },
                {
                    title : 'Anak Tiri Durhaka',
                    author : 'Aku anak kuat',
                    description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    view : 2000
                }   
                ],
                info : {
                    fullname : 'Fauzi Nur Fadillah'

                }
            },
            action : {
                isCreate : true
            }
        }
    },
    components :{
        listContent,
        createContent
    },
    methods : {
        read(){

        }
    }
}
</script>

<style>

</style>