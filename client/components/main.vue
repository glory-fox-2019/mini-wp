<template>
    <div>
        <nav class="w3-sidebar w3-collapse w3-white w3-animate-left" style="z-index:3;width:300px;" id="mySidebar"><br>
        <div class="w3-container">
            <a href="#" onclick="w3_close()"
                class="w3-hide-large w3-right w3-jumbo w3-padding w3-hover-grey" title="close menu">
                <i class="fa fa-remove"></i>
            </a>
            <img src="https://images.unsplash.com/photo-1481824429379-07aa5e5b0739?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" style="width:45%;" class="w3-round"><br><br>
            <h4><b>WordText</b></h4>
        </div>
        <div class="w3-bar-block">
            <a href="#portfolio" onclick="w3_close()" class="w3-bar-item w3-button w3-padding">ARTICLE</a>
            <a href="#add-article" onclick="w3_close()" class="w3-bar-item w3-button w3-padding">ADD
                ARTICLE</a>
            <a href="#about" onclick="w3_close()" class="w3-bar-item w3-button w3-padding">SIGN OUT</a>
            <input type="text" id="mySearch" placeholder="Search..">
        </div>
        <div class="w3-panel w3-large">
            <i class="fa fa-facebook-official w3-hover-opacity"></i>
            <i class="fa fa-instagram w3-hover-opacity"></i>
            <i class="fa fa-snapchat w3-hover-opacity"></i>
            <i class="fa fa-pinterest-p w3-hover-opacity"></i>
            <i class="fa fa-twitter w3-hover-opacity"></i>
            <i class="fa fa-linkedin w3-hover-opacity"></i>
        </div>
    </nav>
    <div class="w3-overlay w3-hide-large w3-animate-opacity" onclick="w3_close()" style="cursor:pointer"
                    title="close side menu" id="myOverlay"></div>

    <!-- !PAGE CONTENT! -->
    <div class="w3-main" style="margin-left:300px">
        <!-- Header -->
        <header id="portfolio">
            <a href="#">
                <img src="https://images.unsplash.com/photo-1481824429379-07aa5e5b0739?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" style="width:65px;"
                    class="w3-circle w3-right w3-margin w3-hide-large w3-hover-opacity"></a>
            <span class="w3-button w3-hide-large w3-xxlarge w3-hover-text-grey" onclick="w3_open()"><i
                    class="fa fa-bars"></i></span>
            <div class="w3-container">
                <h1><b>WELCOME TO WordText</b></h1>
                <div class="w3-section w3-bottombar w3-padding-16">
                    <span class="w3-margin-right">Filter:</span>
                    <button class="w3-button w3-black">ALL</button>
                    <button class="w3-button w3-white"><i
                            class="fa fa-diamond w3-margin-right"></i>Design</button>
                    <button class="w3-button w3-white w3-hide-small"><i
                            class="fa fa-photo w3-margin-right"></i>Photos</button>
                    <button class="w3-button w3-white w3-hide-small"><i
                            class="fa fa-map-pin w3-margin-right"></i>Art</button>
                </div>
            </div>
        </header>
    
        <div class="wrapper" v-for="article in articles">
          <div class="product-img">
            <img src="http://bit.ly/2tMBBTd" height="420" width="327">
          </div>
          <div class="product-info">
            <div class="product-text">
              <h1>{{ article.title }}</h1>
              <p><br> {{ article.content }} </p>
            </div>
            <div class="product-price-btn">
              <button type="button">Read More</button>
            </div>
          </div>
        </div>
        
                <!-- <div class="main">
                    <div v-if="displayArticle"></div> 
                    <div class="w3-row-padding" >
                        <div class="w3-third w3-container w3-margin-bottom" v-for="article in articles" >
                            <img src="" alt="Norway" style="width:100%" class="w3-hover-opacity">
                            <div class="w3-container w3-white">
                                <p><b> {{article.title}} </b></p>
                                <p>{{ article.content }}</p>
                            </div>
                        </div>
                    </div> 
                </div> -->
                    <!-- Pagination -->
        <!-- <div class="w3-center w3-padding-32">
            <div class="w3-bar">
                <a href="#" class="w3-bar-item w3-button w3-hover-black">«</a>
                <a href="#" class="w3-bar-item w3-black w3-button">1</a>
                <a href="#" class="w3-bar-item w3-button w3-hover-black">2</a>
                <a href="#" class="w3-bar-item w3-button w3-hover-black">3</a>
                <a href="#" class="w3-bar-item w3-button w3-hover-black">4</a>
                <a href="#" class="w3-bar-item w3-button w3-hover-black">»</a>
            </div>
        </div> -->

</template>

<script>
import articleadd from 'article-edit'
import axios from 'axios'
    module.exports = {
        data: function () {
            return {
                title: '',
                content: '',
                articles:[]
            }
        },
        methods: {
            addArticle() {
                let formData = new FormData()
                axios.post('http://localhost:4000/articles'), {headers : {token: localStorage.token}}

            },
            listArticle() {
                axios.get('http://localhost:4000/articles/articleUser',{ headers: { token: localStorage.token }})
                
                .then(({data}) => {
                    console.log(data)
                    this.articles = data
                })
                .catch((err) => {
                    console.log(err)
                })

            }
        },
        created() {
            axios.get('http://localhost:4000/articles/articleUser',{ headers: { token: localStorage.token }})
                
                .then(({data}) => {
                    console.log(data)
                    this.articles = data
                })
                .catch((err) => {
                    console.log(err)
                })

            // this.listArticle()
        }
    }
</script>

<style scoped>

  body {
    background-color: #fdf1ec;
  }

  .wrapper {
    height: 420px;
    width: 654px;
    margin: 50px auto;
    border-radius: 7px 7px 7px 7px;
    /* VIA CSS MATIC https://goo.gl/cIbnS */
    -webkit-box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
    box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
  }

  .product-img {
    float: left;
    height: 420px;
    width: 327px;
  }

  .product-img img {
    border-radius: 7px 0 0 7px;
  }

  .product-info {
    float: left;
    height: 420px;
    width: 327px;
    border-radius: 0 7px 10px 7px;
    background-color: #ffffff;
  }

  .product-text {
    height: 300px;
    width: 327px;
  }

  .product-text h1 {
    margin: 0 0 0 38px;
    padding-top: 52px;
    font-size: 34px;
    color: #474747;
  }

  .product-text h1,
  .product-price-btn p {
    font-family: 'Bentham', serif;
  }

  .product-text h2 {
    margin: 0 0 47px 38px;
    font-size: 13px;
    font-family: 'Raleway', sans-serif;
    font-weight: 400;
    text-transform: uppercase;
    color: #d2d2d2;
    letter-spacing: 0.2em;
  }

  .product-text p {
    height: 125px;
    margin: 0 0 0 38px;
    font-family: 'Playfair Display', serif;
    color: #8d8d8d;
    line-height: 1.7em;
    font-size: 15px;
    font-weight: lighter;
    overflow: hidden;
  }

  .product-price-btn {
    height: 103px;
    width: 327px;
    margin-top: 17px;
    position: relative;
  }

  .product-price-btn p {
    display: inline-block;
    position: absolute;
    top: -13px;
    height: 50px;
    font-family: 'Trocchi', serif;
    margin: 0 0 0 38px;
    font-size: 28px;
    font-weight: lighter;
    color: #474747;
  }

  span {
    display: inline-block;
    height: 50px;
    font-family: 'Suranna', serif;
    font-size: 34px;
  }

  .product-price-btn button {
    float: right;
    display: inline-block;
    height: 50px;
    width: 176px;
    margin: 0 40px 0 16px;
    box-sizing: border-box;
    border: transparent;
    border-radius: 60px;
    font-family: 'Raleway', sans-serif;
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: #ffffff;
    background-color: #9cebd5;
    cursor: pointer;
    outline: none;
  }

  .product-price-btn button:hover {
    background-color: #79b0a1;
  }
</style> 