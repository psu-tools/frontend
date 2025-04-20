import { defineNuxtPlugin } from '#app'
import VueGoogleMaps from '@fawmi/vue-google-maps'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyAgRLhroAgUPH3MjbiR2ivuQ3cQqDkfsCc',
      libraries: 'places',
    },
    autobindAllEvents: true,
  })
})
