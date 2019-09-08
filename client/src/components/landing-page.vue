<template>
  <!-- card-list 1 home-->
  <div >
    
    <div class="main-title mt-3">
        <!-- <h1>haloooooooo</h1> -->
    </div>
    <div class="container">
        <div id="card-list1" class="card m-5" v-for="(article, index) in articles" :key="index">
            <div class="row no-gutters">
                <div class="col-md-5">
                    <img :src="article.image" class="card-img" alt="..." />
                    </div>
                    <div class="card-containt col-md-7 p-3">
                        <div class="d-flex card-label">
                            <a>
                            <i class="fa fa-user mr-1"></i> by andy
                            </a>
                            <a>
                            <i class="fa fa-calendar-o ml-5 mr-1"></i> date
                            </a>
                        </div>
                        <div class="card-main">
                            <h5>{{article.title}}</h5> <!--v-html="conten"-->
                            <p v-html="article.content"></p>
                        </div>
                        <div class="card-comment">
                            <div>
                            <a class>
                                <small class="text-muted">
                                <i class="fa fa-comments-o mr-2"></i>33 Comment
                                </small>
                            </a>
                            <a class>
                                <small class="ml-3 text-muted">
                                <i class="fa fa-heart mr-2"></i>33 Like
                                </small>
                            </a>
                        </div>
                        <div>
                        <button type="button" class="btn btn-outline-secondary btn-sm mr-3 disable">read more</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
  </div>

</template>

<script>
    export default {
        props: ['landing', 'articles'],
        data() {
            return {
            };
        }
    };
</script>

<style scoped>
    .card {
        max-height: 250px auto; 
        box-shadow: 0 0 5px silver;
    }

    .card img {
        height: 100%;
    }

    h5 {
        font-weight: 20px;
        font-size: 200px;
        font-family: "Roboto", sans-serif;
    }

    .card-label {
        color: silver;
    }

    .card-label a {
        font-size: 11px;
    }

    .card-main h5 {
        font-family: "Roboto", sans-serif;
        font-weight: bold;
        font-size: 15px;
        margin-top: 15px;
    }

    .card-main p {
        height: 17rem;
        margin-top: 10px;
        overflow: hidden;
    }

    .card-comment {
        display: flex;
        justify-content: space-between;
    }

    .card-comment button {
        border: none;
        transition: 0.5s;
    }

    .card-comment button:hover {
        background-color:#4285F4;     
    }

</style>