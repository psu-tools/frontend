<script setup lang="ts">
import PrimaryOrangeButton from '~/shaared/ui/buttons/PrimaryOrangeButton.vue'
import IcBack from '~/icons/IcBack.vue'
import AvatarInput from '~/shaared/ui/inputs/avatarInput.vue'
import TextInput from '~/shaared/ui/inputs/textInput.vue'
import { useAuthStore } from '~/stores/auth'
import { useUploadImage } from '~/composables/useUploadImage'

const emit = defineEmits<{
  (e: 'prevStep'): void
  (e: 'sendForm'): void
}>()

const authStore = useAuthStore()

const avatar = ref<File | null>(null)
const name = ref<string>('')
const surname = ref<string>('')

const { uploadImage, imageUrl, isLoading, error } = useUploadImage()

watch(name, () => {
  authStore.setName(name.value)
})

watch(surname, () => {
  authStore.setSurname(surname.value)
})

watch(avatar, async () => {
  if (avatar.value) {
    const uploadedUrl = await uploadImage(avatar.value)
    if (uploadedUrl) {
      authStore.setAvatar?.(uploadedUrl)
    } else {
      console.error('Ошибка загрузки аватара:', error.value)
    }
  }
})
</script>

<template>
  <div class="text-center h-full flex flex-col gap-[25px]">
    <header class="pt-[5px] pb-[15px] flex gap-2.5">
      <IcBack @click="emit('prevStep')" />
      <h1 class="text-(--color-text) dark:text-(--primary-white) font-bold text-xl">
        Информация о себе
      </h1>
    </header>
    <main class="pb-16">
      <div>
        <AvatarInput class="mx-auto" v-model="avatar" />
        <TextInput class="mt-5" v-model="name" placeholder="Имя" />
        <TextInput class="mt-[15px]" v-model="surname" placeholder="Фамилия" />
      </div>

      <PrimaryOrangeButton
        class="py-[15px] mt-[25px] cursor-pointer"
        :disabled="!name || isLoading"
        @click="emit('sendForm')"
        >Зарегистрироваться</PrimaryOrangeButton
      >
    </main>
  </div>
</template>

<style scoped></style>
