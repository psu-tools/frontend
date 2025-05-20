import { defineStore } from 'pinia'
import { customFetch } from '~/utils/customFetch'

interface GetPointsListResponse {
  success: boolean
  data: Point[]
  paging: PagingResponse
}

export const useUserPointsStore = defineStore('userPoints', () => {
  const isLoading = ref(false)
  const favoritePoints = ref<Point[]>([])

  const fetchUserPoints = async () => {
    try {
      isLoading.value = true
      const config = useRuntimeConfig()
      const response = await customFetch<GetPointsListResponse>(
        `${config.public.apiHost}/${config.public.apiVersion}/routes-service/points/favorites`,
        { method: 'GET', query: { userId: '4cef84ba-a98a-4089-b6d8-bf0416ad2208' } }
      )
      favoritePoints.value = response?.data || []
      console.log('fetching fav points', favoritePoints.value)
    } catch (error) {
      console.error('Data fetch error:', error)
      favoritePoints.value = []
    } finally {
      isLoading.value = false
    }
  }

  const addUserPoint = async (point: any) => {
    try {
      const config = useRuntimeConfig()
      const body = {
        userId: '4cef84ba-a98a-4089-b6d8-bf0416ad2208', // может быть из auth store
        defaultName: point.formatted || point.name || 'Без названия',
        customName: point.name || '',
        latitude: point.geometry?.lat || point.latitude,
        longitude: point.geometry?.lng || point.longitude,
        address: point.formatted || point.address || '',
      }

      const response = await customFetch(
        `${config.public.apiHost}/${config.public.apiVersion}/routes-service/points/favorites`,
        {
          method: 'POST',
          body,
        }
      )

      if (response) {
        await fetchUserPoints()
      }
      console.error('Точка успешно добавлена:')
      return response
    } catch (error) {
      console.error('Ошибка добавления точки:', error)
      throw error
    }
  }

  return {
    isLoading,
    favoritePoints,
    fetchUserPoints,
    addUserPoint,
  }
})
