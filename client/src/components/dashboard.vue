<template>
    <div v-show="dashboard" class="dashboard d-flex">
        <SideNavbar
            v-if="dashboard"
            @to-home="toHomePage"
            @to-create-article="toCreateArticle"
            @to-my-article="toMyArticle"
        ></SideNavbar>
        <div class="row" v-if="dashboard">
            <ListArticle
                v-for="(a, index) in articles"
                :key="index"
                :article="a"    
                :list-article="pages.listArticle"
                @to-edit-article="toEditArticle"
                @to-delete-article="toDeleteArticle"
            ></ListArticle>
        </div>

        <FormCreate
            @create-article="createArticle"
            :pages="pages.formCreate"
        ></FormCreate>

        <form-edit
        
        ></form-edit>

    </div>

</template>

<script>
    const baseUrl = `http://localhost:3000`

    import SideNavbar from './navbar-side.vue'
    import ListArticle from './list-article.vue'
    import FormCreate from './form-create.vue'
    import FormEdit from './form-edit.vue'

    export default {
        props: ['dashboard', 'articles'],
        data() {
            return {
                pages: {
                    formCreate: false,
                    listArticle: true,
                    formEdit: false,
                    sideNavbar: true
                }
            }
        },
        components: {
            SideNavbar,
            ListArticle,
            FormCreate,
            FormEdit
        },
        methods: {
            toHomePage(){
                this.dashboard = false
                this.pages.formCreate = false
                this.pages.listArticle = false
                this.pages.formEdit = false
                this.pages.sideNavbar = false
            },
            toCreateArticle(){
                this.pages.formCreate = true
                this.pages.listArticle = false
                this.pages.formEdit = false
            },
            toMyArticle() {
                this.pages.formCreate = false
                this.pages.listArticle = true
                this.pages.formEdit = false
            },
            toEditArticle(id){
                this.pages.formCreate = false
                this.pages.listArticle = false
                this.pages.formEdit = true
                this.$emit('edit-article', id)
            },
            createArticle(data){
                this.$emit('create-article', data)
            },
            toDeleteArticle(id){
                this.$emit('delete-article', id)
            }

        },
        mounted(){
            if(!localStorage.token){
                this.pages.formCreate = false
                this.pages.listArticle = false
                this.pages.formEdit = false
                this.pages.sideNavbar = false
            } else {
                this.pages.formCreate = false
                this.pages.listArticle = true
                this.pages.formEdit = false
                this.pages.sideNavbar = true
            }
        }
    }
</script>

<style scoped>
    .dashboard {
        padding: 0;
        margin: 0;
    }
</style>