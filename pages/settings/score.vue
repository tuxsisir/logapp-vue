<template>
  <v-layout row wrap>
    <v-flex xs12>
      <bread-crumb :breadCrumbItems="breadCrumbs"></bread-crumb>
    </v-flex>
    <v-flex xs12>
      <v-card class="elevation-6">
        <v-card-text>
          <v-layout justify-center row wrap align-center>
            <v-flex md6 xs12>
              <div class="pa-3 mx-2 text-xs-center">
                <h4 class="display-4 text-muted">{{ score }}</h4>
                Your total points.
                <v-divider class="my-4"></v-divider>
                <p class="mt-3 text-muted">
                  <span class="title">{{ quote }}</span>
                </p>
              </div>
              <v-divider class="hidden-sm-and-up my-3"></v-divider>
            </v-flex>
            <v-flex md6 xs12>
              <v-img
                style="border: 1px solid #efefef"
                :src="`https://picsum.photos/900/900/?random`"
                :lazy-src="`https://picsum.photos/900/900/?random`" aspect-ratio="1.1" cover>
                <v-layout
                  slot="placeholder"
                  fill-height
                  align-center
                  justify-center
                  ma-0
                >
                  <v-progress-circular indeterminate color="blue lighten-5"></v-progress-circular>
                </v-layout>
              </v-img>
            </v-flex>
          </v-layout>
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
        htmlTitle: 'Settings | Score | core.aayulogic',
        score: '',
        quote: 'All our dreams can come true, if we have the courage to pursue them. - Walt Disney',
        breadCrumbs: [
          { text: 'Home', disabled: false },
          { text: 'Score', disabled: false }
        ]
      }
    },
    created () {
      this.fetchScore()
    },
    methods: {
      async fetchScore () {
        await this.$axios.$get('/user/detail/my-score').then((response) => {
          this.score = response.total
        })
      },
      fetchQuote () {
      }
    }
  }
</script>
