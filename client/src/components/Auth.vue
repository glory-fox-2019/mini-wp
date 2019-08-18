<template>
  <div id="auth">
    <Login v-if="page === 'login'" @auth="$emit('auth', $event)" @update:auth:page="page = $event"></Login>
    <Register v-if="page === 'register'" @auth="$emit('auth', $event)" @update:auth:page="page = $event"></Register>
    <div class="form--signin-google">
      <Button-Google @auth="$emit('auth',$event)"></Button-Google>
    </div>
  </div>
</template>
<script>
import Login from './Auth-Login';
import Register from './Auth-Register';
import ButtonGoogle from './Button-SignInGoogle';

export default {
  components: {
    Login,Register,ButtonGoogle
  },
  data(){
    return {
      page: 'login',
    }
  }
}
</script>