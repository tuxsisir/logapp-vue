<template>
  <v-layout align-center
            row
            wrap>
    <v-flex md1
            xs2>
      <v-item-group
        v-model="window"
        class="shrink mr-4"
        mandatory
        tag="v-flex"
      >
        <v-item
          v-for="(category, index) in bugCategory"
          :key="index"
        >
          <div slot-scope="{ active, toggle }">
            <v-btn
              :input-value="active"
              icon
              @click="toggle"
            >
              <v-icon :color="category.color">fiber_manual_record</v-icon>
            </v-btn>
          </div>
        </v-item>
      </v-item-group>
    </v-flex>
    <v-flex md11
            xs10>
      <v-window
        v-model="window"
        class="elevation-1"
        vertical
      >
        <v-window-item
          v-for="(category, index) in bugCategory"
          :key="index"
        >
          <v-card flat>
            <v-card-title class="pa-4">
              <v-layout align-center>
                <v-avatar :color="category.color"
                          class="mr-3">
                  <v-icon class="white--text">{{ category.icon }}</v-icon>
                </v-avatar>
                <div>
                  <strong class="title">{{ category.name }} Bugs</strong>
                </div>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon class="grey--text"
                          size="25">info
                  </v-icon>
                </v-btn>
              </v-layout>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <bug-data-table :category="category.name"></bug-data-table>
            </v-card-text>
          </v-card>
        </v-window-item>
      </v-window>
    </v-flex>
  </v-layout>
</template>
<script>
  import BugDataTable from '@/components/BugReport/BugDataTable'

  export default {
    components: { BugDataTable },
    data () {
      return {
        bugCategory: {
          'ui': {
            name: 'UI',
            icon: 'dashboard',
            color: 'deep-purple'
          },
          'functional': {
            name: 'Functional',
            icon: 'code',
            color: 'cyan'
          },
          'typo': {
            name: 'Typo',
            icon: 'keyboard',
            color: 'light-green'
          },
          'client': {
            name: 'Client',
            icon: 'group',
            color: 'amber'
          },
          'api': {
            name: 'API',
            icon: 'group',
            color: 'indigo'
          }
        },
        window: 0
      }
    }
  }
</script>
