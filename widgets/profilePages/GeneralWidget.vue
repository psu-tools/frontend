<script setup lang="ts">
interface Props {
  type: string
  id: string
  hasCheckbox?: boolean
  checkboxStatus?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'checkboxToggle', value: boolean): void
}>()

const checked = ref(props.checkboxStatus || false)

watch(checked, () => {
  setTimeout(() => {
    emit('checkboxToggle', checked)
  }, 300)
})
</script>
<template>
  <div
    class="bg-(--primary-white-bg) dark:bg-(--secondary-black-bg) rounded-2xl py-[18px] pl-[15px] pr-[18px]"
  >
    <div class="flex justify-between items-center">
      <div class="text-sm flex flex-col gap-[4px]">
        <div class="text-(--color-text) dark:text-(--primary-white)">{{ type }}</div>
        <div class="text-(--primary-gray-text)">{{ id }}</div>
      </div>
      <div v-if="hasCheckbox" class="">
        <div
          @click="checked = !checked"
          class="w-12 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300"
          :class="checked ? 'bg-(--primary-orange)' : 'bg-(--medium-gray)'"
        >
          <div
            class="bg-(--primary-white-bg) w-5 h-5 rounded-full transform transition-transform duration-300"
            :class="checked ? 'translate-x-5' : 'translate-x-0'"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
