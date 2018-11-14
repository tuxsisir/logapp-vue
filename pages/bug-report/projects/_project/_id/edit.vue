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
            <h4 class="subheading">Edit Bug</h4>
            <small class="body-1">Fill up the form below to edit the bug.</small>
          </div>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text v-if="fetched">
          <report-bug-form :form-data="editData"></report-bug-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
  import ReportBugForm from '@/components/forms/ReportBug'
  import BugReport from '@/models/BugReport'

  export default {
    components: { ReportBugForm },
    data () {
      return {
        breadCrumbs: [
          { text: 'Home', disabled: false, to: '/' },
          { text: 'Bug Window', disabled: false, to: '/bug-report/' },
          { text: 'Bug Edit', disabled: true }
        ],
        editData: {},
        fetched: false
      }
    },
    validate ({ params }) {
      return /^\d+$/.test(params.id)
    },
    created () {
      this.getBugDetails(this.$route.params.id)
    },
    methods: {
      async getBugDetails (bugID) {
        let bugDetail = await BugReport.find(bugID)
        this.editData = bugDetail
        this.fetched = true
      }
    }
  }
</script>
