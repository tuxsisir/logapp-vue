<template>
  <v-layout align-center justify-center row wrap>
    <v-flex md12>
      <bread-crumb :breadCrumbItems="breadCrumbs"></bread-crumb>
    </v-flex>
    <v-flex md6 offset-md-3>
      <v-card>
        <v-card-title>
          <h2 class="font-weight-thin">About core.aayulogic.com</h2>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <ul>
            <li>Founded on August 2018.</li>
          </ul>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import BaseMixin from '@/mixins/baseMixin.js'
  import BreadCrumb from '@/components/common/BreadCrumb'

  export default {
    mixins: [BaseMixin],
    components: { BreadCrumb },
    data () {
      return {
        htmlTitle: 'About | core.aayulogic',
        breadCrumbs: [
          { text: 'Home', disabled: false, to: '/' },
          { text: 'About', disabled: true },
          { text: 'core.aayulogic', disabled: true }
        ]
      }
    }
  }
</script>
