import { mapMutations } from 'vuex'

export default {
  head () {
    return {
      title: this.htmlTitle
    }
  },
  methods: {
    ...mapMutations(['setSnack']),
    displaySnack () {
      let notifyMsg = this.$store.state.snack
      if (notifyMsg !== '') {
        this.notify = {
          text: notifyMsg,
          color: 'green',
          display: true
        }
        this.clearSnack()
      }
    },
    clearSnack () {
      this.setSnack('')
    }
  }
}
