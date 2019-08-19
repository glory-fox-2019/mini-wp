

const app = new Vue({
    
    el: '#app',
    data: {
        message: 'Hello Vue!',
        showInput1 : false,
        showCreate : false,
        editor: ClassicEditor,
        editorData: '<p>Content of the editor.</p>',
        editorConfig: {
            // The configuration of the editor.
        },
        onPage : 'home',
        title : '',
        text : '',
        image : '',
        articles : [],
        email : '',
        password : '',
        editedTitle : '',
        editedText : '',
        editedId : ''
    },
    methods : {
        // homeP
        showLogin(){
            this.onPage = 'login'
        },
        showCreateFn(){
            this.onPage = 'add-article'
        },
        addToServer(){
            // import axios from "axios";
            let {  title ,  text ,  image } = this
            axios.post('http://localhost:3000/api/article',{
                title , text , image
            })
            .then(data=>{
                console.log('berhasil')
                this.onPage = 'home'
            })
            .catch(err=>{
                console.log(err)
            })
            
        },
        login(){
            let { email , password  } = this
            axios.post('http://localhost:3000/api/user/login',{
                email ,  password
            })
            .then(({data})=>{
                this.onPage = 'home'
                console.log(data)
                localStorage.setItem('token',  data.token)
            })
            .catch(err=>{
                console.log(err)
            })
        },
        findArticle(id){
            axios.get(`http://localhost:3000/api/article/${id}`)
            .then(({data})=>{
                console.log(data)
                // this.articles = data
                this.title = data.title
                this.text = data.text
                this.editedId = data._id
                this.onPage = 'editForm'
            })
            .catch(err=>{
                console.log(err)
            })
        },
        updateArticle(id){
            console.log(id)
            let { title, text } = this
            axios.put(`http://localhost:3000/api/article/${id}`,{
                title , text
            })
            .then(({data})=>{
              return  axios.get('http://localhost:3000/api/article')
            })
            .then(({data})=>{
                console.log(data)
                this.articles = data
                this.onPage = 'home'
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },
    computed : {
        jalanoe(){
            return this.image + ' ' + this.text
        }
    },
    created() {
        // import axios from "axios";
        axios.get('http://localhost:3000/api/article')
        .then(({data})=>{
            console.log(data)
            this.articles = data
        })
        .catch(err=>{
            console.log(err)
        })
        // console.log(this)
    }
    
})
// import CKEditor from '@ckeditor/ckeditor5-vue';
Vue.use( CKEditor );