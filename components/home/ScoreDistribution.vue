<template>
  <v-layout row
            wrap
            align-center
            justify-center>
    <v-flex md10
            offset-md-1>
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
          <v-layout
            row
            wrap
            align-center
            justify-center>
            <v-flex md10
                    offset-md-1>
              <v-timeline dense>
                <v-timeline-item
                  v-for="(item, i) in items"
                  :color="item.score_color"
                  :icon="item.score_criteria.icon_class || 'star'"
                  :key="i"
                >
                  <v-card class="elevation-0">
                    <v-expansion-panel>
                      <v-expansion-panel-content
                        expand-icon=""
                      >
                        <div slot="header"
                             class="subheading">
                          <v-layout>
                            <v-flex>
                              <v-avatar
                                size="30"
                                color="grey lighten-4"
                              >
                                <v-img :src="item.user.profile_picture"
                                       alt="avatar"></v-img>
                              </v-avatar>
                              {{ item.user.name }} scored {{ item.points_scored }} Point/s on {{
                              item.score_criteria.title }}
                            </v-flex>
                            <v-flex class="text-xs-right grey--text hidden-xs-only">
                              <v-icon
                                size="20"
                                class="mr-1"
                              >calendar_today
                              </v-icon>
                              {{ item.dated_on }}
                            </v-flex>
                          </v-layout>
                        </div>
                        <p class="px-4"><i>{{ item.text }}</i></p>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-card>
                </v-timeline-item>
              </v-timeline>
              <no-ssr>
                <infinite-loading ref="infiniteLoading"
                                  @infinite="infiniteHandler">
                  <span slot="no-more">No more data found ...</span>
                </infinite-loading>
              </no-ssr>
            </v-flex>
          </v-layout>
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
        this.$axios.$get('/score/log/', {
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
