<script setup lang="ts">
import PrimaryOrangeButton from '~/shaared/ui/buttons/PrimaryOrangeButton.vue'
import IcApp from '~/icons/IcApp.vue'
import IcBack from '~/icons/IcBack.vue'

const emit = defineEmits<{
  (e: 'prevStep'): void
  (e: 'nextStep'): void
}>()
</script>

<template>
  <div class="text-center h-full flex flex-col justify-between">
    <header class="pt-[5px] pb-[15px] flex gap-2.5">
      <IcBack @click="emit('prevStep')" />
      <h1 class="text-(--color-text) dark:text-(--primary-white) font-bold text-xl">
        Информация о себе
      </h1>
    </header>
    <main class="pb-16">
      <div>
        <IcApp class="mx-auto" />
        <h1 class="mt-5 text-(--color-text) dark:text-(--primary-white) font-bold text-xl">
          Регистрация
        </h1>
      </div>

      <div class="mt-5">
        <input
          type="email"
          placeholder="Email"
          class="w-full py-[15px] px-[18px] text-(--color-text) border border-(--light-input-border) bg-(--light-input-bg) rounded-(--radius-2xl) focus:border-(--primary-orange) focus:outline-none"
        />
      </div>

      <PrimaryOrangeButton class="py-[15px] mt-6 cursor-pointer" @click="emit('nextStep')"
        >Продолжить</PrimaryOrangeButton
      >
    </main>

    <footer></footer>
  </div>
</template>

<style scoped></style>
