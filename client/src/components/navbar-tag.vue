<template>
    <div v-show="tagbar" class="tag">
        <ul>
            <li><a href="">tag1</a></li>
            <li><a href="">tag1</a></li>
            <li><a href="">tag1</a></li>
            <li><a href="">tag1</a></li>
            <li><a href="">tag1</a></li>
            <li><a href="">tag1</a></li>
            <li><a href="">tag1</a></li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: ['tagbar'],
        data(){
            return {

            }
        }
    }
</script>

<style scoped>
    ul {
        margin: 0;
        display: flex;
        overflow: hidden;
        padding-left: 6rem;
        padding-right: 6rem;
        text-align: center;
        list-style-type: none;
        background-color: white;
        justify-content: space-around;
        border-bottom: 1px solid rgb(233, 233, 233);
    }
    
    li a {
        display: block;
        font-size: 13px;
        color: black;
        padding: 10px 20px;
        border-bottom: 2px solid white;
        text-decoration: none;
    }

    li a:hover{
        text-shadow: 0 0 5px grey;
        border-bottom: 2px solid #F4B400;
    }
</style>