<template>
  <v-form>
    <v-flex>
      <v-checkbox
        v-model="form.checked"
        label="Have you reviewed the log?"
        type="checkbox"
      ></v-checkbox>
      <v-textarea
        prepend-icon="edit"
        v-model='form.review'
        rows="3"
        v-validate="'required'"
        v-bind="this.veeValidate('review', 'Review')"
      ></v-textarea>
    </v-flex>
    <v-flex>
      <v-select
        prepend-icon="start"
        :items="ratingChoices"
        v-model="form.rating"
        v-validate="'required'"
        v-bind="this.veeValidate('rating', 'Rating')">
      </v-select>
    </v-flex>
    <v-flex>
      <v-btn color="primary">Log Work</v-btn>
      <v-btn>Reset</v-btn>
    </v-flex>
  </v-form>
</template>

<script>

  import WorkLog from '@/models/WorkLog'
  import VeeValidate from '@/mixins/VeeValidateMixin.js'

  export default {
    data () {
      return {
        ratingChoices: ['Poor', 'Average', 'Good', 'Very Good', 'Excellent'],
        form: {
          review: '',
          checked: '',
          rating: ''
        }
      }
    }
  }
</script>
