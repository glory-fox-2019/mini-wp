const url = `http://localhost:3000`

var app = new Vue({
    el: '#app',
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    data: {
        signInEmail: '',
        signInPassword: '',

        signUpName: '',
        signUpEmail: '',
        signUpPassword: '',

        articlesFeeds: [],
        articleInfo: {},
        articleEdited: {},

        username: '',

        newArticleTitle: '',
        newArticleContent: '',

        editedArticleTitle: '',
        editedArticleContent: '',
        editedArticleId: '',

        islogin: false,
        homeForm: true,
        signInForm: false,
        signUpForm: false,

        editForm: false,
        articleForm: false,
        articleList: false,
        myArticle: false,
        createNew: false,
    },
    methods: {
        createUser: function () {
            let data = {
                name: this.signUpName,
                email: this.signUpEmail,
                password: this.signUpPassword
            }
            axios({
                url: `${url}/users`,
                method: 'post',
                data
            })
                .then(data => {
                    this.homeForm = true;
                    this.signUpForm = false;
                    Swal.fire('Oops...', 'Register Success', 'success')
                })
                .catch(err => {
                    console.log(err)
                })
        },
        postNewArticle: function () {
            let token = localStorage.getItem('token');
            let data = {
                title: this.newArticleTitle,
                content: this.newArticleContent
            }
            axios({
                url: `${url}/articles`,
                method: 'post',
                headers: {
                    token
                },
                data
            })
                .then(({ data }) => {
                    this.newArticleTitle = '';
                    this.newArticleContent = '';
                    this.goToMyArticles();
                    
                })
                .catch(err => {
                    console.log(err)
                })
        }
        ,
        backToHome: function () {
            this.homeForm = true;
            this.signInForm = false;
            this.signUpForm = false;
        },

        goToSignIn: function () {
            this.signInEmail = '';
            this.signInPassword = '';
            this.signInForm = true;
            this.signUpForm = false;
            this.homeForm = false;
        }
        ,
        signInUser: function () {
            let data = {
                email: this.signInEmail,
                password: this.signInPassword
            }
            axios({
                url: `${url}/users/login`,
                method: 'post',
                data
            })
                .then(({ data }) => {
                    localStorage.setItem('token', data.token)
                    this.signInForm = false;
                    this.islogin = true;
                    this.username = data.name
                })
                .catch(({ err }) => {
                    console.log(`masuk error`);
                    console.log(err.message);
                })
        }
        ,
        editMyArticle: function (id) {
            let token = localStorage.getItem('token')
            let data = {
                title: this.editedArticleTitle,
                content: this.editedArticleContent,

            }
            axios({
                url: `${url}/articles/${id}`,
                method: 'patch',
                headers: {
                    token
                },
                data
            })
                .then(({ data }) => {
                    this.editForm = false;
                    this.myArticle = true;
                    console.log(data);
                })
                .catch(err => {
                    console.log(err);
                })
        },

        goToDeleteArticle: function (id) {
            let token = localStorage.getItem('token')
            // console.log(id);
            axios({
                url: `${url}/articles/${id}`,
                method: 'delete',
                headers: {
                    token
                }
            })
                .then(() => {
                    this.articlesFeeds = this.articlesFeeds.filter(article => {
                        return article._id !== id
                    })
                    console.log(`berhasil hapus`)
                })
                .catch(err => {
                    console.log(err);
                })
        }
        ,
        goToEditArticle: function (article) {
            this.articleEdited = article;
            this.editedArticleId = article._id
            this.editForm = true;
            this.articleForm = false;
            this.articleList = false;
            this.myArticle = false;
            this.createNew = false;
        },

        goToSignUp: function () {
            this.signUpName = '';
            this.signUpEmail = '';
            this.signUpPassword = '';
            this.signInForm = false;
            this.signUpForm = true;
            this.homeForm = false;
        },

        goToMyArticles: function () {
            let token = localStorage.getItem('token');
            axios({
                url: `${url}/articles`,
                method: 'get',
                headers: {
                    token
                }
            })
                .then(({ data }) => {
                    this.articlesFeeds = data;
                    this.editForm = false;
                    this.articleList = false;
                    this.createNew = false;
                    this.articleForm = false;
                    this.myArticle = true;
                })
                .catch(err => {
                    console.log(err);
                })
        },
        goToArticle: function (id) {
            let token = localStorage.getItem('token');
            axios({
                url: `${url}/articles/${id}`,
                method: 'get',
                headers: {
                    token
                }
            })
                .then(({ data }) => {
                    this.editForm = false;
                    this.articleInfo = data;
                    this.articleForm = true;
                    this.myArticle = false;
                    this.articleList = false;
                    console.log(data)
                })
                .catch(err => {
                    console.log(err);
                })
        }
        ,
        goToArticleFeeds: function () {
            let token = localStorage.getItem('token');
            axios({
                url: `${url}/articles/all`,
                method: 'get',
                headers: {
                    token
                }
            })
                .then(({ data }) => {
                    this.editForm = false;
                    this.articlesFeeds = data
                    this.myArticle = false;
                    this.articleList = true;
                    this.createNew = false;
                    this.articleForm = false;
                })
                .catch(err => {
                    console.log(err)
                })

        },

        goToNewArticle: function () {
            this.editForm = false;
            this.articleForm = false;
            this.myArticle = false;
            this.articleList = false;
            this.createNew = true;
        },

        logout: function () {
            localStorage.removeItem('token')
            this.editForm = false;
            this.islogin = false;
            this.myArticle = false;
            this.articleList = false;
            this.createNew = false;
            this.articleForm = false;
            this.homeForm = true
        },
    },
    created: function () {
        if (localStorage.getItem('token')) {
            this.islogin = true;
            this.homeForm = false;
        }

    }
})