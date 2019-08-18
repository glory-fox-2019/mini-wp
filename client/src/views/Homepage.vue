<template>
<div>
    <Navbar @to:login="on = 'login'" @to:home="on = 'home'"></Navbar>
    <b-container>
        <b-row v-if="on == 'home'" class="pt-5 justify-content-center">
            <b-col style="margin-top: 80px;" cols="3">
                <h1><b>Build Your Own Website</b></h1>
                <p class="text-justify text-secondary">
                    Don't worry it's free and you can use it forever.
                </p>
                <b-btn @click="on = 'register'" block variant="outline-primary">Getting Started</b-btn>
            </b-col>
            <b-col cols="9">
                <img src="https://storage.googleapis.com/hacktiv8-assets-adityabp/landing-right.png" alt="Landing Page" height="550px">
            </b-col>
        </b-row>
        <b-row class="pt-5 justify-content-center">
            <Register v-if="on == 'register'" @register:done="on = 'login'" style="margin-top: 80px;"></Register>
            <Login v-if="on == 'login'" @login:done="$emit('login:done')" @to:register="on = 'register'" style="margin-top: 80px;"></Login>
        </b-row>
    </b-container>
</div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
export default {
    data() {
        return {
            on: 'home'
        }
    },
    components: {
        Navbar,
        Login,
        Register
    }
}
</script>

<style>

</style>