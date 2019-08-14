
new Vue ({
    el: "#app",
    components: {
        wysiwyg: vueWysiwyg.default.component,
      },
    data: {
        isWrite: false,
        isArticle: true,
        isContent: false,
        isEdit: false,
        isTop: true,
        isLogin: false,
        isRegister: false,
        email: '',
        username: '',
        password: '',
        editTitle: '',
        editContent: '',
        editId: '',
        content: '',
        showContent: '',
        showTitle: '',
        title: '',
        articles: [],
        message: 'halo',
        tempArticles: [],
        filter: '',
    },
    methods: {
        onWrite() {
            this.isWrite = true
            this.isArticle = false
        },
        onArticle() {
            this.isWrite = false
            this.isEdit = false
            this.isArticle = true
        },

        show(input) {
            this.showContent = input.content
            this.showTitle = input.title
            this.isContent = true
            this.isArticle = false
            this.isTop = false
        },

        back() {
            this.isContent = false;
            this.isArticle = true
            this.isTop = true
        },

        onEdit(input) {
            this.isArticle = false,
            this.isEdit = true
            this.editId = input._id
            this.editTitle = input.title
            this.editContent = input.content
        },
        login() {
            axios.post('http://localhost:3000/users/signin', {
                username: this.username,
                password: this.password
            }).then(data=>{
                localStorage.setItem('token', data.data.token) 
            })  
            Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Login success',
                showConfirmButton: false,
                timer: 1500
              })
            this.isLogin = true
        },

        onSignIn(googleUser) {
            const idToken = googleUser.getAuthResponse().id_token
        },

        logout() {
            localStorage.removeItem('token')
            this.isLogin = false
        },

        onRegister() {
            this.isRegister = true
        },

        register() {
            axios.post('http://localhost:3000/users/register', {
                username: this.username,
                email : this.email,
                password: this.password
            })
            .then(data => {
                Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: 'Register Success',
                    showConfirmButton: false,
                    timer: 1500
                  })
                this.isRegister = false
            })
        },

        createArticle(){
            let token = localStorage.getItem('token')
            // console.log(token)
            axios.post('http://localhost:3000/articles', {
                    title: this.title,
                    content: this.content
                }, {
                    headers: {token} 
                }
             )
            .then(data => {
                console.log(data)
                Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: 'Article has been saved',
                    showConfirmButton: false,
                    timer: 1500
                  })
                this.onArticle()
            })
            .catch(function(err) {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href>Why do I have this issue?</a>'
                  })
            })
        },

        editArticle() {
            let id = this.editId
            axios.patch(`http://localhost:3000/articles/${id}`, {
                title: this.editTitle,
                content: this.editContent
            })
            .then(data => {
                Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: 'Article update success',
                    showConfirmButton: false,
                    timer: 1500
                  })
                this.onArticle()
            })
            .catch(function(err) {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href>Why do I have this issue?</a>'
                  })
            })
        },

        deleteArticle(input) {
            let id = input._id
            axios.delete(`http://localhost:3000/articles/${id}`)
            .then(function(data) {
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
                      Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )
                    }
                  })
            })
            .catch(function (err) {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href>Why do I have this issue?</a>'
                  })
            })
        }
    },
    created() {
        let token = localStorage.getItem('token')
        axios.get('http://localhost:3000/articles', {headers: {token}})
        .then(data => {
            this.articles = data.data
            this.tempArticles = data.data
            this.isLogin = false
        })
    },
    watch: {
        filter(a, b) {
            let regex = new RegExp(a, 'i')
            this.articles = this.tempArticles.filter(el => regex.test(el.title))
        }
    }
})