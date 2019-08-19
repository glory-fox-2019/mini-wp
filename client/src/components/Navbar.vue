<template>
  <nav>

    <v-toolbar color="primary">
      <v-app-bar-nav-icon v-if="isLogin" class="white--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="d-flex align-center text-uppercase white--text">
        <div id="box-img">
          <img src="../assets/logo.png" alt="">
        </div>
        <span class="font-weight-light">My</span>
        <span class="font-weight-bold">App</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn v-if="page==='dashboard' && isLogin" color="error" @click="$emit('logout')">
        <span>Log Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
        
      <v-btn v-if="page==='write' && isLogin || page==='edit' && isLogin" @click="drawerWrite = !drawerWrite" class="ma-2" color="secondary">
        <v-icon>settings</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" temporary absolute>
      <v-list shaped>
        <v-subheader>STREAM</v-subheader>
        <v-divider></v-divider>
        <v-list-item-group color="primary">
          <v-list-item v-for="menu in streamMenus" :key="menu.text" router :to="menu.route">
            <v-list-item-icon>
              <v-icon v-text="menu.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="menu.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer v-model="drawerWrite" temporary absolute right>
      <v-list shaped>
        <v-subheader>MORE ACTION</v-subheader>
        <v-divider></v-divider>
        <v-list-item-group color="primary">
          <v-list-item v-for="menu in writeMenu" :key="menu.text">
            <v-list-item-icon>
              <v-icon v-text="menu.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="menu.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  props: ['appName', 'isLogin'],
  components: {
  },
  data() {
    return {
      page: '',
      drawerWrite: false,
      drawer: false,
      btnPublish: false,
      streamMenus: [
        {
          "icon": "dashboard",
          "text": "Dashboard",
          "route": "/dashboard"
        },
        {
          "icon": "edit",
          "text": "Write",
          "route": "/write"
        },
        {
          "icon": "check_circle",
          "text": "Followed Sites",
          "route": ""
        },
        {
          "icon": "chat",
          "text": "Conversation",
          "route": ""
        },
        {
          "icon": "favorite",
          "text": "My Likes",
          "route": ""
        },
        {
          "icon": "search",
          "text": "Search",
          "route": ""
        },
        {
          "icon": "expand_more",
          "text": "Tags",
          "route": ""
        },
        {
          "icon": "insert_chart",
          "text": "Stats",
          "route": ""
        },
        {
          "icon": "desktop_windows",
          "text": "Your Site",
          "route": ""
        },
        {
          "icon": "timeline",
          "text": "Activity",
          "route": ""
        },
        {
          "icon": "monetization_on",
          "text": "Plan",
          "route": ""
        }
      ],
      writeMenu: [
        {
          "icon": "dashboard",
          "text": "Post Setting",
        },
        {
          "icon": "dashboard",
          "text": "Status",
        },
        {
          "icon": "dashboard",
          "text": "Categoies and Tags",
        },
        {
          "icon": "dashboard",
          "text": "Featured Image",
        },
        {
          "icon": "dashboard",
          "text": "More Options",
        },
      ]
    }
  },
  created() {
    if (this.$route.path.substr(0, 5) === '/edit') {
      this.page = 'edit'
    } else if (this.$route.path.substr(0, 6) === '/write') {
      this.page = 'write'
    } else {
      this.page = 'dashboard'
    }
  },
  watch: {
    $route: function() {
      if (this.$route.path.substr(0, 5) === '/edit') {
        this.page = 'edit'
      } else if (this.$route.path.substr(0, 6) === '/write') {
        this.page = 'write'
      } else {
        this.page = 'dashboard'
      }
    },
  }
}
</script>

<style scoped>
  #logo-app {
    display: flex;
    align-items: center;
  }

  #box-img {
    height: 40px;
    width: 40px;
    display: flex;
    display: inline-block;
    align-items: center;
    justify-content: flex-start;
    margin-right: 7px;
  }

  #box-img img {
    height: 100%;
    width: 100%;
  }

</style>