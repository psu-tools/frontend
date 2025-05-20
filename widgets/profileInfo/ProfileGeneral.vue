<script setup lang="ts">
import { useUserInfo } from '~/stores/userInfo'

const { getUserInfo } = useUserInfo()

import IcUser from '~/icons/IcUser.vue'
import IcArrow from '~/icons/IcArrow.vue'
interface UserInfo {
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  telegramId: number
  avatarUri: string
  userPreferences: object
}

const userInfo = reactive<Partial<UserInfo>>({})

onMounted(async () => {
  const response = await getUserInfo()
  Object.assign(userInfo, response)
})
</script>
<template>
  <div
    class="bg-(--primary-white-bg) dark:bg-(--secondary-black-bg) hover:bg-(--primary-white-hover) dark:hover:bg-(--secondary-black-bg-hover) rounded-(--radius-4xl) py-[15px] pl-[15px] pr-[22px]"
  >
    <div class="flex items-center gap-[15px]">
      <div v-if="userInfo.avatarUri">
        <img :src="userInfo.avatarUri" alt="Аватар" class="w-32 h-32 rounded-full object-cover" />
      </div>
      <div v-else>
        <IcUser />
      </div>
      <div class="flex-1">
        <div class="text-(--color-text) dark:text-(--primary-white) text-sm font-semibold">
          <p v-if="userInfo.firstName">
            {{ userInfo.firstName }}
          </p>
          <p v-else>Загрузка...</p>
        </div>
        <div class="text-(--light-gray) text-xs font-semibold">
          <p v-if="userInfo.email">
            {{ userInfo.email }}
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
