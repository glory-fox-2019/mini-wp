<template>

    <div >

        <nav  style =" z-index: 2; box-shadow: 0px 0px 20px black;" class="navbar navbar-expand navbar-dark bg-dark static-top">

    <a class="navbar-brand mr-1" href=""> <i class="fab fa-wordpress-simple">ords</i> <i class="fab fa-wordpress-simple">indow</i> </a>

    <!-- Navbar Search -->
    <form class="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
      <div class="input-group">
        <input type="text" v-model="search" class="form-control" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2">
        <div class="input-group-append">
          <button class="btn btn-primary" type="button">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
    </form>


        <div v-if="currentUser" class="user-navigate">
                <button v-show="isEditing" v-on:click="cancelEdit" type="submit" class="btn btn-light"><i class="fas fa-ban">Cancel</i></button>
                <button v-show="isWriting" v-on:click="cancelWrite" type="submit" class="btn btn-light"><i class="fas fa-ban">Cancel</i></button>
                <button v-show="isEditing" v-on:click="submitEdit" type="submit" class="btn btn-danger"><i class="fas fa-newspaper" >Publish Revision</i></button>
                <button v-show="isWriting" v-on:click="publish" type="submit" class="btn btn-danger"><i class="fas fa-newspaper" >Publish</i></button>
                <button v-show="!isWriting" v-on:click="write" id="writeBtn" type="button" class="btn btn-light"><i class="fas fa-pen-alt"> write</i></button>
                <button type="button" class="btn btn-dark"><i class="far fa-user-circle"></i></button>
                <button type="button" class="btn btn-dark">
                <i class="fas fa-bell"></i>
                </button>
            </div>


  </nav>

</template>

<script>
export default {
    props:['currentUser', 'isEditing', 'isWriting'],
    data() {
        return {
          search: ""
        };
    },
    methods:{
        signinBtn(){
            this.$emit('signinBtn')
        },
        signupBtn(){
            this.$emit('signupBtn')
        },
        write(){
            this.$emit('write')
        },
        publish(){
            this.$emit('publish')
        },
        submitEdit(){
            this.$emit('submitEdit')
        },
        cancelWrite(){
            this.$emit('cancelWrite')
        },
        cancelEdit(){
            this.$emit('cancelEdit')
        }
    },
    watch:{
      search(newVal, OldVal){
        this.$emit('search', newVal)
      }
    }
};
</script>

<style scoped>
</style>