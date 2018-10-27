<template>
  <v-layout align-center justify-center row wrap>
    <v-flex md12>
      <bread-crumb :breadCrumbItems="breadCrumbs"></bread-crumb>
    </v-flex>
    <v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
  import BaseMixin from '@/mixins/BaseMixin.js'
  import BreadCrumb from '@/components/common/BreadCrumb'

  export default {
    mixins: [BaseMixin],
    components: { BreadCrumb },
    data () {
      return {
        htmlTitle: 'Application Switch | core.aayulogic',
        breadCrumbs: [
          { text: 'Application Switch', disabled: true }
        ]
      }
    }
  }
</script>
