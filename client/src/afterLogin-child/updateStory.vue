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
                                        <input type="text" placeholder = "Title..." style="width : 100%; height: 40px"  v-bind:value="inputTitle">
                                    </div>

                                </div>
                                <div class = "card mb-2">
                                    <div class = "card-body">
                                       <wysiwyg v-model="inputContent"></wysiwyg>
                                    </div>

                                </div>

                                <div class = "card mb-4">
                                    <div class = "card-body">
                                        <input type="submit" value = "Update your story" style="width : 100%; height: 40px; background-color:rgba(37, 80, 149, 0.966); color:white" v-on:click="updateArticle()">
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
const baseUrl = 'http://localhost:3000/api'
export default {
    props : ['updateId', 'updateTitle', 'updateContent'],
    data(){
        return{
          inputTitle : this.updateTitle,
          inputContent : this.updateContent
        }
    },
    methods:{
       updateArticle(){
           this.axios.patch(baseUrl+'/articles/'+this.updateId,{
               title : this.inputTitle,
               content : this.inputContent
           })
           .then(({data})=> {
                console.log(data)
                this.inputTitle = ""
                this.inputContent = ""
                this.$emit('on_page','story')
            })
           .catch(err=> console.log(err))
        }
    }  
}

</script>

<style scoped>
    .pell {
    border: 1px solid #000;
    border-radius: 0;
    box-shadow: none;
    }


</style>