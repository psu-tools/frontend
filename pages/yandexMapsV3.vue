<script setup lang="ts">
import IcBack from '~/icons/IcBack.vue'
import { useYandexMapsModalStore } from '~/stores/yandexMaps'
import { loadYandexMaps } from '@/utils/loadYandexMaps'
import SelectedPointOnMapModal from '~/features/trip-form/ui/SelectedPointOnMapModal.vue'

const isVisible = ref(false)
const mapTheme = ref(localStorage.getItem('theme'))
const isYandexMapsLoaded = ref(false)

const store = useYandexMapsModalStore()

const mapRef = ref<HTMLDivElement | null>(null)

const selectedAddress = ref<string | null>()
const isModalOpen = ref<boolean>(false)

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
  try {
    const ymaps3 = await loadYandexMaps()

    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapListener, YMapMarker } =
      ymaps3

    const map = new YMap(mapRef.value, {
      location: {
        center: [56.227, 58.0092],
        zoom: 12,
      },
      theme: mapTheme.value,
    })

    map.addChild(new YMapDefaultSchemeLayer())
    map.addChild(new YMapDefaultFeaturesLayer())

    const markerEl = document.createElement('div')
    markerEl.innerHTML = `
      <svg width="35" height="58" viewBox="0 0 35 58" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_3103_22786)">
<rect x="16" y="33" width="3" height="19" rx="1.5" fill="#353A40"/>
</g>
<path d="M12.5 1H22.5C28.8513 1 34 6.14873 34 12.5V22.5C34 28.8513 28.8513 34 22.5 34H12.5C6.14873 34 1 28.8513 1 22.5V12.5C1 6.14873 6.14873 1 12.5 1Z" fill="white" stroke="#FF724C" stroke-width="2"/>
<path d="M15.023 24.7717C14.2997 24.5833 13.5191 24.1082 12.5729 23.2238C11.7054 22.413 11.2767 21.1546 11.2066 20.9689C10.2037 20.8415 9.48516 20.5625 8.85036 19.7427C8.26171 18.9825 8.03081 17.9907 8.15262 17.0416C8.27263 16.1068 8.71583 15.2851 9.46886 14.7108C9.95862 14.3372 10.4926 14.1771 11.1007 14.1426C12.0597 12.2977 13.4841 10.9569 15.4818 10.3209C17.2124 9.77015 19.0906 9.93359 20.7006 10.7749C22.3224 11.6234 23.1573 12.7041 23.9055 14.3272C24.2906 14.0159 24.7795 13.82 25.2811 13.8789C25.7199 13.9305 26.0856 14.1877 26.3519 14.5318C26.8546 15.1814 26.9436 16.059 26.8233 16.8505C26.6974 17.679 26.3144 18.5802 25.6091 19.0736C25.1901 19.3666 24.7183 19.4585 24.2207 19.5056L24.2086 19.5616C24.1555 19.8155 24.135 20.073 24.1144 20.3304C24.0983 20.5328 24.0821 20.7352 24.0502 20.9358C23.8723 22.054 23.045 23.0497 22.1256 23.6599C20.3053 24.8679 17.1094 25.3151 15.023 24.7717ZM22.9131 15.4036C22.6285 14.8672 22.1744 14.6312 21.6165 14.4692C21.4399 14.4587 21.267 14.4719 21.0932 14.5047C20.1965 14.6742 19.7336 15.3736 19.2703 16.0734C19.229 16.1359 19.1876 16.1985 19.1459 16.2606C18.988 16.0975 18.8533 15.9168 18.7184 15.7361C18.5412 15.4984 18.3638 15.2606 18.1336 15.0623C17.6675 14.6607 17.0342 14.4094 16.4148 14.4688C15.7868 14.529 15.2621 14.8833 14.878 15.3695C14.6058 15.714 14.4671 16.0981 14.4157 16.5308C14.2664 17.7891 15.059 18.5621 15.7302 19.2167C16.1707 19.6463 16.5589 20.0248 16.5941 20.4561C16.627 20.8592 16.4297 21.0821 16.186 21.3575C16.1705 21.3751 16.1547 21.3929 16.1388 21.411C16.1334 21.4176 16.128 21.4242 16.1226 21.4309C16.0666 21.4995 16.0081 21.5713 15.9727 21.6522C15.907 21.804 15.9081 21.9765 15.9757 22.1273C16.1763 22.5791 16.7945 22.8584 17.237 23.0118C18.3796 23.408 20.0362 23.4019 21.1365 22.8613C22.1266 22.3749 23.0078 21.3418 22.8848 20.1695C22.8678 20.0071 22.8287 19.8455 22.7895 19.6836C22.7286 19.4322 22.6676 19.1802 22.6892 18.9244C22.7072 18.7107 22.7885 18.4917 22.8668 18.281C22.8956 18.2036 22.924 18.1273 22.9486 18.0527C23.2149 17.2471 23.3251 16.1802 22.9131 15.4036Z" fill="#FF724C"/>
<path d="M21.073 17.9182C21.5481 18.0816 22.0652 17.8276 22.2274 17.3512C22.3897 16.8749 22.1354 16.357 21.6598 16.1951C21.1853 16.0336 20.6701 16.2877 20.5082 16.763C20.3463 17.2383 20.5991 17.7552 21.073 17.9182Z" fill="#FF724C"/>
<path d="M16.236 17.9375C16.711 18.0839 17.215 17.8193 17.3654 17.3446C17.5159 16.8699 17.2567 16.3624 16.7846 16.2072C16.3061 16.0499 15.7915 16.3139 15.639 16.7949C15.4866 17.2759 15.7548 17.7892 16.236 17.9375Z" fill="#FF724C"/>
<path d="M18.8434 20.4768C18.9706 20.5856 19.1119 20.689 19.2746 20.736C19.547 20.815 19.8645 20.7633 20.1096 20.6255C20.3532 20.4886 20.5515 20.2881 20.6198 20.0105C20.6772 19.7776 20.6563 19.629 20.5364 19.4233C20.1007 19.4144 18.8889 19.2719 18.5527 19.5636C18.4724 19.6333 18.44 19.7207 18.4443 19.826C18.4536 20.0546 18.6974 20.3121 18.8434 20.4768Z" fill="#FF724C"/>
<defs>
<filter id="filter0_d_3103_22786" x="13" y="33" width="9" height="25" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="3"/>
<feGaussianBlur stdDeviation="1.5"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3103_22786"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3103_22786" result="shape"/>
</filter>
</defs>
</svg>`
    markerEl.style.transform = 'translate(-50%, -100%)'
    markerEl.style.position = 'absolute'
    markerEl.style.cursor = 'pointer'

    let marker = new YMapMarker({ coordinates: [0, 0] }, markerEl)
    map.addChild(marker)

    const geoBtn = document.createElement('button')
    geoBtn.innerHTML = `<svg width="108" height="108" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_3103_22790)">
      <circle cx="50" cy="50" r="24" fill="#FAFAFA"/>
    </g>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M57.8155 45.4195C58.6282 43.3879 56.6121 41.3718 54.5805 42.1845L41.5644 47.3909C39.4427 48.2396 39.4906 51.2596 41.6382 52.0405L46.1689 53.688C46.2354 53.7122 46.2878 53.7646 46.312 53.8311L47.9595 58.3618C48.7404 60.5094 51.7604 60.5573 52.6091 58.4356L57.8155 45.4195ZM55.416 44.2732C55.6112 44.1951 55.8049 44.3888 55.7268 44.584L50.5204 57.6001C50.4934 57.6676 50.4601 57.6976 50.4325 57.7149C50.3989 57.736 50.351 57.7512 50.2946 57.7503C50.2381 57.7494 50.1907 57.7327 50.1579 57.7106C50.1308 57.6924 50.0985 57.6613 50.0737 57.593L48.4261 53.0622C48.1745 52.3704 47.6296 51.8255 46.9378 51.5739L42.407 49.9263C42.3387 49.9015 42.3076 49.8692 42.2894 49.8421C42.2673 49.8093 42.2506 49.7619 42.2497 49.7054C42.2488 49.649 42.264 49.6011 42.2851 49.5675C42.3024 49.5399 42.3324 49.5066 42.3999 49.4796L55.416 44.2732Z" fill="#FF724C"/>
    <defs>
      <filter id="filter0_d_3103_22790" x="0" y="0" width="108" height="108" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dx="4" dy="4"/>
        <feGaussianBlur stdDeviation="15"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3103_22790"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3103_22790" result="shape"/>
      </filter>
    </defs>
  </svg>`
    geoBtn.style.position = 'absolute'
    geoBtn.style.top = '50px'
    geoBtn.style.right = '-20px'
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
                selectedAddress.value = address.split(',').slice(1).join(',').trim()
                selectPoint({
                  name: address.split(',').slice(1).join(',').trim(),
                  latitude: newCoords[1],
                  longitude: newCoords[0],
                  stopTime: 0,
                  address: address,
                })
                isModalOpen.value = true
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
            selectedAddress.value = address.split(',').slice(1).join(',').trim()
            selectPoint({
              name: address.split(',').slice(1).join(',').trim(),
              latitude: coords[1],
              longitude: coords[0],
              stopTime: 0,
              address: address,
            })
            isModalOpen.value = true
          } else {
            console.warn('Адрес не найден')
          }
        } catch (error) {
          console.error('Ошибка при запросе геокодера:', error)
        }
      },
    })
    map.addChild(mapListener)
    isYandexMapsLoaded.value = true
  } catch (e) {
    console.error('Ошибка загрузки Yandex Maps:', e)
  }
})
</script>

<template>
  <div v-show="isYandexMapsLoaded" class="absolute inset-0 z-50">
    <div
      class="bg-(--primary-white) dark:bg-(--secondary-black-bg) text-(--color-text) dark:text-(--primary-white) p-4 flex gap-2 items-center"
    >
      <IcBack @click="closeModal" class="cursor-pointer" />
      <h2 class="text-lg font-semibold">Выбрать точку на карте</h2>
    </div>
    <div ref="mapRef" style="width: 100%; height: 100%"></div>
    <SelectedPointOnMapModal
      v-if="store.isOpen && selectedAddress"
      label="Выбранная точка"
      :value="selectedAddress"
      input-disabled
      without-background
      @close="closeModal"
      @save="closeModal"
    />
  </div>
</template>
