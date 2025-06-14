<script setup lang="ts">
import TripPopup from '~/pages/tripPopup.vue'
import AddTripModal from '~/pages/addTripModal.vue'
import YandexMaps from '~/pages/yandexMaps.vue'

import { useTripsStore } from '~/stores/trips'
import { NuxtLayout } from '#components'
import { useYandexMapsModalStore } from '~/stores/yandexMaps'

const route = useRoute()
const tripsStore = useTripsStore()
const yandexMapsModalStore = useYandexMapsModalStore()

const isFullscreenRoute = computed(() => route.path === '/about')

onMounted(async () => {
  useTheme()
  await tripsStore.fetchTrips()
})
</script>

<template>
  <VitePwaManifest />
  <div
    class="sm:flex sm:justify-between sm:items-center sm:px-10 lg:px-24 2xl:justify-center 2xl:gap-20 sm:h-screen sm:bg-gradient-to-br sm:from-[#f4f4f8] sm:to-(--primary-orange) dark:sm:from-black dark:to-(--primary-orange)"
  >
    <div class="hidden sm:block w-1/2">
      <div class="flex gap-3 items-start sm:pb-32">
        <NuxtImg
          src="/web-app-manifest-192x192.png"
          class="bg-gradient-to-b from-(--smoke-gray) to-[#EBEBEB] dark:from-[#3a3a3a] dark:to-[#2f2f2f] h-20 w-20 rounded-(--radius-2xl) mt-1.5"
          alt="Flow logo"
        />
        <h1 class="text-text dark:text-(--primary-orange) sm:text-4xl lg:text-6xl 2xl:pl-20">
          <span class="font-bold">{{ $t('appName') }}</span> — <br />
          {{ $t('appDescriptionLayout') }}
        </h1>
      </div>
    </div>

    <div
      :class="
        isFullscreenRoute
          ? 'absolute inset-0 h-screen w-screen overflow-hidden'
          : 'sm:w-1/2 sm:pr-10'
      "
    >
      <component
        :is="isFullscreenRoute ? 'div' : NuxtLayout"
        :class="isFullscreenRoute ? '' : 'sm:rounded-3xl sm:shadow-2xl sm:mx-auto overflow-hidden'"
      >
        <!--        <NuxtLink :to="$switchLocalePath('en')">English</NuxtLink>-->
        <!--        <NuxtLink :to="$switchLocalePath('ru')">Русский</NuxtLink>-->
        <NuxtPage />
        <TripPopup v-if="!isFullscreenRoute" />
        <AddTripModal v-if="!isFullscreenRoute" />
        <YandexMaps v-if="!isFullscreenRoute && yandexMapsModalStore.isOpen" />
      </component>
    </div>
  </div>
</template>
