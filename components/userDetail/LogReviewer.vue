<template>
  <v-layout row wrap align-center justify-center>
    <v-flex md8 md-offset-2>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="font-weight-thin">Log Reviewer</h3>
            <div>Following reviewers are responsible for reviewing the log of {{ userDetail.name }}.</div>
          </div>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-list v-if="fetched">
            <v-list-tile v-for="(item, index) in fetchedResults"
                         :key="index">
              <v-list-tile-avatar>
                <v-img :src="item.reviewer.profile_picture"></v-img>
              </v-list-tile-avatar>
              <v-list-tile-content>
                {{ item.reviewer.name }}
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    props: {
      userDetail: Object
    },
    data () {
      return {
        fetchedResults: [],
        fetched: false
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      async fetchData () {
        await this.$axios.$get('/user/detail/' + this.userDetail.username + '/log-reviewers/').then((response) => {
          this.fetchedResults = response
          this.fetched = true
        })
      }
    }
  }
</script>
