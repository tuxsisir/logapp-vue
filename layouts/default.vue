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
    <v-toolbar fixed app :clipped-left="clipped" dark>
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
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
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
      <div class="pa-2">
        <v-alert outline icon="info">
          Notifications coming soon!
        </v-alert>
      </div>
    </v-navigation-drawer>
    <vue-notify :notify="notify"></vue-notify>
  </v-app>
</template>

<script>
  import VueNotify from '@/components/common/VSnackBar'

  export default {
    components: {VueNotify},
    data () {
      return {
        notify: {},
        clipped: true,
        drawer: true,
        fixed: false,
        items: [
          {icon: 'apps', title: 'Home', to: '/', hasSubMenu: false},
          {icon: 'group', title: 'Team', to: '/team/', hasSubMenu: false},
          {icon: 'attach_file', title: 'Work Logs', to: '/work-log/', hasSubMenu: false},
          {icon: 'note_add', title: 'Log Work', to: '/log-work/', hasSubMenu: false},
          {icon: 'account_box', title: 'My Profile', to: '/profile/', hasSubMenu: false},
          {
            icon: 'settings',
            title: 'Settings',
            hasSubMenu: true,
            subItems: [
              {icon: 'attachment', title: 'Work Log', to: '/settings/worklog/'},
              {icon: 'vpn_key', title: 'Change Password', to: '/settings/change-password/'},
              {icon: 'stars', title: 'Score', to: '/settings/score/'}
            ]
          },
          {
            icon: 'info',
            title: 'About',
            hasSubMenu: true,
            subItems: [
              {icon: 'code', title: 'Change Log', to: '/about/change-log/'},
              {icon: 'info', title: 'About core.aayulogic', to: '/about/aayulogic/'}
            ]
          }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false
      }
    }
  }
</script>
