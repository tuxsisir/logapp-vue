<template>
  <v-layout row
            wrap>
    <v-flex md12>
      <bread-crumb :bread-crumb-items="breadCrumbs"></bread-crumb>
    </v-flex>
    <v-flex>
      <v-card>
        <v-card-title>
          Report Bug for {{ currentProject }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <report-bug-form></report-bug-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
  import BaseMixin from '@/mixins/baseMixin.js'
  import ReportBugForm from '@/components/forms/ReportBug'

  export default {
    components: { ReportBugForm },
    mixins: [BaseMixin],
    data () {
      return {
        htmlTitle: 'Bug Report | Report Bug | core.aayulogic',
        breadCrumbs: [
          { text: 'Home', disabled: false, to: '/' },
          { text: 'Bug Report', disabled: true },
          { text: 'Report Bug', disabled: true }
        ]
      }
    },
    validate ({ params }) {
      let projectsSlug = ['realhrsoft', 'merojob', 'rojgari', 'rspl', 'core-aayulogic']
      if (projectsSlug.includes(params.project)) {
        return true
      }
    },
    computed: {
      currentProject () {
        return this.$route.params.project
      }
    }
  }
</script>
