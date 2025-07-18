import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { dirname, resolve } from 'node:path'
import viteBaseConfig from './vite.config'

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  ...viteBaseConfig,
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.js'),
      name: 'VuetifyWeekSchedulerV3',
      // the proper extensions will be added
      fileName: 'vuetify-week-scheduler-v3',
      formats: ['es'],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
     external: [/^vue/, /^vuetify/], // Exclude Vue and Vuetify and all their submodules
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          vuetify: 'Vuetify',
        },
        assetFileNames: (assetInfo) => assetInfo.names[0],
      },
    },
    cssCodeSplit: false, // This keeps CSS together with components
    
  },
})
