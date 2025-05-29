<script setup lang="ts">
import IcBack from '~/icons/IcBack.vue'
import { useYandexMapsModalStore } from '~/stores/yandexMaps'

const isVisible = ref(false)

const store = useYandexMapsModalStore()

const mapRef = ref<HTMLDivElement | null>(null)

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
import { loadYandexMaps } from '@/utils/loadYandexMaps'

onMounted(async () => {
  try {
    const ymaps3 = await loadYandexMaps()

    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapListener, YMapMarker } =
      ymaps3

    const map = new YMap(mapRef.value, {
      location: {
        center: [56.227, 58.0092],
        zoom: 12,
      },
    })

    map.addChild(new YMapDefaultSchemeLayer())
    map.addChild(new YMapDefaultFeaturesLayer())

    const markerEl = document.createElement('div')
    markerEl.innerHTML = `
      <svg width="30" height="35" viewBox="0 0 30 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.999 0C6.72795 0 0 6.65025 0 14.8276C0 25.1936 13.7763 34.2107 14.3623 34.5882L14.9991 35L15.6359 34.5882C16.2217 34.2105 30 25.1917 30 14.8276C30 6.65209 23.2719 0 14.999 0ZM14.999 32.225C12.3463 30.3583 2.32881 22.778 2.32881 14.8276C2.32881 7.92183 8.01252 2.30192 14.999 2.30192C21.9854 2.30192 27.671 7.91999 27.671 14.8276C27.671 22.7798 17.6534 30.3582 14.999 32.225Z" fill="#FF724C"/>
<path d="M14.999 32.225C12.3463 30.3583 2.32881 22.778 2.32881 14.8276C2.32881 7.92183 8.01252 2.30192 14.999 2.30192C21.9854 2.30192 27.671 7.91999 27.671 14.8276C27.671 22.7798 17.6534 30.3582 14.999 32.225Z" fill="#FF724C"/>
<path d="M14.999 32.225C12.3463 30.3583 2.32881 22.778 2.32881 14.8276C2.32881 7.92183 8.01252 2.30192 14.999 2.30192C21.9854 2.30192 27.671 7.91999 27.671 14.8276C27.671 22.7798 17.6534 30.3582 14.999 32.225Z" fill="white"/>
<path d="M12.7908 21.0481C12.1403 20.8817 11.4382 20.462 10.5872 19.6808C9.80698 18.9646 9.42143 17.853 9.3584 17.6889C8.45638 17.5765 7.81013 17.33 7.23919 16.6059C6.70976 15.9343 6.5021 15.0582 6.61165 14.2199C6.71959 13.3941 7.1182 12.6683 7.79547 12.1609C8.23595 11.831 8.71626 11.6896 9.26314 11.6591C10.1256 10.0294 11.4068 8.84505 13.2035 8.28322C14.7599 7.79675 16.4492 7.94112 17.8972 8.68429C19.3558 9.4338 20.1068 10.3884 20.7797 11.8221C21.1261 11.5471 21.5657 11.3741 22.0169 11.4262C22.4115 11.4717 22.7405 11.6989 22.98 12.0029C23.4321 12.5767 23.5121 13.3519 23.4039 14.051C23.2907 14.7829 22.9462 15.5789 22.3119 16.0148C21.9351 16.2737 21.5107 16.3548 21.0631 16.3964L21.0523 16.4459C21.0046 16.6701 20.9861 16.8976 20.9676 17.125C20.9531 17.3037 20.9385 17.4825 20.9098 17.6597C20.7498 18.6475 20.0057 19.527 19.1789 20.066C17.5417 21.1331 14.6674 21.5281 12.7908 21.0481ZM19.8872 12.773C19.6312 12.2991 19.2227 12.0906 18.721 11.9476C18.5622 11.9383 18.4067 11.9499 18.2503 11.979C17.4439 12.1287 17.0275 12.7465 16.6109 13.3646C16.5736 13.4199 16.5364 13.4751 16.4989 13.53C16.3569 13.3859 16.2357 13.2263 16.1145 13.0666C15.9551 12.8567 15.7955 12.6467 15.5885 12.4715C15.1693 12.1167 14.5996 11.8947 14.0426 11.9472C13.4778 12.0004 13.0058 12.3134 12.6604 12.7428C12.4156 13.0471 12.2908 13.3864 12.2446 13.7687C12.1103 14.8801 12.8232 15.563 13.4269 16.1412C13.8231 16.5206 14.1722 16.8551 14.2039 17.236C14.2335 17.592 14.056 17.789 13.8368 18.0322C13.8228 18.0478 13.8087 18.0635 13.7944 18.0795C13.7895 18.0853 13.7847 18.0912 13.7798 18.0971C13.7294 18.1577 13.6768 18.2211 13.645 18.2926C13.5859 18.4266 13.5869 18.579 13.6477 18.7123C13.8281 19.1113 14.3841 19.3581 14.7821 19.4935C15.8097 19.8435 17.2997 19.8381 18.2893 19.3606C19.1798 18.9309 19.9723 18.0183 19.8617 16.9828C19.8464 16.8394 19.8112 16.6966 19.776 16.5536C19.7212 16.3315 19.6663 16.109 19.6857 15.883C19.7019 15.6942 19.7751 15.5008 19.8455 15.3147C19.8714 15.2463 19.8969 15.1789 19.9191 15.113C20.1586 14.4014 20.2577 13.4589 19.8872 12.773Z" fill="#FF724C"/>
<path d="M18.2334 14.9947C18.6607 15.139 19.1258 14.9147 19.2717 14.4939C19.4176 14.0731 19.1889 13.6156 18.7612 13.4726C18.3345 13.33 17.8711 13.5545 17.7254 13.9743C17.5799 14.3942 17.8072 14.8507 18.2334 14.9947Z" fill="#FF724C"/>
<path d="M13.8856 15.0112C14.3128 15.1405 14.7661 14.9068 14.9014 14.4875C15.0367 14.0682 14.8036 13.6199 14.3789 13.4828C13.9486 13.3438 13.4858 13.5771 13.3487 14.0019C13.2115 14.4268 13.4528 14.8802 13.8856 15.0112Z" fill="#FF724C"/>
<path d="M16.2319 17.2542C16.3463 17.3503 16.4734 17.4416 16.6197 17.4832C16.8648 17.5529 17.1503 17.5072 17.3708 17.3855C17.5899 17.2646 17.7682 17.0875 17.8296 16.8423C17.8812 16.6366 17.8624 16.5053 17.7546 16.3236C17.3627 16.3158 16.2728 16.1899 15.9705 16.4475C15.8983 16.5091 15.8691 16.5863 15.873 16.6794C15.8813 16.8813 16.1006 17.1087 16.2319 17.2542Z" fill="#FF724C"/>
</svg>

    `
    markerEl.style.transform = 'translate(-50%, -100%)'
    markerEl.style.position = 'absolute'
    markerEl.style.cursor = 'pointer'

    let marker = new YMapMarker({ coordinates: [56.227, 58.0092] }, markerEl)
    map.addChild(marker)

    const geoBtn = document.createElement('button')
    geoBtn.classList.add('geo-btn')
    geoBtn.innerText = 'Найти меня'
    geoBtn.style.color = '#fff'
    geoBtn.style.position = 'absolute'
    geoBtn.style.top = '72px'
    geoBtn.style.left = '50%'
    geoBtn.style.transform = 'translateX(-50%)'
    geoBtn.style.paddingTop = '10px'
    geoBtn.style.paddingBottom = '10px'
    geoBtn.style.paddingLeft = '15px'
    geoBtn.style.paddingRight = '15px'
    geoBtn.style.borderRadius = '20px'
    geoBtn.style.background = '#FF724C'
    geoBtn.style.cursor = 'pointer'
    geoBtn.addEventListener('mouseenter', () => (geoBtn.style.backgroundColor = '#eb6946'))
    geoBtn.addEventListener('mouseleave', () => (geoBtn.style.backgroundColor = '#FF724C'))

    mapRef.value?.appendChild(geoBtn)

    geoBtn.onclick = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async position => {
            const { latitude, longitude } = position.coords
            const newCoords = [longitude, latitude]

            marker.update({ coordinates: newCoords })

            map.setLocation({
              center: [longitude, latitude],
              zoom: 14,
            })

            const httpApiUrl = 'https://geocode-maps.yandex.ru/1.x'
            const queryString = new URLSearchParams({
              apikey: config.public.ymapsApiKey,
              geocode: `${longitude},${latitude}`,
              format: 'json',
              lang: 'ru_RU',
              results: '1',
            }).toString()

            const fullUrl = `${httpApiUrl}?${queryString}`

            try {
              const response = await fetch(fullUrl)
              const data = await response.json()

              const geoObject = data.response.GeoObjectCollection.featureMember?.[0]?.GeoObject
              const address = geoObject?.metaDataProperty?.GeocoderMetaData?.text

              marker.update({ coordinates: [longitude, latitude] })

              if (address) {
                console.log('Адрес:', address.split(',').slice(1).join(',').trim(), newCoords)
                selectPoint({
                  name: address.split(',').slice(1).join(',').trim(),
                  latitude: newCoords[1],
                  longitude: newCoords[0],
                  stopTime: 0,
                  address: address,
                })
              } else {
                console.warn('Адрес не найден')
              }
            } catch (error) {
              console.error('Ошибка при запросе геокодера:', error)
            }
          },
          error => {
            console.error('Ошибка геолокации:', error)
            alert('Не удалось определить местоположение')
          }
        )
      } else {
        alert('Геолокация не поддерживается этим браузером.')
      }
    }

    const config = useRuntimeConfig()

    const mapListener = new YMapListener({
      layer: 'any',
      onClick: async (object, event) => {
        const coords = event.coordinates
        if (!coords) return

        const [lon, lat] = coords

        const httpApiUrl = 'https://geocode-maps.yandex.ru/1.x'
        const queryString = new URLSearchParams({
          apikey: config.public.ymapsApiKey,
          geocode: `${lon},${lat}`,
          format: 'json',
          lang: 'ru_RU',
          results: '1',
        }).toString()

        const fullUrl = `${httpApiUrl}?${queryString}`

        try {
          const response = await fetch(fullUrl)
          const data = await response.json()

          const geoObject = data.response.GeoObjectCollection.featureMember?.[0]?.GeoObject
          const address = geoObject?.metaDataProperty?.GeocoderMetaData?.text

          marker.update({ coordinates: [lon, lat] })

          if (address) {
            console.log('Адрес:', address.split(',').slice(1).join(',').trim(), coords)
            selectPoint({
              name: address.split(',').slice(1).join(',').trim(),
              latitude: coords[1],
              longitude: coords[0],
              stopTime: 0,
              address: address,
            })
          } else {
            console.warn('Адрес не найден')
          }
        } catch (error) {
          console.error('Ошибка при запросе геокодера:', error)
        }
      },
    })
    map.addChild(mapListener)
  } catch (e) {
    console.error('Ошибка загрузки Yandex Maps:', e)
  }
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

<style></style>
