export default defineNuxtPlugin(() => {
  return new Promise(resolve => {
    if (typeof window !== 'undefined') {
      if (window.ymaps) {
        resolve()
        return
      }

      const script = document.createElement('script')
      script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${process.env.YANDEX_API_KEY}`
      script.async = true
      script.onload = () => {
        console.log('Яндекс API загружен')
        resolve()
      }
      document.head.appendChild(script)
    }
  })
})
