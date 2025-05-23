import { defineStore } from 'pinia'
import { customFetch } from '~/utils/customFetch'

export interface UserInfo {
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  telegramId: number
  avatarUri: string
  userPreferences: object
}

export const useUserInfo = defineStore('userInfo', () => {
  const userInfo = ref<UserInfo | null>()
  const userId = ref<string | null>(null)

  onMounted(() => {
    if (typeof window !== 'undefined') {
      userId.value = localStorage.getItem('userId')
    }
  })

  const setUserId = (newUserId: string) => {
    userId.value = newUserId
    if (typeof window !== 'undefined') {
      localStorage.setItem('userId', newUserId)
    }
  }

  const getUserInfo = async () => {
    try {
      const config = useRuntimeConfig()
      const response = await customFetch<UserInfo>(
        `${config.public.apiHost}/${config.public.apiVersion}/${config.public.apiType}/users/${userId.value}`,
        {
          method: 'GET',
        }
      )
      console.log('Информация успешно получена:', response)
      if (userInfo.value !== response) {
        userInfo.value = response
      }
      return response
    } catch (error) {
      console.error('Ошибка получения информации о пользователе:', error)
      throw error
    }
  }

  const updateUserInfo = async (updatedData: Partial<UserInfo>) => {
    try {
      const config = useRuntimeConfig()
      const response = await customFetch<UserInfo>(
        `${config.public.apiHost}/${config.public.apiVersion}/${config.public.apiType}/users/${userId.value}`,
        {
          method: 'PATCH',
          body: JSON.stringify(updatedData),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      console.log('Информация успешно обновлена:', response)
      userInfo.value = response
      return response
    } catch (error) {
      console.error('Ошибка обновления информации о пользователе:', error)
      throw error
    }
  }

  return {
    userInfo,
    getUserInfo,
    updateUserInfo,
    setUserId,
  }
})
