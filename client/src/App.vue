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
    <Contentpage 
    v-if="pages.contentSection && isLogin" 
    style="margin-top: 100px; " 
    :articles="articles"
    :isEdit="isEdit"
    @deleteArticle="deleteArticle"
    >
    </Contentpage>

        <b-modal ref="modal-1"
        v-if="isLoading" 
        hide-header
        hide-footer
        hide-header-close=true 
        no-close-on-backdrop=true
        centered=true
        visible=true
        no-close-on-esc
        body-bg-variant="light"
        >
            <b-spinner variant="primary" type="grow"></b-spinner>
            <b-spinner variant="danger" type="grow"></b-spinner>
            <b-spinner variant="warning" type="grow"></b-spinner>
        </b-modal>
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
            isLoading: false,
            isEdit: false,
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
            //delete here
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
            this.isEdit = true;
            this.articles = this.tempArticles.filter((el) => { return el.author._id == localStorage.junk})
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