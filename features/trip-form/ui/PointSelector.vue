<script setup lang="ts">
import IcClose from '~/icons/IcClose.vue'
import IcCompas from '~/icons/IcCompas.vue'

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

const inputValue = ref(props.initialValue)

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

const selectPoint = () => emit('select', inputValue.value)

const closeSelector = () => emit('close')

const toggleExpand = () => emit('toggleExpand')
</script>

<template>
  <div class="relative inset-0 z-50 flex flex-col bg-(--primary-white-bg)">
    <div class="sticky left-0 top-0 z-40 bg-(--primary-white-bg)">
      <div
        @click="toggleExpand"
        class="mx-auto my-2 h-1 w-8 rounded-full bg-(--medium-gray) cursor-pointer mb-[20px]"
      ></div>

      <div class="mb-2.5">
        <div class="flex justify-between items-center gap-2.5">
          <input
            type="text"
            placeholder="Куда поедем?"
            class="text-sm text-text outline-none caret-(--primary-orange) py-[18px] px-[15px] rounded-2xl bg-(--primary-white) w-full"
            v-model="inputValue"
            @keyup.enter="selectPoint"
          />
          <button @click="closeSelector" class="cursor-pointer">
            <IcClose />
          </button>
        </div>
      </div>
    </div>

    <div class="mt-2.5 flex items-center gap-[5px]">
      <IcCompas class="h-[13px] w-[13px]" />
      <p class="text-sm font-semibold text-(--dark-gray)">Указать на карте</p>
    </div>

    <div class="mt-[25px]">
      <h2 class="font-semibold text-(--color-text) mb-1">Мои адреса</h2>
      <div
        v-for="(item, index) in userAddresses"
        :key="item"
        class="relative py-2.5 flex items-center gap-2.5"
      >
        <AddressItem icon="point" :name="item.name" :address="item.address" />
        <div
          v-if="index < userAddresses.length - 1"
          class="absolute bottom-0 h-[1.5px] bg-[#eeeeee] ml-[34px] w-[calc(100%-34px)]"
        ></div>
      </div>
    </div>

    <div class="mt-5">
      <h2 class="font-semibold text-(--color-text) mb-1">Недавние</h2>
      <div
        v-for="(item, index) in recentlyAddresses"
        :key="item"
        class="relative py-2.5 flex items-center gap-2.5"
      >
        <AddressItem icon="clock" :name="item.name" :address="item.address" />
        <div
          v-if="index < recentlyAddresses.length - 1"
          class="absolute bottom-0 h-[1.5px] bg-[#eeeeee] ml-[34px] w-[calc(100%-34px)]"
        ></div>
      </div>
    </div>
  </div>
</template>
