<script setup lang="ts">
import PrimaryOrangeButton from '~/shaared/ui/buttons/PrimaryOrangeButton.vue'

useSeoMeta({
  title: 'Flow – всегда вовремя',
  description: 'Планируйте путешествия с Flow: поиск мест, маршрутов и напоминания о поездках',
  ogTitle: 'Flow – всегда вовремя',
  ogDescription: 'Flow поможет спланировать ваши маршруты и не забыть важные дела в путешествии',
  ogImage: 'https://ibb.co/PZzQLvxg',
  twitterCard: 'summary_large_image',
})

const image = ref<HTMLImageElement | null>(null)

definePageMeta({
  layout: 'about',
})
</script>

<template>
  <div
    class="here bg-(--primary-white) w-full min-h-screen xl:pt-[70px] lg:pt-[70px] pt-[40px] px-5 sm:px-10 md:px-16 lg:px-[180px] xl:px-[220px] 2xl:px-[240px] gap-[70px] flex flex-col justify-between items-center"
  >
    <div class="xl:w-[80px] lg:w-[80px] w-[40px]">
      <NuxtLink to="/">
        <NuxtImg
          src="/web-app-manifest-192x192.png"
          class="bg-gradient-to-b from-(--smoke-gray) to-[#EBEBEB] h-20 w-20 rounded-(--radius-2xl) mt-1.5"
          alt="Flow logo"
        />
      </NuxtLink>
    </div>
    <div
      class="w-full flex flex-col xl:flex-row justify-between items-start xl:gap-[0] lg:gap-[0] gap-[40px]"
    >
      <div class="flex flex-col justify-between flex-1 xl:max-w-[600px] lg:mb-0">
        <div
          class="flex flex-col xl:gap-[75px] lg:gap-[50px] gap-[35px] xl:mt-[110px] lg:mt-[70px]"
        >
          <NuxtLink to="/">
            <div
              class="text-5xl xl:text-6xl lg:text-6xl leading-[140%] xl:text-left lg:text-left text-center font-bold bg-gradient-to-b from-[#FFA181] to-[#FF724C] bg-clip-text text-transparent"
            >
              Флоу
            </div>
          </NuxtLink>

          <div
            class="text-xl lg:text-4xl xl:text-left lg:text-left text-center leading-[140%] text-(--dark-gray)"
          >
            Твой удобный помощник для эффективного планирования поездок
          </div>
          <NuxtLink to="/">
            <PrimaryOrangeButton
              class="w-full cursor-pointer xl:text-lg lg:text-lg text-sm xl:py-[20px] lg:py-[15px] py-[15px] xl:max-w-[450px] lg:max-w-[450px] xl:rounded-2xl lg:rounded-2xl rounded-full"
            >
              Регистрация
            </PrimaryOrangeButton>
          </NuxtLink>
        </div>
      </div>

      <div class="flex justify-end items-start xl:self-end lg:self-center" ref="imageWrapper">
        <NuxtImg
          src="/phone.png"
          alt="Phone"
          class="max-w-full h-auto object-contain"
          ref="image"
        />
      </div>
    </div>
  </div>
</template>
