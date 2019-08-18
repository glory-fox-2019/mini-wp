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
                                        <input type="text" placeholder = "Title..." style="width : 100%; height: 40px" v-model="inputTitle">
                                    </div>

                                </div>
                                <div class = "card mb-2">
                                    <div class = "card-body">
                                        <wysiwyg v-model="inputContent"></wysiwyg>
                                    </div>

                                </div>

                                <form enctype="multipart/form-data" @submit.prevent = "onSubmitImage()">
                                    <input 
                                        type="file"
                                        ref="file"
                                    >
                                    <div class="fields">
                                        <button>Submit</button>
                                    </div>
                                    </form>

                                <div class = "card mb-4">
                                    <div class = "card-body">
                                        <input type="submit" value = "Publish your story" style="width : 100%; height: 40px; background-color:rgba(37, 80, 149, 0.966); color:white" v-on:click = "createArticle">
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
        }

    },
    methods : {
        createArticle(){
            this.axios.post(baseUrl+'/articles',{
                title : this.inputTitle,
                content : this.inputContent
            })
            .then( ({data}) => {
                // this.items.unshift(data)
                this.$emit('newdata',data)
                console.log(data);
              })
            .catch(function (error) {
                console.log(error);
              });
              this.inputTitle = ""
              this.inputContent = ""
              this.$emit('on_page','story')
            //   this.toStory()

        }

    }
 
}
</script>

<style scoped>



</style>