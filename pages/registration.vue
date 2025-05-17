<script setup lang="ts">
import EmailStep from '~/features/registration/ui/EmailStep.vue'
import PasswordStep from '~/features/registration/ui/PasswordStep.vue'
import InfoStep from '~/features/registration/ui/InfoStep.vue'

definePageMeta({ layout: 'empty' })

const step = ref<1 | 2 | 3>(1)

const nextStep = () => step.value++
const prevStep = () => step.value--
</script>

<template>
  <div v-if="step === 1" class="h-full">
    <EmailStep @next-step="nextStep" />
  </div>
  <div v-if="step === 2" class="h-full">
    <PasswordStep @next-step="nextStep" @prev-step="prevStep" />
  </div>
  <div v-if="step === 3" class="h-full">
    <InfoStep @next-step="nextStep" @prev-step="prevStep" />
  </div>
</template>
