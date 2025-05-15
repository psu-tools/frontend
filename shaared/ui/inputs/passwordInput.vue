<script setup lang="ts">
import IcEyeOpen from '~/icons/password-input-eyes/IcEyeOpen.vue'
import IcEyeClose from '~/icons/password-input-eyes/IcEyeClose.vue'

const emit = defineEmits<{ (e: 'setPassword', value: string): void }>()

defineProps<{ hasError?: boolean }>()

const password = ref<string>('')

const showPassword = ref<boolean>(false)

const togglePassword = () => (showPassword.value = !showPassword.value)

watch(password, () => emit('setPassword', password.value))
</script>

<template>
  <div class="relative w-full">
    <input
      :type="showPassword ? 'text' : 'password'"
      v-model="password"
      placeholder="Пароль"
      class="w-full py-[15px] pl-[18px] pr-10 text-(--color-text) border border-(--light-input-border) bg-(--light-input-bg) rounded-(--radius-2xl) focus:border-(--primary-orange) focus:outline-none transition-colors"
      :class="{ 'border-(--primary-red)': hasError }"
    />
    <button
      type="button"
      @click="togglePassword"
      class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
    >
      <IcEyeOpen class="cursor-pointer" v-if="showPassword" />
      <IcEyeClose class="cursor-pointer" v-else />
    </button>
  </div>
</template>
