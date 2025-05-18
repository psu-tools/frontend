<script setup lang="ts">
import IcPlus from '~/icons/IcPlus.vue'

const emit = defineEmits<{ (e: 'update:file', file: File | null): void }>()

const selectedFile = ref<File | null>(null)
const previewUrl = ref<string | null>(null)

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  selectedFile.value = file || null

  if (file) {
    previewUrl.value = URL.createObjectURL(file)
    emit('update:file', file)
  } else {
    previewUrl.value = null
    emit('update:file', null)
  }
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
