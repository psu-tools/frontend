<script setup lang="ts">
import ProfileGeneral from '~/widgets/profileInfo/ProfileGeneral.vue'
import ProfileAdresses from '~/widgets/profileInfo/ProfileAdresses.vue'
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-text dark:text-(--primary-white) mb-[25px]">Профиль</h1>
    <div class="flex flex-col gap-[25px]">
      <ProfileGeneral />
      <ProfileAdresses />
    </div>
  </div>
</template>
