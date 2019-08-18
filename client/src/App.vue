<template>
<div>
    <Navbar v-if="pages.dashboardSection && isLogin" 
    @userArticles="userArticles" 
    @allArticles="dashboardPage" 
    @search="searchArticles"
    @signOut="signOut"
    @createArticle="createArticle"
    style="top: 0; z-index: 1; overflow: hidden; position:fixed; width: 100%;">
    </Navbar>
    <Loginpage v-if="pages.loginSection && !isLogin" @registerButton="registerPage" @userLogin="signIn" @googleSignIn="googleSignIn"></Loginpage>
    <Registerpage v-if="pages.registerSection && !isLogin" @back="loginPage" @userRegister="signUp"></Registerpage>
    <Contentpage 
    v-if="pages.contentSection && isLogin" 
    style="margin-top: 100px; " 
    :articles="articles"
    :isEdit="isEdit"
    @deleteArticle="deleteArticle"
    @seeDetails="seeDetails"
    @editArticle="editArticle"
    >
    </Contentpage>
    <Detailpage
    :article="theArticle"
    v-if="pages.detailSection && isLogin"
    style="margin-top: 100px;"
    >
    </Detailpage>

    <Editpage
    v-if="pages.editSection && isLogin"
    :article="theArticle"
    @remakeArticle="remakeArticle"
    >

    </Editpage>

    <CreateArticle
        v-if="pages.createSection && isLogin"
        @makeArticle="makeArticle"
    >
    </CreateArticle>
</div>
</template>

<script>
const user_url = 'http://localhost:3000/user'
const article_url = 'http://localhost:3000/articles'

import Navbar from './components/Navbar.vue'
import Loginpage from './components/Loginpage.vue'
import Registerpage from './components/Registerpage.vue'
import Contentpage from './components/Contentpage.vue'
import CreateArticle from './components/CreateArticle.vue'
import Detailpage from './components/Detailpage.vue'
import Editpage from './components/EditArticle.vue'
export default {
    data() {
        return {
            isLoading: false,
            isEdit: false,
            isLogin: false,
            articles: [],
            tempArticles: [],
            theArticle: [],
            pages: {
                loginSection: true,
                registerSection: false,
                dashboardSection: false,
                contentSection: false,
                createSection: false,
                detailSection: false,
                editSection: false
            }
        }
    },
    components: {
        Navbar,
        Loginpage,
        Registerpage,
        Contentpage,
        CreateArticle,
        Detailpage,
        Editpage
    },
    methods: {
        signIn(loginForm) {
            axios({
                method: 'post',
                url: `${user_url}/signIn`,
                data: {
                    email: loginForm.email,
                    password: loginForm.password
                }
            })
            .then(response => {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('username', response.data.username)
                localStorage.setItem('junk', response.data.id)
                Swal.fire({
                    type: 'success',
                    title: 'Login success !',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(() => {
                    this.isLogin = true
                    this.dashboardPage()
                }, 1800)
            })
            .catch(err => {
                Swal.fire({
                    type: 'error',
                    title: 'Login Fail',
                    text: err.response.data
                })
            })
        },
        googleSignIn(idToken) {
            axios({
                method: 'post',
                url: `${user_url}/signInGoogle`,
                data: {
                    id_token: idToken
                }
            })
            .then(response => {
                console.log(response.data.id)
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('username', response.data.username)
                localStorage.setItem('junk', response.data.id)
                Swal.fire({
                    type: 'success',
                    title: 'Login success !',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(() => {
                    this.isLogin = true
                    this.dashboardPage()
                }, 1800)
            })
            .catch(err => {
                Swal.fire({
                    type: 'error',
                    title: 'Login Fail',
                    text: err.response.data
                })
            })
        },
        signUp(registerForm) {
            axios({
                method: 'post',
                url: `${user_url}/signUp`,
                data: {
                    username: registerForm.username,
                    email: registerForm.email,
                    password: registerForm.password
                }
            })
            .then(user => {
                Swal.fire({
                    type: 'success',
                    title: 'Register success !',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(() => {
                    this.loginPage()
                }, 1800)
            })
            .catch(err => {
                Swal.fire({
                    type: 'error',
                    title: 'Failed to register :(',
                    text: err.response.data
                })
            })
        },
        signOut() {
            Swal.fire({
                type: 'success',
                title: 'Successfully Logout',
                text: 'Have a nice day !',
                showConfirmButton: false,
                timer: 1500
            })
            setTimeout(() => {
                this.isLogin = false;
                localStorage.removeItem('token')
                localStorage.removeItem('username')
                localStorage.removeItem('junk')
                this.out()
                this.loginPage()
            }, 1800)
        },
        loadArticle() {
            this.isEdit = false;
            axios({
                method: 'get',
                url: `${article_url}`,
                headers: {
                    token: localStorage.token
                }
            })
            .then(response => {
                this.articles = response.data;
                this.tempArticles = response.data;
            })
            .catch(err => {
                Swal.fire({
                    type: 'error',
                    title: 'Server Error !',
                    text: err.response.data
                })
            })
        },
        deleteArticle(id) {
            Swal.fire({
                title: 'Deleting your article...',
                allowOutsideClick: () => !Swal.isLoading()
            })
            Swal.showLoading()
            axios({
                method: 'delete',
                url: `${article_url}/${id}`,
                headers: {
                    token: localStorage.token
                }
            })
            .then(response => {
                Swal.close()
                Swal.fire({
                    type: 'success',
                    title: 'Successfully Delete',
                    text: `${response.data}`,
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(() => {
                    this.dashboardPage()

                },1600)
            })
            .catch(err => {
                Swal.fire({
                    type: 'error',
                    title: 'Oopss.. ',
                    text: err.response.data
                })
            })
        },
        makeArticle(formData) {
            Swal.fire({
                title: 'Creating your article...',
                allowOutsideClick: () => !Swal.isLoading()
            })
            Swal.showLoading()
            axios({
                method: 'post',
                url: `${article_url}`,
                data: formData,
                headers: {
                    token: localStorage.token
                }
            })
            .then(results => {
                Swal.close()
                Swal.fire({
                    type: 'success',
                    title: 'Successfully Create Article',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout((el) => {
                    this.pages.createSection = false;
                    this.dashboardPage()
                }, 1700)
            })
            .catch(err => {
                Swal.fire({
                    type: 'error',
                    title: 'Oopss.. ',
                    text: err.response.data
                })
            })
        },
        remakeArticle(data) {
            Swal.fire({
                title: 'Updating your article...',
                allowOutsideClick: () => !Swal.isLoading()
            })
            Swal.showLoading()
            axios({
                method: 'put',
                url: `${article_url}/${data.id}`,
                data: data.formData,
                headers: {
                    token: localStorage.token
                }
            })
            .then(results => {
                Swal.close()
                Swal.fire({
                    type: 'success',
                    title: 'Successfully Update Article',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout((el) => {
                    this.pages.editSection = false;
                    this.dashboardPage()
                }, 1700)
            })
            .catch(err => {
                Swal.fire({
                    type: 'error',
                    title: 'Oopss.. ',
                    text: err.response.data
                })
            })
        },
        seeDetails(id) {
            this.pages.editSection = false;
            this.pages.detailSection = true;
            this.pages.contentSection = false;
            this.pages.createSection = false
            this.theArticle = this.tempArticles.find((el) => { return el._id == id})
        },
        registerPage() {
            this.pages.loginSection = false;
            this.pages.registerSection = true;
        },
        loginPage() {
            this.pages.loginSection = true;
            this.pages.registerSection = false;
        },
        dashboardPage() {
            this.pages.editSection = false;
            this.pages.createSection = false;
            this.pages.loginSection = false;
            this.pages.registerSection = false;
            this.pages.dashboardSection = true;
            this.pages.contentSection = true;
            this.pages.detailSection = false;
            this.loadArticle()
        },
        editArticle(id){
            this.pages.editSection = false;
            this.pages.detailSection = false;
            this.pages.dashboardSection = true;
            this.pages.contentSection = false;
            this.pages.createSection = false;
            this.pages.editSection = true
            this.theArticle = this.tempArticles.find((el) => { return el._id == id})
        },
        createArticle() {
            this.pages.editSection = false;
            this.pages.detailSection = false;
            this.pages.dashboardSection = true;
            this.pages.contentSection = false;
            this.pages.createSection = true
        },
        userArticles() {
            this.pages.editSection = false;
            this.pages.detailSection = false;
            this.pages.contentSection = true;
            this.pages.createSection = false;
            this.isEdit = true;
            this.articles = this.tempArticles.filter((el) => { return el.author._id == localStorage.junk})
        },
        searchArticles(value) {
            const title = new RegExp(value,'i')
            this.articles = this.tempArticles.filter((el) => { return title.test(el.title)})
        },
        out() {
            this.pages.editSection = false;
            this.pages.detailSection = false;
            this.pages.dashboardSection = false;
            this.pages.contentSection = false;
            this.pages.createSection = false
        }
    },
    created() {
        if(localStorage.getItem('token')) {
            this.isLogin = true;
            this.dashboardPage()
        }
    },
    watch: {

    }
}
</script>

<style scoped>

</style>