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

const nextStep = () => step.value++
const prevStep = () => step.value--

const sendForm = () => (isFormSent.value = true)
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
    :is-open="isFormSent"
    :message="'Добро пожаловать, ' + authStore.name + ' ' + authStore.surname + '!'"
    @on-click="isFormSent = false"
    button-text="окак"
  />
</template>
