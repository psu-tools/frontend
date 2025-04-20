export default defineNuxtPlugin(nuxtApp => {
  if (typeof window !== 'undefined') {
    // Создаем скрипт для подключения Яндекс API
    const script = document.createElement('script')
    script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=8cec5f84-dac6-4b09-ae85-de5fb8372081` // Замените на ваш ключ
    script.async = true
    document.head.appendChild(script)

    script.onload = () => {
      console.log('Яндекс API загружен')
    }
  }
})
