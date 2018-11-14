<template>
  <v-layout row
            wrap
            align-center
            justify-center>
    <v-flex md12>
      <bread-crumb :bread-crumb-items="breadCrumbs"></bread-crumb>
    </v-flex>
    <v-flex md8
            offset-md-2>
      <v-progress-linear v-if="loading"
                         indeterminate></v-progress-linear>
      <div v-else>
        <v-card>
          <v-card-title>
            <h2 class="font-weight-thin">Work Log Status</h2>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div>
              <v-alert v-if="logsHidden"
                       :value="true"
                       color="info"
                       icon="info"
                       outline>
                Your work logs are hidden and only your reviewers can view them.
              </v-alert>
              <v-alert v-else
                       :value="true"
                       color="warning"
                       icon="warning"
                       outline>
                Kudos, your work logs are not hidden with any one from the team.
              </v-alert>
            </div>
          </v-card-text>
        </v-card>
        <v-card class="my-3">
          <v-card-title>
            <h2 class="font-weight-thin">User/s reviewing your logs.</h2>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-list v-if="reviewers.length > 0"
                    two-line>
              <template v-for="(item, index) in reviewers">
                <v-list-tile
                  :key="index"
                  avatar
                >
                  <v-list-tile-avatar>
                    <v-img :src="item.reviewer.profile_picture"></v-img>
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title v-html="item.reviewer.name"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="item.reviewer.department"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list>
            <div v-else>
              No one seems to be reviewing your log!
            </div>
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-title>
            <h2 class="font-weight-thin">User/s Log that you are reviewing.</h2>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-list v-if="asReviewer.length > 0"
                    two-line>
              <template v-for="(item, index) in asReviewer">
                <v-list-tile
                  :key="index"
                  avatar
                >
                  <v-list-tile-avatar>
                    <v-img :src="item.user.profile_picture"></v-img>
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title v-html="item.user.name"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="item.user.department"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list>
            <div v-else>
              You are not reviewer of anyone's log.
            </div>
          </v-card-text>
        </v-card>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
  import BaseMixin from '@/mixins/baseMixin.js'

  export default {
    mixins: [BaseMixin],
    data () {
      return {
        htmlTitle: 'Settings | Work Log | core.aayulogic',
        loading: false,
        logsHidden: false,
        reviewers: null,
        asReviewer: null,
        breadCrumbs: [
          { text: 'Home', disabled: false, to: '/' },
          { text: 'Work Log', disabled: true }
        ]
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      async fetchData () {
        this.loading = true
        await this.$axios.$get('/user/review/status/').then((response) => {
          this.logsHidden = response.logs_hidden
          this.asReviewer = response.as_reviewer
          this.reviewers = response.results
          this.loading = false
        })
      }
    }
  }
</script>
