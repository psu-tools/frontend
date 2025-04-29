<script setup lang="ts">
import ProfileGeneral from '~/widgets/profileInfo/ProfileGeneral.vue'
import ProfileRow from '~/widgets/profileInfo/ProfileRow.vue'
import ProfileBlock from '~/widgets/profileInfo/ProfileBlock.vue'
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-text dark:text-(--primary-white) mb-[25px]">Профиль</h1>
    <div class="flex flex-col gap-[25px]">
      <ProfileGeneral />
      <ProfileRow />
      <ProfileBlock />
    </div>
  </div>
</template>
