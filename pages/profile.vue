<script setup lang="ts">
import ProfileGeneral from '~/widgets/profileInfo/ProfileGeneral.vue'
import ProfileBlock from '~/widgets/profileInfo/ProfileBlock.vue'

import IcLocation from '~/icons/profile-widgets/IcLocation.vue'
import IcNotifications from '~/icons/profile-widgets/IcNotifications.vue'
import IcLanguage from '~/icons/profile-widgets/IcLanguage.vue'
import IcTheme from '~/icons/profile-widgets/IcTheme.vue'
import IcTime from '~/icons/profile-widgets/IcTime.vue'
import IcAbout from '~/icons/profile-widgets/IcAbout.vue'
import IcSupport from '~/icons/profile-widgets/IcSupport.vue'

const block1: object = [{ iconComponent: IcLocation, title: 'Мои адреса' }]

const block2: object = [
  { iconComponent: IcNotifications, title: 'Уведомления' },
  { iconComponent: IcLanguage, title: 'Язык' },
  { iconComponent: IcTheme, title: 'Тема оформления' },
  { iconComponent: IcTime, title: 'Запас времени' },
]

const block3: object = [
  { iconComponent: IcAbout, title: 'О приложении' },
  { iconComponent: IcSupport, title: 'Поддержка и обратная' },
]
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-text dark:text-(--primary-white) mb-[25px]">Профиль</h1>
    <div class="flex flex-col gap-[25px]">
      <ProfileGeneral />
      <ProfileBlock :items="block1" />
      <ProfileBlock :items="block2" />
      <ProfileBlock :items="block3" />
      <button
        class="w-full bg-(--primary-white-bg) dark:bg-(--secondary-black-bg) rounded-2xl py-[15px] text-(--primary-red) text-center font-semibold"
      >
        Выйти
      </button>
    </div>
  </div>
</template>
