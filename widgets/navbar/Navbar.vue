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
    class="fixed sm:absolute bottom-0 right-0 flex justify-center bg-white/40 backdrop-blur-2xl gap-16 w-full pt-5 pb-6 rounded-b-3xl"
  >
    <NuxtLink to="/" class="flex flex-col items-center gap-1">
      <Home :is-active="isActive('/') || isActive('/notifications')" />
    </NuxtLink>
    <NuxtLink to="/routes">
      <Routes :is-active="isActive('/routes')" />
    </NuxtLink>
    <NuxtLink to="/profile">
      <Profile :is-active="isActive('/profile')" />
    </NuxtLink>
  </div>
</template>

<style scoped></style>
