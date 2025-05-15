<script setup lang="ts">
import IcBack from '~/icons/IcBack.vue'
import IcApp from '~/icons/IcApp.vue'
import PrimaryOrangeButton from '~/shaared/ui/buttons/PrimaryOrangeButton.vue'
definePageMeta({
  layout: 'empty',
})
</script>

<template>
  <div class="text-center h-full flex flex-col justify-between">
    <header class="pt-[5px] pb-[15px]">
      <NuxtLink to="/welcome">
        <IcBack />
      </NuxtLink>
    </header>
    <main class="pb-16">
      <div>
        <IcApp class="mx-auto" />
        <h1 class="mt-5 text-(--color-text) font-bold text-xl">Регистрация</h1>
      </div>

      <div class="mt-5">
        <input
          type="email"
          placeholder="Email"
          class="w-full py-[15px] px-[18px] text-(--color-text) border border-(--light-input-border) bg-(--light-input-bg) rounded-(--radius-2xl) focus:border-(--primary-orange) focus:outline-none"
        />
      </div>

      <PrimaryOrangeButton class="py-[15px] mt-6 cursor-pointer">Продолжить</PrimaryOrangeButton>
    </main>

    <footer>
      <p class="text-(--color-text)">
        Уже есть аккаунт?
        <NuxtLink to="/login" class="text-(--primary-orange) font-medium cursor-pointer"
          >Войдите</NuxtLink
        >
      </p>
    </footer>
  </div>
</template>

<style scoped></style>
