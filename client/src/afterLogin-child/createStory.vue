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
                                <div class = "card mb-2">
                                    <div class = "card-body">
                                        <h5>Your featured image...</h5>
                                        <form enctype="multipart/form-data">
                                            <input 
                                                type="file"
                                                 @change="previewFile()" 
                                                 id="file" 
                                                 ref="myFiles"
                                                 accept="image/*"
                                            >
                                        </form>
                                    </div>

                                </div>

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
            image : ""
        }

    },
    methods : {
        createArticle(){
            console.log(this.image , ' ini')
            var bodyFormData = new FormData();
            bodyFormData.append('image', this.image[0]); 
            this.axios({
                method : 'POST',
                url : baseUrl+'/images/upload',
                data : bodyFormData
                ,
                config : {headers: {
                    token : localStorage.getItem('token')
                }}
             })
             .then(({data})=>{
                console.log(data);
                this.image = data.link
                console.log(this.inputTitle);
                console.log(this.inputContent);
                return this.axios.post(baseUrl+'/articles',
                    {   title : this.inputTitle,
                        content : this.inputContent,
                        image : this.image
                    },
                    { headers : {
                        token : localStorage.getItem('token')
                    }}
            )})
                .then( ({data}) => {
                    this.$emit('newdata',data)
                    console.log(data);
                    this.inputTitle = ""
                    this.inputContent = ""
                    this.image = ""
                    this.$emit('on_page','story')
                })
                .catch(err=>{
                    console.log(err);
                })

            },
            previewFile(){
                console.log(this.$refs.myFiles.files)
                this.image = this.$refs.myFiles.files
            }
    },
 
}
</script>

<style scoped>



</style>