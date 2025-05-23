<script setup lang="ts">
import IcPlus from '~/icons/IcPlus.vue'

const modelValue = defineModel<File | null>()

const previewUrl = ref<string | null>(null)

watch(modelValue, val => {
  if (val) {
    previewUrl.value = URL.createObjectURL(val)
  } else {
    previewUrl.value = null
  }
})

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0] || null
  modelValue.value = file
}
</script>

<template>
  <label
    class="w-20 h-20 rounded-full border border-(--light-input-border) dark:border-(--dark-input-border) bg-(--light-input-bg) dark:bg-(--secondary-black-bg) flex items-center justify-center cursor-pointer relative overflow-hidden"
  >
    <input type="file" accept="image/*" class="hidden" @change="onFileChange" />
    <template v-if="previewUrl">
      <img :src="previewUrl" alt="avatar" class="absolute inset-0 object-cover w-full h-full" />
    </template>
    <template v-else>
      <IcPlus color="#FF724C" />
    </template>
  </label>
</template>
