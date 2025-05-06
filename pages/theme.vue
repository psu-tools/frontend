<script setup lang="ts">
import PagesTitle from '~/widgets/profilePages/PagesTitle.vue'
import CheckWidget from '~/widgets/profilePages/CheckWidget.vue'
</script>

<template>
  <div class="pb-24">
    <PagesTitle title="Тема оформления" />
    <div class="flex flex-col gap-[15px]">
      <CheckWidget title="Светлая" :is-active="true" />
      <CheckWidget title="Темная" :is-active="false" />
      <CheckWidget title="Как в системе" :is-active="false" />
    </div>
  </div>
</template>
