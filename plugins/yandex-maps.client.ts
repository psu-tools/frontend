export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig()

  const locale = nuxtApp.$i18n?.locale?.value || 'ru'

  const langMap: Record<string, string> = {
    ru: 'ru_RU',
    en: 'en_US',
  }

  const ymapsLang = langMap[locale] || 'ru_RU'

  const ymapsLoader = new Promise<void>(resolve => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script')
      script.src = `https://api-maps.yandex.ru/2.1/?lang=${ymapsLang}&apikey=${config.public.ymapsApiKey}`
      script.type = 'text/javascript'
      script.onload = () => {
        resolve()
      }
      document.head.appendChild(script)
    }
  })

  nuxtApp.provide('ymapsLoader', ymapsLoader)
})
