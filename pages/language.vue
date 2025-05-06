<script setup lang="ts">
import PagesTitle from '~/widgets/profilePages/PagesTitle.vue'
import LanguageWidget from '~/widgets/profilePages/LanguageWidget.vue'
</script>

<template>
  <div class="pb-24">
    <PagesTitle title="Язык" />
    <div class="flex flex-col gap-[15px]">
      <LanguageWidget title="Русский" :is-active="true" />
      <LanguageWidget title="English" :is-active="false" />
    </div>
  </div>
</template>
