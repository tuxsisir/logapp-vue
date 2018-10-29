<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="1000"
      persistent
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Welcome to the new change!
        </v-card-title>
        <v-card-text>
          <v-layout justify-center align-center row wrap>
            <v-flex md6 xs12>
              <h2 class="text-xs-center px-3">core.aayulogic welcomes you with its updated look with vue and vuetify.</h2>
            </v-flex>
            <v-flex md6 xs12>
              <v-img
                style="border: 1px solid #efefef"
                :src="`https://picsum.photos/900/900/?random`"
                :lazy-src="`https://picsum.photos/900/900/?random`" aspect-ratio="1.1" cover>
                <v-layout
                  slot="placeholder"
                  fill-height
                  align-center
                  justify-center
                  ma-0
                >
                  <v-progress-circular indeterminate color="blue lighten-5"></v-progress-circular>
                </v-layout>
              </v-img>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            Let's go!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dialog: true
      }
    }
  }
</script>
