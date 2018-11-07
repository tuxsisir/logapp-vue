<template>
  <v-layout row
            wrap
            mt-3>
    <v-flex md3
            xs12>
      <work-log-list-loader :speed="1"></work-log-list-loader>
    </v-flex>
    <v-flex md3
            xs12>
      <work-log-list-loader :speed="1"></work-log-list-loader>
    </v-flex>
    <v-flex md3
            xs12>
      <work-log-list-loader :speed="1"></work-log-list-loader>
    </v-flex>
    <v-flex md3
            xs12>
      <work-log-list-loader :speed="1"></work-log-list-loader>
    </v-flex>
    <v-flex md12
            xs12
            mt-5>
      <content-loader :speed="1"></content-loader>
    </v-flex>
  </v-layout>
</template>

<script>
  import { ContentLoader } from 'vue-content-loader'
  import { WorkLogListLoader } from '@/utils/customLoaders'

  export default {
    components: { WorkLogListLoader, ContentLoader }
  }
</script>
