<template>
  <div>
    <v-text-field
      v-model="search"
      append-icon="search"
      label="Search"
      single-line
      hide-details
    ></v-text-field>
    <v-data-table
      :headers="headers"
      :items="fetchedResults"
      :total-items="pagination.totalItems"
      :pagination.sync="pagination"
      :loading="loading"
      :rows-per-page-items="rowsPerPageItems"
      class="elevation-1"
    >
      <v-progress-linear slot="progress"
                         color="blue"
                         indeterminate></v-progress-linear>
      <template slot="items"
                slot-scope="props">
        <td>{{ props.item.title }}</td>
        <td>
          <div id="markdownPreview"
               class="pa-3"
               v-html="truncateBugDescription($md.render(props.item.description))"></div>
        </td>
        <td>{{ props.item.project }}</td>
        <td>{{ props.item.category }}</td>
        <td>{{ props.item.status }}</td>
        <td>{{ props.item.priority }}</td>
        <td>
          <v-avatar
            size="20"
            color="grey lighten-4"
          >
            <v-img :src="props.item.reporter.profile_picture"
                   alt="avatar"
                   class="mr-2"></v-img>
          </v-avatar>
          {{ props.item.reporter.name }}
        </td>
        <td class="">
          <v-btn
            :to="`/bug-report/${props.item.id}/detail/`"
            icon
            flat
            class="text-muted"
            router>
            <v-icon>view_list</v-icon>
          </v-btn>
        </td>
      </template>
      <v-alert slot="no-data"
               :value="true"
               color="info"
               icon="warning"
               class="my-3">
        <span v-if="search.length > 0">Your search for "{{ search }}" found no results.</span>
        <span v-else>BUGS BUNNY not found.</span>
      </v-alert>
    </v-data-table>
  </div>
</template>
<script>
  import BugReport from '@/models/BugReport'
  import DataTableMixin from '@/mixins/dataTableMixin.js'

  export default {
    mixins: [DataTableMixin],
    data () {
      return {
        headers: [
          { text: 'Bug Title', align: 'left', sortable: true, value: 'title' },
          { text: 'Bug Description', align: 'left', sortable: false, width: '30%' },
          { text: 'Project', align: 'left', sortable: false, value: 'name' },
          { text: 'Category', align: 'left', sortable: false, value: 'name' },
          { text: 'Status', align: 'left', sortable: true, value: 'status' },
          { text: 'Priority', align: 'left', sortable: true, value: 'priority' },
          { text: 'Reported By', value: 'log_date' },
          { text: 'Action', value: 'action', sortable: false }
        ],
        search: '',
        endpoint: '',
        loading: false,
        rowsPerPageItems: [5, 7, 10]
      }
    },
    created () {
      let model = new BugReport()
      this.endpoint = `${model.endpoint()}/by-me/`
    },
    methods: {
      truncateBugDescription (bugDescription) {
        return this.$options.filters.truncate(bugDescription, 100)
      }
    }
  }
</script>
