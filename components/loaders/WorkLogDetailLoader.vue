<template>
  <v-layout row wrap mt-3>
    <v-flex md8>
      <content-loader :speed="1"></content-loader>
    </v-flex>
    <v-flex md4>
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
