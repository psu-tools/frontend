<script setup lang="ts">
defineProps({ isActive: Boolean })
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-1">
    <svg
      class="w-5 transition-colors duration-200"
      :class="{
        'fill-(--primary-orange) opacity-100': isActive,
        'fill-(--primary-light-gray) group-hover:fill-(--primary-dark-gray) group-hover:opacity-100':
          !isActive,
      }"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.87349 20H16.1265C18.2625 20 20 18.4426 20 16.5285V8.64163C20 7.6888 19.5562 6.76781 18.7824 6.11445L12.6557 0.943125C11.167 -0.31425 8.83388 -0.314438 7.34433 0.942937L1.21803 6.11445C0.443837 6.768 0 7.68899 0 8.64163V16.5285C0 18.4426 1.73752 20 3.87349 20ZM1.72155 8.64163C1.72155 8.11238 1.96827 7.60066 2.39823 7.23772L8.52454 2.06621C9.35253 1.36784 10.6483 1.36784 11.4755 2.06621L17.6022 7.23772C18.0317 7.60047 18.2785 8.1122 18.2785 8.64163V16.5285C18.2785 17.5919 17.313 18.4571 16.1265 18.4571H10.861V12.3175C10.861 11.8915 10.4756 11.5461 10.0002 11.5461C9.52485 11.5461 9.13943 11.8915 9.13943 12.3175V18.4571H3.87349C2.68698 18.4571 1.72155 17.5919 1.72155 16.5285V8.64163Z"
      />
    </svg>
    <p
      class="transition-colors duration-200 text-[10px] font-semibold"
      :class="{
        'text-(--primary-orange) opacity-100': isActive,
        'text-(--primary-light-gray) group-hover:text-(--primary-dark-gray) group-hover:opacity-100':
          !isActive,
      }"
    >
      Главная
    </p>
  </div>
</template>

<style scoped></style>
