<template>
  <v-layout row wrap>
    <v-flex md12 xs12>
      <bread-crumb :breadCrumbItems="breadCrumbs"></bread-crumb>
    </v-flex>
    <v-flex md8>
      <v-card>
        <v-card-title>
          <h2 class="font-weight-thin">Work Log Detail</h2>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <p class="mb-1">Created: {{ fetchedResults.created }}</p>
          <p class="mb-1">Modified: {{ fetchedResults.modified }}</p>
          <p v-text="'By: ' + fetchedResults"></p>
          {{ fetchedResults.log_by.name }}
          <v-divider class="mb-3"></v-divider>
          <div id="markdownPreview" v-html='$md.render(log)'></div>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex md4>
      <v-card>
        <v-card-title>
          <h2 class="font-weight-thin">Log Reviews</h2>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-alert color="info" :value="true" outline icon="warning">
            No log review found.
          </v-alert>
        </v-card-text>
      </v-card>
      <v-card class="my-3">
        <v-card-title>
          <h2 class="font-weight-thin">Score / Review</h2>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-layout align-center justify-space-between>
            <v-flex>
              <h3 class="display-1 text-muted text-xs-center font-weight-thin">12</h3>
            </v-flex>
            <v-flex>
              <h3 class="display-1 text-muted font-weight-thin text-xs-center">Good</h3>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-title>
          <h2 class="font-weight-thin">Review Log</h2>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
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
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<style scoped>
</style>
<script>
  import VeeValidate from '@/mixins/VeeValidateMixin.js'
  import WorkLog from '@/models/WorkLog'
  import BaseMixin from '@/mixins/BaseMixin.js'
  import BreadCrumb from '@/components/common/BreadCrumb'

  export default {
    mixins: [BaseMixin, VeeValidate],
    components: { BreadCrumb },
    validate ({ params }) {
      return /^\d+$/.test(params.id)
    },
    created () {
      let detailID = this.$route.params.id
      this.getLogDetail(detailID)
    },
    methods: {
      async getLogDetail (detailID) {
        await WorkLog.find(detailID).then((response) => {
          this.fetchedResults = response
          this.log = response.log
        })
      }
    },
    data () {
      return {
        htmlTitle: 'Work Log | Detail | core.aayulogic',
        log: '',
        breadCrumbs: [
          { text: 'Home', disabled: false, to: '/' },
          { text: 'Work Log Detail', disabled: true }
        ],
        ratingChoices: ['Poor', 'Average', 'Good', 'Very Good', 'Excellent'],
        form: {
          review: '',
          checked: '',
          rating: ''
        },
        fetchedResults: {}
      }
    }
  }
</script>
