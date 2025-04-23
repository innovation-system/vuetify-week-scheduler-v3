import Serve from './serve.vue'
import vuetify from '../src/plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'
import { createApp } from 'vue'

function registerPlugins(app) {
  app.use(vuetify)
}

const app = createApp(Serve)

registerPlugins(app)

app.mount('#app')
