const baseUrl = 'http://localhost:3000/mini-wp'

const app = new Vue({
    el: '#app',
    data: {
        message: 'hello',
        editDashboard: 'Edit your article',
        nav: true,
        cardList2: false,
        sideNav: true,
        dashboardCreate: false,
        dashboardEdit: false,
        container: false,
        isPublic: true,
        isLogin: false,
        formCreateArticle: {
            title: '',
            content: '',
        },
        formEditArticle: {
            id: '',
            title: '',
            content: ''
        },
        article: [],

    },


    methods: {
        toHome() {
            this.cardList2 = false
            this.sideNav = false
            this.dashboardCreate = false
            this.dashboardEdit = false
            this.container = true
        },
        toDashboard() {
            this.cardList2 = true
            this.sideNav = true
            this.container = false
        },
        toCreateArticle() {
            this.dashboardCreate = true
            this.dashboardEdit = false
            this.cardList2 = false

        },
        toMyArticle() {
            this.cardList2 = true
            this.dashboardCreate = false
            this.dashboardEdit = false
        },
        toEditArticle() {
            this.cardList2 = false
            this.dashboardCreate = false
            this.dashboardEdit = true
        },
        dasb() {
            this.isPublic = false
        },
        das() {
            this.isPublic = true
        },
        createArticle() {

            let { title, content } = this.formCreateArticle
            // console.log(this.formCreateArticle, 'masuk create article');
            axios({
                method: 'post',
                url: baseUrl + '/article/create',
                data: {
                    title, content
                }
            })
                .then(({ data }) => {
                    this.dashboardCreate = false
                    this.cardList2 = true

                    this.article.push(data) // update tanpa render
                    
                    console.log(data);
                })
                .catch(err => {
                    console.log(err);
                })
        },
        deleteArticle(id) {
            // console.log(id)
            axios({
                method: 'delete',
                url: baseUrl + '/article/' + id
            })
                .then(({ data }) => {
                    console.log(data);
                    this.article = this.article.filter(el=> el._id !== data._id) // mengambildata ulang yang tidak di delete

                    // this.cardList2 = true
                    // this.sideNav = false // ------------------------------------------- jangan lupa nanati di ubah
                    
                    // console.log(data);
                })
                .catch(err => {
                    console.log(err);
                })
        },
        fecthArticle(id) {
            axios({
                method: 'get',
                url: baseUrl + '/article/' + id
            })
                .then(({ data }) => {
                    this.formEditArticle = { id: data._id, title: data.title, content: data.content } 
                    // console.log(data);
                    this.toEditArticle()
                })
                .catch(err => {
                    console.log({ msg: err });
                })
        },
        editArticle(id) {
            // console.log(this.formEditArticle.id);
            axios({
                method: 'patch',
                url: baseUrl + '/article/' + id,
                data: this.formEditArticle
            })
                .then(({ data }) => {
                    this.toMyArticle()
                    // this.fecthArticle()
                    // console.log(data);
                })
                .catch(err => {
                    console.log(err)
                    // console.log({ msg: err });
                })
        }

    },
    created() {

        axios({
            method: 'get',
            url: baseUrl + '/article/list'
        })
            .then(({ data }) => {
                this.article = data
            })
            .catch(err => {
                console.log(err, 'error dari fetch data');
            })
    },

    components: {
        wysiwyg: vueWysiwyg.default.component,
    }
})
