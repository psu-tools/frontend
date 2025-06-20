import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  devtools: { enabled: false },

  css: ['~/assets/css/main.css'],

  modules: [
    '@pinia/nuxt',
    '@nuxt/test-utils/module',
    '@vite-pwa/nuxt',
    '@nuxt/image',
    'nuxt-schema-org',
    'nuxt-gtag',
    'nuxt-yandex-metrika',
    '@nuxtjs/i18n',
  ],

  devServer: {
    host: '0.0.0.0',
    port: 3000,
  },

  vite: { plugins: [tailwindcss()] },

  app: {
    head: {
      script: [
        {
          src: `https://api-maps.yandex.ru/v3/?apikey=78f83394-77d7-4d0a-8c42-f0235b364b21&lang=ru_RU`,
          defer: true,
        },
      ],
      htmlAttrs: { lang: 'ru' },
      title: 'Flow — всегда вовремя',
      meta: [
        { name: 'description', content: 'Напоминания о поездках' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
        },
        {
          name: 'apple-mobile-web-app-capable',
          content: 'yes',
        },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'black-translucent',
        },
      ],
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
      siteUrl: 'https://flow.psu-tools.ru',
    },
  },

  pwa: {
    registerType: 'autoUpdate',
    includeAssets: ['favicon.svg', 'favicon.ico', 'apple-touch-icon.png'],
    manifest: {
      name: 'Flow',
      short_name: 'Flow',
      description: 'Напоминания о поездках',
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

  yandexMetrika: {
    id: '102264650',
    debug: false,
  },

  schemaOrg: {
    defaults: true,
    identity: {
      '@type': 'Organization',
      name: 'PSU Tools',
      url: 'https://psu-tools.ru',
    },
  },

  gtag: { id: 'G-YE8C7HYKDB' },

  nitro: {
    routeRules: {
      '/_nuxt/**': { headers: { 'Cache-Control': 'max-age=2592000, immutable' } },
      '/images/**': { headers: { 'Cache-Control': 'max-age=2592000, immutable' } },
    },
  },

  i18n: {
    defaultLocale: 'ru',
    langDir: 'locales/',
    locales: [
      { code: 'ru', name: 'Russian', file: 'ru.json' },
      { code: 'en', name: 'English', file: 'en.json' },
    ],
  },
})
