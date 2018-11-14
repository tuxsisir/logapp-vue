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
          <v-flex md6>
            <v-timeline
              align-top
              dense
            >
              <v-timeline-item
                color="pink"
                small
              >
                <v-layout pt-3>
                  <v-flex xs3>
                    <strong>5pm</strong>
                  </v-flex>
                  <v-flex>
                    <strong>New Icon</strong>
                    <div class="caption">Mobile App</div>
                  </v-flex>
                </v-layout>
              </v-timeline-item>
              <v-timeline-item
                color="teal lighten-3"
                small
              >
                <v-layout wrap
                          pt-3>
                  <v-flex xs3>
                    <strong>3-4pm</strong>
                  </v-flex>
                  <v-flex>
                    <strong>Design Stand Up</strong>
                    <div class="caption mb-2">Hangouts</div>
                    <v-avatar>
                      <v-img
                        src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairFrida&accessoriesType=Kurt&hairColor=Red&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=GraphicShirt&clotheColor=Gray01&graphicType=Skull&eyeType=Wink&eyebrowType=RaisedExcitedNatural&mouthType=Disbelief&skinColor=Brown"
                      ></v-img>
                    </v-avatar>
                    <v-avatar>

                      <v-img
                        src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Prescription02&hairColor=Black&facialHairType=MoustacheMagnum&facialHairColor=BrownDark&clotheType=BlazerSweater&clotheColor=Black&eyeType=Default&eyebrowType=FlatNatural&mouthType=Default&skinColor=Tanned"
                      ></v-img>
                    </v-avatar>
                    <v-avatar>
                      <v-img
                        src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairMiaWallace&accessoriesType=Sunglasses&hairColor=BlondeGolden&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Surprised&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Pale"
                      ></v-img>
                    </v-avatar>
                  </v-flex>
                </v-layout>
              </v-timeline-item>
              <v-timeline-item
                color="pink"
                small
              >
                <v-layout pt-3>
                  <v-flex xs3>
                    <strong>12pm</strong>
                  </v-flex>
                  <v-flex>
                    <strong>Lunch break</strong>
                  </v-flex>
                </v-layout>
              </v-timeline-item>

              <v-timeline-item
                color="teal lighten-3"
                small
              >
                <v-layout pt-3>
                  <v-flex xs3>
                    <strong>9-11am</strong>
                  </v-flex>
                  <v-flex>
                    <strong>Finish Home Screen</strong>
                    <div class="caption">Web App</div>
                  </v-flex>
                </v-layout>
              </v-timeline-item>
            </v-timeline>
          </v-flex>
          <v-flex md6>
            <v-layout align-center>
              <v-flex
                md2
                class="mt-4">
                <strong class="display-4 grey--text">{{ today[2] }}</strong>
              </v-flex>
              <v-flex md2>
                <div class="headline font-weight-light mt-5"
                     v-text="today[0]">
                </div>
                <div class="text-uppercase font-weight-light">{{ today[1] }} {{ today[3] }}</div>
              </v-flex>
              <v-flex md8
                      text-xs-left>
                <p class="headline mt-5">{{ greetings }} {{ getUserFullName }} ...</p>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex>
                <v-textarea
                  v-model="remarks"
                  :messages="['Remarks for your clock actions.']"
                  type="text"
                  rows="3"
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
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
        color="green"
      >
        Clock In
      </v-btn>
      <v-btn
        dark
        small
        color="deep-purple darken-3"
      >
        Break Out
      </v-btn>
      <v-btn
        dark
        small
        color="red"
      >
        Break In
      </v-btn>
      <v-btn
        dark
        small
        color="yellow darken-3"
      >
        Clock Out
      </v-btn>
    </v-speed-dial>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        fab: '',
        remarks: ''
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
    }
  }
</script>
