<template>
  <v-layout row
            wrap>
    <v-flex md12
            xs12>
      <bread-crumb :bread-crumb-items="breadCrumbs"></bread-crumb>
      <vue-notify :notify="notify"></vue-notify>
    </v-flex>
    <v-flex>
      <reviewed-by-me></reviewed-by-me>
    </v-flex>
  </v-layout>
</template>
<script>
  import BaseMixin from '@/mixins/baseMixin.js'
  import BreadCrumb from '@/components/common/BreadCrumb'
  import ReviewedByMe from '@/components/admin/ReviewedByMe'

  export default {
    middleware: ['admin'],
    components: { BreadCrumb, ReviewedByMe },
    mixins: [BaseMixin],
    data () {
      return {
        htmlTitle: 'Reviewed Logs | core.aayulogic',
        breadCrumbs: [
          { text: 'Overview', disabled: false, to: '/admin/overview/' },
          { text: 'Logs Reviewed By You', disabled: true }
        ],
        notify: {}
      }
    },
    created () {
      this.displaySnack()
    }
  }
</script>
