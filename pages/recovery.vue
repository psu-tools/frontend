<script setup lang="ts">
import IcBack from '~/icons/IcBack.vue'
import IcApp from '~/icons/IcApp.vue'
import PrimaryOrangeButton from '~/shaared/ui/buttons/PrimaryOrangeButton.vue'
import { useAuthStore } from '~/stores/auth'
import EmailInput from '~/shaared/ui/inputs/emailInput.vue'
import ErrorModal from '~/features/ErrorModal.vue'

const authStore = useAuthStore()

definePageMeta({
  layout: 'empty',
})

const email = ref<string>('')

const isNoUserError = ref<boolean>(false)
const isEmailError = ref<boolean>(false)

const onClickButton = () => {
  authStore.validateRecoveryForm()
  isNoUserError.value = true
}

const onClickModal = () => {
  isNoUserError.value = false
  isEmailError.value = false
}

watch(email, () => {
  authStore.setEmail(email.value)
  authStore.validateEmail()
})

onMounted(() => authStore.setAuthType('recovery'))
</script>

<template>
  <div class="text-center h-full flex flex-col gap-[25px]">
    <header class="pt-[5px] pb-[15px]">
      <NuxtLink to="/welcome">
        <IcBack />
      </NuxtLink>
    </header>
    <main>
      <div>
        <IcApp class="mx-auto" />
        <h1 class="mt-5 text-(--color-text) dark:text-(--primary-white) font-bold text-xl">
          Восстановление пароля
        </h1>
      </div>

      <div class="mt-5">
        <EmailInput
          v-model="email"
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

      <PrimaryOrangeButton class="py-[15px] mt-6 cursor-pointer" @click="onClickButton"
        >Продолжить</PrimaryOrangeButton
      >
    </main>
  </div>

  <Teleport to="#modal">
    <ErrorModal
      :is-open="isNoUserError"
      message="Пользователя с таким email не существует"
      description="Пожалуйста, введите другой email, чтобы продолжить"
      buttonText="OK"
      @on-click="onClickModal"
    />
  </Teleport>

  <Teleport to="#modal">
    <ErrorModal
      :is-open="isEmailError"
      message="Пожалуйста, введите корректный email"
      buttonText="OK"
      @on-click="onClickModal"
    />
  </Teleport>
</template>

<style scoped></style>
