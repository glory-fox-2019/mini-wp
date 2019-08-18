<template>
    <div>
        <b-jumbotron lead="Never Stop Creating">
            <template slot="header">{{user.info.fullname}}</template>
            <b-button variant="primary" v-if="action.isDashboard" href="#" @click.prevent="createContent">Create More Article</b-button>
            <b-button variant="success" v-if="action.isCreate || action.isEdit" href="#" @click.prevent="contentList">My Collection</b-button>
        </b-jumbotron>
        <div v-if="action.isDashboard">
            <b-tabs
                active-nav-item-class="font-weight-bold text-uppercase text-danger"
                active-tab-class="font-weight-bold text-success"
                content-class="mt-3">
                <b-tab @click.prevent="getMyArticle(1)" title="Publish" active></b-tab>
                <b-tab @click.prevent="getMyArticle(2)" title="Draft"><p></p></b-tab>
                <b-tab @click.prevent="getMyArticle(3)" title="Deleted"><p></p></b-tab>
            </b-tabs>
        </div>
        <dashboardListContent v-if="action.isDashboard" :contents="user.articles" @read="read" @removeContent="removeArticle" @edit="updateContent"></dashboardListContent>
        <createContent v-if="action.isCreate"></createContent>
        <dashboardUpdate v-if="action.isEdit" :content="updateArticle"></dashboardUpdate>
    <div>

</template>

<script>

import createContent from './dashboard-create'
import dashboardListContent from './dashboard-list-content'
import dashboardUpdate from './dashboard-update'
export default {
    data(){
        return {
            user : {
                articles : [],
                info : {
                    fullname : 'Fauzi Nur Fadillah'

                },
            },
            action : {
                isCreate : false,
                isEdit : false,
                isDashboard : true
            },
            updateArticle : {}
        }
    },
    components :{
        dashboardListContent,
        createContent,
        dashboardUpdate
    },
    methods : {
        read(){

        },
        getMyArticle(status){
            let token = localStorage.getItem('token')
            Swal.showLoading()
            axios({
                method: 'GET',
                url: `http://34.87.63.195/article/myarticle/${status}`,
                headers : { token }
            }).then(({data}) => {
                console.log(data)
                Swal.close()
                this.user.articles = data
            }).catch(err => {
                Swal.close()
                console.log(err)
            })
        },
        createContent(){
            this.action.isCreate = true
            this.action.isDashboard = false;
            this.action.isEdit = false;
        },
        contentList(){
            this.action.isCreate = false;
            this.action.isDashboard = true;
            this.action.isEdit = false;
            this.getMyArticle(1)
        },
        updateContent(content){
            this.updateArticle = content
            this.action.isCreate = false
            this.action.isDashboard = false;
            this.action.isEdit = true;
        },
        removeArticle(id){
            this.user.articles = this.user.articles.filter(el => { return el._id != id })
        }
    },
    created() {
        this.getMyArticle(1)
        let token = localStorage.getItem('token')
        axios({
            method: 'get',
            url : 'http://34.87.63.195/user/myprofile',
            headers: { token }
        })
        .then(({data}) => {
            this.user.info.fullname = data.fullname
        })
        .catch(err => {
            console.log(err)
        })
    }
}
</script>

<style>

</style>