<script setup lang="ts">
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import { CircleStencil } from 'vue-advanced-cropper'

defineProps<{ image: string }>()

const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'crop', file: File): void
}>()

const cropperRef = ref()

const onCancel = () => emit('cancel')

const onCrop = () => {
  const canvas = cropperRef.value.getResult().canvas
  canvas.toBlob(blob => {
    if (blob) {
      const file = new File([blob], 'avatar.png', { type: 'image/png' })
      emit('crop', file)
    }
  }, 'image/png')
}
</script>

<template>
  <div class="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
    <div
      class="bg-(--primary-white) dark:bg-(--primary-black-bg) rounded-(--radius-2xl) overflow-hidden w-[90%] max-w-md"
    >
      <Cropper
        class="w-full h-[350px]"
        :src="image"
        :stencil-props="{ aspectRatio: 1, movable: true, previewClass: 'preview' }"
        :stencil-component="CircleStencil"
        :auto-zoom="true"
        :resize-image="true"
        ref="cropperRef"
      />

      <div class="py-3 px-4 flex justify-between gap-2">
        <button @click="onCancel" class="text-(--color-text-gray-secondary) cursor-pointer">
          {{ $t('cancelButton') }}
        </button>
        <button @click="onCrop" class="text-(--primary-orange) font-semibold cursor-pointer">
          {{ $t('save') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.preview {
  border: dashed 2px rgba(255, 255, 255, 0.45);
}
</style>
