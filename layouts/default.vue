<script setup lang="ts">
import Navbar from '~/widgets/navbar/Navbar.vue'
import { useTripsStore } from '~/stores/trips'
import { useUserInfo } from '~/stores/userInfo'

const route = useRoute()

const tripsStore = useTripsStore()
const userInfoStore = useUserInfo()

onMounted(async () => {
  const { setTheme } = useTheme()

  const isSystem = localStorage.getItem('isSystemTheme') === 'true'
  const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null

  if (isSystem) {
    setTheme('system')
  } else if (savedTheme) {
    setTheme(savedTheme)
  } else {
    setTheme('light')
  }

  await tripsStore.fetchTrips()
  userInfoStore.loadUserIdFromStorage()
})
</script>

<template>
  <div
    id="modal-container"
    class="relative dark:bg-(--primary-black-bg) sm:w-96 h-dvh sm:h-[700px] flex flex-col overflow-hidden"
    :class="[route.meta.bodyClass || 'bg-(--primary-white)']"
  >
    <div class="flex-1 overflow-y-auto pt-[25px] px-4 scrollbar-hide">
      <slot />
    </div>
    <Navbar />
  </div>
</template>

<style>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  scrollbar-width: none;
}
</style>
