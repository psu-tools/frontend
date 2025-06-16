<script setup lang="ts">
import IcBack from '~/icons/IcBack.vue'

interface Props {
  title: string
  link?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const localePath = useLocalePath()

const setLink = ref<string | null>()

if (props.link) {
  setLink.value = props.link
} else {
  setLink.value = localePath('/profile')
}
</script>
<template>
  <NuxtLink :to="`${setLink}`" class="w-full">
    <div class="flex gap-[10px] pb-[15px] items-center">
      <IcBack class="cursor-pointer" @click="emit('close')" />
      <h2 class="text-lg dark:text-(--primary-white) font-semibold">{{ title }}</h2>
    </div>
  </NuxtLink>
</template>
