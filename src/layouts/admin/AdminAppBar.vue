<script setup lang="ts">
import PrimeAvatar from 'primevue/avatar'
import PrimeToolbar from 'primevue/toolbar'
</script>

<template>
  <PrimeToolbar class="app-toolbar shadow-none border rounded-none">
    <template #start>
      <span class="text-3xl text-black dark:text-white font-black">FinApp Admin</span>
    </template>

    <template #center>
      <router-link :to="{ name: 'dashboard' }" class="hidden md:flex">
        <PrimeButton text plain class="" :label="$t('labels.dashboard')" />
      </router-link>

      <!-- <router-link :to="{ name: 'cc.index' }" class="hidden md:flex">
        <PrimeButton text plain class="" :label="$t('labels.creditCard', 2)" />
      </router-link>

      <router-link :to="`#?cc={ name: 'cheque.index' }`" class="hidden md:flex">
        <PrimeButton text plain class="" :label="$t('labels.cheque', 2)" />
      </router-link>

      <router-link class="ml-2 hidden md:flex" :to="`#?cc={ name: 'transactions.index' }`">
        <PrimeButton text plain class="" :label="$t('labels.transaction', 2)" />
      </router-link> -->
    </template>


    <template #end>
      <div class="flex align-items-center gap-3">
        <PrimeAvatar class="p-overlay-badge border rounded-full bg-white" icon="pi pi-bell" />
        <PrimeAvatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
          style="width: 32px; height: 32px" />
      </div>
    </template>
  </PrimeToolbar>
</template>