import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const authType = ref<'registration' | 'login' | 'recovery'>()
  const email = ref<string>('')
  const password = ref<string>('')

  const name = ref<string>('')
  const surname = ref<string>('')

  const emailError = ref<string | null>(null)
  const passwordError = ref<string | null>(null)

  const setAuthType = (type: 'registration' | 'login' | 'recovery') => (authType.value = type)
  const setEmail = (newEmail: string) => (email.value = newEmail)
  const setPassword = (newPassword: string) => (password.value = newPassword)
  const setName = (newName: string) => (name.value = newName)
  const setSurname = (newSurname: string) => (surname.value = newSurname)

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

  const validateLoginForm = () => {
    validateEmail()
    validatePassword()
    return !emailError.value && !passwordError.value && false
    // привязка бэка
  }

  const validateRecoveryForm = () => {
    return !emailError.value
    // привязка бэка
  }

  return {
    authType,
    email,
    password,
    name,
    surname,
    emailError,
    passwordError,
    setAuthType,
    setEmail,
    setPassword,
    setName,
    setSurname,
    validateEmail,
    validatePassword,
    validateLoginForm,
    validateRecoveryForm,
  }
})
