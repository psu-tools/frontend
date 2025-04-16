<script setup lang="ts">
import ActiveTrips from '~/widgets/ActiveTrips/ActiveTrips.vue'
import UpcomingTrips from '~/widgets/UpcomingTrips/UpcomingTrips.vue'
import IcNotifications from '~/icons/IcNotifications.vue'
import { useTripsStore } from '@/stores/trips'

const tripsStore = useTripsStore()

onMounted(async () => await tripsStore.fetchTrips())
</script>

<template>
  <div class="relative" :class="{ 'h-full': tripsStore.isLoading }">
    <NuxtLink class="absolute top-1 right-2" to="/notifications">
      <IcNotifications />
    </NuxtLink>

    <div
      v-if="tripsStore.isLoading"
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <p class="h-20 w-20">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <circle fill="#FF724C" stroke="#FF724C" stroke-width="15" r="15" cx="40" cy="65">
            <animate
              attributeName="cy"
              calcMode="spline"
              dur="2"
              values="65;135;65;"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="-.4"
            ></animate>
          </circle>
          <circle fill="#FF724C" stroke="#FF724C" stroke-width="15" r="15" cx="100" cy="65">
            <animate
              attributeName="cy"
              calcMode="spline"
              dur="2"
              values="65;135;65;"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="-.2"
            ></animate>
          </circle>
          <circle fill="#FF724C" stroke="#FF724C" stroke-width="15" r="15" cx="160" cy="65">
            <animate
              attributeName="cy"
              calcMode="spline"
              dur="2"
              values="65;135;65;"
              keySplines=".5 0 .5 1;.5 0 .5 1"
              repeatCount="indefinite"
              begin="0"
            ></animate>
          </circle>
        </svg>
      </p>
    </div>

    <div v-else class="flex flex-col gap-9">
      <ActiveTrips :trips="tripsStore.activeTrips" />
      <UpcomingTrips :trips="tripsStore.upcomingTrips" />
    </div>
  </div>
</template>
