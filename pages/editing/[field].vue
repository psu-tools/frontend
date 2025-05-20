<script setup lang="ts">
import PagesTitle from '~/widgets/profilePages/PagesTitle.vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserInfo } from '~/stores/userInfo'

const route = useRoute()
const router = useRouter()

const { getUserInfo } = useUserInfo()

const userInfo = reactive(await getUserInfo())

// Определяем, что редактируем
const field = computed(() => route.params.field as keyof typeof userInfo)
const fieldLabelMap: Record<string, string> = {
  phoneNumber: 'Телефон',
  email: 'Email',
  telegramId: 'Telegram',
}
const editingLabel = computed(() => fieldLabelMap[field.value] || 'Редактирование')
const editingValue = computed(() => String(userInfo[field.value] ?? ''))

const handleSave = (newValue: string) => {
  userInfo[field.value] = newValue
  router.back()
}
</script>

<template>
  <div class="pb-24">
    <PagesTitle :link="'/edit'" :title="editingLabel" />
  </div>
</template>
