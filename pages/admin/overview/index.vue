<template>
  <v-layout align-center justify-center row wrap>
    <v-flex md12>
      <bread-crumb :breadCrumbItems="breadCrumbs"></bread-crumb>
    </v-flex>
    <v-flex>
      <v-card>
        <v-card-title>
          <div>
            <h3 class="headline mb-0 font-weight-thin">Team Leader Overview</h3>
            <small class="text-muted">
              Stay tuned!
            </small>
          </div>
          <h2 class="font-weight-thin"></h2>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-card class="text-xs-center" dark>
            <v-card-text>
              <p class="subheading">Team Leader Overview</p>
              <v-divider></v-divider>
              <v-icon class="icon-lg">pie_chart</v-icon>
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
    mixins: [BaseMixin],
    components: { BreadCrumb },
    data () {
      return {
        htmlTitle: 'Overview',
        breadCrumbs: [
          { text: 'core.aayulogic', disabled: false },
          { text: 'Overview', disabled: true }
        ]
      }
    }
  }
</script>
