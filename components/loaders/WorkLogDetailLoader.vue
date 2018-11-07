<template>
  <v-layout align-center
            row
            wrap
            mt-3>
    <v-flex md8
            xs12>
      <content-loader :speed="1"></content-loader>
    </v-flex>
    <v-flex md4
            xs12>
      <list-loader :speed="1"></list-loader>
    </v-flex>
  </v-layout>
</template>

<script>
  import { ContentLoader, ListLoader } from 'vue-content-loader'

  export default {
    components: { ListLoader, ContentLoader }
  }
</script>
