<template>
<div>
    <Navbar v-if="pages.dashboardSection && isLogin" 
    @userArticles="userArticles" 
    @allArticles="loadArticle" 
    @search="searchArticles"
    @signOut="signOut"
    style="top: 0; z-index: 1; overflow: hidden; position:fixed; width: 100%;">
    </Navbar>
    <Loginpage v-if="pages.loginSection && !isLogin" @registerButton="registerPage" @userLogin="signIn"></Loginpage>
    <Registerpage v-if="pages.registerSection && !isLogin" @back="loginPage" @userRegister="signUp"></Registerpage>
    <Contentpage v-if="pages.contentSection && isLogin" style="margin-top: 100px; " :articles="articles"></Contentpage>
</div>
</template>

<script>
const user_url = 'http://localhost:3000/user'
const article_url = 'http://localhost:3000/articles'

import Navbar from './components/Navbar.vue'
import Loginpage from './components/Loginpage.vue'
import Registerpage from './components/Registerpage.vue'
import Contentpage from './components/Contentpage.vue'
export default {
    data() {
        return {
            isLogin: false,
            articles: [],
            tempArticles: [],
            pages: {
                loginSection: true,
                registerSection: false,
                dashboardSection: false,
                contentSection: false
            }
        }
    },
    components: {
        Navbar,
        Loginpage,
        Registerpage,
        Contentpage
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
        loadArticle() {
            axios({
                method: 'get',
                url: `${article_url}`,
                headers: {
                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDU3OGFkNWRhNjY0YTNmZTkxZjRmZTUiLCJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpYXQiOjE1NjYwNDEwOTl9.RsVx5ZuMX9KZjEXnHnleQ85NWaAsdjn2009LLNTmYyo"
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
                this.loginPage()
            }, 1800)
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
            this.pages.loginSection = false;
            this.pages.registerSection = false;
            this.pages.dashboardSection = true;
            this.pages.contentSection = true;
            this.loadArticle()
        },
        userArticles() {
            this.articles = this.articles.filter((el) => { return el.author._id == "5d5696c8954acc58a9406f18"})
        },
        searchArticles(value) {
            const title = new RegExp(value,'i')
            this.articles = this.tempArticles.filter((el) => { return title.test(el.title)})
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