<template>

    <div>
        <Login
            :pages="pages.login"
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
            :dashboard="pages.dashboard"
            @create-article="createArticle"
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
    import Swal from 'sweetalert';

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
                    featured_image: '',
                    tags: []
                },
                newArticle: {
                    id: '',
                    title: '',
                    content: '',
                    featured_image: '',
                    tags: []
                },
            }
        },
        methods: {
            toLogin() {
                this.pages.login = true
                this.pages.register = false
                this.pages.dashboard = false
                this.pages.landing = false
                this.pages.readMore = false
                this.pages.navbar = false
                this.pages.tagbar = false
            },
            toRegister() {
                this.pages.login = false
                this.pages.register = true
                this.pages.dashboard = false
                this.pages.landing = false
                this.pages.readMore = false
                this.pages.navbar = false
                this.pages.tagbar = false
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
                        this.user.loggedIn = true
                        // this.getTags()
                        // this.getArticles()
                        this.toHomePage()
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
            onSignin(userGoogle) {
                const token = userGoogle.getAuthResponse().id_token
                let config = { headers: { token } }

                axios
                    .post(`${baseUrl}/user/googlesignin`)
                    .then(({ data })=> {
                        localStorage.token = data.token
                        localStorage.name = data.name
                        this.user.name = data.name
                        this.user.loggedIn = true
                        this.toHomePage()
                    })
                    .catch(err => {
                        console.log(err);
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
            createArticle(data){
                let formArticle = new FormData()
                formArticle.append('title', data.title)
                formArticle.append('content', data.content)

                console.log(formArticle.tags);

                if(data.featured_image){
                    this.getTags()
                    formArticle.append('featured_image', this.newArticle.featured_image)
                }
                if(data.tags.length>0){
                    formArticle.append('tags', JSON.stringify(this.newArticle.tags))
                }

                let config = {
                    headers: {
                        token: localStorage.token
                    }
                }
                axios
                    .post(`${baseUrl}/article`, formArticle, config)
                    .then(({ data }) => {
                        // this.getTags()
                        this.articles.push(data)
                        this.toDashboard()
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            editArticle(){
                let formArticle = new FormArticle()
                formArticle.append('title', this.newArticle.title)
                formArticle.append('content', this.newArticle.content)

                if(this.newArticle.featured_image) {
                    formArticle.append('fatured_image', this.newArticle.featured_image)
                }
                if(this.newArticle.tags.length > 0){
                    formArticle.append('tags', this.newArticle.tags)
                }
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
                                el.featured_image = data.featured_image
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
                        this.newArticle.featured_image = data.featured_image
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
                // Swal.fire({
                //     title: 'Are you sure ?',
                //     text: 'you wont be able to revet this!',
                //     type: 'warning',
                //     showCancelButton: true,
                //     confirmButtonColor: '#3085d6',
                //     cancelButtonColor: '#d33',
                //     confirmButtonText: 'Yes, delete it!'
                // })
                // .then( result => {
                //     if(result.value){
                //         let config = {
                //             headers: {
                //                 token: localstorage.token,
                //                 id: localStorage.id
                //             }
                //         }

                //     }
                // })
                let config = {
                    headers: {
                        token: localStorage.token,
                        id: localStorage.id
                    }
                }

                axios
                    .delete(`${baseUrl}/article/${id}`, config)
                    .then(({ data }) => {
                        console.log(data,'<-------');
                        // this.articles.filter(el=> el !== data._id)
                        this.getAllByOwner()
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },

        },
        mounted() {

            if(localStorage.token){
                this.pages.login = false
                this.pages.register = false
                this.pages.landing = true
                this.pages.dashboard = false
                this.pages.readMore = false
                this.pages.navbar = true
                this.pages.tagbar = true
                this.getArticles()
                // localStorage.clear()
            }
            else {
                this.pages.login = true
                this.pages.register = false
                this.pages.dashboard = false
                this.pages.landing = false
                this.pages.readMore = false
                this.pages.navbar = false
            }
        },
        
    }

</script>

<style scoped>
    
</style>