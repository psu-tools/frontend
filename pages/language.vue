<script setup lang="ts">
import PagesTitle from '~/widgets/profilePages/PagesTitle.vue'
import CheckWidget from '~/widgets/profilePages/CheckWidget.vue'

const { locale, setLocale } = useI18n()

const languages = ['Русский', 'English']
const activeLang = ref<'Русский' | 'English'>(locale.value === 'ru' ? 'Русский' : 'English')
const setLanguage = (theme: 'Русский' | 'English') => {
  if (theme === 'Русский') {
    setLocale('ru')
  } else if (theme === 'English') {
    setLocale('en')
  }
}
</script>

<template>
  <div class="pb-24">
    <PagesTitle :title="$t('language')" />
    <div class="flex flex-col gap-[15px]">
      <CheckWidget
        v-for="lang in languages"
        :key="lang"
        :title="lang"
        :is-active="activeLang === lang"
        @click="setLanguage(lang)"
      />
    </div>
  </div>
</template>
