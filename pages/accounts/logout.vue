<template>
  <v-layout align-center justify-center row wrap>
    <v-flex md12>
      <bread-crumb :breadCrumbItems="breadCrumbs"></bread-crumb>
    </v-flex>
    <v-flex md6 offset-md-3>
      <v-card class="text-xs-center">
        <v-card-title>
          <h2 class="text-xs-center font-weight-thin">You are logging out from the application!</h2>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <p>Are you sure you want to logout?</p>
          <v-divider class="my-4"></v-divider>
          <v-btn color="info" @click="logout">Yes Log Me Out</v-btn>
          <v-card class="text-xs-center mt-5" dark>
            <v-card-text>
              <p>See you soon on the other side ;)</p>
              <v-divider></v-divider>
              <v-icon style="font-size: 10rem;">time_to_leave</v-icon>
            </v-card-text>
          </v-card>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
  import { mapMutations } from 'vuex'
  import BaseMixin from '@/mixins/baseMixin.js'
  import BreadCrumb from '@/components/common/BreadCrumb'

  const Cookie = process.client ? require('js-cookie') : undefined

  export default {
    mixins: [BaseMixin],
    components: { BreadCrumb },
    data () {
      return {
        htmlTitle: 'Account | Logout | core.aayulogic ',
        breadCrumbs: [
          { text: 'Home', disabled: false },
          { text: 'Sayonara', disabled: true }
        ]
      }
    },
    methods: {
      ...mapMutations(['updateAuthToken', 'setSnack']),
      async logout () {
        await this.$auth.logout()
        Cookie.remove('auth')
        this.updateAuthToken(null)
        this.setSnack('Successfully logged out! See you soon.')
        this.$router.push('/accounts/login')
      }
    }
  }
</script>
