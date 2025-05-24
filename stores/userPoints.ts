import { defineStore } from 'pinia'
import { customFetch } from '~/utils/customFetch'
import { useUserInfo } from '~/stores/userInfo'

interface GetPointsListResponse {
  success: boolean
  data: Point[]
  paging: PagingResponse
}

export const useUserPointsStore = defineStore('userPoints', () => {
  const isLoading = ref(false)
  const favoritePoints = ref<Point[]>([])
  const userId = ref<string | null>(null)

  const fetchUserPoints = async () => {
    try {
      const userInfoStore = useUserInfo()
      isLoading.value = true
      const config = useRuntimeConfig()
      const response = await customFetch<GetPointsListResponse>(
        `${config.public.apiHost}/${config.public.apiVersion}/routes-service/points/favorites`,
        { method: 'GET', query: { userId: userInfoStore.userId || localStorage.getItem('userId') } }
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
      const userInfoStore = useUserInfo()
      const body = {
        userId: userInfoStore.userId || localStorage.getItem('userId'),
        defaultName: point.formatted || point.name || 'Без названия',
        customName: point.name || '',
        latitude: point.geometry?.lat || point.latitude,
        longitude: point.geometry?.lng || point.longitude,
        address: point.formatted || point.address || '',
      }

      console.log(body)

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
      return response
    } catch (error) {
      throw error
    }
  }

  const deleteUserPoint = async (pointId: string) => {
    try {
      const config = useRuntimeConfig()
      const response = await customFetch(
        `${config.public.apiHost}/${config.public.apiVersion}/routes-service/points/favorites?userId=${userId.value}&pointId=${pointId}`,
        {
          method: 'DELETE',
        }
      )

      await fetchUserPoints()
    } catch (error) {
      throw error
    }
  }

  return {
    isLoading,
    favoritePoints,
    fetchUserPoints,
    addUserPoint,
    deleteUserPoint,
  }
})
