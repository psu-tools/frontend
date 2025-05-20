<script setup lang="ts">
import PagesTitle from '~/widgets/profilePages/PagesTitle.vue'
import ProfileRow from '~/widgets/ProfileEdit/ProfileRow.vue'
import EditProfileField from '~/features/edit-profile/EditProfileField.vue'

import { useUserInfo } from '~/stores/userInfo'

const { getUserInfo } = useUserInfo()

interface Props {
  title: string
}

defineProps<Props>()

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

definePageMeta({
  bodyClass: 'bg-(--primary-white-bg)',
})
</script>

<template>
  <div class="pb-24">
    <PagesTitle link="/edit" title="Редактирование" />
  </div>
</template>
