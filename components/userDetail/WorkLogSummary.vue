<template>
  <v-layout row wrap align-center justify-center>
    <v-flex md8 md-offset-2>
      <v-card>
        <v-card-title>
          <h3 class="font-weight-thin">Work Log Summary</h3>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <div v-if="logsHidden">
            <v-alert :value="true" outline color="info" icon="info">
              Logs are hidden for {{ userDetail.name }}.
            </v-alert>
          </div>
          <v-expansion-panel v-if="items.length > 0 && !logsHidden">
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
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-card-text>
        <no-ssr v-if="!logsHidden">
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
        nextOffset: null,
        logsHidden: false
      }
    },
    methods: {
      infiniteHandlerLogs ($state) {
        this.$axios.$get('/work-log/public/user/' + this.userDetail.username + '/',
          {
            params: {
              limit: this.nextLimit,
              offset: this.nextOffset
            }
          }).then((response) => {
          if (Object.keys(response).includes('detail')) {
            this.logsHidden = true
          }
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
