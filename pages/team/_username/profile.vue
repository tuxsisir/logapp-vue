<template>
  <v-layout row wrap align-center justify-center>
    <v-flex md12>
      <bread-crumb :breadCrumbItems="breadCrumbs"></bread-crumb>
      <vue-notify :notify="notify"></vue-notify>
    </v-flex>
    <v-flex>
      <v-img
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
          class="public-profile-image"
        >
          <v-img :src="userDetail.profile_picture" alt="avatar" aspect-ratio="1.7">
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
      <v-toolbar color="blue" height="40" dark tabs>
        <v-tabs
          slot="extension"
          centered
          color="blue"
          slider-color="yellow"
        >
          <v-tab
            v-for="tab in tabHeadings"
            :key="tab"
            v-on:click="currentTab = tab">
            {{ tab }}
          </v-tab>
        </v-tabs>
      </v-toolbar>
      <v-tabs-items>
        <v-tab-item v-for="tab in tabHeadings"
                    :key="tab">
          <component v-bind:is="currentComponent" :userDetail="userDetail"></component>
        </v-tab-item>
      </v-tabs-items>

    </v-flex>
  </v-layout>
</template>
<style scoped>
  .public-profile-image {
    top: 300px;
    left: 90px;
  }
</style>
<script>
  import BaseMixin from '@/mixins/baseMixin.js'
  import BreadCrumb from '@/components/common/BreadCrumb'
  import User from '@/models/User'
  import GeneralInformation from '@/components/userDetail/GeneralInformation'
  import LogReviewer from '@/components/userDetail/LogReviewer'
  import WorkLogSummary from '@/components/userDetail/WorkLogSummary'

  export default {
    mixins: [BaseMixin],
    components: {
      'bread-crumb': BreadCrumb,
      'tab-general-information': GeneralInformation,
      'tab-work-log': WorkLogSummary,
      'tab-log-reviewers': LogReviewer
    },
    created () {
      this.displaySnack()
      let username = this.$route.params.username
      this.getUserDetail(username)
    },
    methods: {
      async getUserDetail (username) {
        let user = await User.find(username)
        this.userDetail = user
      }
    },
    validate ({ params }) {
      return /^[a-zA-Z0-9._-]+$/.test(params.username)
    },
    data () {
      return {
        htmlTitle: 'Team | Profile | core.aayulogic',
        breadCrumbs: [
          { text: 'Home', disabled: false, to: '/' },
          { text: 'Team', disabled: false, to: '/team/' },
          { text: 'Profile', disabled: true }
        ],
        notify: {},
        currentTab: 'General Information',
        tabHeadings: ['General Information', 'Work Log', 'Log Reviewers'],
        userDetail: {}
      }
    },
    computed: {
      currentComponent: function () {
        let tabComponent = this.currentTab.split(' ').join('-').toLowerCase()
        return 'tab-' + tabComponent
      }
    }
  }
</script>
