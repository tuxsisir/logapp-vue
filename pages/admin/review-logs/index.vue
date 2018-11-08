<template>
  <v-layout row
            wrap>
    <v-flex md12
            xs12>
      <bread-crumb :bread-crumb-items="breadCrumbs"></bread-crumb>
    </v-flex>
    <v-flex>
      <logs-to-review></logs-to-review>
    </v-flex>
  </v-layout>
</template>
<script>
  import BaseMixin from '@/mixins/baseMixin.js'
  import LogsToReview from '@/components/admin/LogsToReview'

  export default {
    middleware: ['admin'],
    components: { LogsToReview },
    mixins: [BaseMixin],
    data () {
      return {
        htmlTitle: 'Logs To Review | core.aayulogic',
        breadCrumbs: [
          { text: 'Overview', disabled: false, to: '/admin/overview/' },
          { text: 'Logs To Review', disabled: true }
        ]
      }
    }
  }
</script>
