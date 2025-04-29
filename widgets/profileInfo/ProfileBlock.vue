<script setup lang="ts">
import ProfileRow from '~/widgets/profileInfo/ProfileRow.vue'

import IcLocation from '~/icons/profile-widgets/IcLocation.vue'
</script>

<template>
  <div class="bg-(--primary-white-bg) dark:bg-(--secondary-black-bg) rounded-(--radius-2xl)">
    <div class="flex flex-col items-start">
      <div class="w-full">
        <ProfileRow :icon-component="IcLocation" title="Мои адреса" />
      </div>
    </div>
  </div>
</template>
