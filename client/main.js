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
            article: []
        }
    },
    methods: {
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
        submitForm() {
            let title = this.title
            let content = this.text
            axios({
                method: 'POST',
                url: 'http://localhost:3000/articles/create',
                data: {
                    title,
                    content
                }
            }).then(data => {
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
            axios({
                method: 'DELETE',
                url: 'http://localhost:3000/articles/delete',
                data: {
                    id
                }
            }).then(data => {
                Swal.fire(
                    'Success',
                    'Your Article is Successfully Deleted',
                    'success'
                  )
            }).catch(err => {
                console.log(err)
            })
        },
        clickEdit(input) {
            let id = input
            axios({
                method: 'POST',
                url: 'http://localhost:3000/articles/filter',
                data: {
                    id
                }
            }).then(data => {
                // this.article.push(data.data.data)
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
            let title = this.title
            let content = this.text
            let id = this.id
            axios({
                method: 'PATCH',
                url: 'http://localhost:3000/articles/update',
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
        clearItem(){
            this.title = ''
            this.text = ''
        }
    },
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    created() {
        axios({
            method: 'GET',
            url: 'http://localhost:3000/articles/',
        }).then(data => {
            this.articles = data.data.data
            this.tempArticles = data.data.data
        }).catch(err => {
            console.log(err)
        })
    },
    watch: {
        filter(a, b) {
            let regex = new RegExp(a, 'i')
            this.articles = this.tempArticles.filter(el => regex.test(el.title))
        }
    }
})