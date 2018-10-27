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
            <v-layout row wrap>
              <v-flex md6 style="border-right: 1px solid #efefef;" class="px-3">
                <h2 class="text-success text-center font-weight-thin mb-3">
                  Log your work
                </h2>
                <a href='https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet' target='_blank'>
                  View Markdown Reference
                </a>
                <v-textarea
                  type="text"
                  v-model='log'
                  v-validate="'required'"
                  v-bind="this.veeValidate('log', '')"
                  rows="10"
                ></v-textarea>
                <v-date-picker
                  v-model="log_date"
                  full-width
                  landscape
                  reactive
                  class="mt-3 mb-4"
                ></v-date-picker>
                <v-text-field
                  v-model="log_date"
                  v-validate="'required'"
                  type="text"
                  disabled
                  v-bind="this.veeValidate('log_date', 'Log Date')"
                ></v-text-field>
                <v-divider class="my-4"></v-divider>
                <v-btn color="primary" @click="postLog">Log Work</v-btn>
                <v-btn @click="clearForm">Reset</v-btn>
              </v-flex>
              <v-flex md6 class="px-3">
                <h2 class="text-success text-center font-weight-thin">### Preview</h2>
                <v-divider class="my-3"></v-divider>
                <div v-html="$md.render(log)" id="markdownPreview"></div>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
  import BaseMixin from '@/mixins/BaseMixin.js'
  import VeeValidate from '@/mixins/VeeValidateMixin.js'
  import BreadCrumb from '@/components/common/BreadCrumb'

  export default {
    mixins: [BaseMixin, VeeValidate],
    components: { BreadCrumb },
    data () {
      return {
        htmlTitle: 'Log Your Work | core.aayulogic',
        log_date: new Date().toISOString().substring(0, 10),
        log: '### Work Log ...',
        breadCrumbs: [
          {
            text: 'Home',
            disabled: false
          },
          {
            text: 'Log your Work',
            disabled: false
          }
        ]
      }
    },
    methods: {
      clearForm () {
        this.log_date = ''
        this.log = ''
      },
      postLog () {
        let postData = {
          log_date: this.log_date,
          log: this.log
        }
        console.log(postData)
        this.$axios.$post('/work-log/', postData).then((response) => {
          console.log(response)
        }).catch((error) => {
          this.pushErrors(error)
        })
      }
    }
  }
</script>
