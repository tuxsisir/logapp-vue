<template>
  <v-layout row
            wrap>
    <v-flex md12>
      <bread-crumb :bread-crumb-items="breadCrumbs"></bread-crumb>
    </v-flex>
    <v-flex md12>
      <v-card>
        <v-card-title primary-title>
          <div>
            <div class="title mb-2">Edit Profile</div>
            <span class="grey--text">Fill up the following form to edit your profile</span>
          </div>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form enctype="multipart/form-data">
            <v-layout row
                      wrap>
              <v-flex md4>
                <v-text-field
                  v-validate="'alpha_spaces|required|max:50'"
                  v-model="form.name"
                  :counter="50"
                  v-bind="veeValidate('name', 'Full Name')"
                  prepend-icon="account_box"
                  type="text">>
                </v-text-field>
              </v-flex>
              <v-flex md4>
                <v-text-field
                  v-validate="'digits:10|required|max:10'"
                  v-model="form.contact_number"
                  :counter="10"
                  v-bind="veeValidate('contact_number', 'Contact Number')"
                  prepend-icon="phone"
                  type="text">
                </v-text-field>
              </v-flex>
              <v-flex md4>
                <v-select
                  v-validate="'required'"
                  :items="genderChoices"
                  v-model="form.gender"
                  v-bind="veeValidate('gender', 'Gender')"
                  prepend-icon="wc">
                </v-select>
              </v-flex>
              <v-flex md6>
                <file-upload @updateFileModel="updateFileData"></file-upload>
              </v-flex>
              <v-flex md6>
                <v-textarea
                  v-validate="'required'"
                  v-model="form.status"
                  v-bind="veeValidate('status', 'Status')"
                  prepend-icon="note"
                  rows="1"
                ></v-textarea>
              </v-flex>
              <v-flex md12>
                <v-btn :disabled="errors.any()"
                       color="info"
                       @click="editProfile">Submit
                </v-btn>
                <v-btn>Reset</v-btn>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
  import { mapMutations } from 'vuex'
  import User from '@/models/User'
  import BaseMixin from '@/mixins/baseMixin.js'
  import VeeValidate from '@/mixins/veeValidateMixin.js'
  import BreadCrumb from '@/components/common/BreadCrumb'
  import FileUpload from '@/components/common/FileUpload'

  export default {
    components: { BreadCrumb, FileUpload },
    mixins: [BaseMixin, VeeValidate],
    data () {
      return {
        htmlTitle: 'My Profile | Edit | core.aayulogic',
        genderChoices: ['Male', 'Female', 'Other'],
        fileChanged: false,
        form: {
          username: '',
          name: '',
          status: '',
          gender: 'Male',
          contact_number: '',
          profile_picture: null
        },
        breadCrumbs: [
          { text: 'My Profile', disabled: false, to: '/profile/' },
          { text: 'Edit Profile', disabled: true }
        ]
      }
    },
    async mounted () {
      this.userData = await User.find('me')
      this.form = {
        username: this.userData.username,
        name: this.userData.name,
        gender: this.userData.gender,
        status: this.userData.status,
        contact_number: this.userData.contact_number
      }
    },
    methods: {
      ...mapMutations(['setSnack']),
      updateFileData (fileData, fileChanged) {
        this.form.profile_picture = fileData
        if (fileChanged) this.fileChanged = true
      },
      async editProfile () {
        let data = new FormData()
        data.append('username', this.form.username)
        data.append('name', this.form.name)
        data.append('gender', this.form.gender)
        data.append('status', this.form.status)
        if (this.fileChanged) {
          data.append('profile_picture', this.form.profile_picture)
        }
        let user = new User({ username: this.form.username })
        user.patchData(data).then((response) => {
          console.log(response)
          this.setSnack('Successfully edited profile!')
          this.$router.push('/profile/')
        }).catch((error) => {
          this.pushErrors(error)
        })
        // await this.$axios.$patch('user/detail/' + this.form.username + '/', data).then((response) => {
        //   console.log((response))
        //   this.$router.push('/profile/')
        //   this.notifyUser('Successfully edited profile!', 'green')
        // })
      }
    }
  }
</script>
