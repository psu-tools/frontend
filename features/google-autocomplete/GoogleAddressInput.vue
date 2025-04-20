<script setup lang="ts">
const emit = defineEmits<{
  (e: 'select', place: google.maps.places.PlaceResult): void
}>()

const setPlace = (place: google.maps.places.PlaceResult) => {
  emit('select', place)
}
</script>

<template>
  <GMapAutocomplete
    class="w-full px-4 py-2 border rounded text-sm"
    placeholder="Введите адрес"
    @place_changed="setPlace($event)"
  />
</template>
