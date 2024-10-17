<script setup lang="ts">
import PrimeToolbar from 'primevue/toolbar'
import NotificationComponent from '@/components/notifications/NotificationComponent.vue';
import UserAvatarMenu from '@/components/user/UserAvatarMenu.vue';
</script>

<template>
  <PrimeToolbar class="app-toolbar shadow-none border rounded-none md:py-0">
    <template #start>
      <span class="text-3xl text-black dark:text-white font-black">FinApp</span>
    </template>

    <template #center>
      <router-link :to="{ name: 'dashboard' }" activeClass="border-b border-primary" class="hidden md:flex py-2">
        <PrimeButton text plain class="" :label="$t('labels.dashboard')" />
      </router-link>

      <router-link :to="{ name: 'cc.index' }" activeClass="border-b border-primary" class="hidden md:flex py-2">
        <PrimeButton text plain class="" :label="$t('labels.creditCard', 2)" />
      </router-link>

      <!--  <router-link :to="`/cheques/#?cc={ name: 'cheque.index' }`" activeClass="border-b border-primary" class="hidden md:flex py-2">
        <PrimeButton text plain class="" :label="$t('labels.cheque', 2)" />
      </router-link> -->

      <router-link activeClass="border-b border-primary" class="ml-2 hidden md:flex py-2"
        :to="{ name: 'transactions.index' }">
        <PrimeButton text plain class="" :label="$t('labels.transaction', 2)" />
      </router-link>
    </template>


    <template #end>
      <div class="flex align-items-center gap-3">
        <!-- <PrimeAvatar class="p-overlay-badge border rounded-full bg-transparent" icon="pi pi-bell" /> -->
        <NotificationComponent />
        <UserAvatarMenu />
      </div>
    </template>
  </PrimeToolbar>
</template>