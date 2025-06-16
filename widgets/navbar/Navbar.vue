<script setup lang="ts">
import Home from '~/icons/IcHome.vue'
import Routes from '~/icons/IcRoutes.vue'
import Profile from '~/icons/IcProfile.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const isActive = path => route.path === path
const isProfileActive = computed(() =>
  [
    '/profile',
    '/edit',
    '/addresses',
    '/informing',
    '/language',
    '/theme',
    '/time',
    '/about',
    '/support',
    '/en/profile',
    '/en/edit',
    '/en/addresses',
    '/en/informing',
    '/en/language',
    '/en/theme',
    '/en/time',
    '/en/about',
    '/en/support',
  ].includes(route.path)
)
</script>
<template>
  <div
    class="fixed sm:absolute bottom-0 right-0 flex justify-between bg-(--primary-white)/40 dark:bg-(--primary-black-bg)/40 backdrop-blur-2xl w-full px-16 pt-5 pb-9"
  >
    <NuxtLink :to="$localePath('/')" class="flex flex-col items-center gap-1">
      <Home :is-active="isActive($localePath('/')) || isActive($localePath('/notifications'))" />
    </NuxtLink>
    <NuxtLink :to="$localePath('/trips')">
      <Routes :is-active="isActive($localePath('/trips'))" />
    </NuxtLink>
    <NuxtLink :to="$localePath('/profile')">
      <Profile :is-active="isProfileActive" />
    </NuxtLink>
  </div>
</template>

<style scoped></style>
