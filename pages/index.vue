<template>
  <div>
    <v-tabs
      centered
      color="dark"
      dark
      icons-and-text
    >
      <v-tabs-slider color="yellow"></v-tabs-slider>
      <v-tab
        v-for="tab in tabData"
        :key="tab.name"
        v-on:click="currentTab = tab.name">
        {{ tab.name }}
        <v-icon>{{ tab.icon }}</v-icon>
      </v-tab>
    </v-tabs>
    <component v-bind:is="currentTabComponent" class="tab"></component>
  </div>
</template>

<script>
  import BaseMixin from '@/mixins/baseMixin.js'
  import Score from '@/components/home/ScoreDistribution'
  import Notice from '@/components/home/NoticeBoard'
  import Reviewed from '@/components/home/ReviewedLogs'

  export default {
    components: {
      'tab-score-distribution': Score,
      'tab-noticeboard': Notice,
      'tab-your-reviewed-logs': Reviewed
    },
    mixins: [BaseMixin],
    data () {
      return {
        htmlTitle: 'Home | core.aayulogic',
        currentTab: 'Score Distribution',
        text: 'sdf',
        tabData: [
          { 'name': 'Score Distribution', 'icon': 'star', 'count': 0 },
          { 'name': 'NoticeBoard', 'icon': 'edit', 'count': 0 },
          { 'name': 'Your Reviewed Logs', 'icon': 'wc', 'count': 0 }
        ]
      }
    },
    computed: {
      currentTabComponent: function () {
        return 'tab-' + this.currentTab.split(' ').join('-').toLowerCase()
      }
    }
  }
</script>

