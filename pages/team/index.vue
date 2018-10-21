<template>
  <div>
    <team-loader v-if="contentLoading"></team-loader>
    <v-layout v-else row wrap fill-height>
      <v-flex md12 xs12>
        <bread-crumb :breadCrumbItems="breadCrumbs"></bread-crumb>
      </v-flex>
      <v-flex md3 xs12 class="mb-4 px-1"
              v-for="user in users"
              v-bind:key="user.username">
        <v-card>
          <v-img
            style="border: 1px solid #efefef"
            height="200"
            aspect-ratio="2.2"
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
          <v-avatar
            :tile="false"
            :size="120"
            color="white"
            class=""
            style="top: 30%; left: 5%; position: absolute"
          >
            <v-img :src="user.profile_picture" alt="avatar" aspect-ratio="1.7"></v-img>
          </v-avatar>
          <v-card-title primary-title class="mt-3" style="height: 160px">
            <div class="mt-4">
              <h3 class="headline mb-0 font-weight-bold mr-3 text-md-left">{{ user.name }}</h3>
              <p class="caption text-grey">(Programming)</p>
              <p class="">{{ user.status | truncate(10, '...') || 'N/A' }}</p>
            </div>
          </v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex md6 xs12>
                <v-btn flat router :to="'/team/' + user.username + '/profile'">
                  <h4 class="blue--text">View Profile</h4>
                </v-btn>
              </v-flex>
              <v-flex md6 xs12>
                <v-btn flat>
                  <h4 class="blue--text">{{ user.score || 'N/a' }}</h4>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <vue-notify :notify="notify"></vue-notify>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import TeamLoader from '@/components/loaders/TeamLoader'
  import UserScore from '@/models/Score'
  import BaseMixin from '@/mixins/BaseMixin.js'
  import BreadCrumb from '@/components/common/BreadCrumb'

  export default {
    mixins: [BaseMixin],
    components: {BreadCrumb, TeamLoader},
    async mounted () {
      this.contentLoading = true
      this.users = await UserScore.get()
      this.contentLoading = false
    },
    created () {
      let notifyMsg = this.$store.state.snack
      if (notifyMsg !== '') {
        this.notify = {
          text: notifyMsg,
          color: 'green',
          display: true
        }
        this.clearSnack()
      }
    },
    data () {
      return {
        htmlTitle: 'Team | core.aayulogic',
        users: {},
        contentLoading: false,
        breadCrumbs: [
          {text: 'Home', disabled: false, to: '/'},
          {text: 'Team', disabled: true, to: '/settings/score/'}
        ],
        notify: {}
      }
    },
    methods: {
      ...mapMutations(['setSnack']),
      clearSnack () {
        this.setSnack('')
      }
    }
  }
</script>
