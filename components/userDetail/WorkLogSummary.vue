<template>
  <v-layout row wrap align-center justify-center>
    <v-flex md8 md-offset-2>
      <v-card>
        <v-card-title>
          <h3 class="font-weight-thin">Work Log Summary</h3>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-card>
            <v-card-title>
              <h2 class="font-weight-thin">Work Logs</h2>
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
                <td>{{ props.item.log }}</td>
                <td class="">
                  <div><span class="text-muted">Created:</span> {{ props.item.created }}</div>
                  <div><span class="text-muted">Modified:</span> {{ props.item.modified }}</div>
                </td>
                <td class="">
                  <v-btn small flat icon class="mr-3 text-muted" router :to="'/work-log/' + props.item.id + '/detail'">
                    <v-icon small>list</v-icon>
                  </v-btn>
                  <v-btn small flat icon class="mr-3 text-muted">
                    <v-icon small>done_all</v-icon>
                  </v-btn>
                  <v-btn small flat icon class="text-muted">
                    <v-icon small>edit</v-icon>
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
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import WorkLogs from '@/models/WorkLog'
  import DataTableMixin from '@/mixins/DataTableMixin.js'

  export default {
    mixins: [DataTableMixin],
    data () {
      return {
        search: '',
        endpoint: '',
        rowsPerPageItems: [1, 2, 3, 4],
        pagination: {
          totalItems: 0,
          rowsPerPage: 4,
          sortBy: ''
        }
      }
    },
    created () {
      let model = new WorkLogs()
      this.endpoint = model.endpoint()
    }
  }
</script>
