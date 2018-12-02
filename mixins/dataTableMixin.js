export default {
  data () {
    return {
      fetchedResults: [],
      pagination: {
        descending: true,
        totalItems: 0,
        rowsPerPage: 7 // default rows per page for all the data tables...
      }
    }
  },
  watch: {
    search (searchQuery) {
      let params = {
        search: searchQuery,
        offset: this.pagination.page - 1 * this.pagination.rowsPerPage,
        limit: this.pagination.rowsPerPage
      }
      this.loading = true
      this.$axios.$get(this.endpoint, { params })
        .then((response) => {
          this.fetchedResults = response.results
          this.pagination.totalItems = response.count
          this.loading = false
        })
    },
    pagination (paginatedData) {
      let sortBy = paginatedData.descending ? '-' + paginatedData.sortBy : paginatedData.sortBy
      let page = paginatedData.page - 1
      let offsetPage = page * paginatedData.rowsPerPage
      let params = {
        search: this.search,
        ordering: sortBy,
        offset: offsetPage,
        limit: paginatedData.rowsPerPage
      }
      this.loading = true
      this.$axios.$get(this.endpoint, { params })
        .then((response) => {
          this.fetchedResults = response.results
          this.pagination.totalItems = response.count
          this.loading = false
        })
    }
  }
}
