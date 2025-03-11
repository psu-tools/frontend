<script setup lang="ts">
defineProps({ isActive: Boolean })
</script>

<template>
  <div class="group w-6 h-6 flex items-center justify-center">
    <svg
        class="w-full h-full transition-colors duration-200"
        :class="{
        'fill-[#3F463E] opacity-100': isActive,
        'fill-[#ADAFB1] opacity-40 group-hover:fill-[#3F463E] group-hover:opacity-100': !isActive
      }"
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.4167 22H4.58333C2.05608 22 0 19.9443 0 17.4175V8.91612C0 7.39016 0.755333 5.96959 2.02033 5.11725L8.43608 0.787727C9.9935 -0.262576 12.0065 -0.262576 13.5639 0.787727L19.9806 5.11725C21.2447 5.96959 22 7.38924 22 8.91612V17.4175C22 19.9443 19.9439 22 17.4167 22ZM11 1.83436C10.4647 1.83436 9.92933 1.992 9.46183 2.30819L3.04517 6.6368C2.28617 7.1482 1.83333 7.99962 1.83333 8.9152V17.4166C1.83333 18.9325 3.06717 20.1661 4.58333 20.1661H17.4167C18.9328 20.1661 20.1667 18.9325 20.1667 17.4166V8.91612C20.1667 8.00054 19.7138 7.1482 18.9558 6.63771L12.5382 2.30819C12.0707 1.992 11.5353 1.83436 11 1.83436Z"/>
    </svg>
  </div>
</template>

<style scoped>

</style>