export const loadYandexMaps = (): Promise<any> => {
  const config = useRuntimeConfig()
  return new Promise((resolve, reject) => {
    if (window.ymaps3) {
      window.ymaps3.ready.then(resolve).catch(reject)
    } else {
      const script = document.createElement('script')
      script.src = `https://api-maps.yandex.ru/v3/?apikey=${config.public.ymapsApiKey}&lang=ru_RU`
      script.async = true
      script.defer = true
      script.onload = () => window.ymaps3.ready.then(resolve).catch(reject)
      script.onerror = reject
      document.head.appendChild(script)
    }
  })
}
