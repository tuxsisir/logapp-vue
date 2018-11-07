<template>
  <v-form>
    <v-card>
      <v-card-title>
        <h3>Review Log</h3>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-flex>
          <v-textarea
            v-validate="'required'"
            v-model="remarks"
            v-bind="veeValidate('remarks', 'Review')"
            prepend-icon="edit"
            rows="5"
          ></v-textarea>
          <v-select
            v-validate="'required'"
            :items="ratingChoices"
            v-model="rating"
            v-bind="veeValidate('rating', 'Rating')"
            prepend-icon="start">
          </v-select>
        </v-flex>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="pa-3">
        <v-btn :disabled="errors.any()"
               color="primary"
               @click="reviewLog">Review Log</v-btn>
        <v-btn flat>Reset</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
  import { mapMutations } from 'vuex'
  import VeeValidate from '@/mixins/veeValidateMixin.js'

  export default {
    mixins: [VeeValidate],
    props: {
      formData: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        logId: '',
        remarks: '',
        rating: 'Average',
        ratingChoices: ['Poor', 'Average', 'Good', 'Very Good', 'Excellent']
      }
    },
    mounted () {
      this.logId = this.formData.id
      if (this.formData.log_review.length > 0) {
        this.rating = this.formData.log_review[0].rating
        this.remarks = this.formData.log_review[0].remarks
      }
    },
    methods: {
      ...mapMutations(['setSnack']),
      reviewLog () {
        let postData = {
          rating: this.rating,
          remarks: this.remarks
        }
        this.$axios.$post('/work-log/review/' + this.logId + '/', postData).then((response) => {
          this.setSnack('Successfully reviewed log.')
          this.$router.push('/admin/reviewed-logs/')
        }).catch((error) => {
          this.pushErrors(error)
        })
      }
    }
  }
</script>
