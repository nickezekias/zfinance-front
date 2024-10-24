<script setup lang="ts">
import PrimeToolbar from 'primevue/toolbar'
import NotificationComponent from '@/components/notifications/NotificationComponent.vue';
import UserAvatarMenu from '@/components/user/UserAvatarMenu.vue';
import { useAdminAuthStore } from '@/stores/admin.auth.store';

const authStore = useAdminAuthStore()
</script>

<template>
  <PrimeToolbar class="app-toolbar shadow-none border rounded-none md:py-0">
    <template #start>
      <span class="text-3xl text-black dark:text-white font-black">FinApp <i class="text-red-500">Admin</i></span>
    </template>

    <template #center>
      <router-link :to="{ name: 'admin.dashboard' }" activeClass="border-b border-primary" class="hidden md:flex py-2">
        <PrimeButton text plain class="" :label="$t('labels.dashboard')" />
      </router-link>

      <router-link :to="{ name: 'admin.cc.index' }" activeClass="border-b border-primary" class="hidden md:flex py-2">
        <PrimeButton text plain class="" :label="$t('labels.creditCard', 2)" />
      </router-link>
    </template>


    <template #end>
      <div class="flex align-items-center gap-3">
        <NotificationComponent />
        <UserAvatarMenu :authStore="authStore" />
      </div>
    </template>
  </PrimeToolbar>
</template>