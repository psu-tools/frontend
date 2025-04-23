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
      yandexApiKey: '8cec5f84-dac6-4b09-ae85-de5fb8372081',
      openCageApiKey: 'f5b0ea03c1d946dca4128c2297e83360',
    },
  },
  plugins: ['~/plugins/yandexMaps.ts'],
  modules: ['@pinia/nuxt', '@nuxt/test-utils/module', '@vite-pwa/nuxt'],
  pwa: {
    registerType: 'autoUpdate',
    includeAssets: ['favicon.svg', 'favicon.ico', 'apple-touch-icon.png'],
    manifest: {
      name: 'Flow',
      short_name: 'Flow',
      description: 'Напоминание о поездках',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      start_url: '/',
      icons: [
        {
          src: '/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/pwa-512x512.png',
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
})
