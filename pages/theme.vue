<script setup lang="ts">
import PagesTitle from '~/widgets/profilePages/PagesTitle.vue'
import CheckWidget from '~/widgets/profilePages/CheckWidget.vue'

const themes = ['Светлая', 'Темная', 'Как в системе']
const activeTheme = ref(
  localStorage.getItem('isSystemTheme') === 'true'
    ? 'Как в системе'
    : localStorage.getItem('theme') === 'dark'
      ? 'Темная'
      : 'Светлая'
)

const { setTheme } = useTheme()

const changeTheme = (value: string) => {
  activeTheme.value = value
  if (value === 'Светлая') {
    setTheme('light')
  } else if (value === 'Темная') {
    setTheme('dark')
  } else {
    setTheme('system')
  }
}
</script>

<template>
  <div class="pb-24">
    <PagesTitle :title="$t('appTheme')" />
    <div class="flex flex-col gap-[15px]">
      <CheckWidget
        v-for="theme in themes"
        :title="theme === 'Светлая' ? $t('bright') : theme === 'Темная' ? $t('dark') : $t('system')"
        :key="theme"
        :is-active="activeTheme === theme"
        @click="changeTheme(theme)"
      />
    </div>
  </div>
</template>
