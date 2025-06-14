<script setup lang="ts">
import PagesTitle from '~/widgets/profilePages/PagesTitle.vue'
import ProfileRow from '~/widgets/ProfileEdit/ProfileRow.vue'
import EditProfileField from '~/features/edit-profile/EditProfileField.vue'
import { useUserInfo } from '~/stores/userInfo'
import IcUser from '~/icons/IcUser.vue'
import EditFieldModal from '~/pages/editFieldModal.vue'
import { useUploadImage } from '~/composables/useUploadImage'
const userInfoStore = useUserInfo()

const { uploadImage, imageUrl, error } = useUploadImage()

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

const fileInput = ref<HTMLInputElement | null>(null)

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  try {
    await uploadImage(file)

    if (imageUrl.value) {
      await userInfoStore.updateUserInfo({
        avatarUri: imageUrl.value,
      })
      await userInfoStore.getUserInfo()
    }
  } catch (err) {
    console.error('Ошибка при загрузке изображения:', err)
  } finally {
    input.value = ''
  }
}
</script>

<template>
  <div class="pb-24">
    <PagesTitle :title="$t('editing')" />
    <div class="mt-2.5 w-full flex items-center justify-center mb-[35px]">
      <div class="flex flex-col items-center gap-[10px]">
        <div class="rounded-full">
          <div v-if="userInfoStore.userInfo?.avatarUri">
            <NuxtImg
              :src="userInfoStore.userInfo.avatarUri"
              alt="Avatar"
              class="rounded-full object-cover w-20 h-20"
            />
          </div>
          <div v-else class="w-20 h-20">
            <IcUser />
          </div>
        </div>
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="hidden"
          @change="handleFileChange"
        />
        <div
          class="cursor-pointer text-center text-sm text-(--primary-orange)"
          @click="triggerFileInput"
        >
          {{ $t('choosePhoto') }}
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-[15px]">
      <div>
        <p class="text-xs text-(--color-text-glay) dark:text-(--secondary-gray) mb-[15px]">
          {{ $t('firstName') }}
        </p>
        <ProfileRow
          :label="`${userInfoStore.userInfo?.firstName}`"
          @click="
            openModal('firstName', $t('yourFirstName'), userInfoStore.userInfo?.firstName || '')
          "
        />
      </div>
      <div>
        <p class="text-xs text-(--color-text-glay) dark:text-(--secondary-gray) mb-[15px]">
          {{ $t('lastName') }}
        </p>
        <ProfileRow
          :label="`${userInfoStore.userInfo?.lastName}`"
          @click="openModal('lastName', $t('yourLastName'), userInfoStore.userInfo?.lastName || '')"
        />
      </div>
      <div>
        <p class="text-xs text-(--color-text-glay) dark:text-(--secondary-gray) mb-[15px]">
          {{ $t('contactData') }}
        </p>
        <div class="flex flex-col gap-[15px]">
          <ProfileRow
            :label="$t('phone')"
            :value="`${userInfoStore.userInfo?.phoneNumber || $t('add')}`"
            @click="openPhoneModal"
          />
          <ProfileRow
            label="Email"
            :value="`${userInfoStore.userInfo?.email || $t('add')}`"
            @click="openEmailModal"
          />
          <ProfileRow
            label="Telegram"
            :value="`${
              userInfoStore.userInfo?.telegramUsername
                ? '@' + userInfoStore.userInfo.telegramUsername
                : $t('add')
            }`"
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
        :value="userInfoStore.userInfo?.telegramUsername"
        class="absolute inset-0 w-full h-full z-50"
      />
    </Transition>

    <EditProfileField
      v-if="isModalOpen"
      :label="editingLabel"
      :value="editingValue"
      :field="editingField"
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
