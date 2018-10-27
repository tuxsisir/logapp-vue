<template>
  <v-layout row wrap>
    <v-flex md12 xs12>
      <bread-crumb :breadCrumbItems="breadCrumbs"></bread-crumb>
    </v-flex>
    <v-flex>
      <v-card>
        <v-card-title>
          <div>
            <h3 class="headline mb-0 font-weight-thin">Distribute Score</h3>
            <small class="text-muted">
              You will be able to provide score to your subordinates from here. Stay tuned!
            </small>
          </div>
          <h2 class="font-weight-thin"></h2>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-card class="text-xs-center" dark>
            <v-card-text>
              <p class="subheading">Distribute Score</p>
              <v-divider></v-divider>
              <v-icon class="icon-lg">stars</v-icon>
            </v-card-text>
          </v-card>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
  import BaseMixin from '@/mixins/BaseMixin.js'
  import BreadCrumb from '@/components/common/BreadCrumb'

  export default {
    middleware: ['admin'],
    mixins: [BaseMixin],
    components: { BreadCrumb },
    data () {
      return {
        htmlTitle: 'Distribute Score | core.aayulogic',
        breadCrumbs: [
          { text: 'Overview', disabled: false, to: '/admin/overview/'},
          { text: 'Distribute Score', disabled: true }
        ]
      }
    }
  }
</script>
