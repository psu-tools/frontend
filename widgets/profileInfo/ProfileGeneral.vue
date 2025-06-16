<script setup lang="ts">
import { useUserInfo } from '~/stores/userInfo'
import IcUser from '~/icons/IcUser.vue'
import IcArrow from '~/icons/IcArrow.vue'

const userInfoStore = useUserInfo()

onMounted(async () => {
  if (!userInfoStore.userInfo) {
    userInfoStore.loadUserIdFromStorage()
    await userInfoStore.getUserInfo()
  }
})
</script>
<template>
  <div
    class="bg-(--primary-white-bg) dark:bg-(--secondary-black-bg) hover:bg-(--primary-white-hover) dark:hover:bg-(--secondary-black-bg-hover) rounded-(--radius-4xl) py-[15px] pl-[15px] pr-[22px]"
  >
    <div class="flex items-center gap-[15px]">
      <div class="w-16 h-16">
        <div v-if="userInfoStore.userInfo?.avatarUri">
          <NuxtImg
            :src="userInfoStore.userInfo.avatarUri"
            alt="Avatar"
            class="rounded-full object-cover h-16 w-16"
            :quality="10"
          />
        </div>
        <div v-else>
          <IcUser />
        </div>
      </div>
      <div class="flex-1">
        <div class="text-(--color-text) dark:text-(--primary-white) text-sm font-semibold">
          <p v-if="userInfoStore.userInfo?.firstName">
            {{ userInfoStore.userInfo.firstName }}
          </p>
          <p v-else>{{ $t('loadingMessage') }}</p>
        </div>
        <div class="text-(--light-gray) text-xs font-semibold">
          <p v-if="userInfoStore.userInfo?.email">
            {{ userInfoStore.userInfo.email }}
          </p>
          <p v-else>{{ $t('loadingMessage') }}</p>
        </div>
      </div>
      <button class="cursor-pointer">
        <IcArrow />
      </button>
    </div>
  </div>
</template>
