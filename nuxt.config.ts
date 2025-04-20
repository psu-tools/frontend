import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  devServer: {
    host: '0.0.0.0',
    port: 3000,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap',
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      apiHost: 'https://api.psu-tools.ru',
    },
  },
  modules: ['@pinia/nuxt', '@nuxt/test-utils/module'],
  build: {
    transpile: ['@fawmi/vue-google-maps'],
  },
})
