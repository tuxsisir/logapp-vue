<template>
  <v-layout row wrap>
    <v-flex md12 xs12>
      <bread-crumb :breadCrumbItems="breadCrumbs"></bread-crumb>
    </v-flex>
    <v-flex>
      Logs Reviewed By You
    </v-flex>
  </v-layout>
</template>
<script>
  import BaseMixin from '@/mixins/BaseMixin.js'
  import BreadCrumb from '@/components/common/BreadCrumb'

  export default {
    middleware: ['admin'],
    mixins: [BaseMixin],
    components: { BreadCrumb },
    data () {
      return {
        htmlTitle: 'Reviewed Logs | core.aayulogic',
        breadCrumbs: [
          { text: 'Logs To Review', disabled: true }
        ]
      }
    }
  }
</script>
