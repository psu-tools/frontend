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
  const userId = ref<string>('4cef84ba-a98a-4089-b6d8-bf0416ad2208')
  const userInfo = ref<UserInfo | null>()

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
      userInfo.value = response
      return response
    } catch (error) {
      throw error
    }
  }

  return {
    userInfo,
    getUserInfo,
    updateUserInfo,
  }
})
