new Vue ({
    el: "#app",
    components: {
        wysiwyg: vueWysiwyg.default.component,
      },
    data: {
        isWrite: false,
        isArticle: true,
        isContent: false,
        content: "",
        title: "",
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
            this.isArticle = true
        },
        onContent() {
            this.isContent = !this.isContent
        },
        createArticle(){
            axios.post('http://localhost:3000/articles', {
                title: this.title,
                content: this.content
            })
            .then(function (data) {
                console.log('create success')
                onArticle()
            })
            .catch(function(err) {
                console.log(err.message)
            })
        }
    },
    created() {
        axios.get('http://localhost:3000/articles')
        .then(data => {
            this.articles = data.data
            this.tempArticles = data.data
        })
    },
    watch: {
        filter(a, b) {
            let regex = new RegExp(a, 'i')
            this.articles = this.tempArticles.filter(el => regex.test(el.title))
        }
    }
})