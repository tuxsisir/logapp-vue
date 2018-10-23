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
            :src="user.cover_picture"
            :lazy-src="user.cover_picture" cover>
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
          <v-card-text>
            <div class="mt-5">
              <v-layout row wrap justify-end>
                <v-flex md8 text-xs-left>
                  <h4 class="title mb-0 mt-4">{{ user.name }}</h4>
                </v-flex>
                <v-flex md4 text-xs-right>
                  <v-btn flat fab>
                    <!--<v-icon dark>add</v-icon>-->
                    <h4 class="display-1 mb-2 mt-2 text-muted">{{ user.score || 'N/a' }}</h4>
                  </v-btn>
                </v-flex>
              </v-layout>
              <p class="caption text-grey">({{ user.department }})</p>
              <v-tooltip bottom>
                <div>
                  <i slot="activator" class="text-truncate text-no-wrap">{{ user.status || 'N/A' }}</i>
                </div>
                <span>{{ user.status }}</span>
              </v-tooltip>
            </div>
            <v-btn block flat router :to="'/team/' + user.username + '/profile'" class="mt-4">
              <h4 class="blue--text">View Profile</h4>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <vue-notify :notify="notify"></vue-notify>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import TeamLoader from '@/components/loaders/TeamLoader'
  import UserScore from '@/models/Score'
  import BaseMixin from '@/mixins/BaseMixin.js'
  import BreadCrumb from '@/components/common/BreadCrumb'

  export default {
    mixins: [BaseMixin],
    components: { BreadCrumb, TeamLoader },
    async mounted () {
      this.contentLoading = true
      await UserScore.get().then((response) => {
        this.users = response
      })
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
          { text: 'Home', disabled: false, to: '/' },
          { text: 'Team', disabled: true, to: '/settings/score/' }
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
