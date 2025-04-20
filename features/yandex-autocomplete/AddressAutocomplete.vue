<template>
  <div>
    <input
      id="address_input"
      type="text"
      placeholder="Введите адрес"
      class="text-sm text-text outline-none caret-(--primary-orange) py-[18px] px-[15px] rounded-2xl bg-(--primary-white) w-full"
    />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

// Инициализируем автодополнение адресов через Яндекс API
onMounted(() => {
  ymaps.ready(() => {
    const inputElement = document.getElementById('address_input')

    if (inputElement) {
      const autoComplete = new ymaps.control.SearchControl({
        options: {
          provider: 'yandex#search', // Используем автодополнение от Яндекса
          useMapBounds: true, // Ограничиваем поиск по карте
        },
      })

      // Встраиваем автодополнение в input
      inputElement.parentNode.insertBefore(autoComplete.getContainer(), inputElement)

      // Обрабатываем выбор адреса
      autoComplete.events.add('resultselect', function (event) {
        const result = event.get('result')
        const selectedAddress = result.properties.get('text')
        console.log('Выбранный адрес:', selectedAddress)
        // Здесь ты можешь сделать что-то с выбранным адресом
      })
    }
  })
})
</script>
