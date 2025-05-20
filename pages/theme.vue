<script setup lang="ts">
import PagesTitle from '~/widgets/profilePages/PagesTitle.vue'
import CheckWidget from '~/widgets/profilePages/CheckWidget.vue'

const themes = ['Светлая', 'Темная', 'Как в системе']
const activeTheme = ref('Светлая')
const setTheme = (theme: string) => {
  activeTheme.value = theme
}
</script>

<template>
  <div class="pb-24">
    <PagesTitle title="Тема оформления" />
    <div class="flex flex-col gap-[15px]">
      <CheckWidget
        v-for="theme in themes"
        :key="theme"
        :title="theme"
        :is-active="activeTheme === theme"
        @click="setTheme(theme)"
      />
    </div>
  </div>
</template>
