<template>
  <v-layout row
            wrap
            justify-center>
    <v-flex xs12>
      <bread-crumb :bread-crumb-items="breadCrumbs"></bread-crumb>
    </v-flex>
    <v-flex md8
            offset-md-2>
      <v-card>
        <v-card-title>
          <h2 class="font-weight-thin">Change Password</h2>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form>
            <v-text-field
              v-validate="'required'"
              v-model="form.old_password"
              v-bind="veeValidate('old_password', 'Old Password')"
              prepend-icon="vpn_key"
              type="password">
            </v-text-field>
            <v-text-field
              v-validate="'required'"
              v-model="form.new_password"
              v-bind="veeValidate('new_password', 'New Password')"
              prepend-icon="lock"
              type="password">
            </v-text-field>
            <v-text-field
              v-validate="'required'"
              v-model="form.confirm_password"
              v-bind="veeValidate('confirm_password', 'Confirm Password')"
              prepend-icon="lock_open"
              type="password">
            </v-text-field>
            <v-btn :disabled="errors.any()"
                   color="info"
                   @click="submitForm">Submit</v-btn>
            <v-btn>Reset</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
      <vue-notify :notify="notify"></vue-notify>
    </v-flex>
  </v-layout>
</template>

<script>
  import VeeValidate from '@/mixins/veeValidateMixin.js'
  import BaseMixin from '@/mixins/baseMixin.js'

  export default {
    mixins: [BaseMixin, VeeValidate],
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
    },
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
    }
  }
</script>
