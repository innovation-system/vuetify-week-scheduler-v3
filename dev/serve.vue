<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title><v-icon>mdi-calendar</v-icon> Vuetify Week Scheduler</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn title="Open Github" icon @click="openGithub">
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>

    <v-container>
      <v-row class="ml-5 mt-5" justify="start" align="center">
        <v-checkbox v-model="editable" label="Editable"></v-checkbox>
        <v-btn class="ml-2" color="warning" @click="events = []"> Clear all </v-btn>
      </v-row>
      <v-col class="ml-5 mb-1">
        <p class="ma-0 text-caption">
          * Desktop: Right click or double click on an event to edit it
        </p>
        <p class="ma-0 text-caption">* Touch devices: Long press on an event to edit it</p>
      </v-col>
      <vuetify-week-scheduler v-model="events" :config="config" :editable="editable" />
    </v-container>
    <v-footer>
      <v-spacer></v-spacer>
      <div>Innovation System &copy; {{ new Date().getFullYear() }}</div>
      <v-spacer></v-spacer>
    </v-footer>
  </v-app>
</template>

<script>
import VuetifyWeekScheduler from '@/vuetify-week-scheduler.vue'

export default {
  components: {
    VuetifyWeekScheduler,
  },
  data: () => ({
    events: [],
    editable: true,
    config: {
      // default period values
      periodBackgroundColor: '#F44336',
      periodTitle: 0,
      periodTextColor: '#fff',
      periodBorderColor: '#ccc',
    },
  }),
  methods: {
    openGithub() {
      window.open('https://github.com/innovation-system/vuetify-week-scheduler', '_blank')
    },
  },
}
</script>
