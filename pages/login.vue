<script setup lang="ts">
import IcBack from '~/icons/IcBack.vue'
import IcApp from '~/icons/IcApp.vue'
import PrimaryOrangeButton from '~/shaared/ui/buttons/PrimaryOrangeButton.vue'
import PasswordInput from '~/shaared/ui/inputs/passwordInput.vue'
import { useAuthStore } from '~/stores/auth'
import EmailInput from '~/shaared/ui/inputs/emailInput.vue'
import ErrorModal from '~/features/ErrorModal.vue'

definePageMeta({
  layout: 'empty',
})

const authStore = useAuthStore()

const isErrorModalOpen = ref<boolean>(false)

const setPassword = (value: string): void => {
  authStore.setPassword(value)
  authStore.validatePassword()
}

const setEmail = (value: string): void => {
  authStore.setEmail(value)
  authStore.validateEmail()
}

const submitForm = () => {
  if (authStore.validateLoginForm()) {
    console.log('Всё валидно, отправляем:', authStore.email, authStore.password)
  } else {
    isErrorModalOpen.value = true
  }
}

const onClickModal = () => {
  isErrorModalOpen.value = false
  authStore.setPassword('')
  authStore.setEmail('')
}

onMounted(() => authStore.setAuthType('login'))
</script>

<template>
  <div class="relative text-center h-full flex flex-col justify-between">
    <header class="pt-[5px] pb-[15px]">
      <NuxtLink to="/welcome">
        <IcBack />
      </NuxtLink>
    </header>
    <main class="pb-16">
      <div>
        <IcApp class="mx-auto" />
        <h1 class="mt-5 text-(--color-text) font-bold text-xl">Вход</h1>
      </div>

      <div class="mt-5 space-y-3.5">
        <div>
          <EmailInput
            @set-email="setEmail"
            :has-error="authStore.emailError"
            :initial-value="authStore.email"
          />
          <Transition name="fade-slide">
            <p
              class="text-left pl-[15px] text-sm mt-1 text-(--primary-red) leading-4"
              v-if="authStore.emailError"
            >
              {{ authStore.emailError }}
            </p>
          </Transition>
        </div>
        <div>
          <PasswordInput @set-password="setPassword" :has-error="authStore.passwordError" />
          <Transition name="fade-slide">
            <p
              class="text-left pl-[15px] text-sm mt-1 text-(--primary-red) leading-4"
              v-if="authStore.passwordError"
            >
              {{ authStore.passwordError }}
            </p>
          </Transition>
        </div>
      </div>

      <PrimaryOrangeButton class="mt-6 p-[15px] cursor-pointer" @click="submitForm"
        >Войти</PrimaryOrangeButton
      >

      <button class="mt-5 text-(--dark-gray) font-medium cursor-pointer">Забыли пароль?</button>
    </main>

    <footer>
      <p class="text-(--color-text)">
        Нет аккаунта?
        <NuxtLink to="/registration" class="text-(--primary-orange) font-medium cursor-pointer"
          >Зарегистрируйтесь</NuxtLink
        >
      </p>
    </footer>
  </div>
  <Teleport to="#modal">
    <ErrorModal
      :is-open="isErrorModalOpen"
      message="Неверный логин или пароль"
      buttonText="Попробовать снова"
      @on-click="onClickModal"
    />
  </Teleport>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.1s ease;
  overflow: hidden;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  max-height: 0;
  margin-top: 0;
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  max-height: 50px;
}
</style>
