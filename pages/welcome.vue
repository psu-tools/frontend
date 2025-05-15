<script setup lang="ts">
import PrimaryOrangeButton from '~/shaared/ui/buttons/PrimaryOrangeButton.vue'
import SecondaryButton from '~/shaared/ui/buttons/SecondaryButton.vue'
import IcApp from '~/icons/IcApp.vue'
definePageMeta({
  layout: 'empty',
})
</script>

<template>
  <div class="h-full flex flex-col justify-between">
    <main class="h-4/5 flex flex-col justify-center items-center gap-5">
      <IcApp />
      <h1 class="text-(--color-text) font-bold text-xl">Добро пожаловать в Flow!</h1>
    </main>

    <footer class="h-1/5 flex flex-col gap-3.5">
      <NuxtLink to="/registration">
        <PrimaryOrangeButton class="w-full cursor-pointer py-[15px]">
          Регистрация
        </PrimaryOrangeButton>
      </NuxtLink>
      <NuxtLink to="/login">
        <SecondaryButton class="w-full cursor-pointer"> Вход </SecondaryButton>
      </NuxtLink>
    </footer>
  </div>
</template>

<style scoped></style>
