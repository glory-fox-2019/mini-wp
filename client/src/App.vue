<template>
  <div id="app">


    <Notification
      v-if="isNotification"
      @closeNotification="closeNotification">
    </Notification>

    <Loader
      v-if="isLoading">
    </Loader>

    <Dashboard
      v-if="isLogin"
      @logout="logout"
      @showLoading="showLoading"
      @hideLoading="hideLoading">
    </Dashboard>

    <Header
    :isLogin=isLogin
    v-if="!isLogin"
    @showLoginForm="showLoginForm"
    @showSignupForm="showSignupForm"
    @logout=logout>
    </Header>

    <FormSignup
      v-if="isShowSignupForm"
      @showLoading="showLoading"
      @hideLoading="hideLoading"
      @showNotification="showNotification"
      @showLoginForm="showLoginForm"
      @showDashboard="showDashboard">
    </FormSignup>

    <FormLogin
      v-if="isShowLoginForm"
      @showLoading="showLoading"
      @hideLoading="hideLoading"
      @showDashboard="showDashboard">
    </FormLogin>

  </div>
</template>

<script>

import Loader from './components/Loader'
import Notification from './components/Notification'
import Header from './components/Header'
import FormSignup from './components/FormSignup'
import FormLogin from './components/FormLogin'
import Dashboard from './components/Dashboard'

export default {
  data () {
    return {
      isLoading : false,
      isNotification : false,
      isShowSignupForm : true,
      isShowLoginForm : false,
      isLogin : false
    }
  },
  methods : {
    showLoading () {
      this.isLoading = true
    },
    showNotification () {
      this.isNotification = true
    },
    closeNotification () {
      this.isNotification = false
    },
    hideLoading () {
      this.isLoading = false
    },
    showLoginForm () {
      this.isShowSignupForm = false
      this.isShowLoginForm = true
    },
    showSignupForm () {
      this.isShowSignupForm = true
      this.isShowLoginForm = false
    },
    showDashboard () {
      this.isShowSignupForm = false
      this.isShowLoginForm = false
      this.isLogin = true
    },
    logout () {
      localStorage.clear()
      this.isShowSignupForm = false
      this.isShowLoginForm = true
      this.isLogin = false
    }
  },
  mounted() {
    
  },
  components : {
    Notification,
    Loader,
    Header,
    FormSignup,
    FormLogin,
    Dashboard
  }
}
</script>