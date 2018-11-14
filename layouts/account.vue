<template>
  <v-app id="inspire">
    <v-content>
      <v-container fill-height>
        <nuxt></nuxt>
      </v-container>
    </v-content>
    <vue-notify :notify="notify"></vue-notify>
  </v-app>
</template>

<script>
  import LayoutMixin from '@/mixins/layoutMixin.js'

  export default {
    mixins: [LayoutMixin],
    data () {
      return {
        notify: {}
      }
    },
    created () {
      this.displaySnack()
    }
  }
</script>
