<script setup lang="ts">
import { useUserInfo } from '~/stores/userInfo'
import IcUser from '~/icons/IcUser.vue'
import IcArrow from '~/icons/IcArrow.vue'

const userInfoStore = useUserInfo()

onMounted(async () => {
  if (!userInfoStore.userInfo) {
    await userInfoStore.getUserInfo()
  }
})
</script>
<template>
  <div
    class="bg-(--primary-white-bg) dark:bg-(--secondary-black-bg) hover:bg-(--primary-white-hover) dark:hover:bg-(--secondary-black-bg-hover) rounded-(--radius-4xl) py-[15px] pl-[15px] pr-[22px]"
  >
    <div class="flex items-center gap-[15px]">
      <div v-if="userInfoStore.userInfo?.avatarUri">
        <img
          :src="userInfoStore.userInfo.avatarUri"
          alt="Аватар"
          class="w-[64px] 2 h-[64px] rounded-full object-cover"
        />
      </div>
      <div v-else>
        <IcUser />
      </div>
      <div class="flex-1">
        <div class="text-(--color-text) dark:text-(--primary-white) text-sm font-semibold">
          <p v-if="userInfoStore.userInfo?.firstName">
            {{ userInfoStore.userInfo.firstName }}
          </p>
          <p v-else>Загрузка...</p>
        </div>
        <div class="text-(--light-gray) text-xs font-semibold">
          <p v-if="userInfoStore.userInfo?.email">
            {{ userInfoStore.userInfo.email }}
          </p>
          <p v-else>Загрузка...</p>
        </div>
      </div>
      <button class="cursor-pointer">
        <IcArrow />
      </button>
    </div>
  </div>
</template>
