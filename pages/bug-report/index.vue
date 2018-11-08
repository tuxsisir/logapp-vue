<template>
  <v-layout>
    <v-flex md12>
      <bread-crumb :bread-crumb-items="breadCrumbs"></bread-crumb>
    </v-flex>
    <v-flex md12>
    </v-flex>
  </v-layout>
</template>

<script>
  import BaseMixin from '@/mixins/baseMixin.js'

  export default {
    mixins: [BaseMixin],
    data () {
      return {
        htmlTitle: 'Bug Report | core.aayulogic',
        breadCrumbs: [
          { text: 'Home', disabled: false, to: '/' },
          { text: 'Bug Report', disabled: true }
        ]
      }
    }
  }
</script>
