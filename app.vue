<script setup lang="ts">
import TripPopup from '~/pages/tripPopup.vue'
import AddTripModal from '~/pages/addTripModal.vue'
import YandexMaps from '~/pages/yandexMaps.vue'
import { NuxtLayout } from '#components'
import { useYandexMapsModalStore } from '~/stores/yandexMaps'
import IcApp from '~/icons/IcApp.vue'

const route = useRoute()
const yandexMapsModalStore = useYandexMapsModalStore()

const isFullscreenRoute = computed(() => route.path === '/about')
</script>

<template>
  <VitePwaManifest />
  <Head>
    <meta name="theme-color" content="#ffffff" />
  </Head>
  <div
    class="sm:flex sm:justify-between sm:items-center sm:px-10 lg:px-24 2xl:justify-center 2xl:gap-20 sm:h-screen sm:bg-gradient-to-br sm:from-[#f4f4f8] sm:to-(--primary-orange) dark:sm:from-black dark:to-(--primary-orange)"
  >
    <div class="hidden sm:block w-1/2">
      <div class="flex gap-3 sm:pb-32">
        <div class="!h-24 !w-24">
          <IcApp />
        </div>
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
        <NuxtPage />
        <TripPopup v-if="!isFullscreenRoute" />
        <AddTripModal v-if="!isFullscreenRoute" />
        <YandexMaps v-if="!isFullscreenRoute && yandexMapsModalStore.isOpen" />
      </component>
    </div>
  </div>
</template>
