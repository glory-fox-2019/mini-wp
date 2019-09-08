<template>
    <div v-show="false" class="container">
        <div class="read-more row">
            <div class="col-md-9">
                <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
                <div>

                </div>
                <img src="../img/cat.jpg" alt="cats">
                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae reprehenderit accusantium fugiat aliquid repudiandae officia cumque harum, asperiores nihil? Atque quam laboriosam provident, dicta numquam officia distinctio veniam similique sit! Architecto cumque magnam velit. Aspernatur dolore nulla accusamus illo tempore consectetur quae, laudantium est assumenda cum, totam iusto commodi fuga ipsa accusantium.
                 .
                 <div class="tag">
                     ini buat tag
                 </div>
            </div>
            <div class="col-md-3">
                <div class="favourite">
                    <!-- <img src="../../assets/img1.jpg" alt=""> -->
                    <h5>Lorem ipsum dolor sit amet consectetur</h5>
                    <p>Lorem ipsum dolor sit amet consectetur</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['pages'],
        data() {
            return {
            }
        }
    }
</script>

<style scoped>
    .read-more img {
        max-width: 40rem;
        max-height: 40rem;
    }
</style>