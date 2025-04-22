import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import { createVuetify } from 'vuetify'
import { VBtn, VHover, VIcon, VList, VListItem, VMenu, VTextField } from 'vuetify/lib/components'

export default createVuetify({
  components: {
    VBtn,
    VHover,
    VIcon,
    VMenu,
    VList,
    VListItem,
    VTextField,
  },
})
