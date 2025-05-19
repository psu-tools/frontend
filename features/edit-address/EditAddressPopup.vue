<script setup lang="ts">
const props = defineProps<{
  point: any
}>()

const emit = defineEmits(['close', 'save'])

const editedName = ref(props.point?.formatted || '')

const savePoint = () => {
  emit('save', {
    ...props.point,
    formatted: editedName.value,
  })
}
</script>
<template>
  <div>
    <input v-model="editedName" placeholder="Название точки" />
    <button @click="savePoint">Сохранить</button>
    <button @click="$emit('close')">Отмена</button>
  </div>
</template>
