export default {
  data () {
    return {
      fetchedResults: []
    }
  },
  watch: {
    search (searchQuery) {
      let params = {
        search: searchQuery,
        offset: this.pagination.page - 1,
        limit: this.pagination.rowsPerPage
      }
      this.loading = true
      this.$axios.$get(this.endpoint, {params})
        .then((response) => {
          this.fetchedResults = response.results
          this.pagination.totalItems = response.count
          this.loading = false
        })
    },
    pagination (paginatedData) {
      let params = {
        offset: paginatedData.page - 1,
        limit: paginatedData.rowsPerPage
      }
      this.loading = true
      this.$axios.$get(this.endpoint, {params})
        .then((response) => {
          this.fetchedResults = response.results
          this.pagination.totalItems = response.count
          this.loading = false
        })
    }
  }
}
