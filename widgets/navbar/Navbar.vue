<script setup lang="ts">
import Home from '~/icons/IcHome.vue'
import Routes from '~/icons/IcRoutes.vue'

import { useRoute } from 'vue-router'

const route = useRoute()

const isActive = path => route.path === path
</script>

<template>
  <div class="z-10 flex justify-center gap-16 bg-white w-full pt-5 pb-6 rounded-3xl">
    <NuxtLink to="/" class="flex flex-col items-center gap-1">
      <Home :is-active="isActive('/')" />
    </NuxtLink>
    <NuxtLink to="/routes">
      <Routes :is-active="isActive('/routes')" />
    </NuxtLink>
    <NuxtLink to="/profile">
      <div class="flex flex-col items-center justify-center gap-1">
        <img
          src="/temp/img/profile_photo.jpg"
          alt="profile photo"
          class="rounded-full h-5 w-5"
          :class="{
            'opacity-60': !isActive('/profile'),
          }"
        />
        <p
          class="transition-colors duration-200 text-[10px] font-semibold"
          :class="{
            'text-indigo-600': isActive('/profile'),
            'text-[#ADAFB1] opacity-40 group-hover:text-[#3F463E] group-hover:opacity-100':
              !isActive('/profile'),
          }"
        >
          Профиль
        </p>
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped></style>
