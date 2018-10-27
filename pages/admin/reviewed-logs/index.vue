<template>
  <v-layout row wrap>
    <v-flex md12 xs12>
      <bread-crumb :breadCrumbItems="breadCrumbs"></bread-crumb>
    </v-flex>
    <v-flex>
      <reviewed-by-me></reviewed-by-me>
    </v-flex>
  </v-layout>
</template>
<script>
  import BaseMixin from '@/mixins/BaseMixin.js'
  import BreadCrumb from '@/components/common/BreadCrumb'
  import ReviewedByMe from '@/components/admin/ReviewedByMe'

  export default {
    middleware: ['admin'],
    mixins: [BaseMixin],
    components: { BreadCrumb, ReviewedByMe },
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
