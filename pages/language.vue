<script setup lang="ts">
import PagesTitle from '~/widgets/profilePages/PagesTitle.vue'
import CheckWidget from '~/widgets/profilePages/CheckWidget.vue'
const languages = ['Русский', 'English']
const activeLang = ref('Русский')
const setLanguage = (theme: string) => {
  activeLang.value = theme
}
</script>

<template>
  <div class="pb-24">
    <PagesTitle title="Язык" />
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
