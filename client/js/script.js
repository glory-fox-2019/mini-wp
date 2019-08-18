
var baseUrl = "http://localhost:3000/api"
var app = new Vue({
    el: '#app',
    components: {
        wysiwyg: vueWysiwyg.default.component,
      },
    data: {
      isLogin : false,
      loginForm : true,
      story : false,
      firstPage : true,
      create : false,
      updatePage : false,
      inputTitle : "",
      items : [],
      search : "",
      updateId : "",
      inputContent : "",
      file :  ""
     
    }

     ,methods : {
        registerForm(){
            this.loginForm = false;
        },
        loginFormBack(){
            this.loginForm = true;
        },
        login(){
            //login
            //validasi
                this.isLogin = true;
                this.toHome()
        },
        logout(){
            localStorage.clear()
            this.isLogin = false;
        },

        register(){
            //axios
            this.loginForm = true;

        },          

        toStory(){
            this.story = true
            this.create = false
            this.firstPage = false
            this.updatePage = false

        },

        toHome(){
            this.story = false;
            this.create = false;
            this.updatePage = false;
            this.firstPage = true;
        },

        toCreate(){
            this.create = true
            this.story = false
            this.firstPage = false;
            this.inputTitle = ""
            this.inputContent = ""

        },
        createArticle(){
            axios.post(baseUrl+'/articles',{
                title : this.inputTitle,
                content : this.inputContent
            })
            .then( ({data}) => {
                this.items.unshift(data)
                console.log(data);
              })
            .catch(function (error) {
                console.log(error);
              });
              this.inputTitle = ""
              this.inputContent = ""
              this.toStory()
            
        },

        removeElement(index) {
            console.log(index);
            axios.delete(baseUrl+'/articles/'+index)
            .then(data=>{
                console.log(data);
            })
            .catch(err=>{
                console.log(err);
            })
            this.items = this.items.filter(e=>e._id != index)
        },
        
        editElement(id){
            axios.get(baseUrl+'/articles/'+id)
            .then(({data})=>{
                console.log(data.content);
                console.log(data.title);
                this.inputContent = data.content
                this.inputTitle = data.title
                this.updateId = data._id
                this.toUpdate()
            })
            .catch(err=>{
                console.log(err);
            })
        },

        toUpdate(){
            this.updatePage = true
            this.create = false
            this.story = false
            this.firstPage = false;
        },

        updateArticle(){
            console.log(this.updateId);
           axios.patch(baseUrl+'/articles/'+this.updateId,{
               title : this.inputTitle,
               content : this.inputContent
           })
           .then(({data})=> {
                console.log(data)
                for (let i = 0; i < this.items.length; i++) {
                    if(this.items[i]._id === this.updateId){
                        this.items[i].title = this.inputTitle
                        this.items[i].content = this.inputContent
                        console.log('view is up to date');
                        break;
                    }
                }
                this.inputTitle = ""
                this.inputContent = ""
                this.updateId = ""
                this.toStory()
            })
           .catch(err=> console.log(err))
        },

        onSelectImage(){
            const file = this.$refs.file.files[0];
            this.file = file
        },

        async onSubmitImage(){
            const formData = new FormData()
            formData.append('file',this.file)
            try{
                await axios.post(baseUrl+'/articles/upload',formData)
                console.log('UPLOADEDDDDD');

            }catch(err){
                console.log(err);
            }
            
        }
    },

    created(){
        axios.get(baseUrl+'/articles/')
        .then(({data}) => {
            console.log(data);
            this.items = data
            console.log(this.items);
        
        })
        .catch(function (error) {
            console.log(error);
          });
        
     },

     computed: {
        filteredList() {
          return this.items.filter(item => {
            return item.title.toLowerCase().includes(this.search.toLowerCase())
          })
        }
      }

  })