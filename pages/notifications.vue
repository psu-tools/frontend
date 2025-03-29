<script setup lang="ts">
import { useNotificationsStore } from '@/stores/notifications'
import { storeToRefs } from 'pinia'

const notificationsStore = useNotificationsStore()
const { notifications, loading, error, paging } = storeToRefs(notificationsStore)

onMounted(async () => {
  await notificationsStore.fetchNotifications(0, 50)
})

const sentinel = ref<HTMLElement | null>(null)

const handleIntersection = (entries: IntersectionObserverEntry[]) => {
  if (entries[0].isIntersecting && !loading.value && !paging.value.last) {
    notificationsStore.loadNextPage()
  }
}

onMounted(() => {
  if (sentinel.value) {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      threshold: 0.1,
    })
    observer.observe(sentinel.value)
  }
})
</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <h2 class="text-3xl font-bold text-text">Уведомления</h2>
      <NuxtLink class="mb-1" to="/">
        <svg
          class="rotate-180 opacity-50 hover:opacity-100"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.8094 10.6418C14.8628 13.3955 11.916 16.15 8.96939 18.9036C8.70219 19.1529 8.70032 19.5595 8.96564 19.8106C9.23004 20.0617 9.66129 20.0634 9.92755 19.8141C13.1845 16.7706 16.4407 13.7271 19.6976 10.6833C20.1008 10.3067 20.1008 9.69326 19.6976 9.31667C16.4407 6.27315 13.1845 3.22962 9.92755 0.185871C9.66129 -0.063422 9.23004 -0.0616568 8.96564 0.189407C8.70125 0.441348 8.70312 0.847084 8.96939 1.09638C11.916 3.85001 14.8628 6.60455 17.8094 9.35818H0.680645C0.304693 9.35818 0 9.64547 0 9.99995C0 10.3535 0.304693 10.6417 0.680645 10.6417L17.8094 10.6418Z"
            fill="black"
          />
        </svg>
      </NuxtLink>
    </div>
    <div class="mt-5 space-y-4">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="p-5 rounded-[32px] bg-[#F8F9FD]"
      >
        <h2 class="font-bold">{{ notification.headerText }}</h2>
        <p>{{ notification.bodyText }}</p>
        <span class="text-sm text-gray-500">{{ notification.createdAt }}</span>
      </div>
    </div>
    <div ref="sentinel" class="h-1"></div>
    <div v-if="loading" class="mt-4 text-center">Загрузка...</div>
    <div v-if="error" class="mt-4 text-center text-red-500">{{ error }}</div>
  </div>
</template>

<style scoped></style>
