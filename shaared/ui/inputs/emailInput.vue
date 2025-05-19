<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  hasError?: boolean
  placeholder?: string
}>()

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const email = ref<string>('')

watch(
  () => props.modelValue,
  val => (email.value = val)
)

watch(email, val => emit('update:modelValue', val))
</script>

<template>
  <input
    type="email"
    v-model="email"
    :placeholder="placeholder || 'Email'"
    class="w-full py-[15px] px-[18px] text-(--color-text) dark:text-(--primary-white) border border-(--light-input-border) dark:border-(--dark-input-border) bg-(--light-input-bg) dark:bg-(--secondary-black-bg) rounded-(--radius-2xl) focus:border-(--primary-orange) focus:outline-none transition-colors"
    :class="{ 'border-(--primary-red)': hasError }"
  />
</template>
