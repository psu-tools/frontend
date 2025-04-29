<script setup lang="ts">
import ProfileGeneral from '~/widgets/profileInfo/ProfileGeneral.vue'
import ProfileBlock from '~/widgets/profileInfo/ProfileBlock.vue'

import IcLocation from '~/icons/profile-widgets/IcLocation.vue'

const block1 = [{ iconComponent: IcLocation, title: 'Мои адреса' }]

const block2: any = [
  { iconComponent: IcLocation, title: 'Уведомления' },
  { iconComponent: IcLocation, title: 'Язык' },
  { iconComponent: IcLocation, title: 'Тема оформления' },
  { iconComponent: IcLocation, title: 'Запас времени' },
]

const block3: any = [
  { iconComponent: IcLocation, title: 'О приложении' },
  { iconComponent: IcLocation, title: 'Поддержка и обратная' },
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
    </div>
  </div>
</template>
