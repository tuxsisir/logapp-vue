<template>
  <v-card>
    <v-breadcrumbs :items="breadCrumbItems"
                   class="py-2 px-3 mb-1">
      <v-icon slot="divider">chevron_right</v-icon>
    </v-breadcrumbs>
  </v-card>
</template>

<script>
  export default {
    name: 'BreadCrumb',
    props: {
      breadCrumbItems: {
        type: Array,
        required: true
      }
    },
    data () {
      return {}
    }
  }
</script>
