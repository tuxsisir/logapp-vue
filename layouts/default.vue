<template>
  <v-app>
    <v-navigation-drawer
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          v-for="(item, index) in items"
          v-if="item.hasSubMenu === false"
          v-bind:data="item.title"
          v-bind:key="index">
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-group :prepend-icon="item.icon" v-else no-action>
          <v-list-tile slot="activator" text-xs-center>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            router
            v-for="(subItem, index) in item.subItems"
            :to="subItem.to"
            v-bind:data="subItem.title"
            v-bind:key="subItem.title"
          >
            <v-list-tile-title v-text="subItem.title"></v-list-tile-title>
          </v-list-tile>
        </v-list-group>
        <v-list-tile
          router
          to="/accounts/logout/">
          <v-list-tile-action>
            <v-icon>power_settings_new</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            Logout
          </v-list-tile-content>
        </v-list-tile>
      </v-list>


    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped" dark class="bg-al">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <span>
        <img src="/images/logo-white.png" height="40px">
      </span>
      <v-spacer></v-spacer>
      <v-avatar
        size="30"
        color="grey lighten-4"
      >
        <img :src="getUserImage" alt="avatar">
      </v-avatar>
      <span class="ml-3 font-weight-bold hidden-xs-only">{{ getUserFullName}} <br><small
        class="text-sm">({{ getUserDepartment }})</small></span>
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-menu
        offset-y
        bottom
        nudge-bottom="10"
        transition="scale-transition"
      >
        <v-btn
          icon
          slot="activator"
        >
          <v-icon>apps</v-icon>
        </v-btn>
        <v-list>
          <!-- View as admin if the user has subordinates -->
          <v-list-tile v-if="getAppView === 'user'" @click="switchAppView('admin')" >
            <v-list-tile-action>
              <v-icon>explore</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>View as Admin</v-list-tile-title>
          </v-list-tile>
          <!-- / view as admin if the user has subordinates -->
          <!-- View as admin if the user has subordinates -->
          <v-list-tile  v-else @click="switchAppView('user')">
            <v-list-tile-action>
              <v-icon>group</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>View as User</v-list-tile-title>
          </v-list-tile>
          <!-- / view as admin if the user has subordinates -->
          <v-list-tile to="/accounts/logout/">
            <v-list-tile-action>
              <v-icon>power_settings_new</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <v-container class="mb-5" fluid grid-list-lg>
        <nuxt/>
      </v-container>
      <v-footer :fixed="fixed" absolute class="px-3 py-4">
        <span class="mx-3">&copy; 2018 core.aayulogic - Powered By GCP</span>
      </v-footer>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
    >
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Notifications</v-list-tile-title>
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <div class="pa-2">
        <v-alert outline color="info" icon="info" :value="true">
          Your friendly neighbourhood Notifications, coming soon!
        </v-alert>
      </div>
    </v-navigation-drawer>
    <vue-notify :notify="notify"></vue-notify>
  </v-app>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import SideBar from '@/utils/sidebar/index.js'
  import VueNotify from '@/components/common/VSnackBar'

  export default {
    components: { VueNotify },
    created () {
      this.items = SideBar().USER
    },
    data () {
      return {
        notify: {},
        clipped: true,
        drawer: true,
        fixed: false,
        items: [],
        miniVariant: false,
        right: true,
        rightDrawer: false
      }
    },
    computed: {
      ...mapGetters(['getUserFullName', 'getUserImage', 'getUserDepartment', 'getAppView'])
    },
    methods: {
      ...mapMutations(['setAppView']),
      switchAppView (view) {
        this.setAppView(view)
        if (view === 'admin') {
          this.items = SideBar().ADMIN
          this.$router.push('/admin/admin-page/')
        } else {
          this.items = SideBar().USER
          this.$router.push('/')
        }
      }
    }
  }
</script>
