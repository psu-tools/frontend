<script setup lang="ts">
import IcBack from '~/icons/IcBack.vue'
import { useYandexMapsModalStore } from '~/stores/yandexMaps'

const emit = defineEmits<{
  (e: 'closeYandexMaps'): void
  (e: 'selectMapsPoint', point: Point, pointType: 'api' | 'user'): void
}>()

const isVisible = ref(false)

const store = useYandexMapsModalStore()

const mapRef = ref<HTMLElement | null>(null)
const { $ymapsLoader } = useNuxtApp()

const closeModal = () => store.closeModal()
const selectPoint = (point: Point) => store.selectPoint(point)

watch(
  () => store.isOpen,
  async isOpen => {
    if (isOpen) {
      isVisible.value = false
      await nextTick()
      requestAnimationFrame(() => {
        isVisible.value = true
      })
    } else {
      isVisible.value = false
    }
  }
)

onMounted(async () => {
  await $ymapsLoader

  const ymaps = (window as any).ymaps

  ymaps.ready(() => {
    const map = new ymaps.Map(mapRef.value, {
      center: [58.0092, 56.227],
      zoom: 12,
    })

    let placemark: any = null

    map.events.add('click', (e: any) => {
      const coords = e.get('coords')

      if (!placemark) {
        placemark = new ymaps.Placemark(
          coords,
          {},
          {
            preset: 'islands#blueDotIcon',
          }
        )
        map.geoObjects.add(placemark)
      } else {
        placemark.geometry.setCoordinates(coords)
      }

      ymaps.geocode(coords).then((res: any) => {
        const firstGeoObject = res.geoObjects.get(0)
        const address = firstGeoObject.getAddressLine()
        selectPoint({
          name: address.split(',').slice(1).join(',').trim(),
          latitude: coords[0],
          longitude: coords[1],
          stopTime: 0,
          address: address,
        })
        console.log('Выбран адрес:', address.split(',').slice(1).join(',').trim(), coords)
      })
    })
  })
})
</script>

<template>
  <div v-show="store.isOpen" class="absolute inset-0 z-50">
    <div
      class="bg-(--primary-white) dark:bg-(--secondary-black-bg) text-(--color-text) dark:text-(--primary-white) p-4 flex gap-2 items-center"
    >
      <IcBack @click="closeModal" class="cursor-pointer" />
      <h2 class="text-lg font-semibold">Выбрать точку на карте</h2>
    </div>
    <div ref="mapRef" style="width: 100%; height: 100%"></div>
  </div>
</template>
