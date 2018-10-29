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
            prepend-icon="edit"
            v-model='remarks'
            rows="5"
            v-validate="'required'"
            v-bind="this.veeValidate('remarks', 'Review')"
          ></v-textarea>
          <v-select
            prepend-icon="start"
            :items="ratingChoices"
            v-model="rating"
            v-validate="'required'"
            v-bind="this.veeValidate('rating', 'Rating')">
          </v-select>
        </v-flex>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="pa-3">
        <v-btn color="primary" :disabled="errors.any()" @click="reviewLog">Review Log</v-btn>
        <v-btn flat>Reset</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
  import { mapMutations } from 'vuex'
  import VeeValidate from '@/mixins/veeValidateMixin.js'

  export default {
    props: {
      formData: {
        type: Object,
        required: true
      }
    },
    mounted () {
      this.logId = this.formData.id
      if (this.formData.log_review.length > 0) {
        this.rating = this.formData.log_review[0].rating
        this.remarks = this.formData.log_review[0].remarks
      }
    },
    mixins: [VeeValidate],
    data () {
      return {
        logId: '',
        remarks: '',
        rating: 'Average',
        ratingChoices: ['Poor', 'Average', 'Good', 'Very Good', 'Excellent']
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
