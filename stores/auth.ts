import { useAuth } from '~/composables/useAuth'
import { defineStore } from 'pinia'
import { useUserInfo } from '~/stores/userInfo'

export const useAuthStore = defineStore('auth', () => {
  const authType = ref<'registration' | 'login' | 'recovery'>()
  const email = ref<string>('')
  const password = ref<string>('')

  const name = ref<string>('')
  const surname = ref<string>('')
  const avatar = ref<File | null>(null)

  const userId = ref<string | null>(null)

  const emailError = ref<string | null>(null)
  const passwordError = ref<string | null>(null)

  const isLoginFormValid = ref<boolean>(false)
  const isRegisterFormValid = ref<boolean>(false)

  const setAuthType = (type: 'registration' | 'login' | 'recovery') => (authType.value = type)
  const setEmail = (newEmail: string) => (email.value = newEmail)
  const setPassword = (newPassword: string) => (password.value = newPassword)
  const setName = (newName: string) => (name.value = newName)
  const setSurname = (newSurname: string) => (surname.value = newSurname)
  const setAvatar = (newAvatar: File) => (avatar.value = newAvatar)

  const validateEmail = () => {
    if (!email.value) {
      emailError.value = 'Email обязателен'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      emailError.value = 'Некорректный email'
    } else {
      emailError.value = null
    }
  }

  const validatePassword = () => {
    if (!password.value) {
      passwordError.value = 'Пароль обязателен'
    } else if (password.value.length < 8) {
      passwordError.value = 'Пароль должен быть не короче 8 символов'
    } else {
      passwordError.value = null
    }
  }

  const decodeAccessToken = (token: string): any | null => {
    try {
      const base64Payload = token.split('.')[1]
      const jsonPayload = atob(base64Payload)
      return JSON.parse(jsonPayload)
    } catch (e) {
      console.error('Ошибка при декодировании access_token:', e)
      return null
    }
  }

  const validateLoginForm = async () => {
    validateEmail()
    validatePassword()
    if (!emailError.value && !passwordError.value) {
      const { login, accessToken } = useAuth()
      const success = await login(email.value, password.value)
      isLoginFormValid.value = success

      if (success && accessToken.value) {
        const decoded = decodeAccessToken(accessToken.value)
        userId.value = decoded?.sub || null

        if (userId.value) {
          const userInfoStore = useUserInfo()
          userInfoStore.setUserId(userId.value)
          await userInfoStore.getUserInfo()
        }
      }
    }
  }

  const validateRegisterForm = async () => {
    validateEmail()
    validatePassword()
    if (!emailError.value && !passwordError.value) {
      const { register } = useAuth()
      const successRegister = await register({
        email: email.value,
        password: password.value,
        firstName: name.value,
        lastName: surname.value,
      })

      const { login, accessToken } = useAuth()
      const success = await login(email.value, password.value)

      if (success && accessToken.value) {
        const decoded = decodeAccessToken(accessToken.value)
        userId.value = decoded?.sub || null

        if (userId.value) {
          const userInfoStore = useUserInfo()
          userInfoStore.setUserId(userId.value)
          await userInfoStore.getUserInfo()
        }
      }

      return success
    }
    return 400
  }

  const validateRecoveryForm = () => {
    return !emailError.value
  }

  return {
    authType,
    email,
    password,
    name,
    surname,
    avatar,
    emailError,
    passwordError,
    isLoginFormValid,
    setAuthType,
    setEmail,
    setPassword,
    setName,
    setSurname,
    setAvatar,
    validateEmail,
    validatePassword,
    validateRegisterForm,
    validateLoginForm,
    validateRecoveryForm,
  }
})
