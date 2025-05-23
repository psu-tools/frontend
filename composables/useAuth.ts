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
      console.log('success login')
      console.log(response)
      navigateTo('/')
      await tripsStore.fetchTrips()
      return true
    } catch (e) {
      if (e?.response?.status === 401) {
        console.warn('Неверные данные авторизации')
        return false
      }

      console.error('Auth error:', e)
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
      console.log('success refresh')
      return true
    } catch (e) {
      console.error('Token refresh err:', e)
      return false
    }
  }

  const logout = () => {
    accessToken.value = null
    refreshToken.value = null
    navigateTo('/welcome')
    console.log('success logout')
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

    console.log(payload)
    try {
      const response = await $fetch(`${config.public.apiHost}/v1/users-service/users`, {
        method: 'POST',
        body: payload,
      })

      console.log(response)
      return 200
    } catch (e) {
      if (e?.response?.status === 409) {
        console.warn('Пользователь уже существует')
        return 409
      }
      console.log('Register error', e)
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
