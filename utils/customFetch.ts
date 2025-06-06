export const customFetch = async <T>(url: string, options: any = {}): Promise<T> => {
  const { accessToken, refreshToken, refresh, logout } = useAuth()

  try {
    return await $fetch<T>(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken.value}`,
      },
    })
  } catch (error: any) {
    if (error?.response?.status === 401) {
      try {
        const refreshed = await refresh()

        if (refreshed) {
          return await $fetch<T>(url, {
            ...options,
            headers: {
              ...options.headers,
              Authorization: `Bearer ${accessToken.value}`,
            },
          })
        } else {
          logout()
          throw new Error('Session expired')
        }
      } catch (refreshError) {
        console.error('Ошибка обновления токена:', refreshError)
      }
    }
    throw error
  }
}
