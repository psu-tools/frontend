import { defineStore } from 'pinia'
import { customFetch } from '~/utils/customFetch'

interface GetPointsListResponse {
  success: boolean
  data: Point[]
  paging: PagingResponse
}

export const useUserPointsStore = defineStore('userPoints', () => {
  const isLoading = ref(false)
  const favoritePoints = ref<Point[]>()

  const fetchUserPoints = async () => {
    try {
      isLoading.value = true
      const config = useRuntimeConfig()
      const response = await customFetch<GetPointsListResponse>(
        `${config.public.apiHost}/${config.public.apiVersion}/routes-service/points/favorites`,
        { method: 'GET', query: { userId: '4cef84ba-a98a-4089-b6d8-bf0416ad2208' } }
      )
      favoritePoints.value = response?.data || []
      console.log(favoritePoints.value)
    } catch (error) {
      console.error('Data fetch error:', error)
      favoritePoints.value = []
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    favoritePoints,
    fetchUserPoints,
  }
})
