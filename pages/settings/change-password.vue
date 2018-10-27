<template>
  <v-layout row wrap justify-center>
    <v-flex xs12>
      <bread-crumb :breadCrumbItems="breadCrumbs"></bread-crumb>
    </v-flex>
    <v-flex md8 offset-md-2>
      <v-card>
        <v-card-title>
          <h2 class="font-weight-thin">Change Password</h2>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form>
            <v-text-field
              prepend-icon="vpn_key"
              v-model="form.old_password"
              type="password"
              v-validate="'required'"
              v-bind="this.veeValidate('old_password', 'Old Password')">
            </v-text-field>
            <v-text-field
              prepend-icon="lock"
              v-model="form.new_password"
              type="password"
              v-validate="'required'"
              v-bind="this.veeValidate('new_password', 'New Password')">
            </v-text-field>
            <v-text-field
              prepend-icon="lock_open"
              v-model="form.confirm_password"
              type="password"
              v-validate="'required'"
              v-bind="this.veeValidate('confirm_password', 'Confirm Password')">
            </v-text-field>
            <v-btn color="info" :disabled="errors.any()" @click="submitForm">Submit</v-btn>
            <v-btn>Reset</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
      <vue-notify :notify="notify"></vue-notify:>
    </v-flex>
  </v-layout>
</template>

<script>
  import VeeValidate from '@/mixins/VeeValidateMixin.js'
  import BaseMixin from '@/mixins/BaseMixin.js'
  import BreadCrumb from '@/components/common/BreadCrumb'

  export default {
    mixins: [BaseMixin, VeeValidate],
    components: { BreadCrumb },
    methods: {
      submitForm () {
        this.$axios.$post('/user/detail/change-password/', this.form).then((response) => {
          this.notifyUser('Successfully changed your password!', 'green')
          this.clearForm(this.form)
        }).catch((error) => {
          this.notifyInvalidFormResponse()
          this.pushErrors(error)
        })
      },
      clearForm (formData) {
        Object.keys(formData).forEach(function (key) {
          formData[key] = ''
        })
      }
    },
    data () {
      return {
        htmlTitle: 'Settings | Change Password | core.aayulogic',
        form: {
          old_password: '',
          new_password: '',
          confirm_password: ''
        },
        breadCrumbs: [
          { text: 'Home', disabled: false },
          { text: 'Settings', disabled: true },
          { text: 'Change Password', disabled: true }
        ]
      }
    }
  }
</script>
