<script setup lang="ts">
import PrimeToolbar from 'primevue/toolbar'
import { useRoute } from 'vue-router';

const route = useRoute()
</script>

<template>
  <PrimeToolbar class="app-bottom-bar shadow-none border-0 border-t rounded-none p-0 gap-0 bg-white dark:bg-surface-950">
    <template #center>
      <div class="flex justify-between w-screen h-full px-3">

        <router-link :to="{ name: 'admin.dashboard' }" class="py-1">
        <PrimeButton size="large" class="text-xs" icon="pi pi-home" iconPos="top" :severity="route.name == 'admin.dashboard' ? 'primary' : 'secondary'" :label="$t('labels.dashboard')" text />
      </router-link>

        <router-link :to="{ name: 'admin.cc.index' }" class="py-1">
          <PrimeButton size="large" class="text-xs" icon="pi pi-credit-card" iconPos="top" :severity="route.name == 'admin.cc.index' ? 'primary' : 'secondary'" :label="$t('labels.creditCard', 2)" text />
        </router-link>

        <!-- <router-link :to="{ name: 'admin.transactions.index' }" class="py-1">
          <PrimeButton size="large" class="text-xs" icon="pi pi-book" iconPos="top" :severity="route.name == 'transactions.index' ? 'primary' : 'secondary'" :label="$t('labels.transaction', 2)" text />
        </router-link> -->
      </div>
    </template>
  </PrimeToolbar>
</template>

<style scoped>
.app-bottom-bar {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 9;
}
</style>