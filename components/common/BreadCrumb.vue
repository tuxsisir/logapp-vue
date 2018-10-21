<template>
  <v-breadcrumbs class="py-2 px-3 mb-1 elevation-1" :items="breadCrumbItems">
    <v-icon slot="divider">chevron_right</v-icon>
  </v-breadcrumbs>
</template>

<script>
  export default {
    name: 'BreadCrumb',
    props: {breadCrumbItems: Array},
    data () {
      return {}
    }
  }
</script>
