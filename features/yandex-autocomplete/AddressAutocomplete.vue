<script setup lang="ts">
import { fetchYandexSuggestions } from '~/utils/yandexSuggest'

const inputValue = ref('')
const suggestions = ref<{ title: string; subtitle: string }[]>([])

watch(inputValue, async val => {
  if (val.length >= 3) {
    suggestions.value = await fetchYandexSuggestions(val)
    console.log('Подсказки:', suggestions.value)
  } else {
    suggestions.value = []
  }
})

const selectSuggestion = (suggestion: string) => {
  inputValue.value = suggestion
  suggestions.value = []
}
</script>

<template>
  <div>
    <input
      v-model="inputValue"
      type="text"
      placeholder="Введите адрес"
      class="w-full p-2 border rounded"
    />

    <ul v-if="suggestions.length" class="mt-2 border rounded bg-white">
      <li
        v-for="(s, i) in suggestions"
        :key="i"
        @click="selectSuggestion(s.title)"
        class="p-2 hover:bg-gray-100 cursor-pointer"
      >
        <div class="font-semibold">{{ s.title }}</div>
        <div class="text-sm text-gray-500">{{ s.subtitle }}</div>
      </li>
    </ul>
  </div>
</template>
