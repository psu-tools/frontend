<script setup lang="ts">
import PrimaryOrangeButton from '~/shaared/ui/buttons/PrimaryOrangeButton.vue'
import IcApp from '~/icons/IcApp.vue'
import IcBack from '~/icons/IcBack.vue'
import EmailInput from '~/shaared/ui/inputs/emailInput.vue'
import { useAuthStore } from '~/stores/auth'

const emit = defineEmits<{
  (e: 'nextStep'): void
}>()

const authStore = useAuthStore()

const email = ref<string>('')
watch(email, () => {
  authStore.setEmail(email.value)
  authStore.validateEmail()
})
</script>

<template>
  <div class="text-center h-full flex flex-col justify-between">
    <header class="pt-[5px] pb-[15px] flex gap-2.5">
      <NuxtLink to="/welcome">
        <IcBack />
      </NuxtLink>
    </header>
    <main class="pb-16">
      <div>
        <IcApp class="mx-auto" />
        <h1 class="mt-5 text-(--color-text) dark:text-(--primary-white) font-bold text-xl">
          Регистрация
        </h1>
      </div>

      <div class="mt-5">
        <EmailInput v-model="email" />
        <Transition name="fade-slide">
          <p
            class="text-left pl-[15px] text-sm mt-1 text-(--primary-red) leading-4"
            v-if="authStore.emailError"
          >
            {{ authStore.emailError }}
          </p>
        </Transition>
      </div>

      <PrimaryOrangeButton
        class="py-[15px] mt-6 cursor-pointer"
        @click="emit('nextStep')"
        :disabled="!!authStore.emailError || email === ''"
        >Продолжить</PrimaryOrangeButton
      >
    </main>

    <footer>
      <p class="text-(--color-text) dark:text-(--primary-white)">
        Уже есть аккаунт?
        <NuxtLink to="/login" class="text-(--primary-orange) font-medium cursor-pointer"
          >Войдите</NuxtLink
        >
      </p>
    </footer>
  </div>
</template>

<style scoped></style>
