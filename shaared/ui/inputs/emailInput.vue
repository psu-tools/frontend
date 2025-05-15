<script setup lang="ts">
defineProps<{ hasError?: boolean }>()

const emit = defineEmits<{ (e: 'setEmail', value: string): void }>()

const email = ref<string>('')

watch(email, () => emit('setEmail', email.value))
</script>

<template>
  <input
    type="email"
    v-model="email"
    placeholder="Email"
    class="w-full py-[15px] px-[18px] text-(--color-text) border border-(--light-input-border) bg-(--light-input-bg) rounded-(--radius-2xl) focus:border-(--primary-orange) focus:outline-none transition-colors"
    :class="{ 'border-(--primary-red)': hasError }"
  />
</template>
