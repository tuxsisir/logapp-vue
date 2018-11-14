<template>
  <v-form>
    <v-layout row
              wrap>
      <v-flex md7>
        <v-text-field
          v-validate="'required'"
          v-model="formValues.title"
          :counter="255"
          v-bind="veeValidate('title', 'Title')"
          required
        ></v-text-field>
        <v-textarea
          v-validate="'required'"
          v-model="formValues.description"
          v-bind="veeValidate('description', 'Description')"
          type="text"
          rows="3"
        ></v-textarea>
        <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
           target="_blank">
          View Markdown Reference
        </a>
        <v-layout>
          <v-flex>
            <v-select
              v-validate="'required'"
              :items="statusChoices"
              v-model="formValues.status"
              v-bind="veeValidate('status', 'Bug Status')">
            </v-select>
          </v-flex>
          <v-flex>
            <v-select
              v-validate="'required'"
              :items="priorityChoices"
              v-model="formValues.priority"
              v-bind="veeValidate('priority', 'Priority')">
            </v-select>
          </v-flex>
          <v-flex>
            <v-select
              v-validate="'required'"
              :items="categoryChoices"
              v-model="formValues.category"
              v-bind="veeValidate('category', 'Category')">
            </v-select>
          </v-flex>
        </v-layout>
        <v-textarea
          v-validate="''"
          v-model="formValues.remarks"
          v-bind="veeValidate('remarks', 'Remarks')"
          :messages="['Remarks from the bug reporter.']"
          type="text"
          rows="3"
        ></v-textarea>
        <p class="mt-4">
          <span class="primary--text">Note: </span>
          <span>You will be able to attach the bug attachments after you've created this bug and then by going to bug details.</span>
        </p>
        <v-btn v-if="formValues.id"
               color="primary"
               @click="editBug">Edit
        </v-btn>
        <v-btn
          v-else
          :disabled="errors.any()"
          class="primary"
          @click="createBug()"
        >
          Submit
        </v-btn>
      </v-flex>
      <v-flex md5>
        <h4 class="title">Bug Description</h4>
        <v-divider class="my-4"></v-divider>
        <div id="markdownPreview"
             v-html="$md.render(formValues.description)"></div>
      </v-flex>
    </v-layout>
  </v-form>
</template>
<script>
  import { mapMutations } from 'vuex'
  import VeeValidate from '@/mixins/veeValidateMixin.js'
  import BugReport from '@/models/BugReport.js'

  export default {
    mixins: [VeeValidate],
    props: {
      formData: {
        type: Object,
        required: false,
        default () {
          return {
            title: '',
            description: '#### Write down bug description in markdown here...',
            project: this.$route.params.project,
            priority: '',
            category: '',
            status: '',
            remarks: ''
          }
        }
      }
    },
    data () {
      return {
        statusChoices: [
          { text: 'Unresolved', value: 'Unresolved' },
          { text: 'Resolved', value: 'Resolved' },
          { text: 'In Progress', value: 'In Progress' },
          { text: 'Duplicated', value: 'Duplicated' },
          { text: 'On Hold', value: 'On Hold' }
        ],
        priorityChoices: [
          { text: 'Trivial', value: 'Trivial' },
          { text: 'Minor', value: 'Minor' },
          { text: 'Major', value: 'Major' },
          { text: 'Critical', value: 'Critical' }
        ],
        categoryChoices: [
          { text: 'UI Bug', value: 'UI' },
          { text: 'Functional Bug', value: 'Functional' },
          { text: 'Typo Bug', value: 'Typo' },
          { text: 'Client Bug', value: 'Client' },
          { text: 'API Bug', value: 'API' }
        ],
        formValues: this.formData
      }
    },
    methods: {
      ...mapMutations(['setSnack']),
      createBug () {
        let bug = new BugReport(this.formValues)
        bug.save().then((response) => {
          this.$router.push(`/bug-report/${this.$route.params.project}/${response.id}/detail/`)
        }).catch((error) => {
          this.pushErrors(error)
        })
      },
      editBug () {
        let editData = {
          'title': this.formValues.title,
          'description': this.formValues.description,
          'project': this.$route.params.project,
          'category': this.formValues.category,
          'priority': this.formValues.priority,
          'status': this.formValues.status,
          'remarks': this.formValues.remarks
        }
        this.$axios.$patch('/bug/report/' + this.formValues.id + '/', editData).then((response) => {
          this.setSnack('Successfully edited bug.')
          this.$router.push(`/bug-report/${this.$route.params.project}/${response.id}/detail/`)
        }).catch((error) => {
          console.log(error)
          this.pushErrors(error)
        })
      }
    }
  }
</script>
