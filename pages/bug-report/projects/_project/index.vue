<template>
  <div id="speed-dial">
    <v-layout
      row
      wrap
    >
      <v-flex md12>
        <bread-crumb :bread-crumb-items="breadCrumbs"></bread-crumb>
      </v-flex>
      <v-flex v-if="fetched"
              md12>
        <bug-stats :bug-stats="bugStats"></bug-stats>
      </v-flex>
      <v-flex md12>
        <bug-overview></bug-overview>
      </v-flex>
    </v-layout>
    <v-speed-dial
      v-model="fab"
      :bottom="true"
      :right="false"
      :left="true"
      :top="false"
      direction="right"
      transition="slide-x-transition"
      open-on-hover
    >
      <v-btn
        slot="activator"
        v-model="fab"
        color="blue darken-2"
        dark
        fab
      >
        <v-icon>bug_report</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn
        to="/bug-report/by-me/"
        fab
        dark
        small
        color="green"
      >
        <v-icon>account_box</v-icon>
      </v-btn>
      <v-btn
        :to="reportBug"
        fab
        dark
        small
        color="indigo"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-speed-dial>
  </div>
</template>
<script>
  import BugOverview from '@/components/BugReport/BugOverview'
  import BugStats from '@/components/BugReport/BugStats'

  export default {
    components: { BugOverview, BugStats },
    data () {
      return {
        fab: false,
        breadCrumbs: [],
        bugStats: '',
        fetched: false
      }
    },
    validate ({ params }) {
      let projectsSlug = ['realhrsoft', 'merojob', 'rojgari', 'rspl', 'core-aayulogic']
      if (projectsSlug.includes(params.project)) {
        return true
      }
    },
    computed: {
      reportBug () {
        return `/bug-report/projects/${this.$route.params.project}/report/`
      }
    },
    created () {
      this.breadCrumbs = [
        { text: 'Home', disabled: false, to: '/' },
        { text: 'Bug Window', disabled: false, to: '/bug-report/' },
        { text: this.$route.params.project, disabled: true }
      ]
      this.fetchBugStats()
    },
    methods: {
      fetchBugStats () {
        this.$axios.$get(`/bug/stats/${this.$route.params.project}/`).then((response) => {
          this.bugStats = response
          this.fetched = true
        })
      }
    }
  }
</script>
