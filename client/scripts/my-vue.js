const serverUrl = "http://localhost:3000/articles"
var miniWP = new Vue({
    el: '#vue-article',
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    data: {
        articles: [],
        filteredArticle: [],
        filter: "",
        title: "",
        content: "",
        page: "dashboard",
        edit: {
            id: "",
            eTitle: "",
            eContent: ""
        }
    },
    methods: {
        formSubmit: function() {
            const {title, content} = this
            axios.post(serverUrl, {title, content})
                .then(({data}) => {                    
                    this.articles.unshift(data)
                    this.filteredArticle.unshift(data)
                    this.page = "dashboard"
                })
                .catch(err => console.log(err))
        },
        changePage: function(pageNow) {
            this.page = pageNow
        },
        editContent: function(info) {

            this.edit.id = info.id
            this.edit.eTitle = info.eTitle
            this.edit.eContent = info.eContent
            this.page = "editpage"
        },
        sendEdit: function() {
            axios.patch(`${serverUrl}/${this.edit.id}`, {
                    title: this.edit.eTitle,
                    content: this.edit.eContent
            })
                .then(() => {
                    console.log("content successfully updated")
                    return axios.get(serverUrl)
                })
                .then(({data}) => {
                    this.articles = data
                    this.filteredArticle = data
                    this.page = "dashboard"
                })
                .catch(err => console.log(err))
        },
        deleteArticle: function(_id) {
            axios.delete(`${serverUrl}/${_id}`)
                .then(() => {
                    this.articles = this.articles.filter(el => el._id !== _id)
                    this.filteredArticle = this.filteredArticle.filter(el => el._id !== _id)
                })      
                .catch(err => console.log(err))    
        },
        fileHandler: function() {
            
        }
    },
    watch: {
        filter: function(newStr, oldStr) {
            let similarStr = new RegExp(newStr, 'i')
            this.filteredArticle = this.articles.filter(art => similarStr.test(art.title))
        }
    },
    created: function() {
        axios.get(serverUrl)
        .then(({data}) => {
            this.articles = data
            this.filteredArticle = data
        })
        .catch(err => console.log(err))
    }

})