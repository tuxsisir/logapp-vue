<template>
  <div id="speed-dial">
    <v-card>
      <v-img
        :src="`https://picsum.photos/1200/300/?random`"
        :lazy-src="`https://picsum.photos/1200/300/?random`"
        aspect-ratio="5"
      >
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
      <v-card-text class="py-0">
        <v-layout row
                  wrap>
          <v-flex md5>
            <div v-if="fetched && scheduleLog.length > 0">
              <v-timeline
                align-top
                dense
              >
                <v-timeline-item
                  v-for="schedule in scheduleLog"
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
                    <v-flex text-xs-right>
                      <v-btn icon
                             @click="(dialog = true) && (deleteID = schedule.id)">
                        <v-icon size="15"
                                class="grey--text">delete
                        </v-icon>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-timeline-item>
              </v-timeline>
            </div>
            <div v-else>
              <v-alert :value="true"
                       class="mt-5 py-4"
                       color="info"
                       icon="info"
                       outline>
                You don't have any clocks for today!
              </v-alert>
            </div>
          </v-flex>
          <v-flex md7>
            <v-layout align-center>
              <v-flex
                md2
                class="mt-4">
                <strong class="display-4 grey--text">{{ today[2] }}</strong>
              </v-flex>
              <v-flex md2
                      class="ml-3">
                <div class="headline font-weight-light mt-5"
                     v-text="today[0]">
                </div>
                <div class="text-uppercase font-weight-light">{{ today[1] }} {{ today[3] }}</div>
              </v-flex>
              <v-flex md8
                      text-xs-left>
                <p class="headline mt-5 font-weight-thin">{{ greetings }}, <span class="primary--text font-weight-bold">{{ getUserFullName }}!</span>
                </p>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex>
                <v-form ref="form"
                        v-model="valid"
                        lazy-validation>
                  <v-textarea
                    v-model="remarks"
                    :rules="remarksRules"
                    label="Remarks for your clock actions."
                    type="text"
                    rows="3"
                  ></v-textarea>
                </v-form>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
    <!-- DIALOG -->
    <v-dialog v-model="dialog"
              persistent
              max-width="400">
      <v-card>
        <v-card-title class="headline">
          Delete Clock Time
          <v-spacer></v-spacer>
          <v-btn icon
                 @click="dialog = false">
            <v-icon class="grey--text">
              cancel
            </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          You are about to delete your clock, however you can action with your clock again!
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1"
                 flat
                 @click="deleteClock">Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- / DIALOG -->
    <v-speed-dial
      v-model="fab"
      :bottom="true"
      :right="false"
      :left="true"
      :top="false"
      direction="right"
      transition="slide-x-transition"
      open-on-hover
    >
      <v-btn
        slot="activator"
        v-model="fab"
        color="blue darken-2"
        dark
        fab
      >
        <v-icon>watch</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn
        dark
        small
        color="green lighten-2"
        @click="createSchedule('clock_in')"
      >
        Clock In
      </v-btn>
      <v-btn
        dark
        small
        color="deep-purple lighten-3"
        @click="createSchedule('break_out')"
      >
        Break Out
      </v-btn>
      <v-btn
        dark
        small
        color="red lighten-3"
        @click="createSchedule('break_in')"
      >
        Break In
      </v-btn>
      <v-btn
        dark
        small
        color="yellow darken-2"
        @click="createSchedule('clock_out')"
      >
        Clock Out
      </v-btn>
    </v-speed-dial>
    <vue-notify :notify="notify"></vue-notify>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import BaseMixin from '@/mixins/baseMixin.js'
  import DailySchedule from '@/models/DailySchedule'

  export default {
    mixins: [BaseMixin],
    data () {
      return {
        htmlTitle: 'Daily Schedule | core.aayulogic',
        valid: true,
        fab: '',
        remarks: '',
        remarksRules: [
          v => !!v || 'Remarks is required.'
        ],
        scheduleLog: [],
        fetched: false,
        notify: {},
        dialog: false,
        deleteID: null
      }
    },
    computed: {
      ...mapGetters(['getUserFullName']),
      today () {
        let date = new Date()
        return date.toDateString().split(' ')
      },
      greetings () {
        let date = new Date()
        let hours = date.getHours()
        if (hours > 0 && hours < 12) {
          return 'Good Morning'
        } else if (hours > 12 && hours < 18) {
          return 'Good Afternoon'
        } else if (hours > 18 && hours < 20) {
          return 'Good Evening'
        } else {
          return 'Good Night...'
        }
      }
    },
    created () {
      this.displaySnack()
      this.fetchTodaySchedule()
    },
    methods: {
      async fetchTodaySchedule () {
        let data = await new DailySchedule().first()
        this.scheduleLog = data['results']
        this.fetched = true
      },
      createSchedule (clockType) {
        let formData = {
          'clock_type': clockType,
          'remarks': this.remarks
        }
        if (this.$refs.form.validate()) {
          this.$axios.$post('/user/daily-schedule/', formData).then((response) => {
            this.scheduleLog.push(response)
            this.notify = {
              'text': 'Successfully logged your clock.',
              'color': 'green',
              'display': true
            }
          })
        }
      },
      deleteClock () {
        this.$axios.$delete('/user/daily-schedule/' + this.deleteID + '/').then((response) => {
          this.notify = {
            'text': 'Successfully deleted your clock.',
            'color': 'green',
            'display': true
          }
          this.dialog = false
          this.fetchTodaySchedule()
        })
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
