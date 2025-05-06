export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig()
  const ymapsLoader = new Promise<void>(resolve => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script')
      script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${config.public.ymapsApiKey}`
      script.type = 'text/javascript'
      script.onload = () => {
        resolve()
      }
      document.head.appendChild(script)
    }
  })

  nuxtApp.provide('ymapsLoader', ymapsLoader)
})
