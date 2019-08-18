<template>
<div>
    <Navbar @to:list="$emit('to:list')" @to:write="$emit('to:write')" @log:out="$emit('log:out')"></Navbar>
    <b-container>
      <b-row class="justify-content-center">
          <b-col cols="7">
               <h1 class="standout text-center" style="margin-top: 80px;">{{ article.title }}</h1>
               <h6 class="text-secondary text-center">{{ article.author.username }}</h6>
                <hr>
                <b-card no-body class="mt-1 p-4 text-justify border-0">
                    <span v-html="article.content"></span>
                    <div class="float-bottom ">
                        <b-badge pill variant="secondary mr-1" v-for="(t,i) in article.tagsId" :key="i">{{ t.name }}</b-badge>
                    </div>
                </b-card>
          </b-col>
      </b-row>
    </b-container>
</div>
</template>

<script>
import ax from '../config/axios'
import Navbar from '../components/NavbarList.vue'
export default {
    props: ['article'],
    components: {
        Navbar
    }
}
</script>

<style scoped>
    p {
        font-size: 0.8rem;
        text-align: justify;
    }
</style>