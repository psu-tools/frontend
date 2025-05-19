export default defineNuxtRouteMiddleware((to, from) => {
  const { accessToken, refreshToken } = useAuth()
  if (
    !accessToken.value &&
    !refreshToken.value &&
    to.path !== '/welcome' &&
    to.path !== '/login' &&
    to.path !== '/registration' &&
    to.path !== '/recovery'
  ) {
    return navigateTo('/welcome')
  }
})
