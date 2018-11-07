<template>
  <v-layout row
            wrap>
    <v-flex>
      <v-card>
        <v-card-title class="align-center justify-space-between">
          <span class="headline font-weight-thin">
            Total Work Logs
          </span>
          <span class="headline green--text">{{ statsData.total_work_logs }}</span>
        </v-card-title>

      </v-card>
    </v-flex>
    <v-flex >
      <v-card>
        <v-card-title class="align-center justify-space-between">
          <span class="headline font-weight-thin">
            Your Reviewed Logs
          </span>
          <span class="headline red--text">{{ statsData.reviewed_logs }}</span>
        </v-card-title>
      </v-card>
    </v-flex>
    <v-flex >
      <v-card>
        <v-card-title class="align-center justify-space-between">
          <span class="headline font-weight-thin">
            Your Log Reviewers
          </span>
          <span class="headline blue--text">{{ statsData.log_reviewers }}</span>
        </v-card-title>
      </v-card>
    </v-flex>
    <v-flex >
      <v-card>
        <v-card-title class="align-center justify-space-between">
          <span class="headline font-weight-thin">
            Today's Work Log
          </span>
          <span class="headline">
            <v-icon v-if="statsData.log_of_today"
                    class="green--text">done_all</v-icon>
            <v-icon v-else
                    class="yellow--text">report</v-icon>
          </span>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    props: {
      statsData: {
        type: Object,
        required: true
      }
    },
    data () {
      return {}
    }
  }
</script>
