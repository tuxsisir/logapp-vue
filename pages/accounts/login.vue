<template>
  <v-layout align-center row wrap @keyup.13="login">
    <v-flex md12>
      <v-card class="elevation-6">
        <v-card-text>
          <v-layout justify-center row wrap>
            <v-flex md6 xs12>
              <div class="pa-3 mx-2">
                <v-img src="/images/logo-blue.png" height="60px" contain></v-img>
                <v-divider class="mt-4 mb-5"></v-divider>
                <vue-notify :notify="notify"></vue-notify>
                <v-alert
                  v-if="invalid"
                  :value="true"
                  color="error"
                  icon="warning"
                  class="mb-3"
                  outline
                >
                  Invalid login credentials.
                </v-alert>
                <v-form>
                  <v-text-field prepend-icon="email"
                                type="text"
                                v-model="email"
                                v-validate="'email|max:50'"
                                :counter="50"
                                v-bind="this.veeValidate('email', 'Email Address')">
                  </v-text-field>
                  <v-text-field prepend-icon="vpn_key"
                                type="password"
                                v-model="password"
                                v-validate="'max:30'"
                                :counter="30"
                                v-bind="this.veeValidate('password', 'Password')">
                  </v-text-field>
                  <div class="mt-4">
                    <v-btn color="primary" @click="login">Login</v-btn>
                    <v-btn color="white" @click="clearForm">Reset</v-btn>
                  </div>
                  <div class="mt-4">
                    <v-btn flat small class="text-lowercase text-muted">&copy; aayulogic 2018</v-btn>
                  </div>
                </v-form>
              </div>
              <v-divider class="hidden-sm-and-up my-3"></v-divider>
            </v-flex>
            <v-flex md6 xs12>
              <v-img
                style="border: 1px solid #efefef"
                :src="`https://picsum.photos/900/900/?random`"
                :lazy-src="`https://picsum.photos/900/900/?random`" aspect-ratio="1.1" cover>
                <v-layout
                  slot="placeholder"
                  fill-height
                  align-center
                  justify-center
                  ma-0
                >
                  <v-progress-circular indeterminate color="blue lighten-5"></v-progress-circular>
                </v-layout>
              </v-img>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import BaseMixin from '@/mixins/baseMixin.js'
  import VeeValidate from '@/mixins/veeValidateMixin.js'
  import VueNotify from '@/components/common/VSnackBar'

  export default {
    auth: false,
    layout: 'account',
    middleware: 'guest',
    components: { VueNotify },
    mixins: [BaseMixin, VeeValidate],
    created () {
      this.displaySnack()
    },
    data () {
      return {
        htmlTitle: 'Login | Aayulogic',
        email: '',
        password: '',
        invalid: false,
        notify: {}
      }
    },
    computed: {
      ...mapGetters(['getUserFullName'])
    },
    methods: {
      ...mapMutations(['updateAuthToken']),
      async login () {
        try {
          await this.$auth.loginWith('local', {
            data: {
              email: this.email,
              password: this.password
            }
          }).then((response) => {
            this.updateAuthToken(this.$auth.getToken('local'))
            this.setSnack('Welcome to core.aayulogic ' + this.getUserFullName + '!')
            this.$router.push('/team')
          })
        } catch (error) {
          this.notify = { text: 'Invalid Login Credentials.', color: 'red', display: true }
          this.invalid = true
          this.pushErrors(error)
        }
      },
      clearForm () {
        this.email = ''
        this.password = ''
      }
    },
    props: {
      source: String
    }
  }
</script>
