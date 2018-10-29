<template>
  <div>
    <v-layout row wrap>
      <v-flex md12>
        <bread-crumb :breadCrumbItems="breadCrumbs"></bread-crumb>
      </v-flex>
      <v-flex md12>
        <v-card>
          <v-card-title>
            Write down your work log here and you can preview your markdown on the other side.
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text v-if="fetched">
            <work-log-form v-bind:formData="editData"></work-log-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
  import WorkLog from '@/models/WorkLog'
  import BaseMixin from '@/mixins/baseMixin.js'
  import BreadCrumb from '@/components/common/BreadCrumb'
  import WorkLogForm from '@/components/forms/WorkLogForm'

  export default {
    mixins: [BaseMixin],
    components: { BreadCrumb, WorkLogForm },
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
          this.editData = response
          this.fetched = true
        })
      }
    },
    data () {
      return {
        htmlTitle: 'Edit Log | core.aayulogic',
        breadCrumbs: [
          { text: 'Home', disabled: false, to: '/' },
          { text: 'Edit Log', disabled: true }
        ],
        fetched: false,
        editData: {}
      }
    }
  }
</script>
