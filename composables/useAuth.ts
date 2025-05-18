import { useCookie } from '#app'

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

export function useAuth() {
  const config = useRuntimeConfig()
  const accessToken = useCookie<string | null>('access_token', { maxAge: 300 })
  const refreshToken = useCookie<string | null>('refresh_token', { maxAge: 1800 })

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
      return true
    } catch (e) {
      console.error('Auth err:', e)
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

  return {
    accessToken,
    refreshToken,
    isAuthenticated,
    login,
    refresh,
    logout,
  }
}
