<script setup lang="ts">
import PrimaryOrangeButton from '~/shaared/ui/buttons/PrimaryOrangeButton.vue'
import IcApp from '~/icons/IcApp.vue'
import PasswordInput from '~/shaared/ui/inputs/passwordInput.vue'
import IcBack from '~/icons/IcBack.vue'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()

const emit = defineEmits<{
  (e: 'prevStep'): void
  (e: 'nextStep'): void
}>()

const password = ref<string>('')
const repeatPassword = ref<string>('')

const passwordError = ref<string | null>()

watch(password, () => {
  authStore.setPassword(password.value)
  authStore.validatePassword()
})

watch(repeatPassword, () => {
  if (authStore.passwordError) {
    passwordError.value = authStore.passwordError
  } else if (password.value !== repeatPassword.value) {
    passwordError.value = 'Пароли не совпадают'
  } else {
    passwordError.value = null
  }
})
</script>

<template>
  <div class="text-center h-full flex flex-col gap-[25px]">
    <header class="pt-[5px] pb-[15px] flex gap-2.5">
      <IcBack @click="emit('prevStep')" />
    </header>
    <main>
      <div>
        <IcApp class="mx-auto" />
        <h1 class="mt-5 text-(--color-text) dark:text-(--primary-white) font-bold text-xl">
          Придумайте пароль
        </h1>
      </div>

      <div class="mt-5 space-y-3.5">
        <div>
          <PasswordInput v-model="password" :has-error="!!authStore.passwordError" />
          <Transition name="fade-slide">
            <p
              class="text-left pl-[15px] text-sm mt-1 text-(--primary-red) leading-4"
              v-if="authStore.passwordError"
            >
              {{ authStore.passwordError }}
            </p>
          </Transition>
        </div>
        <div>
          <PasswordInput
            v-model="repeatPassword"
            :has-error="!!authStore.passwordError"
            placeholder="Повторите пароль"
          />
          <Transition name="fade-slide">
            <p
              class="text-left pl-[15px] text-sm mt-1 text-(--primary-red) leading-4"
              v-if="passwordError"
            >
              {{ passwordError }}
            </p>
          </Transition>
        </div>
      </div>

      <PrimaryOrangeButton
        class="py-[15px] mt-6 cursor-pointer"
        @click="emit('nextStep')"
        :disabled="
          !!authStore.emailError ||
          !!authStore.passwordError ||
          !!passwordError ||
          repeatPassword === '' ||
          password === ''
        "
        >Продолжить</PrimaryOrangeButton
      >
    </main>
  </div>
</template>
