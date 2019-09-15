<template>
    <div class= "container-fluid">
        <div class = "row">
    
            <div class = "col-sm">
                <div class = "column mt-4" >
                    <div class = "card mb-4" style="background-color : rgba(218, 216, 216, 0.198)">
                        <div class = "row">
                            <div class = "col-sm mr-5 mb-5 ml-5 mt-5">
                                <div class = "card mb-4">
                                    <div class = "card-body">
                                        <h1>{{inputTitle}}</h1>
                                        <h4>By : {{author}} </h4>
                                    </div> 
         
                                </div>
                                <div class = "card mt-2 mb-2">
                                       <center><img class="mb-4 mt-4" v-bind:src="image"></center>
                                       
                                </div>
                            
                                <div class = "card mb-2">
                                    <div class = "card-body" v-html="inputContent">
                                       
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
            inputTitle : "",
            inputContent : "",
            author : "",
            image : ""
        }

    },
    props : ['id_to_read']
    ,
    methods : {

    },
    created(){
        this.axios.get(baseUrl+'/articles/'+this.id_to_read,
            {headers : {
                    token : localStorage.getItem('token')
                }}
           )
           .then(({data})=> {
               console.log(data);
               this.inputTitle = data.title
               this.inputContent = data.content
               this.author = data.user.name
               this.image = data.image
            })
           .catch(err=> console.log(err))
        }
    
 
}
</script>

<style scoped>



</style>