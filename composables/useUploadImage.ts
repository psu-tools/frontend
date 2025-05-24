export function useUploadImage() {
  const imageUrl = ref<string | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const config = useRuntimeConfig()
  const API_KEY = config.public.imgbbApiKey || ''

  const uploadImage = async (file: File) => {
    if (!file) {
      error.value = 'Файл не выбран'
      return null
    }
    if (!API_KEY) {
      error.value = 'API ключ ImgBB не задан'
      return null
    }

    isLoading.value = true
    error.value = null

    const formData = new FormData()
    formData.append('image', file)

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.success) {
        imageUrl.value = data.data.url
        return imageUrl.value
      } else {
        error.value = data.error?.message || 'Ошибка загрузки'
        return null
      }
    } catch (e: any) {
      error.value = e.message || 'Ошибка сети'
      return null
    } finally {
      isLoading.value = false
    }
  }

  return {
    imageUrl,
    isLoading,
    error,
    uploadImage,
  }
}
