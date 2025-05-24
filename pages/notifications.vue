<script setup lang="ts">
import { useNotificationsStore } from '@/stores/notifications'
import { storeToRefs } from 'pinia'
import IcBack from '~/icons/IcBack.vue'
import { getHumanDate } from '~/utils/getHumanDate'

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
    <div
      class="flex gap-2.5 items-center absolute top-0 pt-8 w-full pb-[15px] bg-(--primary-white) dark:bg-(--primary-black-bg) z-10"
    >
      <NuxtLink to="/">
        <IcBack />
      </NuxtLink>
      <h2 class="text-xl font-bold text-text dark:text-(--primary-white)">Уведомления</h2>
    </div>
    <div class="mt-13 mb-24 space-y-4">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="py-[17px] px-5 rounded-(--radius-4xl) bg-(--smoke-gray) dark:bg-(--secondary-black-bg)"
      >
        <p class="text-xs text-(--secondary-light-gray) opacity-80 font-semibold">
          {{ getHumanDate(notification.createdAt) }}
        </p>
        <h2 class="text-sm text-(--color-text) dark:text-(--primary-white) font-semibold mt-1.5">
          {{ notification.headerText }}
        </h2>
        <p class="text-xs text-(--color-text) dark:text-(--primary-white) mt-[3px]">
          {{ notification.bodyText }}
        </p>
      </div>
    </div>
    <div ref="sentinel" class="h-1"></div>
    <div v-if="loading" class="mt-4 text-center">Загрузка...</div>
    <div v-if="error" class="mt-4 text-center text-red-500">{{ error }}</div>
  </div>
</template>
