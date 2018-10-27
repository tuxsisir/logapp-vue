<template>
  <v-layout row wrap align-center justify-center>
    <v-flex md8 md-offset-2>
      <v-card>
        <v-card-title>
          <h3 class="font-weight-thin">Work Log Summary</h3>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-expansion-panel v-if="items.length > 0">
            <v-expansion-panel-content
              v-for="(item, index) in items"
              :key="index"
            >
              <div slot="header" class="subheading">
                <span class="font-weight-bold">Log of - {{ item.log_date }}</span>
              </div>
              <v-card>
                <v-card-text>
                  <div id="markdownPreview" v-html='$md.render(item.log)'></div>
                  <v-divider class="my-4"></v-divider>
                  {{ item }}
                  <v-btn router :to="'/work-log/' + item.id + '/detail/'" outline color="info">
                    View Log Details
                  </v-btn>
                </v-card-text>
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
    props: {
      userDetail: Object
    },
    data () {
      return {
        items: [],
        nextLimit: null,
        nextOffset: null
      }
    },
    methods: {
      infiniteHandlerLogs ($state) {
        this.$axios.$get('/work-log/public/' + this.userDetail.username + '/',
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
