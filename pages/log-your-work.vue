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
          <v-card-text>
            <work-log-form></work-log-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
  import BaseMixin from '@/mixins/baseMixin.js'
  import BreadCrumb from '@/components/common/BreadCrumb'
  import WorkLogForm from '@/components/forms/WorkLogForm'

  export default {
    mixins: [BaseMixin],
    components: { BreadCrumb, WorkLogForm },
    data () {
      return {
        htmlTitle: 'Log Your Work | core.aayulogic',
        breadCrumbs: [
          { text: 'Home', disabled: false },
          { text: 'Log your Work', disabled: false }
        ]
      }
    }
  }
</script>
