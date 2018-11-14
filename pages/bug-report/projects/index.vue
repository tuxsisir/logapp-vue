<template>
  <v-layout
    row
    wrap>
    <v-flex md12
            xs12>
      <bread-crumb :bread-crumb-items="breadCrumbs"></bread-crumb>
    </v-flex>
    <v-flex
      v-for="(project, index) in projects"
      :key="index"
      md4
      xs4
    >
      <v-hover>
        <v-card
          slot-scope="{ hover }"
          class="mx-auto"
          color="grey lighten-4"
          max-width="600"
        >
          <v-img
            :src="project.logo"
            aspect-ratio="2"
            cover
          >
            <v-expand-transition>
              <div
                v-if="hover"
                :class="project.color"
                class="d-flex transition-fast-in-fast-out v-card--reveal display-3 white--text"
                style="height: 100%;"
              >
              </div>
            </v-expand-transition>
          </v-img>
          <v-card-text
            class="pt-4"
            style="position: relative;"
          >
            <v-btn
              :to="project.path"
              :color="project.color"
              absolute
              router
              class="white--text"
              fab
              right
              top
            >
              <v-icon>bug_report</v-icon>
            </v-btn>
            <div class="font-weight-light grey--text subheading mb-2">{{ project.tagline }}</div>
            <h3 class="headline font-weight-light mb-2">{{ project.name }}</h3>
          </v-card-text>
        </v-card>
      </v-hover>
    </v-flex>
  </v-layout>
</template>

<style scoped lang="stylus">
  .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .5;
    position: absolute;
    width: 100%;
  }
</style>

<script>
  import BaseMixin from '@/mixins/baseMixin.js'

  export default {
    name: 'BugReport',
    mixins: [BaseMixin],
    data () {
      return {
        htmlTitle: 'Bug Report | core.aayulogic',
        breadCrumbs: [
          { text: 'Home', disabled: false, to: '/' },
          { text: 'Bug Report', disabled: true },
          { text: 'Projects', disabled: true }
        ],
        projects: {
          'realhrsoft': {
            'name': 'RealHRsoft',
            'color': 'light-blue',
            'tagline': 'Complete HR Intelligence Technology',
            'logo': '/images/projects/rhrs.jpg',
            'path': '/bug-report/projects/realhrsoft/'
          },
          'merojob': {
            'name': 'Merojob',
            'color': 'light-blue darken-4',
            'tagline': 'Aim Higher',
            'logo': '/images/projects/merojob.jpg',
            'path': '/bug-report/projects/merojob/'
          },
          'rspl': {
            'name': 'Real Solutions Pvt. Ltd.',
            'color': 'light-blue lighten-3',
            'tagline': 'Dynamic CMS built on Django',
            'logo': '/images/projects/rspl.jpg',
            'path': '/bug-report/projects/rspl/'
          },
          'aayulogic': {
            'name': 'core.aayulogic',
            'color': 'blue darken-4',
            'tagline': 'core aayulogic',
            'logo': '/images/projects/aayulogic.jpg',
            'path': '/bug-report/projects/core-aayulogic/'
          },
          'rojgari': {
            'name': 'Rojgari Services',
            'color': 'yellow darken-1',
            'tagline': 'दक्ष जनशाक्तिको आवश्यकता र परिपुर्ति!',
            'logo': '/images/projects/rojgari.jpg',
            'path': '/bug-report/projects/rojgari/'
          }
        }
      }
    }
  }
</script>
