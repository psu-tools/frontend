<script setup lang="ts">
import PagesTitle from '~/widgets/profilePages/PagesTitle.vue'
import IcAdd from '~/icons/IcAdd.vue'
import SelectPointModal from '~/features/trip-form/ui/SelectPointModal.vue'

const isSelectorOpen = ref(false)
const selectedPoints = ref<any[]>([])

const handleSelectPoint = (point: any) => {
  selectedPoints.value.push(point)
  isSelectorOpen.value = false
}

const handleCloseSelector = () => {
  isSelectorOpen.value = false
}
</script>

<template>
  <div class="pb-24">
    <div class="flex items-center justify-between">
      <PagesTitle title="Мои адреса" />
      <button class="h-[46px] cursor-pointer" @click="isSelectorOpen = true">
        <IcAdd />
      </button>
    </div>

    <div v-if="selectedPoints.length > 0" class="mt-4 space-y-2">
      <div
        v-for="(point, idx) in selectedPoints"
        :key="idx"
        class="p-3 bg-gray-100 rounded-xl dark:bg-gray-800"
      >
        {{ point.formatted || point.name }} <br />
        <small v-if="point.address">{{ point.address }}</small>
      </div>
    </div>

    <SelectPointModal
      v-if="isSelectorOpen"
      @close="handleCloseSelector"
      @select="handleSelectPoint"
    />
  </div>
</template>
