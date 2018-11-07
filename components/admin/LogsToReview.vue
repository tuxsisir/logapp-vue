<template>
  <v-layout row
            wrap
            align-center
            justify-center>
    <v-flex md12>
      <v-card>
        <v-card-title>
          <div>
            <h3 class="headline mb-0 font-weight-thin">Logs to Review</h3>
            <small class="text-muted">
              Review the logs that has been sent to you.
            </small>
          </div>
          <v-flex class="text-xs-right">
            <span>You have total {{ total }} logs to review.</span>
          </v-flex>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-expansion-panel v-if="items.length > 0"
                             focusable
                             popout>
            <v-expansion-panel-content
              v-for="(item, index) in items"
              :key="index"
            >
              <div slot="header"
                   class="title">
                {{ item.log_by.name }} - {{ item.log_date }}
              </div>
              <v-card>
                <v-card-text>
                  <div id="markdownPreview"
                       v-html="$md.render(item.log)"></div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn :to="'/admin/review-logs/' + item.id + '/detail/'"
                         flat
                         color="info"
                         router>
                    View Log Details to Review
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-card-text>
        <no-ssr>
          <infinite-loading ref="infiniteLoading"
                            @infinite="infiniteHandlerLogs">
            <span slot="no-more">No further data found.</span>
            <span slot="no-results">No further data found.</span>
          </infinite-loading>
        </no-ssr>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    data () {
      return {
        items: [],
        total: null,
        nextLimit: null,
        nextOffset: null
      }
    },
    methods: {
      infiniteHandlerLogs ($state) {
        this.$axios.$get('/work-log/to/review/',
                         {
                           params: {
                             limit: this.nextLimit,
                             offset: this.nextOffset
                           }
        }).then((response) => {
          this.total = response.count
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
