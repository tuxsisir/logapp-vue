<template>
  <v-layout row
            wrap
            align-center>
    <v-flex v-for="count in numberOfLoaders"
            :key="count"
            md3
            xs12
            class="mb-5">
      <instagram-loader :speed="1"></instagram-loader>
    </v-flex>
  </v-layout>
</template>

<script>
  import { InstagramLoader, BulletListLoader, ListLoader, ContentLoader, FacebookLoader } from 'vue-content-loader'

  export default {
    components: { FacebookLoader, ContentLoader, BulletListLoader, ListLoader, InstagramLoader },
    data () {
      return {
        numberOfLoaders: 8
      }
    }
  }
</script>
