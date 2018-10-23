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
                <h2 class="text-success text-center font-weight-thin">
                  Log your work
                </h2>
                <v-textarea
                  label=""
                  v-model='md_text'
                  rows="10"
                ></v-textarea>
                <v-date-picker
                  v-model="date"
                  full-width
                  landscape
                  reactive
                  class="mt-3 mb-4"
                ></v-date-picker>
                <a href='https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet' target='_blank'>
                View Markdown Reference
                </a>
                <v-divider class="my-4"></v-divider>
                <v-btn color="primary">Log Work</v-btn>
                <v-btn>Reset</v-btn>
              </v-flex>
              <v-flex md6 class="px-3">
                <h2 class="text-success text-center font-weight-thin">### Preview</h2>
                <v-divider class="my-3"></v-divider>
                <div v-html="$md.render(md_text)" id="markdownPreview"></div>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
  import BreadCrumb from '@/components/common/BreadCrumb'

  export default {
    components: { BreadCrumb },
    data () {
      return {
        date: '2018-10-12',
        md_text: '### Work Log ...',
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
    }
  }
</script>
