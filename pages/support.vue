<script setup lang="ts">
import IcRedirect from '~/icons/IcRedirect.vue'
import PrimaryOrangeButton from '~/shaared/ui/buttons/PrimaryOrangeButton.vue'
import SecondaryButton from '~/shaared/ui/buttons/SecondaryButton.vue'
</script>

<template>
  <div class="relative min-h-[100%] flex flex-col justify-between pt-14 pb-24">
    <div class="mt-[40px] flex flex-col gap-[35px] justify-between items-center">
      <IcRedirect />
      <h2 class="w-[220px] mx-auto text-lg text-center dark:text-(--primary-white) font-semibold">
        {{ $t('redirectMessage') }}
      </h2>
    </div>
    <div class="flex flex-col gap-[15px]">
      <a href="https://t.me/renatskosarev">
        <PrimaryOrangeButton class="py-[15px]">{{ $t('continueButton') }}</PrimaryOrangeButton>
      </a>
      <NuxtLink :to="$localePath('/profile')" class="w-full">
        <SecondaryButton>{{ $t('cancelButton') }}</SecondaryButton>
      </NuxtLink>
    </div>
  </div>
</template>
