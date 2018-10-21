<template>
  <v-layout row wrap align-center justify-center>
    <v-flex md8 md-offset-2>
      <v-card>
        <v-card-title>
          <h3 class="font-weight-thin">General Information</h3>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-list>
            <v-list-tile
              @click=""
            >
              <v-list-tile-action>
                <v-icon>person_outline</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>
                  Username : <span class="text-xs-right font-weight-bold">{{userDetail.username}}</span>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              @click=""
            >
              <v-list-tile-action>
                <v-icon>person</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>
                  Full Name : <span class="text-xs-right font-weight-bold">{{userDetail.name}}</span>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              @click=""
            >
              <v-list-tile-action>
                <v-icon>work_outline</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>
                  Department : <span class="text-xs-right font-weight-bold">{{userDetail.department}}</span>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              @click=""
            >
              <v-list-tile-action>
                <v-icon>wc</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>
                  Gender : <span class="font-weight-bold">{{userDetail.gender}}</span>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              @click=""
            >
              <v-list-tile-action>
                <v-icon>star</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>
                  Status : <span class="font-weight-bold">{{userDetail.status || "N/A"}}</span>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              @click=""
            >
              <v-list-tile-action>
                <v-icon>phone</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>
                  Contact Number : <span class="font-weight-bold">{{userDetail.contact_number || "N/A" }}</span>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card-text>
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
      return {}
    }
  }
</script>
