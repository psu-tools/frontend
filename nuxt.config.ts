import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [vue(), tailwindcss()],
  },
  app: {
    link: [
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap',
      },
    ],
  },
  runtimeConfig: {
    public: {
      apiHost: process.env.API_HOST || 'https://api.psu-tools.ru/routes-service',
    },
  },
})
