<template>
        <div class = "row">
            <div class = "col-sm">
                <div class = "column mt-4" >
                    <div class = "card mb-4" style="background-color : rgba(218, 216, 216, 0.198)">
                        <div class = "row">
                            <div class = "col-sm mr-5 mb-5 ml-5 mt-5" >
                                <div class = "card mb-4">
                                    <div class = "card-body">
                                        <h5 class="card-title"><a href='#' @click="toPage('create')" >Create new story...</a></h5>
                                    </div>
                                </div>

                                <div class = "card mb-4">
                                    <div class = "card-body">
                                        <form>
                                            <input type="search" style = "width:100%; height:40px" placeholder="Search..." v-model = "search">
                                        </form>
                                    </div>
                                </div>

                                <div v-for="item in filteredList" :key="item._id">
                                    <div class = "card mb-4">
                                        <div class = "card-body">
                                            <h5 class="card-title"> <b>Title: </b>{{item.title}}</h5>
                                            <h6 class="card-title"> <b>Created at: </b>{{String(item.created_at)}} </h6>
                                            <p class="card-text" v-html = "item.content.substring(0,200)"></p>
                                            <ul class="list-group list-group-flush">
                                                <center>
                                                    <li class="list-group-item" v-on:click="editElement(item._id)"><a href=#>Edit</a></li>
                                                    <li class="list-group-item" v-on:click="readmore(item._id)"><a href=#>Read More...</a></li>
                                                    <li class="list-group-item" v-on:click="removeElement(item._id)"><a href=# style="color:red">Delete</a></li>
                                                </center>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </div> 
</template>

<script>
const baseUrl = "http://localhost:3000/api"
export default {
    data(){
        return{
            search : "",
            items : []
        }
    },
    methods:{
        toPage(page){
            this.$emit('on_page',page)
        },
        editElement(id){
            this.axios.get(baseUrl+'/articles/'+id,{
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                let objEdit = {
                    _id : data._id,
                    title : data.title,
                    content : data.content,
                }
                console.log(objEdit);
                this.$emit('dataToUpdate',objEdit)
            })
            .catch(err=>{
                console.log(err);
            })
        },
        removeElement(index) {
            console.log(index);
            this.$swal.fire(
                {   title : "Are you sure want to delete this article?",
                    type : "question",
                    showConfirmButton : true,
                    showCancelButton : true,
                })
                .then((isConfirm)=>{
                    if(isConfirm.value){
                        this.axios.delete(baseUrl+'/articles/'+index,{
                            headers : {
                                token : localStorage.getItem('token')
                                }
                        })
                        .then(data=>{
                            console.log(data);
                            this.items = this.items.filter(e=>e._id != index)
                        })
                        .catch(err=>{
                            console.log(err);
                        })

                    }
                })
        },
        readmore(id){
            let data = {id,page:"readmore"}
            this.$emit('readmoree',data)
        }
    }
    ,
    props : ["new_data"]
    ,
    created(){
        this.axios.get(baseUrl+'/articles/',{
            headers : {
                    token : localStorage.getItem('token')
                }
        })
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
        },
        unshiftData(){
            if(this.new_data){
                this.items.unshift(this.new_data)
            }
        }
    }
    
}
</script>

<style scoped>

</style>