<template>
  <div>
    <b-navbar fixed="top" variant="dark" type="dark" class="d-flex justify-content-between">
        <b-navbar-brand href="#" @click="$emit('to:home')">
            <img src="https://storage.googleapis.com/hacktiv8-assets-adityabp/Logo-Sleepless.png" alt="sleepless" height="32px" class="mr-3">
            <a href="#" class="btn text-white p-3" style="border-radius: 0;">
            </a>
        </b-navbar-brand>
        <b-navbar-nav align-item="center">
            <a class="btn text-white" href="#" @click="$emit('to:login')">Login</a>
        </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>