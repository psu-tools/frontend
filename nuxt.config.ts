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
      yandexApiKey: '8cec5f84-dac6-4b09-ae85-de5fb8372081', // Добавляем переменную для ключа Яндекса
    },
  },
  plugins: [
    '~/plugins/yandexMaps.ts', // Подключаем плагин для Яндекс API
  ],
  modules: ['@pinia/nuxt', '@nuxt/test-utils/module'],
})
