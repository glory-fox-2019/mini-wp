const app = new Vue ({
    el: '#app',
    data: {
        message: 'hello',
        editDashboard: 'Edit your article', 
        nav: true,
        cardList2 : false,
        dashboardNav: true,
        dashboardEdit: true,
        container: false,
        isPublic : true,
    },


    methods: {
        toHome(){
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
            
        }

        

    },

    components: {
        wysiwyg: vueWysiwyg.default.component,
    }
})
