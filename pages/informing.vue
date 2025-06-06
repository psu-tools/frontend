<script setup lang="ts">
import PagesTitle from '~/widgets/profilePages/PagesTitle.vue'
import GeneralWidget from '~/widgets/profilePages/GeneralWidget.vue'

import { useUserInfo } from '~/stores/userInfo'
import EditFieldModal from '~/pages/editFieldModal.vue'

const userInfoStore = useUserInfo()

const isTelegramModalOpen = ref<boolean>(false)

const updateNotificationMethod = async (method: NotificationMethod): Promise<void> => {
  const user = userInfoStore.userInfo

  if (!user) return

  const currentMethods = [...user.userPreferences.notificationMethods]

  const methodIndex = currentMethods.indexOf(method)

  if (methodIndex === -1) {
    currentMethods.push(method)
  } else {
    currentMethods.splice(methodIndex, 1)
  }

  const updatedPreferences = {
    ...user.userPreferences,
    notificationMethods: currentMethods,
  }

  await userInfoStore.updateUserInfo({
    userPreferences: updatedPreferences,
  })
}

const toggleModal = () => (isTelegramModalOpen.value = !isTelegramModalOpen.value)

onMounted(async () => {
  if (!userInfoStore.userInfo) {
    await userInfoStore.getUserInfo()
  }
})
</script>

<template>
  <div class="pb-24">
    <PagesTitle title="Уведомления" />
    <div class="flex flex-col gap-[15px]">
      <div class="">
        <GeneralWidget
          type="Telegram"
          :id="
            userInfoStore.userInfo?.telegramUsername
              ? '@' + userInfoStore.userInfo.telegramUsername
              : 'Не привязан'
          "
          :has-checkbox="true"
          :checkbox-status="
            !!userInfoStore.userInfo?.userPreferences?.notificationMethods.includes('TELEGRAM')
          "
          @checkbox-toggle="
            !!userInfoStore.userInfo.telegramUsername
              ? updateNotificationMethod('TELEGRAM')
              : toggleModal()
          "
        />
      </div>
      <div class="">
        <GeneralWidget
          type="Email"
          :id="userInfoStore.userInfo?.email || 'Не привязан'"
          :has-checkbox="true"
          :checkbox-status="
            !!userInfoStore.userInfo?.userPreferences?.notificationMethods.includes('EMAIL')
          "
          @checkbox-toggle="updateNotificationMethod('EMAIL')"
        />
      </div>
      <div class="">
        <GeneralWidget type="Телефон" id="Функция находится в разработке" :has-checkbox="false" />
      </div>
    </div>
    <EditFieldModal
      v-if="isTelegramModalOpen"
      @close="toggleModal"
      field="telegramId"
      :value="userInfoStore.userInfo?.telegramId"
      class="absolute inset-0 w-full h-full z-50"
      :part="2"
    />
  </div>
</template>
