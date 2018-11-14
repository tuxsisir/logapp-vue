<template>
  <v-layout row
            wrap>
    <v-flex md12>
      <bread-crumb :bread-crumb-items="breadCrumbs"></bread-crumb>
    </v-flex>
    <v-flex md12>
      <v-card>
        <v-card-title primary-title
                      class="py-2">
          <div>
            <h3 class="subheading">Bug Reports By Me</h3>
            <small class="grey--text">Review the following table for all the bugs being reported by you.</small>
          </div>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <bug-reports-by-me></bug-reports-by-me>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
  import BaseMixin from '@/mixins/baseMixin.js'
  import BugReportsByMe from '@/components/BugReport/ReportedByMe'

  export default {
    components: { BugReportsByMe },
    mixins: [BaseMixin],
    data () {
      return {
        htmlTitle: 'Bug Report | Reported By Me | core.aayulogic',
        breadCrumbs: [
          { text: 'Home', disabled: false, to: '/' },
          { text: 'Bug Report', disabled: true },
          { text: 'Reported By Me', disabled: true }
        ]
      }
    }
  }
</script>
