<script setup lang="ts">
import PagesTitle from '~/widgets/profilePages/PagesTitle.vue'
import ProfileRow from '~/widgets/ProfileEdit/ProfileRow.vue'
import EditProfileField from '~/features/edit-profile/EditProfileField.vue'
import { useUserInfo } from '~/stores/userInfo'

const userInfoStore = useUserInfo()

import IcUser from '~/icons/IcUser.vue'
import EditFieldModal from '~/pages/editFieldModal.vue'

const isModalOpen = ref(false)
const editingField = ref<'firstName' | 'lastName' | null>(null)
const editingLabel = ref('')
const editingValue = ref('')

const isEmailModalOpen = ref(false)
const isPhoneModalOpen = ref(false)
const isTelegramModalOpen = ref(false)

const closeEmailModal = () => (isEmailModalOpen.value = false)
const closePhoneModal = () => (isPhoneModalOpen.value = false)
const closeTelegramModal = () => (isTelegramModalOpen.value = false)

const openEmailModal = () => (isEmailModalOpen.value = true)
const openPhoneModal = () => (isPhoneModalOpen.value = true)
const openTelegramModal = () => (isTelegramModalOpen.value = true)

const openModal = (field: 'firstName' | 'lastName', label: string, value: string) => {
  editingField.value = field
  editingLabel.value = label
  editingValue.value = value
  isModalOpen.value = true
}

onMounted(async () => {
  if (!userInfoStore.userInfo) {
    await userInfoStore.getUserInfo()
  }
})

definePageMeta({
  bodyClass: 'bg-(--primary-white-bg)',
})

const handleModalSave = (newValue: string) => {
  if (editingField.value) {
    userInfoStore.userInfo[editingField.value] = newValue
  }
  isModalOpen.value = false
}
</script>

<template>
  <div class="pb-24">
    <PagesTitle title="Редактирование" />
    <div class="w-full flex items-center justify-center mb-[35px]">
      <div class="flex flex-col items-center gap-[10px]">
        <div class="w-[60px] h-[60px] rounded-full">
          <div v-if="userInfoStore.userInfo?.avatarUri">
            <img
              :src="userInfoStore.userInfo.avatarUri"
              alt="Аватар"
              class="w-32 h-32 rounded-full object-cover"
            />
          </div>
          <div v-else>
            <IcUser />
          </div>
        </div>
        <div class="cursor-pointer text-center text-sm text-(--primary-orange)">
          Выбрать фотографию
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-[15px]">
      <div>
        <p class="text-xs text-(--color-text-glay) dark:text-(--secondary-gray) mb-[15px]">Имя</p>
        <ProfileRow
          :label="`${userInfoStore.userInfo?.firstName}`"
          @click="openModal('firstName', 'Ваше имя', userInfoStore.userInfo?.firstName || '')"
        />
      </div>
      <div>
        <p class="text-xs text-(--color-text-glay) dark:text-(--secondary-gray) mb-[15px]">
          Фамилия
        </p>
        <ProfileRow
          :label="`${userInfoStore.userInfo?.lastName}`"
          @click="openModal('lastName', 'Ваша фамилия', userInfoStore.userInfo?.lastName || '')"
        />
      </div>
      <div>
        <p class="text-xs text-(--color-text-glay) dark:text-(--secondary-gray) mb-[15px]">
          Контактные данные
        </p>
        <div class="flex flex-col gap-[15px]">
          <ProfileRow
            label="Телефон"
            :value="`${userInfoStore.userInfo?.phoneNumber}`"
            @click="openPhoneModal"
          />
          <ProfileRow
            label="Email"
            :value="`${userInfoStore.userInfo?.email}`"
            @click="openEmailModal"
          />
          <ProfileRow
            label="Telegram"
            :value="`${userInfoStore.userInfo?.telegramId}`"
            @click="openTelegramModal"
          />
        </div>
      </div>
    </div>

    <Transition name="fade">
      <EditFieldModal
        v-if="isEmailModalOpen"
        @close="closeEmailModal"
        field="email"
        :value="userInfoStore.userInfo?.email"
        class="absolute inset-0 w-full h-full z-50"
      />
    </Transition>

    <Transition name="fade">
      <EditFieldModal
        v-if="isPhoneModalOpen"
        @close="closePhoneModal"
        field="phoneNumber"
        :value="userInfoStore.userInfo?.phoneNumber"
        class="absolute inset-0 w-full h-full z-50"
      />
    </Transition>

    <Transition name="fade">
      <EditFieldModal
        v-if="isTelegramModalOpen"
        @close="closeTelegramModal"
        field="telegramId"
        :value="userInfoStore.userInfo?.telegramId"
        class="absolute inset-0 w-full h-full z-50"
      />
    </Transition>

    <EditProfileField
      v-if="isModalOpen"
      :label="editingLabel"
      :value="editingValue"
      @close="isModalOpen = false"
      @save="handleModalSave"
    />
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
