<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-y
    open-on-hover
  >
    <v-avatar
      size="50"
      color="grey lighten-4"
      slot="activator"
    >
      <v-img :src="userDetail.profile_picture"></v-img>
    </v-avatar>
    <v-card>
      <v-list>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-img :src="userDetail.profile_picture"></v-img>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ userDetail.name }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ userDetail.department }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat @click="menu = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
  export default {
    props: {
      userDetail: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        menu: false
      }
    }
  }
</script>
