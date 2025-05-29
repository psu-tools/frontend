<script setup lang="ts">
import PagesTitle from '~/widgets/profilePages/PagesTitle.vue'
import CheckWidget from '~/widgets/profilePages/CheckWidget.vue'

const themes = ['Светлая', 'Темная', 'Как в системе']
const activeTheme = ref(
  localStorage.getItem('theme') === 'dark'
    ? 'Темная'
    : localStorage.getItem('theme') === 'light'
      ? 'Светлая'
      : 'Как в системе'
)

const { setTheme: applyTheme } = useTheme()

const setTheme = (value: string) => {
  activeTheme.value = value
  if (value === 'Светлая') {
    applyTheme('light')
  } else if (value === 'Темная') {
    applyTheme('dark')
  } else {
    applyTheme('system')
  }
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
