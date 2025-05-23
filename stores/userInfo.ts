import { defineStore } from 'pinia'
import { customFetch } from '~/utils/customFetch'

export type InterfaceLanguage = 'ru' | 'en'

export type NotificationMethod = 'EMAIL' | 'PHONE_NUMBER' | 'TELEGRAM'

export interface UserPreferences {
  interfaceLanguage: InterfaceLanguage
  notificationMethods: NotificationMethod[]
  overtimeMultiplier: number
}

export interface UserInfo {
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  telegramId: number
  telegramUsername: string
  avatarUri: string
  userPreferences: UserPreferences
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
      if (userInfo.value !== response) {
        userInfo.value = response
      }
      return response
    } catch (error) {
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
      await getUserInfo()
      console.log('Информация успешно обновлена')
      userInfo.value = response
      return response
    } catch (error) {
      throw error
    }
  }

  return {
    userId,
    userInfo,
    getUserInfo,
    updateUserInfo,
    setUserId,
  }
})
