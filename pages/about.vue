<script setup lang="ts">
import Phone from '~/assets/img/phone.png'

const image = ref<HTMLImageElement | null>(null)
const imageWrapper = ref<HTMLElement | null>(null)
const imageHeight = ref(0)

function updateImageHeight() {
  if (image.value) {
    imageHeight.value = image.value.clientHeight
  }
}

const screenIsXl = ref(false)

function updateScreenSize() {
  screenIsXl.value = window.innerWidth >= 1280
}

onMounted(() => {
  updateScreenSize()
  window.addEventListener('resize', () => {
    updateScreenSize()
    updateImageHeight()
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScreenSize)
  window.removeEventListener('resize', updateImageHeight)
})

definePageMeta({
  layout: 'about',
})
</script>

<template>
  <div
    class="w-full min-h-screen xl:pt-[145px] pt-[145px] px-5 sm:px-10 md:px-16 lg:px-[180px] xl:px-[240px] 2xl:px-[256px] flex flex-col xl:flex-row justify-between items-center xl:items-end"
  >
    <div
      class="flex flex-col justify-between flex-1 xl:max-w-[600px] mb-10 lg:mb-0"
      :style="screenIsXl ? { height: imageHeight + 'px' } : {}"
    >
      <div>
        <NuxtLink to="/">
          <div
            class="xl:mb-[60px] lg:mb-[40px] mb-[20px] text-5xl lg:text-6xl leading-[140%] xl:text-left lg:text-left text-center font-bold bg-gradient-to-b from-[#FFA181] to-[#FF724C] bg-clip-text text-transparent"
          >
            Флоу
          </div>
        </NuxtLink>

        <div class="text-4xl lg:text-5xl xl:text-left lg:text-left text-center leading-[140%]">
          Твой удобный помощник для эффективного планирования поездок
        </div>
      </div>
      <div class="mt-10 text-3xl xl:block hidden text-(--color-glay-about)">PSU Tools</div>
    </div>

    <div class="flex justify-end items-start xl:self-end lg:self-center" ref="imageWrapper">
      <img
        :src="Phone"
        alt="Phone"
        class="max-w-full h-auto object-contain"
        @load="updateImageHeight"
        ref="image"
      />
    </div>
  </div>
</template>
