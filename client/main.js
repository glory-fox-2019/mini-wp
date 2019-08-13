new Vue({
    el: '#app',
    data() {
        return {
            isWrite: false,
            isBody: true,
            editor: null,
            articles: [],
            title: '',
            text: '',
            tempArticles: [],
            filter: ''
        }
    },
    methods: {
        checkWrite() {
            this.isWrite = true
            this.isBody = false
        },
        checkBody() {
            this.isWrite = false
            this.isBody = true
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
                console.log(data)
            }).catch(err => {
                console.log(err)
            })
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
        filter(a,b){
            let regex = new RegExp(a,'i')
            this.articles = this.tempArticles.filter(el => regex.test(el.title))
        }
    }
})