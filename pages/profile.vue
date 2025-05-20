<script setup lang="ts">
import ProfileGeneral from '~/widgets/profileInfo/ProfileGeneral.vue'
import ProfileBlock from '~/widgets/profileInfo/ProfileBlock.vue'
import BaseConfirmModal from '~/features/two-button-modal/BaseConfirmModal.vue'

import IcLocation from '~/icons/profile-widgets/IcLocation.vue'
import IcNotifications from '~/icons/profile-widgets/IcNotifications.vue'
import IcLanguage from '~/icons/profile-widgets/IcLanguage.vue'
import IcTheme from '~/icons/profile-widgets/IcTheme.vue'
import IcTime from '~/icons/profile-widgets/IcTime.vue'
import IcAbout from '~/icons/profile-widgets/IcAbout.vue'
import IcSupport from '~/icons/profile-widgets/IcSupport.vue'
import IcLogout from '~/icons/IcLogout.vue'
import { useAuth } from '~/composables/useAuth'

interface BlockItem {
  iconComponent: Component
  title: string
  path: string
}

const block1: BlockItem[] = [{ iconComponent: IcLocation, title: 'Мои адреса', path: '/addresses' }]

const block2: BlockItem[] = [
  { iconComponent: IcNotifications, title: 'Уведомления', path: '/informing' },
  { iconComponent: IcLanguage, title: 'Язык', path: '/language' },
  { iconComponent: IcTheme, title: 'Тема оформления', path: '/theme' },
  { iconComponent: IcTime, title: 'Запас времени', path: '/time' },
]

const block3: BlockItem[] = [
  { iconComponent: IcAbout, title: 'О приложении', path: '/about' },
  { iconComponent: IcSupport, title: 'Поддержка и обратная связь', path: '/support' },
]
const isLogoutConfirmOpen = ref(false)

const openLogoutConfirm = () => {
  isLogoutConfirmOpen.value = true
}

const closeLogoutConfirm = () => {
  isLogoutConfirmOpen.value = false
}

const confirmLogout = () => {
  closeLogoutConfirm()
  const { logout } = useAuth()
  logout()
  console.log('User logged out')
}
</script>

<template>
  <div class="pb-24">
    <h1 class="text-3xl font-bold text-text dark:text-(--primary-white) mb-[25px]">Профиль</h1>
    <div class="flex flex-col gap-[25px]">
      <ProfileGeneral />
      <ProfileBlock :items="block1" />
      <ProfileBlock :items="block2" />
      <ProfileBlock :items="block3" />
      <button
        @click="openLogoutConfirm"
        class="w-full bg-(--primary-white-bg) dark:bg-(--secondary-black-bg) hover:bg-(--primary-white-hover) dark:hover:bg-(--secondary-black-bg-hover) rounded-2xl py-[15px] text-(--primary-red) text-center font-semibold cursor-pointer"
      >
        Выйти
      </button>
    </div>
    <BaseConfirmModal
      :is-open="isLogoutConfirmOpen"
      title="Вы уверены, что хотите выйти?"
      description=""
      :icon="IcLogout"
      :confirmText="`Выйти`"
      :cancelText="`Отмена`"
      :onConfirm="confirmLogout"
      :onCancel="closeLogoutConfirm"
    />
  </div>
</template>
