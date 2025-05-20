<script setup lang="ts">
import IcBack from '~/icons/IcBack.vue'

interface Props {
  title: string
  link?: string
}

const props = defineProps<Props>()

let setLink = ''
if (props.link) {
  setLink = props.link
} else {
  setLink = '/profile'
}
</script>
<template>
  <NuxtLink :to="`${setLink}`" class="w-full">
    <div class="py-[14px] mb-[10px] flex gap-[10px] items-center">
      <IcBack class="cursor-pointer" />
      <h2 class="text-lg dark:text-(--primary-white) font-semibold">{{ title }}</h2>
    </div>
  </NuxtLink>
</template>
