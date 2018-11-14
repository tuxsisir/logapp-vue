<template>
  <v-form>
    <v-layout row
              wrap>
      <v-flex md6
              style="border-right: 1px solid #efefef;"
              class="px-3">
        <h2 class="text-success text-center font-weight-thin mb-3">
          Log your work
        </h2>
        <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
           target="_blank">
          View Markdown Reference
        </a>
        <v-textarea
          v-validate="'required'"
          v-model="formValues.log"
          v-bind="veeValidate('log', '')"
          type="text"
          rows="10"
        ></v-textarea>
        <v-date-picker
          v-model="formValues.log_date"
          full-width
          landscape
          reactive
          class="mt-3 mb-4"
        ></v-date-picker>
        <v-text-field
          v-validate="'required'"
          v-model="formValues.log_date"
          v-bind="veeValidate('log_date', 'Log Date')"
          type="text"
          disabled
        ></v-text-field>
        <v-divider class="my-4"></v-divider>
        <v-btn v-if="formValues.id"
               color="primary"
               @click="editLog">Edit Log</v-btn>
        <v-btn v-else
               color="primary"
               @click="createLog">Log Work</v-btn>
        <v-btn @click="clearForm">Reset</v-btn>
      </v-flex>
      <v-flex md6
              class="px-3">
        <h2 class="text-success text-center font-weight-thin">### Preview</h2>
        <v-divider class="my-3"></v-divider>
        <div id="markdownPreview"
             v-html="$md.render(formValues.log)"></div>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
  import { mapMutations } from 'vuex'
  import VeeValidate from '@/mixins/veeValidateMixin.js'

  export default {
    mixins: [VeeValidate],
    props: {
      formData: {
        type: Object,
        required: false,
        default: () => ({
          log_date: new Date().toISOString().substring(0, 10),
          log: '### Work Log ...'
        })
      }
    },
    data () {
      return {
        formValues: this.formData
      }
    },
    methods: {
      ...mapMutations(['setSnack']),
      clearForm () {
        this.formValues.log_date = ''
        this.formValues.log = ''
      },
      createLog () {
        let postData = {
          log_date: this.formValues.log_date,
          log: this.formValues.log
        }
        this.$axios.$post('/work-log/', postData).then((response) => {
          this.setSnack('Successfully logged your work for ' + this.formValues.log_date + '.')
          this.$router.push('/work-log/')
        }).catch((error) => {
          this.pushErrors(error)
        })
      },
      editLog () {
        let postData = {
          log_date: this.formValues.log_date,
          log: this.formValues.log
        }
        this.$axios.$patch('/work-log/' + this.formValues.id + '/', postData).then((response) => {
          this.setSnack('Successfully edited your work log of ' + this.formValues.log_date + '.')
          this.$router.push('/work-log/')
        }).catch((error) => {
          this.pushErrors(error)
        })
      }
    }
  }
</script>
