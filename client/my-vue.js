var miniWP = new Vue({
    el: '#vue-article',
    data: {
        articles: [],
        filteredArticle: [],
        filter: ""
    },
    watch: {
        filter: function(newStr, oldStr) {
            let similarStr = new RegExp(newStr, 'i')
            this.filteredArticle = this.articles.filter(art => similarStr.test(art.title))
        }
    },
    created: function() {
        axios.get('http://localhost:3000/articles')
            .then(({data}) => {
                console.log(data)
                this.articles = data
                this.filteredArticle = data
            })
            .catch(err => console.log(err))
    }
})