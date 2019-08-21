<template>

    <div>
        <Login
            v-if="pages.login"
            @login-google="onSignIn($event)"
            :user="user"
            @login="login"
            @to-register="toRegister"    
        ></Login>
        
        <Register
            :register="pages.register"
            :user="user"
            @register="register"
            @to-login="toLogin"
        ></Register>

        <Navbar 
            :pages="pages.navbar"
            @logout="logout"
            @to-dashboard="toDashboard"
        ></Navbar>
        
        <TagBar
            :tagbar="pages.tagbar"
        ></TagBar>

        <Landing
            :articles="articles"
            :landing="pages.landing"
        ></Landing>
        
        <ReadMore
            :pages="pages.readMore"
        ></ReadMore>
        
        <Dashboard
            
            @to-home="toHomePage"
            :dashboard="pages.dashboard"
            @create-article="createArticle($event)"
            :articles="articles"
            @delete-article="deleteArticle"
            @edit-article="getEditArticle"
        ></Dashboard>
    </div>

</template>

<script>
    const baseUrl = `http://localhost:3000`

    import TagBar from './components/navbar-tag.vue'
    import Navbar from "./components/navbar.vue"
    import Landing from "./components/landing-page.vue"
    import ReadMore from './components/read-more.vue'
    import Dashboard from './components/dashboard.vue'
    import Login from './components/login.vue'
    import Register from './components/register.vue'

    import axios from 'axios'
    import GAuth from 'vue-google-oauth2'
    // import Swal from 'sweetalert';

    export default {
        components: {
            Navbar,
            Landing,
            ReadMore,
            Dashboard,
            Login,
            Register,
            TagBar,
        },
        data() {
            return {
                articles: [],
                tags: '',
                pages: {
                    landing: false,
                    login: true,
                    register: false,
                    dashboard: false,
                    readMore: false,
                    navbar: false,
                    tagbar: false
                },
                user: {
                    loggedIn: false,
                    name: '',
                    email: ''
                },
                article: {
                    id: '',
                    title: '',
                    content: '',
                    image: '',
                    tags: []
                },
                newArticle: {
                    id: '',
                    title: '',
                    content: '',
                    image: '',
                    tags: []
                },
            }
        },
        methods: {
            toLogin() {
                this.pages.login = true
                this.pages.register = false
            },
            toRegister() {
                this.pages.login = false
                this.pages.register = true
            },
            toDashboard() {
                this.pages.navbar = true
                this.pages.dashboard = true
                this.pages.readMore = false
                this.pages.landing = false
                this.pages.tagbar = false
                this.getAllByOwner()
            },
            toReadMore() {
                this.pages.navbar = true
                this.pages.readMore = true
                this.pages.landing = false
                this.pages.dashboar = false
                this.pages.tagbar = true
            },
            toHomePage() {
                this.pages.navbar = true
                this.pages.landing = true
                this.pages.tagbar = true
                this.pages.dashboard = false
                this.pages.readMore = false
            },
            login(userForm) {
                axios
                    .post(`${baseUrl}/user/login`, {
                        email: userForm.email,
                        password: userForm.password
                    })
                    .then(user => {
                        // console.log(user);
                        userForm = {}
                        localStorage.token = user.data.token
                        localStorage.name = user.data.name
                        localStorage.id = user.data.id
                        localStorage.email = user.data.email
                        this.user.name = localStorage.name
                        
                        this.getArticles()
                        this.toHomePage()
                        this.pages.login = false
                    })
                    .catch(err => {
                        // console.log(err);
                        userForm = {}
                        Swal.fire({
                            type: 'error',
                            text: `${err.respons.data.err}`
                        })      
                    })
            },
            register(userForm) {
                // console.log('llllll');
                axios
                    .post(`${baseUrl}/user/register`,{
                        name: userForm.name,
                        email: userForm.email,
                        password: userForm.password
                    })
                    .then(user => {
                        userForm = {}
                        this.toLogin()
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            logout() {
                this.articles = []
                this.tags = []
                this.user.loggedIn = false
                this.toLogin()
            },
            getArticles() {
                let config = {
                    headers:{
                        token: localStorage.token,
                        // name: localStorage.name,
                    }
                }

                axios
                    .get(`${baseUrl}/article`, config)
                    .then(({ data }) => {
                        console.log('get', data);
                        this.articles = data
                        // console.log(data,'<=== home');
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            getAllByOwner() {
                let config = {
                    headers:{
                        token: localStorage.token,
                        id: localStorage.id
                    }
                }
                console.log('masuk <<<<<<<<<<<<<<<<')

                axios
                    .get(`${baseUrl}/article/article-owner`, config)
                    .then(({ data }) => {
                        this.articles = data
                        // console.log(this.articles, ' <<<<<<<<<<<<<<<<<<<<')
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            getTags() {
                let config = {
                    headers:{
                        token: localStorage.token,
                    }
                }
                axios
                    .get(`${baseUrl}/tag/`)
                    .then(({data}) => {
                        this.tags = data
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            onSignIn(data) {
                axios
                    .post()
                localStorage.setItem("token", data.token);
                localStorage.setItem("username", data.username);
                this.publishedListPage = false;
                this.userpage = true;
                this.isLogin = true;
                this.getArticle();
            },
            editArticle(){
                let formArticle = new FormArticle()
                formArticle.append('title', this.newArticle.title)
                formArticle.append('content', this.newArticle.content)

                // if(this.newArticle.image) {
                //     formArticle.append('fatured_image', this.newArticle.image)
                // }
                // if(this.newArticle.tags.length > 0){
                //     formArticle.append('tags', this.newArticle.tags)
                // }
                let config = {
                    headers : {
                        token: localStorage.token,
                        id: localStorage.id
                    }
                }

                axios
                    .patch(`${baseUrl}/article/${id}`, formArticle, config)
                    .then(({ data }) => {
                        this.articles = this.articles.map(el => {
                            if (el._id == this.newArticle.id){
                                el.title = data.title,
                                el.content = data.content
                                el.image = data.image
                                el.tags = data.tags
                            }
                            return el
                        })

                        this.newArticle = {}
                        //go list article
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            getEditArticle(id){
                let config = {
                    headers: {
                        token: localStorage.token,
                        id: localStorage.id
                    }
                }

                // 
                axios
                    .get(`${baseUrl}/article/${id}`, config)
                    .then(({ data }) => {
                        this.newArticle.title = data.title
                        this.newArticle.content = data.content
                        this.newArticle.image = data.image
                        this.newArticle.tags = data.tags

                        // fales kan dashboard
                        this.getTags()
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            readMoreArticle(id) {
                let config = {
                    headers: {
                        token: localStorage.token
                    }
                }
                axios
                    .get(`${baseUrl}/article/${id}`, config)
                    .then(({ data }) => {
                        this.article = data
                        //to edit readmore
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            deleteArticle(id){
                
                let config = {
                    headers: {
                        token: localStorage.token,
                        id: localStorage.id
                    }
                }

                axios
                    .delete(`${baseUrl}/article/${id}`, config)
                    .then(({ data }) => {
                        // console.log(data,'<-------');
                        this.getAllByOwner()
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            createArticle(data){

                let config = {
                    headers : {
                        token: localStorage.token,
                        id: localStorage.id
                    }
                }

                // console.log(data);
                let formArticle = new FormData()

                formArticle.append('title', data.title)
                formArticle.append('content', data.content)
                formArticle.append('image', data.image)

                // console.log(formArticle,'<================');

                axios
                    .post(`${baseUrl}/article`, formArticle, config)
                    .then(({ data }) => {
                        // console.log(data);
                        this.articles.push(data)
                        // 
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        },
        created() {

            if(localStorage.token){
                this.pages.login = false
                this.pages.register = false
                this.pages.landing = true
                this.pages.dashboard = false
                this.pages.navbar = true
                this.pages.tagbar = true
                this.getArticles()
                // localStorage.clear()
            } else {
                this.pages.login = true
            }
        },
        
    }

</script>

<style scoped>
    
</style>