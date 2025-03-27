<script setup lang="ts">
import Home from '~/icons/IcHome.vue'
import Routes from '~/icons/IcRoutes.vue'
import Profile from '~/icons/IcProfile.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const isActive = path => route.path === path
</script>
<template>
  <div class="z-10 flex justify-center gap-16 bg-white w-full pt-5 pb-6 rounded-3xl">
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
