<script setup lang="ts">
import IcEyeOpen from '~/icons/password-input-eyes/IcEyeOpen.vue'
import IcEyeClose from '~/icons/password-input-eyes/IcEyeClose.vue'

const props = defineProps<{
  modelValue: string
  hasError?: boolean
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const password = ref(props.modelValue)
const showPassword = ref(false)

watch(
  () => props.modelValue,
  val => (password.value = val)
)

watch(password, val => emit('update:modelValue', val))

const togglePassword = () => (showPassword.value = !showPassword.value)
</script>

<template>
  <div class="relative w-full">
    <input
      :type="showPassword ? 'text' : 'password'"
      v-model="password"
      :placeholder="placeholder || 'Пароль'"
      class="w-full py-[15px] pl-[18px] pr-10 text-(--color-text) dark:text-(--primary-white) border border-(--light-input-border) dark:border-(--dark-input-border) bg-(--light-input-bg) dark:bg-(--secondary-black-bg) rounded-(--radius-2xl) focus:border-(--primary-orange) focus:outline-none transition-colors"
      :class="{ 'border-(--primary-red)': hasError }"
    />
    <button
      type="button"
      @click="togglePassword"
      class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
    >
      <IcEyeOpen v-if="showPassword" class="cursor-pointer" />
      <IcEyeClose v-else class="cursor-pointer" />
    </button>
  </div>
</template>
