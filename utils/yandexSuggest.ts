export const fetchYandexSuggestions = async (text: string) => {
  if (!text) return []

  try {
    const response = await fetch(`/api/yandex-suggest?text=${encodeURIComponent(text)}`)
    const data = await response.json()
    return data.results || []
  } catch (err) {
    console.error('Ошибка при получении подсказок:', err)
    return []
  }
}
