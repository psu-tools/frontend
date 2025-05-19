<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  hasError?: boolean
  placeholder?: string
}>()

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const text = ref<string>('')

watch(
  () => props.modelValue,
  val => (text.value = val)
)

watch(text, val => emit('update:modelValue', val))
</script>

<template>
  <input
    type="text"
    v-model="text"
    :placeholder="placeholder || ''"
    class="w-full py-[15px] px-[18px] text-(--color-text) dark:text-(--primary-white) border border-(--light-input-border) dark:border-(--dark-input-border) bg-(--light-input-bg) dark:bg-(--secondary-black-bg) rounded-(--radius-2xl) focus:border-(--primary-orange) focus:outline-none transition-colors"
    :class="{ 'border-(--primary-red)': hasError }"
  />
</template>
