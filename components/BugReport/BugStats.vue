<template>
  <v-layout row
            wrap>
    <v-flex>
      <v-card>
        <v-card-title class="align-center justify-space-between">
          <span class="headline font-weight-thin">
            Total Bugs
          </span>
          <span class="headline blue--text">{{ bugStats.total_bugs }}</span>
        </v-card-title>
      </v-card>
    </v-flex>
    <v-flex>
      <v-card>
        <v-card-title class="align-center justify-space-between">
          <span class="headline font-weight-thin">
            Resolved
          </span>
          <span class="headline orange--text">{{ bugStats.resolved }}</span>
        </v-card-title>
      </v-card>
    </v-flex>
    <v-flex>
      <v-card>
        <v-card-title class="align-center justify-space-between">
          <span class="headline font-weight-thin">
            Unresolved
          </span>
          <span class="headline red--text">{{ bugStats.unresolved }}</span>
        </v-card-title>
      </v-card>
    </v-flex>
    <v-flex>
      <v-card>
        <v-card-title class="align-center justify-space-between">
          <span class="headline font-weight-thin">In Progress</span>
          <span class="headline green--text">{{ bugStats.in_progress }}</span>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    props: {
      bugStats: {
        type: Object,
        required: true
      }
    }
  }
</script>
