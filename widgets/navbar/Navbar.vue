<script setup lang="ts">
import Home from '~/icons/IcHome.vue'
import Routes from '~/icons/IcRoutes.vue'
import Profile from '~/icons/IcProfile.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const isActive = path => route.path === path
</script>
<template>
  <div
    class="fixed sm:absolute bottom-0 right-0 flex justify-between bg-(--primary-white)/40 dark:bg-(--primary-black-bg)/40 backdrop-blur-2xl w-full px-16 pt-5 pb-9 rounded-b-3xl"
  >
    <NuxtLink to="/" class="flex flex-col items-center gap-1">
      <Home :is-active="isActive('/') || isActive('/notifications')" />
    </NuxtLink>
    <NuxtLink to="/trips">
      <Routes :is-active="isActive('/trips')" />
    </NuxtLink>
    <NuxtLink to="/profile">
      <Profile :is-active="isActive('/profile')" />
    </NuxtLink>
  </div>
</template>

<style scoped></style>
