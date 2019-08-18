<template>
    <div class="side-nav col-md-2">
        <ul>
            <li @click="toHomePage" ><i class="fas fa-home mr-3"></i>Home</li>
            <li @click="toMyArticle" ><i class="fas fa-list-alt mr-3"></i>My Article</li>
            <li @click="toCreateArticle"><i class="fas fa-plus-circle mr-3"></i>Add Article</li>
            <!-- <li><i class="fas fa-star mr-3"></i>favourite</li> -->
            <li><i class="fas fa-sign-out-alt mr-3"></i>Logout</li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            toHomePage(){
                this.$emit('to-home')
            },
            toCreateArticle(){
                this.$emit('to-create-article')
            },
            toMyArticle() {
                this.$emit('to-my-article')
            },
            // logout() {
            //     this.$emit('logout')
            // }
        }
    }
</script>

<style scoped>
    .side-nav li {
        list-style: none;
        color: gray;
        font-size: 12px;
        padding: 10px;
        transition: 0.3s;
        cursor: pointer;
    }

    .side-nav li:hover {
        text-shadow: 0 0 5px #82848b;
        margin-left: 3px;
    }
</style>