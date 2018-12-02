<template>
  <v-layout row
            wrap>
    <v-flex md12>
      <bread-crumb :bread-crumb-items="breadCrumbs"></bread-crumb>
      <vue-notify :notify="notify"></vue-notify>
    </v-flex>
    <v-flex
      md12>
      <v-layout row
                wrap>
        <v-flex
          md12
          xs12>
          <v-date-picker
            v-model="monitorDate"
            :max="today()"
            min="2018-11-14"
            full-width
            landscape
            reactive
            class="mb-2"
          ></v-date-picker>
        </v-flex>
      </v-layout>
      <v-layout
        row
        wrap>
        <v-flex
          v-for="(user, index) in fetchedData"
          :key="index"
          md3
          xs12
        >
          <v-card>
            <v-card-title primary-title
                          class="py-2">
              <div class="mr-2">
                <v-avatar
                  :tile="false"
                  :size="30"
                  color="white"
                >
                  <v-img :src="user.profile_picture"
                         alt="avatar"
                         aspect-ratio="1.7">
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
                </v-avatar>
              </div>
              <div>
                <h3 class="subheading">{{ user.name }}</h3>
              </div>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text
              v-if="user.schedule_log.length > 0"
              class="py-0"
            >
              <v-timeline
                align-top
                dense
              >
                <v-timeline-item
                  v-for="schedule in user.schedule_log"
                  :key="schedule.id"
                  :color="clockTypeInfo(schedule.clock_type).color"
                  small
                >
                  <v-layout pt-3>
                    <v-flex xs3>
                      <strong>{{ schedule.time.short }}</strong>
                    </v-flex>
                    <v-flex>
                      <strong v-text="clockTypeInfo(schedule.clock_type).text"></strong>
                      <div class="caption">{{ schedule.remarks || 'N/A' }}</div>
                      <div class="caption">
                        {{ schedule.time.full }}
                      </div>
                    </v-flex>
                  </v-layout>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
            <v-card-text
              v-else>
              <v-alert
                :value="true"
                icon="warning"
                color="info"
                outline
                class="py-2"
              >
                No entries found.
              </v-alert>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  import BaseMixin from '@/mixins/baseMixin.js'

  export default {
    mixins: [BaseMixin],
    data () {
      return {
        htmlTitle: 'Daily Schedule | Monitor | core.aayulogic',
        breadCrumbs: [
          { text: 'Daily Schedule Log', disabled: true },
          { text: 'Monitor', disabled: true }
        ],
        notify: {},
        monitorDate: new Date().toISOString().substring(0, 10),
        fetched: false,
        fetchedData: []
      }
    },
    watch: {
      monitorDate (val) {
        this.fetched = false
        this.fetchData(val)
      }
    },
    created () {
      this.fetchData(this.monitorDate)
    },
    methods: {
      fetchData (scheduleDate) {
        let params = {
          date: scheduleDate
        }
        this.$axios.$get('/user/daily-schedule/monitor/', { params }).then((response) => {
          this.fetchedData = response
          this.fetched = true
        })
      },
      today () {
        return new Date().toISOString().substring(0, 10)
      },
      clockTypeInfo (clockType) {
        let clockTypes = {
          'clock_in': { text: 'Clock In', color: 'green lighten-2' },
          'break_out': { text: 'Break Out', color: 'deep-purple lighten-3' },
          'break_in': { text: 'Break In', color: 'red lighten-3' },
          'clock_out': { text: 'Clock Out', color: 'yellow darken-2' }
        }
        return clockTypes[clockType]
      }
    }
  }
</script>
