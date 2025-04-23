export default defineEventHandler(async event => {
  const query = getQuery(event)
  const text = query.text as string

  if (!text) {
    return { results: [] }
  }

  try {
    const url = `https://suggest-maps.yandex.ru/v1/suggest?apikey=8cec5f84-dac6-4b09-ae85-de5fb8372081&text=${encodeURIComponent(text)}&lang=ru_RU&results=5`

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Yandex API error: ${response.status}`)
    }

    const data = await response.json()

    return {
      results:
        data.results?.map((item: any) => ({
          title: item.title.text,
          subtitle: item.subtitle?.text ?? '',
        })) ?? [],
    }
  } catch (error) {
    console.error('Yandex suggest error:', error)
    return {
      results: [],
      error: 'Ошибка получения данных от Yandex',
    }
  }
})
