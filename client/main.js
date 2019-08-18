
new Vue ({
    el: "#app",
    components: {
        wysiwyg: vueWysiwyg.default.component,
      },
    data: {
        isTop: true,
        isLogin: false,
        isRegister: false,
        all: [],
        page: '',
        email: '',
        name: '',
        password: '',
        editTitle: '',
        editContent: '',
        editId: '',
        content: '',
        showContent: '',
        showTitle: '',
        title: '',
        articles: [],
        image: '',
        message: 'halo',
        tempArticles: [],
        filter: '',
    },
    methods: {
        onWrite() {
            // this.isWrite = true
            // this.isArticle = false
            // this.onallArticle = false
            this.page = 'write'
        },
        onArticle() {
            // this.isWrite = false
            // this.isEdit = false
            // this.onallArticle = false
            // this.isArticle = true
            this.page = 'myArticle'
        },

        onallArticle() {
            // this.isWrite = false
            // this.isEdit = false
            // this.isArticle = false
            // this.allArticle = true
            this.page = 'home'
        },

        show(input) {
            this.showContent = input.content
            this.showTitle = input.title
            // this.isContent = true
            // this.isArticle = false
            this.isTop = false
            this.page = 'content'
        },

        back() {
            // this.isContent = false;
            // this.isArticle = true
            this.isTop = true
            this.page = 'home'
        },

        onEdit(input) {
            // this.isArticle = false,
            // this.isEdit = true
            this.editId = input._id
            this.editTitle = input.title
            this.editContent = input.content
            this.page = 'edit'
        },
        login() {
            axios.post('http://localhost:3000/users/signin', {
                email: this.email,
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
            this.page = 'myArticle'
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
                name: this.name,
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
            let { image } = this
            var bodyFormData = new FormData()
            bodyFormData.append('image', image[0])
            console.log(bodyFormData)
            
            axios.post('http://localhost:3000/images/upload', bodyFormData, {
                headers: {token}
            })
            .then(({data}) => {
                axios.post('http://localhost:3000/articles', {
                    title: this.title,
                    content: this.content,
                    image: data.link
                }, {
                    headers: {token} 
                })
            .then(result => {
                this.articles.unshift(result)
                this.allArticles.unshift(result)
                Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: 'Article has been saved',
                    showConfirmButton: false,
                    timer: 1500
                  })
                this.page = 'myArticle'
            })
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

        previewFile() {
            this.image = this.$refs.myFiles.files
        },

        editArticle() {
            let token = localStorage.getItem('token')
            let id = this.editId
            axios.patch(`http://localhost:3000/articles/${id}`, {
                title: this.editTitle,
                content: this.editContent,
                articleId : this.editId
            }, {headers: {token}})
            .then(data => {
                Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: 'Article update success',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  this.page = 'myArticle'
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
            let token = localStorage.getItem('token')
            let id = input._id
            axios.delete(`http://localhost:3000/articles/${id}`, {headers: {token}})
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
                    this.onArticle()
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
    // created() {
    //     let token = localStorage.getItem('token')
    //     axios.get('http://localhost:3000/articles', {headers: {token}})
    //     .then(data => {
    //         this.articles = data.data
    //         this.isLogin = false
    //     })
    // },

    created() {
        let token = localStorage.getItem('token')
        axios.get('http://localhost:3000/articles/all', {headers: {token}})
        .then(data => {
            this.all = data.data
            this.tempArticles = data.data
            axios.get('http://localhost:3000/articles', {headers: {token}})
            .then(data2 => {
            this.articles = data2.data
            this.isLogin = false
        })
        })
    },

    watch: {
        filter(a, b) {
            let regex = new RegExp(a, 'i')
            this.articles = this.tempArticles.filter(el => regex.test(el.title))
        }
    }
})