<script setup lang="ts">
import PagesTitle from '~/widgets/profilePages/PagesTitle.vue'
import PrimaryOrangeButton from '~/shaared/ui/buttons/PrimaryOrangeButton.vue'

import { useUserInfo } from '~/stores/userInfo'

import IcEmailEdit from '~/icons/IcEmailEdit.vue'
import IcPhoneEdit from '~/icons/IcPhoneEdit.vue'
import IcTelegramEdit from '~/icons/IcTelegramEdit.vue'

const route = useRoute()
const { getUserInfo } = useUserInfo()
const userInfo = reactive(await getUserInfo())

const field = computed(() => route.params.field as keyof typeof userInfo)

const fieldLabelMap: Record<string, string> = {
  phoneNumber: 'Телефон',
  email: 'Email',
  telegramId: 'Telegram',
}

const editingValue = computed(() => {
  const value = userInfo[field.value]
  return typeof value === 'undefined' || value === null ? 'Не указано' : String(value)
})

const editingLabel = computed(() => fieldLabelMap[field.value] || 'Редактирование')

const iconMap: Record<string, any> = {
  phoneNumber: IcPhoneEdit,
  email: IcEmailEdit,
  telegramId: IcTelegramEdit,
}

const CurrentIcon = computed(() => iconMap[field.value] || null)
</script>

<template>
  <div class="pb-24">
    <PagesTitle :link="'/edit'" :title="editingLabel" />
    <component :is="CurrentIcon" v-if="CurrentIcon" class="mx-auto mb-4" />
    <p
      class="text-center mb-[10px] text-sm text-(--color-text) dark:text-(--primary-white) font-semibold"
    >
      {{ editingValue }}
    </p>
    <p class="text-center mb-[35px] text-[16px] text-(--primary-gray-icon)">
      Ваш {{ editingLabel.toLocaleLowerCase() }}, привязанный к Flow
    </p>
    <div class="w-full flex items-center justify-center">
      <PrimaryOrangeButton class="py-[10.5px] px=[30px] max-w-[200px] rounded-(--radius-xl)">
        Изменить {{ editingLabel.toLocaleLowerCase() }}
      </PrimaryOrangeButton>
    </div>
  </div>
</template>
