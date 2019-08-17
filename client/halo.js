new Vue({
    el: '#app',
    data() {
        return {
            isWrite: false,
            isBody: true,
            isEdit: false,
            editor: null,
            articles: [],
            title: '',
            text: '',
            tempArticles: [],
            filter: '',
            article: [],
            home: false,
            login: false,
            signup: false,
            emailLogin: '',
            emailSignup: '',
            passwordLogin: '',
            passwordSignup: '',
            nameSignup: '',
            afterin: false,
            berforein: false,
            file: ''
        }
    },
    methods: {
        getArticles(){
            let token = localStorage.getItem('token')
            axios({
                method: 'GET',
                url: 'http://localhost:3000/articles/',
                headers: {
                    token
                }
            }).then(data => {
                this.articles = data.data.data
                this.tempArticles = data.data.data
            }).catch(err => {
                console.log(err)
            })
        },
        checkWrite() {
            this.isWrite = true
            this.isBody = false
            this.isEdit = false
            this.title = ''
            this.text = ''
        },
        checkBody() {
            this.isWrite = false
            this.isBody = true
            this.isEdit = false
            this.title = ''
            this.text = '',
                this.id = ''
        },
        handlefileupload(event) {
            let file = event.target.files || event.dataTransfer.files;
            this.file = file[0]

        },
        submitForm() {
            let token = localStorage.getItem('token')
            let formData = new FormData()
            formData.set('file', this.file)
            formData.set('title', this.title)
            formData.set('content', this.text)
            axios({
                method: 'POST',
                url: 'http://localhost:3000/articles/create',
                headers: {
                    token
                },
                data: formData
            }).then(data => {
                this.isWrite = false
                this.isBody = true
                this.isEdit = false
                let response = data.data.data
                this.articles.unshift(response)
                Swal.fire(
                    'Success',
                    'Your Article is Successfully Submitted',
                    'success'
                )

            }).catch(err => {
                console.log(err)
            })
        },
        deleteItem(input) {
            let id = input
            let token = localStorage.getItem('token')
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    axios({
                        method: 'DELETE',
                        url: `http://localhost:3000/articles/delete/${id}`,
                        headers: {
                            token
                        }
                    }).then(data => {
                        this.articles = this.articles.filter(el => el.id !== id);
                        this.getArticles()
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    }).catch(err => {
                        console.log(err)
                    })
                }
            }).catch(err => {
                console.log(err)
            })
        },
        clickEdit(input) {
            let id = input
            axios({
                method: 'POST',
                url: `http://localhost:3000/articles/filter/${id}`,
                headers: {
                    token
                }
            }).then(data => {
                this.title = data.data.data.title
                this.text = data.data.data.content
                this.id = data.data.data._id
                this.isWrite = false
                this.isBody = false
                this.isEdit = true
            }).catch(err => {
                console.log(err)
            })


        },
        editItem(input) {
            let token = localStorage.getItem('token')
            let title = this.title
            let content = this.text
            let id = this.id
            axios({
                method: 'PATCH',
                url: 'http://localhost:3000/articles/update',
                headers:{
                    token
                },
                data: {
                    id,
                    title,
                    content
                }
            }).then(data => {
                Swal.fire(
                    'Success',
                    'Your Article is Successfully Edited',
                    'success'
                )
                this.title = ''
                this.text = ''
                this.id = ''
                this.isWrite = false
                this.isBody = true
                this.isEdit = false
            }).catch(err => {
                console.log(err)
            })
        },
        clearItem() {
            this.title = ''
            this.text = ''
        },
        clickHome() {
            this.home = true
            this.login = false
            this.signup = false
        },
        clickSignIn() {
            this.home = false
            this.login = true
            this.signup = false
        },
        clickSignUp() {
            this.home = false
            this.login = false
            this.signup = true
        },
        signOut() {
            localStorage.removeItem('token')
            let auth2 = gapi.auth2.getAuthInstance()
            auth2.signOut().then(function () {
                console.log('User signed out.');
            });
        },
        signIn() {
            let email = this.emailLogin
            let password = this.passwordLogin
            axios({
                url: 'http://localhost:3000/users/signin',
                method: 'POST',
                data: {
                    email,
                    password
                }
            }).then(data => {
                Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: 'Successfully login',
                    showConfirmButton: false,
                    timer: 1500
                })
                localStorage.setItem('token', data.data.token)
                this.afterin = true
                this.beforein = false
            }).catch(err => {
                console.log(err)
            })
        },
        gsignin(googleUser) { 
            let idToken = googleUser.getAuthResponse().id_token;
            axios({
                method: 'POST',
                url: 'http://localhost:3000/users/Gsignin',
                data: {
                    idToken
                }
            }).then(data => {
                console.log(data)
                Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: 'Successfully login',
                    showConfirmButton: false,
                    timer: 1500
                })
                localStorage.setItem('token', data.token)
                this.afterin = true
                this.beforein = false
            })
        },
        register() {
            let email = this.emailSignup
            let password = this.passwordSignup
            let name = this.nameSignup
            axios({
                method: 'POST',
                url: 'http://localhost:3000/users/register',
                data: {
                    email,
                    password,
                    name
                }
            }).then(data => {
                Swal.fire({
                    position: 'top-center',
                    type: 'success',
                    title: 'Your Data is Registered',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.home = false
                this.login = true
                this.signup = false
            }).catch(err => {
                console.log(err)
            })
        },
    },
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    created() {
        if(localStorage.token){
            this.getArticles()
            this.home = false
            this.beforein = false
            this.afterin = true
        } else {
            this.home = true
            this.beforein = true
        }
    },
    watch: {
        filter(a, b) {
            let regex = new RegExp(a, 'i')
            this.articles = this.tempArticles.filter(el => regex.test(el.title))
        }
    }
})