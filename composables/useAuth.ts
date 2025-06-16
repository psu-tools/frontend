import { useCookie } from '#app'
import { useTripsStore } from '~/stores/trips'

export interface LoginResponse {
  access_token: string
  refresh_token: string
  expires_in: number
  refresh_expires_in: number
}

export interface RefreshResponse {
  access_token: string
  refresh_token: string
}

export interface Register {
  email: string
  password: string
  firstName: string
  lastName?: string
  phoneNumber?: string
  avatarUri?: string
  telegramId?: string
}

export function useAuth() {
  const tripsStore = useTripsStore()
  const config = useRuntimeConfig()
  const accessToken = useCookie<string | null>('access_token', { maxAge: 300 })
  const refreshToken = useCookie<string | null>('refresh_token', { maxAge: 2592000 })

  const isAuthenticated = computed(() => !!accessToken.value)

  const login = async (email: string, password: string) => {
    try {
      const response = await $fetch<LoginResponse>(
        `${config.public.authHost}/realms/flow/protocol/openid-connect/token`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            client_id: 'frontend',
            grant_type: 'password',
            username: email,
            password: password,
          }).toString(),
        }
      )

      accessToken.value = response.access_token
      refreshToken.value = response.refresh_token

      navigateTo('/')
      await tripsStore.fetchTrips()

      return true
    } catch (e: any) {
      if (e?.statusCode === 401) {
        console.warn('Неверные данные авторизации')
        return false
      }

      console.error('Ошибка авторизации:', e)
      return false
    }
  }

  const refresh = async () => {
    if (!refreshToken.value) return false

    try {
      const response = await $fetch<RefreshResponse>(
        `${config.public.authHost}/realms/flow/protocol/openid-connect/token`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            client_id: 'frontend',
            grant_type: 'refresh_token',
            refresh_token: refreshToken.value,
          }).toString(),
        }
      )

      accessToken.value = response.access_token
      refreshToken.value = response.refresh_token
      return true
    } catch (e) {
      console.error('Ошибка обновления токена:', e)
      return false
    }
  }

  const logout = () => {
    const localePath = useLocalePath()
    accessToken.value = null
    refreshToken.value = null
    navigateTo(localePath('/welcome'))
    localStorage.removeItem('userId')
    return true
  }

  const register = async (data: Register) => {
    const payload = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data?.lastName,
      phoneNumber: data?.phoneNumber,
      avatarUri: data?.avatarUri,
      telegramId: data?.telegramId,
      userPreferences: {
        overtimeMultiplier: 10,
        interfaceLanguage: 'ru',
        notificationMethods: ['EMAIL'],
      },
    }

    try {
      await $fetch(`${config.public.apiHost}/v1/users-service/users`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return 200
    } catch (e: any) {
      if (e?.statusCode === 409) {
        console.warn('Пользователь уже существует')
        return 409
      }

      console.error('Ошибка при регистрации:', e)
      return 400
    }
  }

  return {
    accessToken,
    refreshToken,
    isAuthenticated,
    register,
    login,
    refresh,
    logout,
  }
}
