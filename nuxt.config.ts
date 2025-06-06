import tailwindcss from '@tailwindcss/vite'

const isDev = process.env.NODE_ENV === 'development'

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
    // 'nuxt-security',
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
      siteUrl: 'https://flow.psu-tools.ru',
    },
  },

  pwa: {
    registerType: 'autoUpdate',
    includeAssets: ['favicon.svg', 'favicon.ico', 'apple-touch-icon.png'],
    manifest: {
      name: 'Flow',
      short_name: 'Flow',
      description: 'Напоминание о поездках',
      theme_color: '#ff724c',
      background_color: '#ff724c',
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

  security: {
    strict: !isDev,
    headers: {
      crossOriginResourcePolicy: isDev ? false : 'same-origin',
      crossOriginOpenerPolicy: isDev ? false : 'same-origin',
      crossOriginEmbedderPolicy: isDev ? false : 'credentialless',
      contentSecurityPolicy: isDev
        ? false
        : {
            'base-uri': ["'none'"],
            'font-src': ["'self'", 'https:', 'data:'],
            'form-action': ["'self'"],
            'frame-ancestors': ["'self'"],
            'img-src': ["'self'", 'data:'],
            'object-src': ["'none'"],
            'script-src-attr': ["'none'"],
            'style-src': ["'self'", 'https:', "'nonce-{{nonce}}'"],
            'script-src': [
              "'self'",
              'https:',
              'https://api-maps.yandex.ru',
              "'strict-dynamic'",
              "'nonce-{{nonce}}'",
            ],
            'upgrade-insecure-requests': true,
          },
      originAgentCluster: isDev ? false : '?1',
      referrerPolicy: 'no-referrer',
      strictTransportSecurity: isDev
        ? false
        : {
            maxAge: 15552000,
            includeSubdomains: true,
          },
      xContentTypeOptions: 'nosniff',
      xDNSPrefetchControl: 'off',
      xDownloadOptions: 'noopen',
      xFrameOptions: 'SAMEORIGIN',
      xPermittedCrossDomainPolicies: 'none',
      xXSSProtection: '0',
      permissionsPolicy: {
        camera: [],
        'display-capture': [],
        fullscreen: [],
        geolocation: [],
        microphone: [],
      },
    },
    requestSizeLimiter: {
      maxRequestSizeInBytes: 2000000,
      maxUploadFileRequestInBytes: 8000000,
      throwError: true,
    },
    rateLimiter: {
      tokensPerInterval: 150,
      interval: 300000,
      headers: false,
      driver: {
        name: 'lruCache',
      },
      throwError: true,
    },
    xssValidator: {
      throwError: true,
    },
    corsHandler: {
      origin: isDev ? '*' : 'https://flow.psu-tools.ru',
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      preflight: {
        statusCode: 204,
      },
    },
    allowedMethodsRestricter: {
      methods: '*',
      throwError: true,
    },
    hidePoweredBy: true,
    basicAuth: false,
    enabled: true,
    csrf: false,
    nonce: !isDev,
    removeLoggers: true,
    ssg: {
      meta: true,
      hashScripts: true,
      nitroHeaders: true,
      exportToPresets: true,
      hashStyles: true,
    },
    sri: !isDev,
  },
})
