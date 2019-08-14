const app = new Vue({
    el: '#app',
    data: {
        message: 'hello',
        editDashboard: 'Edit your article',
        nav: true,
        cardList2: false,
        dashboardNav: true,
        dashboardEdit: true,
        container: false,
        isPublic: true,
        isLogin: false,
    },


    methods: {
        toHome() {
            this.cardList2 = false
            this.dashboardNav = false
            this.dashboardEdit = false
            this.container = true
        },
        toDashboard() {
            this.cardList2 = true
            this.dashboardNav = true
            this.container = false
        },
        toMyArticle() {
            this.cardList2 = true
            this.dashboardEdit = false
        },
        toEditArticle() {
            this.cardList2 = false
            this.dashboardEdit = true
        },
        dasb() {
            this.isPublic = false
        },
        das() {
            this.isPublic = true
        },
        createArticle() {

            let { title, content, } = req.body

            axios({
                    method: 'post',
                    url: 'http:/localhost:3000/article/create',
                    data: {
                        title, content
                    }
                })
                .then(data => {
                    console.log(data);
                })
                .catch(err => {
                    console.log(err);
                })
        }



    },

    components: {
        wysiwyg: vueWysiwyg.default.component,
    }
})
