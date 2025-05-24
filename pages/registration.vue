<script setup lang="ts">
import EmailStep from '~/features/registration/ui/EmailStep.vue'
import PasswordStep from '~/features/registration/ui/PasswordStep.vue'
import InfoStep from '~/features/registration/ui/InfoStep.vue'
import { useAuthStore } from '~/stores/auth'
import ErrorModal from '~/features/ErrorModal.vue'

definePageMeta({ layout: 'empty' })

const authStore = useAuthStore()

const step = ref<1 | 2 | 3>(1)
const isFormSent = ref<boolean>(false)

const hasError = ref<boolean>(false)
const errorMessage = ref<string>('')
const errorDescription = ref<string>('')

const nextStep = () => step.value++
const prevStep = () => step.value--

const sendForm = async () => {
  // const code = await authStore.validateRegisterForm()
  // if (code === 200) {
  //   isFormSent.value = true
  // } else if (code === 409) {
  //   errorMessage.value = 'Этот email уже используется'
  //   errorDescription.value = 'Пожалуйста, введите другой email, чтобы продолжить'
  //   hasError.value = true
  // } else {
  //   errorMessage.value = 'Возникла ошибка'
  //   errorDescription.value = 'Попробуйте позже'
  //   hasError.value = true
  // }
  errorMessage.value = 'Регистрация недоступна'
  errorDescription.value = 'Зарегистрируйтесь после демо'
  hasError.value = true
}
</script>

<template>
  <div v-if="step === 1" class="h-full">
    <EmailStep @next-step="nextStep" />
  </div>
  <div v-if="step === 2" class="h-full">
    <PasswordStep @next-step="nextStep" @prev-step="prevStep" />
  </div>
  <div v-if="step === 3" class="h-full">
    <InfoStep @send-form="sendForm" @prev-step="prevStep" />
  </div>
  <ErrorModal
    @on-click="hasError = false"
    :is-open="hasError"
    :message="errorMessage"
    :description="errorDescription"
    button-text="OK"
  />
</template>
