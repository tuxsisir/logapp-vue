import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations(['setSnack']),
    displaySnack () {
      let snackContent = this.$store.state.snack
      if (snackContent !== '') {
        let self = this
        setTimeout(function () {
          self.notify = {
            text: snackContent,
            color: 'green',
            display: true
          }
        }, 500)
        this.clearSnack()
      }
    },
    clearSnack () {
      this.setSnack('')
    }
  }
}
