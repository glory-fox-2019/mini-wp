<template>
  <div id="auth">
    <Login @auth="$emit('auth', $event)"></Login>
  </div>
</template>
<script>
import Login from './Auth-Login';

export default {
  components: {
    Login
  }
}
</script>