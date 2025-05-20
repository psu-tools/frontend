<script setup lang="ts">
import PagesTitle from '~/widgets/profilePages/PagesTitle.vue'
import ProfileRow from '~/widgets/ProfileEdit/ProfileRow.vue'
import EditProfileField from '~/features/edit-profile/EditProfileField.vue'

import { useUserInfo } from '~/stores/userInfo'

import IcUser from '~/icons/IcUser.vue'

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

const { getUserInfo } = useUserInfo()
const userInfo = reactive<Partial<UserInfo>>({})

const isModalOpen = ref(false)
const editingField = ref<'firstName' | 'lastName' | null>(null)
const editingLabel = ref('')
const editingValue = ref('')

const openModal = (field: 'firstName' | 'lastName', label: string, value: string) => {
  editingField.value = field
  editingLabel.value = label
  editingValue.value = value
  isModalOpen.value = true
}

onMounted(async () => {
  const response = await getUserInfo()
  Object.assign(userInfo, response)
})

definePageMeta({
  bodyClass: 'bg-(--primary-white-bg)',
})

const handleModalSave = (newValue: string) => {
  if (editingField.value) {
    userInfo[editingField.value] = newValue
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
          <div v-if="userInfo.avatarUri">
            <img
              :src="userInfo.avatarUri"
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
          :label="`${userInfo.firstName}`"
          @click="openModal('firstName', 'Ваше имя', userInfo.firstName || '')"
        />
      </div>
      <div>
        <p class="text-xs text-(--color-text-glay) dark:text-(--secondary-gray) mb-[15px]">
          Фамилия
        </p>
        <ProfileRow
          :label="`${userInfo.lastName}`"
          @click="openModal('lastName', 'Ваша фамилия', userInfo.lastName || '')"
        />
      </div>
      <div>
        <p class="text-xs text-(--color-text-glay) dark:text-(--secondary-gray) mb-[15px]">
          Контактные данные
        </p>
        <div class="flex flex-col gap-[15px]">
          <ProfileRow :label="`Телефон`" :value="`${userInfo.phoneNumber}`" />
          <ProfileRow :label="`Email`" :value="`${userInfo.email}`" />
          <ProfileRow :label="`Telegram`" :value="`${userInfo.telegramId}`" />
        </div>
      </div>
    </div>
    <EditProfileField
      v-if="isModalOpen"
      :label="editingLabel"
      :value="editingValue"
      @close="isModalOpen = false"
      @save="handleModalSave"
    />
  </div>
</template>
