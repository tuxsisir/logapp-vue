<template>
  <v-snackbar
    :value="true"
    :timeout="notify.time || 6000"
    :color="notify.color"
    v-model="notify.display"
    right
  >
    {{ notify.text }}
    <v-btn
      color="white"
      flat
      @click="notify.display = false"
    >
      <v-icon color="white">cancel</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
  export default {
    props: {
      notify: {
        type: Object,
        required: true
      }
    }
  }
</script>
