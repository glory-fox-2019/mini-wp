<template>
<nav>
      <div id="logo">
          <i class="fab fa-wordpress"></i>  Wordpress
      </div>
      <div id="login" v-if="!isLogin"> 
        <p @click="onRegister">register</p>
        <!-- <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div> -->
      </div>
      <div id="right-logo" v-if="isLogin">
        <div>
            <i class="fas fa-book"></i>  Reader
        </div>
        <div>
            <ul>
                <li @click="onWrite"><i class="fas fa-pen-square"></i>  Write</li>
                <li><i class="fas fa-portrait"></i></li>
                <li><i class="fas fa-map-pin"></i></li>
                <li @click="logout">Logout</li>
              </ul>
        </div>
      </nav>
</template>

<script>

export default {
    data() {
        return {

        }
    }
    props: ['onPage'],
    methods: {
        onWrite() {
            
        }
    }

        
    }
}
