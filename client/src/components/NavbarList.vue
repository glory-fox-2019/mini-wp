<template>
  <div>
    <b-navbar fixed="top" variant="dark" type="dark" class="d-flex justify-content-between py-0">
        <b-navbar-brand href="#" class="py-0">
            <img src="https://storage.googleapis.com/hacktiv8-assets-adityabp/Logo-Sleepless.png" alt="sleepless" height="32px" class="mr-3">
            <a @click.prevent="toList()" href="#" class="btn text-white p-3" style="background-color: #428bca; border-radius: 0;">
              <font-awesome-icon icon="newspaper" class="mr-2"></font-awesome-icon>
              Articles
            </a>
            <a @click.prevent="$emit('to:list:user')" href="#" class="btn text-white p-3" style="border-radius: 0;">
              My Articles
            </a>
        </b-navbar-brand>
        <b-navbar-nav align-item="center">
                <a v-if="!isWrite" @click="toWrite()" class="btn btn-primary" variant="primary" size="sm" href="#">Write</a>
                <a @click.prevent="$emit('log:out')" class="btn text-white" href="#">Logout</a>
        </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isWrite: false
    }
  },
  methods: {
    toWrite() {
      this.$emit('to:write')
      this.isWrite = true
    },
    toList() {
      this.$emit('to:list')
    }
  }
}
</script>

<style>

</style>