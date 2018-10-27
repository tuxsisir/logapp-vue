<template>
  <div>
    <work-log-list-content-loader v-if="contentLoading"></work-log-list-content-loader>
    <v-layout v-else row align-center fill-height wrap>
      <vue-notify :notify="notify"></vue-notify>
      <v-flex md12 xs12>
        <bread-crumb :breadCrumbItems="breadCrumbs"></bread-crumb>
      </v-flex>
      <v-flex md12 xs12>
        <work-log-stats :statsData="logStats"></work-log-stats>
      </v-flex>
      <v-flex md12>
        <v-card>
          <v-card-title>
            <h2 class="font-weight-thin">List of your Work Logs</h2>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="fetchedResults"
            :total-items="pagination.totalItems"
            :pagination.sync="pagination"
            :loading="loading"
            :rows-per-page-items="rowsPerPageItems"
            class="elevation-1"
          >
            <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
            <template slot="items" slot-scope="props">
              <td>
                <div class="pa-3" id="markdownPreview" v-html="truncatedWorkLog($md.render(props.item.log))"></div>
              </td>
              <td class="">
                <div><span class="text-muted">Log of :</span> <span class="font-weight-bold">{{ props.item.log_date }}</span></div>
                <div><span class="text-muted">Created:</span> {{ props.item.created }}</div>
                <div><span class="text-muted">Modified:</span> {{ props.item.modified }}</div>
              </td>
              <td class="">
                <v-btn v-if="props.item.log_reviewed" small flat icon class="mr-3 text-muted" >
                  <v-icon small>done_all</v-icon>
                </v-btn>
                <v-btn v-else small flat icon class="text-muted" router :to="'/work-log/' + props.item.id + '/edit/'">
                  <v-icon small>edit</v-icon>
                </v-btn>
                <v-btn small flat icon class="mr-3 text-muted" router :to="'/work-log/' + props.item.id + '/detail'">
                  <v-icon small>list</v-icon>
                </v-btn>
              </td>
            </template>
            <v-alert slot="no-data" :value="true" color="info" icon="warning" class="my-3">
              <span v-if="search.length > 0">Your search for "{{ search }}" found no results.</span>
              <span v-else>No data found.</span>
            </v-alert>
            <template slot="footer">
              <td colspan="100%">
                <strong>List of all the work logs.</strong>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
  import WorkLogListContentLoader from '@/components/loaders/WorkLogListLoader'
  import BaseMixin from '@/mixins/BaseMixin.js'
  import DataTableMixin from '@/mixins/DataTableMixin.js'
  import WorkLogs from '@/models/WorkLog'
  import BreadCrumb from '@/components/common/BreadCrumb'
  import WorkLogStats from '@/components/worklog/StatsCounter'

  export default {
    mixins: [BaseMixin, DataTableMixin],
    components: { BreadCrumb, WorkLogStats, WorkLogListContentLoader },
    data () {
      return {
        htmlTitle: 'My Work Logs | core.aayulogic.com',
        breadCrumbs: [
          { text: 'Home', disabled: false },
          { text: 'My Work Logs', disabled: true }
        ],
        notify: {},
        search: '',
        endpoint: '',
        rowsPerPageItems: [10, 20, 30, 40, 50],
        contentLoading: false,
        loading: false,
        pagination: {
          totalItems: 0,
          rowsPerPage: 20,
          sortBy: ''
        },
        headers: [
          { text: 'Log', align: 'left', sortable: false, value: 'name' },
          { text: 'TimeStamp', value: 'timestamp' },
          { text: 'Action', value: 'action', sortable: false }
        ],
        logStats: {}
      }
    },
    created () {
      this.displaySnack()
      let model = new WorkLogs()
      this.endpoint = model.endpoint()
    },
    methods: {
      truncatedWorkLog (log) {
        return this.$options.filters.truncate(log, 100)
      }
    },
    async mounted () {
      this.contentLoading = true
      let logs = await WorkLogs.first()
      this.pagination.totalItems = logs.count
      this.logStats = logs.stats
      this.contentLoading = false
    }
  }
</script>
