<template>
  <v-layout row wrap align-center justify-center>
    <v-flex md10 offset-md-1>
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
                <v-card-title class="title">{{ item.user.name }} {{ item.points_scored }} Point/s</v-card-title>
                <v-card-text class="white text--primary">
                  <p class="subheading"><i>{{ item.text }}</i></p>
                  <!--<v-btn-->
                    <!--v-if="item.score_criteria.title == 'Work Log'"-->
                    <!--:color="item.score_color"-->
                    <!--class="mx-0"-->
                    <!--outline-->
                  <!--&gt;-->
                    <!--View Work Log-->
                  <!--</v-btn>-->
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
          <no-ssr>
            <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading">
              <span slot="no-more">No more data found ...</span>
            </infinite-loading>
          </no-ssr>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    data () {
      return {
        items: [],
        nextLimit: null,
        nextOffset: null
      }
    },
    methods: {
      infiniteHandler ($state) {
        this.$axios.$get('/score/log/',
          {
            params: {
              limit: this.nextLimit,
              offset: this.nextOffset
            }
          }).then((response) => {
          if (response.next) {
            this.extractLimitOffset(response.next)
            this.items = this.items.concat(response.results)
            $state.loaded()
          } else {
            this.items = this.items.concat(response.results)
            $state.complete()
          }
        })
      },
      extractLimitOffset (nextLink) {
        let link = new URL(nextLink)
        this.nextLimit = link.searchParams.get('limit')
        this.nextOffset = link.searchParams.get('offset')
      }
    }
  }
</script>
