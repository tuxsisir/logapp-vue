<template>
  <v-layout row wrap align-center justify-center>
    <v-flex md8 offset-md-2>
      <v-card>
        <v-card-title>
          <div>
            <h3 class="headline mb-0 font-weight-thin">Score Distribution</h3>
            <small class="text-muted">The following score are distributed to the team members of all time.</small>
          </div>
          <h2 class="font-weight-thin"></h2>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-timeline align-top>
            <v-timeline-item
              v-for="(item, i) in items"
              :color="item.score_color"
              icon="star"
              :key="i"
            >
              <v-card
                :color="item.score_color"
                dark
              >
                <v-card-title class="title">{{ item.point_name }}</v-card-title>
                <v-card-text class="white text--primary">
                  <p>{{ item.text }}</p>
                  <v-btn
                    :color="item.color"
                    class="mx-0"
                    outline
                  >
                    Button
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    created () {
      this.fetchData()
    },
    methods: {
      async fetchData () {
        await this.$axios.$get('/score/log/').then((response) => {
          this.items = response.results
        })
      }
    },
    data () {
      return {
        items: []
      }
    }
  }
</script>
