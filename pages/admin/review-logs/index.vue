<template>
  <v-layout row wrap>
    <v-flex md12 xs12>
      <bread-crumb :breadCrumbItems="breadCrumbs"></bread-crumb>
    </v-flex>
    <v-flex>
      <logs-to-review></logs-to-review>
    </v-flex>
  </v-layout>
</template>
<script>
  import BaseMixin from '@/mixins/baseMixin.js'
  import BreadCrumb from '@/components/common/BreadCrumb'
  import LogsToReview from '@/components/admin/LogsToReview'

  export default {
    middleware: ['admin'],
    mixins: [BaseMixin],
    components: { LogsToReview, BreadCrumb },
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
