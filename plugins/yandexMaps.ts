export default defineNuxtPlugin(nuxtApp => {
  if (typeof window !== 'undefined') {
    const config = useRuntimeConfig()
    const script = document.createElement('script')
    script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${config.public.yandexApiKey}`
    script.async = true
    document.head.appendChild(script)
    script.onload = () => console.log('Яндекс API загружен')
  }
})
