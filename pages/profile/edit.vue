<template>
  <v-layout row wrap>
    <v-flex md12>
      <bread-crumb :breadCrumbItems="breadCrumbs"></bread-crumb>
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
            <v-layout row wrap>
              <v-flex md4>
                <v-text-field
                  prepend-icon="account_box"
                  type="text"
                  v-model="form.name"
                  v-validate="'alpha_spaces|required|max:50'"
                  :counter="50"
                  v-bind="this.veeValidate('name', 'Full Name')">>
                </v-text-field>
              </v-flex>
              <v-flex md4>
                <v-text-field
                  prepend-icon="phone"
                  type="text"
                  v-model="form.contact_number"
                  v-validate="'digits:10|required|max:10'"
                  :counter="10"
                  v-bind="this.veeValidate('contact_number', 'Contact Number')">>
                </v-text-field>
              </v-flex>
              <v-flex md4>
                <v-select
                  prepend-icon="wc"
                  :items="genderChoices"
                  v-model="form.gender"
                  v-validate="'required'"
                  v-bind="this.veeValidate('gender', 'Gender')">
                </v-select>
              </v-flex>
              <v-flex md6>
                <file-upload @updateFileModel="updateFileData"></file-upload>
              </v-flex>
              <v-flex md6>
                <v-textarea
                  prepend-icon="note"
                  v-model="form.status"
                  v-validate="'required'"
                  v-bind="this.veeValidate('status', 'Status')"
                  rows="1"
                ></v-textarea>
              </v-flex>
              <v-flex md12>
                <v-btn color="info" @click="editProfile">Submit</v-btn>
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
  import User from '@/models/User'
  import BaseMixin from '@/mixins/BaseMixin.js'
  import VeeValidate from '@/mixins/veeValidate.js'
  import BreadCrumb from '@/components/common/BreadCrumb'
  import FileUpload from '@/components/common/FileUpload'

  export default {
    mixins: [BaseMixin, VeeValidate],
    components: { BreadCrumb, FileUpload },
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
        })
        // await this.$axios.$patch('user/detail/' + this.form.username + '/', data).then((response) => {
        //   console.log((response))
        //   this.$router.push('/profile/')
        //   this.notifyUser('Successfully edited profile!', 'green')
        // })
      }
    },
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
    }
  }
</script>
