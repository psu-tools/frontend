<script setup lang="ts">
import IcHome from "#shared/ui/icons/IcHome.vue";
import IcRoutes from "#shared/ui/icons/IcRoutes.vue";
import IcHistory from "#shared/ui/icons/IcHistory.vue";

import { useRoute } from 'vue-router'

const route = useRoute()

const isActive = (path) => route.path === path
</script>

<template>
  <div class="z-10 flex justify-center gap-16 bg-white w-full pt-5 pb-8 rounded-3xl">
    <NuxtLink to="/" class="flex flex-col items-center gap-1">
      <IcHome :is-active="isActive('/')" />
    </NuxtLink>
    <NuxtLink to="/routes">
      <IcRoutes :is-active="isActive('/routes')" />
    </NuxtLink>
    <NuxtLink to="/history">
      <IcHistory :is-active="isActive('/history')" />
    </NuxtLink>
  </div>
</template>

<style scoped>

</style>