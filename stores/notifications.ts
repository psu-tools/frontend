import { defineStore } from 'pinia'

export interface Notification {
  id: string
  type: string
  headerText: string
  bodyText: string
  createdAt: string
}

export interface Paging {
  sorted: boolean
  pageNumber: number
  pageSize: number
  totalElements: number
  last: boolean
}

export interface NotificationsResponse {
  success: boolean
  data: Notification[]
  paging: Paging
}

export const useNotificationsStore = defineStore('notifications', () => {
  const notifications = ref<Notification[]>([])
  const paging = ref<Partial<Paging>>({})
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchNotifications = async (page: number = 0, pageSize: number = 50) => {
    loading.value = true
    try {
      const config = useRuntimeConfig()
      const response = await $fetch<NotificationsResponse>(
        `${config.public.apiHost}/notifications-service/notifications?receiverId=1a1a28b4-4b90-46f3-9381-35420bbb13fc`,
        {
          method: 'GET',
          query: { pageNumber: page, pageSize },
        }
      )
      if (response.success) {
        if (page === 0) {
          notifications.value = response.data
        } else {
          notifications.value.push(...response.data)
        }
        paging.value = response.paging
      }
    } catch (err: any) {
      error.value = err.message || 'Ошибка загрузки уведомлений'
      console.error('Ошибка при получении уведомлений:', err)
    } finally {
      loading.value = false
    }
  }

  const loadNextPage = async () => {
    if (paging.value?.last) return
    const nextPage = (paging.value.pageNumber ?? 0) + 1
    const size = paging.value.pageSize ?? 50
    await fetchNotifications(nextPage, size)
  }

  return {
    notifications,
    paging,
    loading,
    error,
    fetchNotifications,
    loadNextPage
  }

})
