import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components' // TODO: import only used components?
import * as directives from 'vuetify/directives' // TODO: import only used directives? unable to resolve this paths

export default createVuetify({
  components: {
    ...components,
  },
  directives,
  theme: {
    defaultTheme: 'dark',
  },
})
