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
        <td>
          <div><i>Title:</i> {{ truncateBugTitle(props.item.title) }}</div>
          <div id="markdownPreview"
               class="text-muted"
               v-html="truncateBugDescription($md.render(props.item.description))"></div>

        </td>
        <td>
          <div>{{ props.item.project }}</div>
          <div>{{ props.item.category }}</div>
        </td>
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
        <td>
          <v-btn
            :to="`/bug-report/projects/${currentProject}/${props.item.id}/detail/`"
            flat
            type="link"
            light
            nuxt
            small
            class="blue--text"
            color="transparent">
            View Details
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
    props: {
      category: {
        type: String,
        required: true,
        default () {
          return 'UI'
        }
      }
    },
    data () {
      return {
        headers: [
          { text: 'Bug Title', align: 'left', sortable: true, value: 'title', width: '20%' },
          { text: 'Project / Category', align: 'left', sortable: false },
          { text: 'Status', align: 'left', sortable: true, value: 'status' },
          { text: 'Priority', align: 'left', sortable: true, value: 'priority' },
          { text: 'Reported By', sortable: false, width: '20%' },
          { text: 'Action', align: 'left' }
        ],
        search: '',
        endpoint: '',
        loading: false,
        currentProject: this.$route.params.project,
        rowsPerPageItems: [5, 7, 10]
      }
    },
    created () {
      let model = new BugReport()
      this.endpoint = `${model.endpoint()}?category=${this.category}&project=${this.$route.params.project}`
    },
    methods: {
      truncateBugDescription (bugDescription) {
        return this.$options.filters.truncate(bugDescription, 50)
      },
      truncateBugTitle (bugTitle) {
        return this.$options.filters.truncate(bugTitle, 20)
      }
    }
  }
</script>
