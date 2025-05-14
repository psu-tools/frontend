<script setup lang="ts">
import IcClose from '~/icons/IcClose.vue'
import IcCompas from '~/icons/IcCompas.vue'
import AddressItem from '~/shaared/ui/AddressItem.vue'
import { useUserPointsStore } from '~/stores/userPoints'
import YandexMaps from '~/pages/yandexMaps.vue'

const { favoritePoints } = useUserPointsStore()
const config = useRuntimeConfig()

const apiKey = config.public.openCageApiKey

const props = defineProps<{
  initialValue?: string
  index: number | null
  countryCode?: string
}>()

const emit = defineEmits<{
  (e: 'selectPoint', newValue: SuggestionPoint | Point, pointType: 'api' | 'user'): void
  (e: 'close'): void
  (e: 'toggleExpand'): void
}>()

export interface SuggestionPoint {
  confidence: number
  formatted: string
  geometry: {
    lat: number
    lng: number
  }
  components?: Record<string, unknown>
  annotations?: Record<string, unknown>
  bounds?: {
    northeast: { lat: number; lng: number }
    southwest: { lat: number; lng: number }
  }
}

interface Address {
  name: string
  address: string
}

const recentlyAddresses = <Address[]>[
  { name: 'Пермский Политех', address: 'Комсомольский проспект, 29' },
  { name: 'Aura City Hotel', address: 'ул. Монастырская, 23Б' },
  { name: 'Аэропорт Пермь, Терминал А', address: 'ш. Космонавтов, 455, д. Большое Савино' },
]

const inputValue = ref(props.initialValue || '')
const suggestions = ref<SuggestionPoint[]>([])

const isYandexMapsOpen = ref(false)

const fetchSuggestions = async (query: string, countryCode = 'ru') => {
  if (!query.trim()) {
    suggestions.value = []
    return
  }

  const url =
    `https://api.opencagedata.com/geocode/v1/json?` +
    new URLSearchParams({
      key: apiKey,
      q: query,
      countrycode: countryCode,
      language: 'ru',
      limit: '5',
      no_annotations: '1',
    })

  try {
    const response = await fetch(url.toString())
    const data = await response.json()
    suggestions.value = data.results || []
  } catch (error) {
    console.error('Ошибка при получении подсказок:', error)
    suggestions.value = []
  }
}

watch([inputValue, () => props.countryCode], ([query, country]) => fetchSuggestions(query, country))

const selectPoint = (point: SuggestionPoint | Point, pointType: 'api' | 'user') => {
  console.log(point)
  if (pointType === 'api' && 'formatted' in point) {
    inputValue.value = point.formatted
  } else if ('name' in point && point.name) {
    inputValue.value = point.name
  }
  emit('selectPoint', point, pointType)
  suggestions.value = []
}

const closeSelector = () => emit('close')

const toggleExpand = () => emit('toggleExpand')

const highlightMatch = (text: string, query: string) => {
  if (!query.trim()) return text

  const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi')
  return text.replace(regex, '<span class="text-(--primary-orange)">$1</span>')
}

const escapeRegExp = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
</script>

<template>
  <div
    class="overflow-x-hidden relative z-50 inset-0 flex flex-col bg-(--primary-white-bg) dark:bg-(--primary-black-bg)"
  >
    <div class="sticky z-10 left-0 top-0 bg-(--primary-white-bg) dark:bg-(--primary-black-bg)">
      <div
        @click="toggleExpand"
        class="mx-auto my-2 h-1 w-8 rounded-full bg-(--medium-gray) cursor-pointer mb-[20px]"
      ></div>

      <div class="mb-2.5">
        <div class="flex justify-between items-center gap-2.5">
          <input
            type="text"
            :placeholder="index === 0 ? 'Откуда поедем?' : 'Куда поедем?'"
            class="text-sm text-text dark:text-(--color-text-gray) outline-none caret-(--primary-orange) py-[18px] px-[15px] rounded-2xl bg-(--primary-white) dark:bg-(--secondary-black-bg) w-full"
            v-model="inputValue"
          />
          <button @click="closeSelector" class="cursor-pointer">
            <IcClose />
          </button>
        </div>
      </div>
    </div>

    <div v-if="suggestions.length > 0">
      <ul>
        <li
          v-for="(suggestion, index) in suggestions"
          :key="index"
          @click="selectPoint(suggestion, 'api')"
          class="relative -mx-5 px-5 py-2.5 flex items-center gap-2.5 cursor-pointer hover:bg-(--primary-white-hover)"
        >
          <div class="w-full">
            <AddressItem
              icon="point"
              :name="
                (() => {
                  const parts = suggestion.formatted.split(',')
                  const addressName = !isNaN(parseFloat(parts[1])) ? parts[0] + parts[1] : parts[0]
                  return highlightMatch(addressName, inputValue)
                })()
              "
              :address="
                (() => {
                  const parts = suggestion.formatted.split(',')
                  return !isNaN(parseFloat(parts[1]))
                    ? suggestion.formatted.split(',').slice(2, -1).join(',').trim()
                    : suggestion.formatted.split(',').slice(1, -1).join(',').trim()
                })()
              "
              isHtml
            />
            <div
              v-if="index < suggestions.length - 1"
              class="absolute bottom-0 h-[1.5px] bg-[#eeeeee] dark:bg-(--third-black-bg) ml-[34px] w-[calc(100%-34px)]"
            ></div>
          </div>
        </li>
      </ul>
    </div>

    <div v-else>
      <div
        class="mt-2.5 flex items-center gap-[5px] cursor-pointer"
        @click="isYandexMapsOpen = !isYandexMapsOpen"
      >
        <IcCompas class="h-[13px] w-[13px]" />
        <p class="text-sm font-semibold text-(--dark-gray) dark:text-(--secondary-gray)">
          Указать на карте
        </p>
      </div>

      <YandexMaps
        v-if="isYandexMapsOpen"
        @closeYandexMaps="isYandexMapsOpen = !isYandexMapsOpen"
        @selectMapsPoint="selectPoint"
      />

      <div class="mt-[25px]" v-if="favoritePoints && favoritePoints.length > 0">
        <h2 class="font-semibold text-(--color-text) dark:text-(--primary-white) mb-1">
          Мои адреса
        </h2>
        <div
          v-for="(point, index) in favoritePoints"
          :key="index"
          class="relative -mx-5 px-5 py-2.5 flex items-center gap-2.5 cursor-pointer hover:bg-(--primary-white-hover)"
          @click="selectPoint(point, 'user')"
        >
          <div class="w-full">
            <AddressItem icon="point" :name="point.name || null" :address="point.address" />
            <div
              v-if="index < favoritePoints.length - 1"
              class="absolute bottom-0 h-[1.5px] bg-[#eeeeee] dark:bg-(--third-black-bg) ml-[34px] w-[calc(100%-34px)]"
            ></div>
          </div>
        </div>
      </div>

      <div class="mt-5">
        <h2 class="font-semibold text-(--color-text) dark:text-(--primary-white) mb-1">Недавние</h2>
        <div
          v-for="(item, index) in recentlyAddresses"
          :key="index"
          class="relative py-2.5 flex items-center gap-2.5"
        >
          <div class="w-full">
            <AddressItem icon="clock" :name="item.name" :address="item.address" />
            <div
              v-if="index < recentlyAddresses.length - 1"
              class="absolute bottom-0 h-[1.5px] bg-[#eeeeee] dark:bg-(--third-black-bg) ml-[34px] w-[calc(100%-34px)]"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
