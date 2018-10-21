<template>
  <v-layout align-center row wrap>
    <v-flex md12>
      <v-card class="elevation-6">
        <v-card-text>
          <v-layout justify-center row wrap>
            <v-flex md6 xs12 class="text-xs-center px-4">
              <h2 class="font-weight-thin">Whoah.. Such a darkness here!</h2>
              <v-divider class="mt-4 mb-5"></v-divider>
              <div v-if="error.statusCode === 404">
                <h3 class="display-2">404</h3>
                <h4 class="display-1 font-weight-thin my-4">Page Not Found</h4>
                <p class="">The page you are looking for does not exist.</p>
              </div>
              <div v-if="error.statusCode === 500">
                <h3 class="display-2">404</h3>
                <h4 class="display-1 font-weight-thin my-4">Internal Server Error</h4>
                <p class="">The page you are looking for does not exist.</p>
              </div>
              <v-btn color="primary" @click="goBack">Go Back</v-btn>
              <v-divider class="hidden-sm-and-up my-3"></v-divider>
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
      </v-card>
    </v-flex>
  </v-layout>

</template>

<script>
  export default {
    layout: 'blank',
    props: {
      error: Object
    },
    data () {
      return {}
    },
    methods: {
      goBack () {
        window.history.back()
      }
    }
  }
</script>
