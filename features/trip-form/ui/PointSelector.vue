<script setup lang="ts">
import IcClose from '~/icons/IcClose.vue'
import IcCompas from '~/icons/IcCompas.vue'
import AddressItem from '~/shaared/ui/AddressItem.vue'

const config = useRuntimeConfig()

const apiKey = config.public.openCageApiKey
const apiUrl = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=`

const props = defineProps({
  initialValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits<{
  (e: 'select', newValue: string): void
  (e: 'close'): void
  (e: 'toggleExpand'): void
}>()

interface Address {
  name: string
  address: string
}

const userAddresses = <Address[]>[
  { name: 'Дом', address: 'ул. Мира, 45' },
  { name: 'Дом', address: 'ул. Мира, 45' },
]

const recentlyAddresses = <Address[]>[
  { name: 'Пермский Политех', address: 'Комсомольский проспект, 29' },
  { name: 'Aura City Hotel', address: 'ул. Монастырская, 23Б' },
  { name: 'Аэропорт Пермь, Терминал А', address: 'ш. Космонавтов, 455, д. Большое Савино' },
]

const inputValue = ref(props.initialValue)
const suggestions = ref<string[]>([])

const fetchSuggestions = async (query: string) => {
  if (!query) {
    suggestions.value = []
    return
  }

  try {
    const response = await fetch(`${apiUrl}${query}`)
    const data = await response.json()

    if (data.results) {
      suggestions.value = data.results.map((result: any) => result.formatted)
    } else {
      suggestions.value = []
    }
  } catch (error) {
    console.error('Ошибка при получении подсказок:', error)
  }
}

watch(inputValue, newValue => fetchSuggestions(newValue))

const selectPoint = (address: string) => {
  inputValue.value = address
  emit('select', address)
  suggestions.value = []
}

const closeSelector = () => emit('close')

const toggleExpand = () => emit('toggleExpand')
</script>

<template>
  <div
    class="relative inset-0 z-50 flex flex-col bg-(--primary-white-bg) dark:bg-(--primary-black-bg)"
  >
    <div class="sticky left-0 top-0 z-40 bg-(--primary-white-bg) dark:bg-(--primary-black-bg)">
      <div
        @click="toggleExpand"
        class="mx-auto my-2 h-1 w-8 rounded-full bg-(--medium-gray) cursor-pointer mb-[20px]"
      ></div>

      <div class="mb-2.5">
        <div class="flex justify-between items-center gap-2.5">
          <input
            type="text"
            placeholder="Куда поедем?"
            class="text-sm text-text dark:text-(--color-text-gray) outline-none caret-(--primary-orange) py-[18px] px-[15px] rounded-2xl bg-(--primary-white) dark:bg-(--secondary-black-bg) w-full"
            v-model="inputValue"
            @keyup.enter="selectPoint(inputValue)"
          />
          <button @click="closeSelector" class="cursor-pointer">
            <IcClose />
          </button>
        </div>

        <div
          v-if="suggestions.length > 0"
          class="absolute top-[100%] left-0 w-full bg-white shadow-lg mt-2"
        >
          <ul>
            <li
              v-for="(suggestion, index) in suggestions"
              :key="index"
              @click="selectPoint(suggestion)"
              class="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {{ suggestion }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="mt-2.5 flex items-center gap-[5px]">
      <IcCompas class="h-[13px] w-[13px]" />
      <p class="text-sm font-semibold text-(--dark-gray) dark:text-(--secondary-gray)">
        Указать на карте
      </p>
    </div>

    <div class="mt-[25px]">
      <h2 class="font-semibold text-(--color-text) dark:text-(--primary-white) mb-1">Мои адреса</h2>
      <div
        v-for="(item, index) in userAddresses"
        :key="index"
        class="relative py-2.5 flex items-center gap-2.5"
      >
        <AddressItem icon="point" :name="item.name" :address="item.address" />
        <div
          v-if="index < userAddresses.length - 1"
          class="absolute bottom-0 h-[1.5px] bg-[#eeeeee] dark:bg-(--third-black-bg) ml-[34px] w-[calc(100%-34px)]"
        ></div>
      </div>
    </div>

    <div class="mt-5">
      <h2 class="font-semibold text-(--color-text) dark:text-(--primary-white) mb-1">Недавние</h2>
      <div
        v-for="(item, index) in recentlyAddresses"
        :key="index"
        class="relative py-2.5 flex items-center gap-2.5"
      >
        <AddressItem icon="clock" :name="item.name" :address="item.address" />
        <div
          v-if="index < recentlyAddresses.length - 1"
          class="absolute bottom-0 h-[1.5px] bg-[#eeeeee] dark:bg-(--third-black-bg) ml-[34px] w-[calc(100%-34px)]"
        ></div>
      </div>
    </div>
  </div>
</template>
