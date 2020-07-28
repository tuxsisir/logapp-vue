<template>
  <div>
    <team-loader v-if="contentLoading"></team-loader>
    <v-layout v-else
              row
              wrap
              fill-height>
      <v-flex md12
              xs12>
        <bread-crumb :bread-crumb-items="breadCrumbs"></bread-crumb>
      </v-flex>
      <v-flex
        md6
        xs12
      >
        <v-menu
          :close-on-content-click="false"
          v-model="menu2"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="start_date"
            label="Start Date"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="start_date"
                         @input="menu2 = false"></v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex
        md6
        xs12
      >
        <v-menu
          :close-on-content-click="false"
          v-model="end_date_menu"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="end_date"
            label="End Date"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="end_date"
                         @input="end_date_menu = false"></v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex v-for="user in users"
              :key="user.username"
              md3
              xs12
              class="mb-4 px-1">
        <v-card>
          <v-img
            :src="user.cover_picture"
            :lazy-src="user.cover_picture"
            style="border: 1px solid #efefef"
            height="200"
            aspect-ratio="2.2"
            cover>
            <v-layout
              slot="placeholder"
              fill-height
              align-center
              justify-center
              ma-0
            >
              <v-progress-circular indeterminate
                                   color="blue lighten-5"></v-progress-circular>
            </v-layout>
          </v-img>
          <v-avatar
            :tile="false"
            :size="120"
            color="white"
            style="top: 30%; left: 5%; position: absolute"
          >
            <v-img :src="`http://localhost:8000/static/images/avatars/avatar.png`"
                   alt="avatar"
                   aspect-ratio="1.7"></v-img>
          </v-avatar>
          <v-card-text min-height="100px">
            <div class="mt-5">
              <v-layout row
                        wrap
                        justify-end>
                <v-flex md8
                        text-xs-left>
                  <h4 class="title mb-0 mt-4">{{ user.name }}</h4>
                </v-flex>
                <v-flex md4
                        text-xs-right>
                  <v-btn flat
                         fab>
                    <!--<v-icon dark>add</v-icon>-->
                    <h4 class="display-1 mb-2 mt-2 text-muted">{{ user.score || 'N/a' }}</h4>
                  </v-btn>
                </v-flex>
              </v-layout>
              <p class="caption text-grey">({{ user.department }})</p>
              <v-tooltip bottom>
                <p slot="activator"
                   class="text-truncate caption">
                  {{ user.status || '-' }}
                </p>
                <span>{{ user.status || 'N/A' }}</span>
              </v-tooltip>
              <v-tooltip bottom>
                <div>
                  <i slot="activator"
                     class="text-truncate text-no-wrap">{{ user.status || 'N/A' }}</i>
                </div>
                <span>{{ user.status }}</span>
              </v-tooltip>
            </div>
            <v-btn :to="'/team/' + user.username + '/profile'"
                   block
                   flat
                   router
                   class="mt-4">
              <h4 class="blue--text">View Profile</h4>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <vue-notify :notify="notify"></vue-notify>
  </div>
</template>

<script>
  import BaseMixin from '@/mixins/baseMixin.js'
  import TeamLoader from '@/components/loaders/TeamLoader'

  export default {
    components: { TeamLoader },
    mixins: [BaseMixin],
    data () {
      return {
        htmlTitle: 'Team | core.aayulogic',
        users: {},
        contentLoading: false,
        breadCrumbs: [
          { text: 'Home', disabled: false, to: '/' },
          { text: 'Team', disabled: true, to: '/settings/score/' }
        ],
        notify: {},
        start_date: '2018-08-01',
        end_date: null,
        menu2: false,
        end_date_menu: false
      }
    },
    watch: {
      end_date (val) {
        let params = { 'start_date': this.start_date, 'end_date': val }
        this.fetchData(params)
      }
    },
    created () {
      this.displaySnack()
    },
    async mounted () {
      this.fetchData()
    },
    methods: {
      async fetchData (params) {
        this.contentLoading = true
        await this.$axios.$get('/score/team/', { params }).then((response) => {
          this.users = response
          this.contentLoading = false
        })
      }
    }
  }
</script>
