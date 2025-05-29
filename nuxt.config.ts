import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
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
      title: 'Флоу — всегда вовремя',
      meta: [{ name: 'description', content: 'Напоминания о поездках' }],
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
      apiVersion: 'v1',
      authHost: 'https://id.psu-tools.ru',
      apiType: 'users-service',
      yandexApiKey: '8cec5f84-dac6-4b09-ae85-de5fb8372081',
      openCageApiKey: 'f5b0ea03c1d946dca4128c2297e83360',
      ymapsApiKey: '78f83394-77d7-4d0a-8c42-f0235b364b21',
      imgbbApiKey: 'fd33d6799235eadc70d898bc6eecb817',
    },
  },
  modules: ['@pinia/nuxt', '@nuxt/test-utils/module', '@vite-pwa/nuxt'],
  pwa: {
    registerType: 'autoUpdate',
    includeAssets: ['favicon.svg', 'favicon.ico', 'apple-touch-icon.png'],
    manifest: {
      name: 'Flow',
      short_name: 'Flow',
      description: 'Напоминание о поездках',
      theme_color: '#000000',
      background_color: '#000000',
      display: 'standalone',
      start_url: '/',
      icons: [
        {
          src: '/web-app-manifest-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/web-app-manifest-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/web-app-manifest-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    devOptions: {
      enabled: true,
      type: 'module',
      navigateFallback: '/',
    },
  },

  // plugins: ['~/plugins/yandex-maps.client.ts'],
})
