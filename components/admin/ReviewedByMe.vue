<template>
  <v-layout row wrap align-center justify-center>
    <v-flex md12>
      <v-card>
        <v-card-title>
          <div>
            <h3 class="headline mb-0 font-weight-thin">Logs Reviewed By Me</h3>
            <small class="text-muted">
              Following list refers to the work logs reviewed by you.
            </small>
          </div>
          <h2 class="font-weight-thin"></h2>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-expansion-panel v-if="items.length > 0" inset>
            <v-expansion-panel-content
              v-for="(item, index) in items"
              :key="index"
            >
              <div slot="header" class="title">
                {{ item.log.log_by.name }} - {{ item.log.log_date }}
              </div>
              <v-card>
                <v-card-text>
                  <v-layout row wrap>
                    <v-flex md8>
                      <div id="markdownPreview" v-html='$md.render(item.log.log)'></div>
                    </v-flex>
                    <v-flex md4>
                      <h4>Log Review</h4>
                      <v-divider class="my-4"></v-divider>
                      <p>{{ item.remarks }}</p>
                      <v-divider class="my-4"></v-divider>
                      <p class="font-weight-bold">{{ item.rating }}</p>
                    </v-flex>
                  </v-layout>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn flat color="info" router :to="'/admin/review-logs/' + item.log.id + '/detail/'">
                    View Log Details
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-card-text>
        <no-ssr>
          <infinite-loading @infinite="infiniteHandlerLogs" ref="infiniteLoading">
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
        nextLimit: null,
        nextOffset: null
      }
    },
    methods: {
      infiniteHandlerLogs ($state) {
        this.$axios.$get('/work-log/reviewed/by/me/',
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
