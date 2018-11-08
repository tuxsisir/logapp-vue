<template>
  <div>
    <work-log-detail-loader v-if="contentLoading"></work-log-detail-loader>
    <v-layout v-if="fetched"
              row
              wrap>
      <v-flex md12>
        <bread-crumb :bread-crumb-items="breadCrumbs"></bread-crumb>
      </v-flex>
      <v-flex md8>
        <v-card>
          <v-card-title>
            <h2 class="font-weight-thin">Work Log Detail</h2>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <p class="mb-1">Created: {{ fetchedResults.created }}</p>
            <p class="mb-1">Modified: {{ fetchedResults.modified }}</p>
            <p>By: {{ fetchedResults.log_by.name }}</p>
            <v-divider class="mb-3"></v-divider>
            <div id="markdownPreview"
                 v-html="$md.render(log)"></div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex md4>
        <v-card class="mb-3">
          <v-card-title>
            <h2 class="font-weight-thin">Log Reviews</h2>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div v-if="fetchedResults.log_reviewed">
              <v-list>
                <v-list-tile>
                  <v-list-tile-avatar>
                    <user-hover-card :user-detail="fetchedResults.log_review[0].reviewer"></user-hover-card>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    {{ fetchedResults.log_review[0].remarks || 'N/A' }}
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </div>
            <v-alert v-else
                     :value="true"
                     color="info"
                     outline
                     icon="warning">
              No log review found.
            </v-alert>
          </v-card-text>
        </v-card>
        <v-card v-if="fetchedResults.score_data.length > 0"
                class="mb-3">
          <v-card-title>
            <h2 class="font-weight-thin">Score / Review</h2>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-layout align-center
                      justify-space-between>
              <v-flex>
                <h3 class="display-1 text-muted text-xs-center font-weight-thin">{{
                fetchedResults.score_data[0].points_scored }}</h3>
              </v-flex>
              <v-flex>
                <h3 class="display-1 text-muted font-weight-thin text-xs-center">{{
                fetchedResults.score_data[0].point_name }}</h3>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
        <work-log-review :form-data="fetchedResults"></work-log-review>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
  import BaseMixin from '@/mixins/baseMixin.js'
  import UserHoverCard from '@/components/common/UserHoverCard'
  import WorkLogDetailLoader from '@/components/loaders/WorkLogDetailLoader'
  import WorkLogReview from '@/components/forms/WorkLogReview'

  export default {
    components: { WorkLogDetailLoader, WorkLogReview, UserHoverCard },
    middleware: ['admin'],
    mixins: [BaseMixin],
    data () {
      return {
        htmlTitle: 'Log Review | core.aayulogic',
        breadCrumbs: [
          { text: 'Overview', disabled: false, to: '/admin/overview/' },
          { text: 'Log Review', disabled: true }
        ],
        fetched: false,
        log: '',
        fetchedResults: {},
        contentLoading: true
      }
    },
    validate ({ params }) {
      return /^\d+$/.test(params.id)
    },
    created () {
      let detailID = this.$route.params.id
      this.getLogDetail(detailID)
    },
    methods: {
      async getLogDetail (detailID) {
        this.contentLoading = true
        this.$axios.$get('/work-log/public/detail/' + detailID + '/').then((response) => {
          this.fetchedResults = response
          this.log = response.log
          this.fetched = true
        })
        this.contentLoading = false
      }
    }
  }
</script>
