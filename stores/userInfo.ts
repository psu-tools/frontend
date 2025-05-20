import { defineStore } from 'pinia'
import { customFetch } from '~/utils/customFetch'

export const useUserInfo = defineStore('userInfo', () => {
  let userId = ref<string>('4cef84ba-a98a-4089-b6d8-bf0416ad2208')

  const getUserInfo = async () => {
    try {
      const config = useRuntimeConfig()
      const response = await customFetch(
        `${config.public.apiHost}/${config.public.apiVersion}/${config.public.apiType}/users/${userId.value}`,
        {
          method: 'GET',
        }
      )

      console.log('Информация успешно получена:', response)
      return response
    } catch (error) {
      console.error('Ошибка получения информации о пользователе:', error)
      throw error
    }
  }

  return {
    getUserInfo,
  }
})
