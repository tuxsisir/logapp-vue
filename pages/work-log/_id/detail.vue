<template>
  <div>
    <work-log-detail-loader v-if="contentLoading"></work-log-detail-loader>
    <v-layout v-else
              row
              wrap>
      <v-flex md12
              xs12>
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
        <v-card>
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
                class="my-3">
          <v-card-title>
            <h2 class="font-weight-thin">Score / Review</h2>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-layout align-center
                      justify-space-between>
              <v-flex>
                <h3 class="display-1 text-muted text-xs-center font-weight-thin">{{ fetchedResults.score_data[0].points_scored }}</h3>
              </v-flex>
              <v-flex>
                <h3 class="display-1 text-muted font-weight-thin text-xs-center">{{ fetchedResults.score_data[0].point_name }}</h3>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import WorkLog from '@/models/WorkLog'
  import BaseMixin from '@/mixins/baseMixin.js'
  import BreadCrumb from '@/components/common/BreadCrumb'
  import UserHoverCard from '@/components/common/UserHoverCard'
  import WorkLogDetailLoader from '@/components/loaders/WorkLogDetailLoader'

  export default {
    components: { UserHoverCard, WorkLogDetailLoader, BreadCrumb },
    mixins: [BaseMixin],
    data () {
      return {
        htmlTitle: 'Work Log | Detail | core.aayulogic',
        breadCrumbs: [
          { text: 'Home', disabled: false, to: '/' },
          { text: 'Work Log Detail', disabled: true }
        ],
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
        await WorkLog.find(detailID).then((response) => {
          this.fetchedResults = response
          this.log = response.log
        })
        this.contentLoading = false
      }
    }
  }
</script>
