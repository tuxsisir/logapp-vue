<template>
  <v-app>
    <v-navigation-drawer
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      width="270"
      app
    >
      <v-list>
        <v-list-tile
          v-for="(item, index) in items"
          v-if="item.hasSubMenu === false"
          :to="item.to"
          :data="item.title"
          :key="index"
          router>
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-subheader v-else-if="item.subheader">
          {{ item.title }}
        </v-subheader>
        <v-list-group v-else
                      :prepend-icon="item.icon"
                      no-action>
          <v-list-tile slot="activator"
                       text-xs-center>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            v-for="(subItem, index) in item.subItems"
            :to="subItem.to"
            :data="subItem.title"
            :key="index"
            router
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
    <v-toolbar :clipped-left="clipped"
               fixed
               app
               height="55"
               dark
               class="bg-al">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <span>
        <img src="/images/logo-white.png"
             height="40px">
      </span>
      <v-spacer></v-spacer>
      <v-avatar
        size="30"
        color="grey lighten-4"
      >
        <v-img :src="getUserImage"
               cover
               alt="avatar"></v-img>
      </v-avatar>
      <span class="ml-3 font-weight-bold hidden-xs-only">{{ getUserFullName }} <br><small
        class="text-sm">({{ getUserDepartment }})</small></span>
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>notifications</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container class="mb-5"
                   fluid
                   grid-list-lg>
        <nuxt></nuxt>
      </v-container>
      <v-footer :fixed="fixed"
                absolute
                class="px-3 py-4 footer-border"
                color="white">
        <span class="mx-3">&copy; 2018 core.aayulogic - Powered By GCP</span>
      </v-footer>
    </v-content>
    <v-navigation-drawer
      :right="right"
      v-model="rightDrawer"
      temporary
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
        <v-alert :value="true"
                 outline
                 color="info"
                 icon="info">
          Your friendly neighbourhood Notifications, coming soon!
        </v-alert>
      </div>
    </v-navigation-drawer>
    <vue-notify :notify="notify"></vue-notify>
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex'
  import sideBar from '@/utils/sidebar/index.js'

  export default {
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
      ...mapGetters(['getUserFullName', 'getUserImage', 'getUserDepartment', 'getAppView', 'isUserReviewer']),
      isAdmin () {
        return !!(this.getUserDepartment === 'Management' || this.isUserReviewer)
      }
    },
    created () {
      this.items = sideBar(this.isAdmin)
    }
  }
</script>
