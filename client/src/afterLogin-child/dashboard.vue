<template>
    <div class= "container-fluid">
        <h2 class=" pt-4 pb-4"><b>Hello, {{name}}</b></h2>
        <div class = "row">
            <div class = "col-sm">
                <h4>Newest Story</h4>
                <div class = "card mt-4 ml-5 mb-5 " style="background-color: rgba(218, 216, 216, 0.671);">
                        <div class = "mt-4 ml-4 column" v-for="post in posts" :key="post._id">
                            <div class = "row  mb-4">
                                <div class = "col-sm mt-1 ml-1">
                                    <img v-bind:src="post.image" height="200px">
                                </div>
                                <div class = "col-sm  pr-4 mr-4">
                                    <h5>{{ post.title }}</h5>
                                    <h6>By : {{post.user}}</h6>
                                    <span class = "mt-4" v-html=post.content.slice(0,100)>
            
                                    </span>
                                    <a href="#" @click="readmore(post._id)">Read more..</a>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            

            <div class = "col-sm-8">
                <h4>All Story</h4>
                <div class = "card-body">
                    <form>
                        <input type="search" style = "width:100%; height:40px" placeholder="Search by authors or title..." v-model = "search">
                    </form>
                </div>
                <div class = "column mt-4 pb-4" v-for="post in filteredList" :key="post._id" >
                    <div class = "card" style="background-color : rgba(218, 216, 216, 0.671)" >
                        <div class = "row" >
                            <div class = "col-sm">
                                <div class = "mt-3 pl-5 mr-5 mb-4 pb-4">
                                    <center><h2>{{post.title}}</h2></center>
                                    <center><img class="mb-4" v-bind:src="post.image"></center>
                                    <center><h6>By: {{post.user}}</h6></center>
                                    <span v-html=post.content.slice(0,500)>
                                       
                                    </span><br>
                                     <a href="#" @click="readmore(post._id)">Visit story...</a>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>  
    </div>

</template>


<script>
var baseUrl = 'http://localhost:3000/api'
export default {
    data(){
        return{
            name : "",
            posts : [],
            allposts: [],
            search:""
        }
    },
    created(){
        this.axios.get(baseUrl+'/users/',{
            headers : {
                token : localStorage.getItem('token')
            }
        })
        .then(({data})=>{
            console.log(data);
            this.name = data.name
            return this.axios.get(baseUrl+'/articles/home',{
            headers : {
                token : localStorage.getItem('token')
                }
            })
        })
        .then(({data})=>{
            console.log(data);
            data.forEach(e=>{
                if(e.user){
                    e.user = e.user.name
                }
                if(!e.image){
                    e.image = "../img/3e214c382e5db32f871b30f826a286ed.jpg"
                }
            console.log('ini data setelahnya');
            })
            this.posts = data
            return this.axios.get(baseUrl+'/articles/all-articles',{
            headers : {
                token : localStorage.getItem('token')
                }
            })
        })
        .then(({data})=>{
            data.forEach(e=>{
                if(e.user){
                    e.user = e.user.name
                    if(!e.image){
                        e.image = "../img/f43d9080d6f85a742fb5a0f3b13b6a3e.jpg"
                    }
                }
            })
            this.posts = data
            this.allposts = data
            console.log(allposts);
        })
        .catch(err=>{
            console.log(err);
        })

        
    },
    methods:{
        readmore(id){
            // alert(JSON.stringify({id,page:"readmore"}))
            this.$emit('readmoree',{id,page:"readmore"})

        }
    }

    ,computed: {
        filteredList() {
            return this.allposts.filter(item => {
            return (item.title.toLowerCase().includes(this.search.toLowerCase()) || item.user.toLowerCase().includes(this.search.toLowerCase()) )
            })
        }
    }
    
}
</script>


<style scoped>

</style>