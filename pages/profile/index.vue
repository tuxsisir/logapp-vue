<template>
  <v-layout row wrap>
    <v-flex md12>
      <bread-crumb :breadCrumbItems="breadCrumbs"></bread-crumb>
      <vue-notify :notify="notify"></vue-notify>
    </v-flex>
    <v-flex md12>
      <v-card>
        <v-btn
          color="blue"
          dark
          absolute
          bottom
          right
          fab
          router
          to="/profile/edit/"
        >
          <v-icon>edit</v-icon>
        </v-btn>
        <v-img
          style="border: 1px solid #efefef"
          height="300"
          aspect-ratio="2"
          :src="`https://picsum.photos/1200/300/?random`"
          :lazy-src="`https://picsum.photos/1200/300/?random`" cover>
          <v-layout
            slot="placeholder"
            fill-height
            align-center
            justify-center
            ma-0
          >
            <v-progress-circular indeterminate color="blue lighten-5"></v-progress-circular>
          </v-layout>
        </v-img>
        <v-btn fab absolute top left flat color="transparent">
          <v-avatar
            :tile="false"
            :size="150"
            color="white"
            class=""
            style="top: 220px; left: 60px;"
          >
            <v-img :src="userInfo.profile_picture" alt="avatar" aspect-ratio="1.7">
              <v-layout
                slot="placeholder"
                fill-height
                align-center
                justify-center
                ma-0
              >
                <v-progress-circular indeterminate color="blue lighten-5"></v-progress-circular>
              </v-layout>
            </v-img>
          </v-avatar>
        </v-btn>
        <v-card-title primary-title class="mt-3">
          <div class="mt-3">
            <h3 class="headline mb-0 font-weight-bold mr-3 text-md-left">{{ userInfo.name }}</h3>
            <span class="caption text-grey">({{ userInfo.department }})</span>
            <div>{{ userInfo.status }}</div>
          </div>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-layout row wrap align-center justify-center class="text-md-center">
            <v-flex>
              <h3 class="font-weight-thin">Username</h3>
              <p class="title mt-2 font-weight-bold">{{ userInfo.username }}</p>
            </v-flex>
            <v-flex>
              <h3 class="font-weight-thin">Full Name</h3>
              <p class="title mt-2 font-weight-bold">{{ userInfo.name }}</p>
            </v-flex>
            <v-flex>
              <h3 class="font-weight-thin">Department</h3>
              <p class="title mt-2 font-weight-bold">{{ userInfo.department }}</p>
            </v-flex>
            <v-flex>
              <h3 class="font-weight-thin">Joined Date</h3>
              <p class="title mt-2 font-weight-bold">{{ userInfo.date_joined }}</p>
            </v-flex>
            <v-flex>
              <h3 class="font-weight-thin">Contact</h3>
              <p class="title mt-2 font-weight-bold">{{ userInfo.contact_number }}</p>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import User from '@/models/User'
  import BaseMixin from '@/mixins/baseMixin.js'
  import BreadCrumb from '@/components/common/BreadCrumb'

  export default {
    mixins: [BaseMixin],
    components: { BreadCrumb },
    created () {
      this.displaySnack()
    },
    async mounted () {
      let user = await User.find('me')
      this.userInfo = user
    },
    data () {
      return {
        htmlTitle: 'My Profile | core.aayulogic',
        breadCrumbs: [
          { text: 'Home', disabled: false, to: '/' },
          { text: 'My Profile', disabled: true }
        ],
        notify: {},
        userInfo: {},
      }
    }
  }
</script>
