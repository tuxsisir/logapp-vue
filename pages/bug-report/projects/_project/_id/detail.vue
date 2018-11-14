<template>
  <v-layout row
            wrap>
    <v-flex md12>
      <bread-crumb :bread-crumb-items="breadCrumbs"></bread-crumb>
    </v-flex>
    <v-flex md7>
      <v-card v-if="fetched">
        <v-card-title class="py-2">
          Bug Details
          <v-spacer></v-spacer>
          <v-btn
            :to="`/bug-report/projects/${bugDetails.project_slug}/${bugDetails.id}/edit/`"
            small
            icon>
            <v-icon size="15">edit</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-avatar
            size="60"
            color="grey lighten-4"
          >
            <v-img :src="bugDetails.reporter.profile_picture"
                   alt="avatar"
                   class="mr-2"></v-img>
          </v-avatar>
          <span class="body-1">
            {{ bugDetails.reporter.name }} <span class="caption">({{ bugDetails.reporter.department }})</span>
          </span>
          <v-spacer></v-spacer>
          <v-divider class="my-3"></v-divider>
          <v-chip
            :color="getProjectColorCode(bugDetails.project_slug)"
            class="white--text"
            small
          >
            <v-avatar>
              <v-icon
                class="white--text ml-2">work_outline
              </v-icon>
            </v-avatar>
            {{ bugDetails.project }}
          </v-chip>
          <v-chip
            :color="getCategoryColorCode(bugDetails.category)"
            class="white--text"
            small>
            {{ bugDetails.category }}
            <v-icon
              right
              class="white--text"
            >star
            </v-icon>
          </v-chip>
          <v-chip
            :color="getStatusColorCode(bugDetails.status)"
            class="white--text"
            small>
            {{ bugDetails.status }}
            <v-icon
              right
              class="white--text"
            >star
            </v-icon>
          </v-chip>
          <v-chip color="red lighten-2"
                  class="white--text"
                  small>
            {{ bugDetails.priority }}
            <v-icon
              right
              class="white--text"
            >star
            </v-icon>
          </v-chip>
          <div class="mt-3">
            <h3>{{ bugDetails.title }}</h3>
            <v-divider class="my-4"></v-divider>
            <div id="markdownPreview"
                 v-html="$md.render(bugDetails.description)"></div>
          </div>
        </v-card-text>
      </v-card>
      <v-card class="mt-3">
        <v-card-title>
          Bug Log
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="py-0">
          <v-timeline dense>
            <v-timeline-item
              v-for="(bugLog, index) in bugDetails.bug_log"
              :key="index"
              :color="actionMapper(bugLog.action).color"
              :icon="actionMapper(bugLog.action).icon"
              fill-dot>
              <v-card class="elevation-0">
                <v-expansion-panel>
                  <v-expansion-panel-content
                    expand-icon=""
                  >
                    <div slot="header"
                         class="subheading">
                      <v-layout row
                                wrap>
                        <v-flex>
                          <v-avatar
                            size="30"
                            color="grey lighten-4"
                          >
                            <v-img :src="bugLog.action_by.profile_picture"
                                   alt="avatar"
                                   class="mr-2"></v-img>
                          </v-avatar>
                          <span class="body-1">
                            {{ bugLog.action_by.name }}
                            <span v-text="actionMapper(bugLog.action).text"></span>
                            the bug.
                          </span>
                        </v-flex>
                        <v-flex class="text-xs-right grey--text hidden-xs-only caption">
                          <v-icon
                            size="15"
                            class="mr-1"
                          >calendar_today
                          </v-icon>
                          {{ bugLog.created_date }}
                        </v-flex>
                      </v-layout>
                    </div>
                    <div class="px-4 py-2">
                      <div class="markdownPreview"
                           v-html="$md.render(bugLog.text)"></div>
                      <small class="grey--text">
                        <span class="d-block">Created: {{ bugLog.created }}</span>
                        <span class="d-block">Modified: {{ bugLog.modified }}</span>
                      </small>
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex v-if="fetched"
            md-5>
      <v-card>
        <v-card-title>
          Bug Attachments
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-alert
            :value="true"
            outline
            color="info"
            icon="warning">
            Bug attachments will be available by next week!
          </v-alert>
        </v-card-text>
      </v-card>
    </v-flex>
    <vue-notify :notify="notify"></vue-notify>
  </v-layout>
</template>
<script>
  import BaseMixin from '@/mixins/baseMixin.js'
  import BugReport from '@/models/BugReport'

  export default {
    mixins: [BaseMixin],
    data () {
      return {
        breadCrumbs: [
          { text: 'Home', disabled: false, to: '/' },
          { text: 'Bug Window', disabled: false, to: '/bug-report/' },
          { text: 'Bug Detail', disabled: true }
        ],
        bugDetails: {},
        notify: {},
        fetched: false
      }
    },
    validate ({ params }) {
      return /^\d+$/.test(params.id)
    },
    created () {
      this.displaySnack()
      this.getBugDetails(this.$route.params.id)
    },
    methods: {
      async getBugDetails (bugId) {
        let bugDetail = await BugReport.find(bugId)
        this.bugDetails = bugDetail
        this.fetched = true
      },
      actionMapper (action) {
        let mapper = {
          'created': { 'text': 'created', 'icon': 'star', 'color': 'green darken-1' },
          'modified_title': { 'text': 'modified title of', 'icon': 'title', 'color': 'brown darken-1' },
          'modified_description': { 'text': 'modified description of', 'icon': 'notes', 'color': 'blue darken-1' },
          'modified_status': { 'text': 'modified status of', 'icon': 'insert_link', 'color': 'cyan darken-1' },
          'modified_priority': {
            'text': 'modified priority of',
            'icon': 'insert_chart_outlined',
            'color': 'deep-purple lighten-1'
          },
          'modified_category': { 'text': 'modified category of', 'icon': 'device_hub', 'color': 'indigo lighten-1' },
          'modified_project': { 'text': 'modified project of', 'icon': 'folder', 'color': 'lime darken-1' },
          'modified_remarks': {
            'text': 'modified remarks of',
            'icon': 'insert_comment',
            'color': 'light-blue lighten-1'
          }
        }
        return mapper[action]
      },
      getCategoryColorCode (category) {
        let categoryColor = {
          'UI': 'deep-purple lighten-4',
          'Functional': 'cyan lighten-4',
          'Typo': 'light-green lighten-4',
          'Client': 'amber lighten-4',
          'API': 'teal lighten-4'
        }
        return categoryColor[category]
      },
      getStatusColorCode (status) {
        let statusColor = {
          'Unresolved': 'red lighten-3',
          'In Progress': 'blue lighten-3',
          'Resolved': 'green lighten-3',
          'Duplicated': 'purple lighten-3',
          'On Hold': 'brown lighten-3'
        }
        return statusColor[status]
      },
      getPriorityColorCode () {
        return ''
      },
      getProjectColorCode (project) {
        let projectsColor = {
          'realhrsoft': 'light-blue',
          'merojob': 'light-blue darken-4',
          'rspl': 'light-blue lighten-3',
          'core-aayulogic': 'blue darken-4',
          'rojgari': 'yellow darken-1'
        }
        return projectsColor[project]
      }
    }
  }
</script>
